-- Poovili production schema
-- Run this entire file once in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.pookalams (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 80),
  image_url text not null,
  style text not null default 'Classic Kerala' check (char_length(style) <= 40),
  author_name text not null default 'Poovili Artist' check (char_length(author_name) <= 60),
  author_id uuid references auth.users(id) on delete set null,
  likes integer not null default 0 check (likes >= 0),
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pookalams_public_feed_idx
  on public.pookalams (created_at desc)
  where published = true;

alter table public.pookalams enable row level security;

drop policy if exists "Public can explore published pookalams" on public.pookalams;
create policy "Public can explore published pookalams"
  on public.pookalams for select to anon, authenticated
  using (published = true);

drop policy if exists "Artists can update their own pookalams" on public.pookalams;
create policy "Artists can update their own pookalams"
  on public.pookalams for update to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

drop policy if exists "Artists can delete their own pookalams" on public.pookalams;
create policy "Artists can delete their own pookalams"
  on public.pookalams for delete to authenticated
  using (auth.uid() = author_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('pookalams', 'pookalams', true, 10485760, array['image/png','image/jpeg','image/webp'])
on conflict (id) do update set public=excluded.public, file_size_limit=excluded.file_size_limit, allowed_mime_types=excluded.allowed_mime_types;

create or replace function public.set_updated_at()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists pookalams_set_updated_at on public.pookalams;
create trigger pookalams_set_updated_at before update on public.pookalams
for each row execute function public.set_updated_at();

create or replace function public.like_pookalam(pookalam_id uuid)
returns integer language plpgsql security definer set search_path = public as $$
declare new_likes integer;
begin
  update public.pookalams set likes=likes+1
  where id=pookalam_id and published=true
  returning likes into new_likes;
  return new_likes;
end;
$$;

revoke all on function public.like_pookalam(uuid) from public;
grant execute on function public.like_pookalam(uuid) to anon, authenticated;
