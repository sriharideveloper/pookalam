import { createSocialCard, socialAlt, socialContentType, socialSize } from './social-card';
export const runtime = 'nodejs';
export const alt=socialAlt;export const size=socialSize;export const contentType=socialContentType;
export default function TwitterImage(){return createSocialCard()}
