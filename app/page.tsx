import Studio from './components/Studio';

const petals = (count:number) => Array.from({length:count});
const gallery = [
  {title:'Thiruvona Thaaram',author:'Meera K.',likes:'1.2k',crop:'center 70%',tag:'TRADITIONAL'},
  {title:'Mazhavillu',author:'Arjun P.',likes:'864',crop:'left 58%',tag:'VIBRANT'},
  {title:'Kasavu Bloom',author:'Diya N.',likes:'532',crop:'right 65%',tag:'MINIMAL'},
  {title:'Nilaavu',author:'Nikhil V.',likes:'417',crop:'center 35%',tag:'DREAMY'},
];

function PookalamMark({small=false}:{small?:boolean}) {
  return <span className={`brand-mark ${small?'small':''}`} aria-hidden="true"><i /><i /><i /><i /><b /></span>;
}

export default function Home() {
  return (
    <main>
      <header className="site-nav">
        <a className="brand" href="#top" aria-label="Poovili home"><PookalamMark /><span>Poovili</span></a>
        <nav aria-label="Main navigation"><a href="#studio">Studio</a><a href="#explore">Explore</a><a href="#how">Engane?</a></nav>
        <a className="nav-cta" href="#studio">Pookalam thudangam <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="cloud cloud-one" /><div className="cloud cloud-two" />
        <div className="aurora aurora-one" /><div className="aurora aurora-two" />
        <div className="petal-sky" aria-hidden="true">{petals(14).map((_,i)=><i key={i} style={{'--p':i} as React.CSSProperties}>{i%3===0?'✿':i%3===1?'●':'◆'}</i>)}</div>
        <div className="hero-copy">
          <div className="eyebrow"><span>✦</span> Onam, reimagined with AI</div>
          <h1>Ninte imagination.<br /><em>Poovayi viriyatte.</em></h1>
          <p className="hero-sub">ഒരു ചെറിയ വര. ഒരു മനോഹര പൂക്കളം.</p>
          <p className="hero-body">Rough aayi draw cheyyu. Ninte space upload cheyyu. Pinne, nammude AI athine next-level realistic pookalam aakkum.</p>
          <div className="hero-actions"><a className="primary-btn" href="#studio">Create your pookalam <span>✦</span></a><a className="text-link" href="#explore">Community designs <span>↘</span></a></div>
          <div className="trust-row"><div className="mini-stack"><span>🌼</span><span>🌸</span><span>🌺</span></div><p><strong>2,400+ designs</strong><br />made with sneham</p></div>
        </div>
        <div className="hero-art" aria-label="A dreamy flower pookalam illustration">
          <div className="orbit orbit-one"><span>✿</span><span>❀</span><span>✦</span></div><div className="orbit orbit-two"><span>✿</span><span>❀</span><span>✦</span></div>
          <div className="pookalam"><div className="petal-ring ring-outer">{petals(18).map((_,i)=><i key={i} style={{'--i':i} as React.CSSProperties}/>)}</div><div className="petal-ring ring-mid">{petals(14).map((_,i)=><i key={i} style={{'--i':i} as React.CSSProperties}/>)}</div><div className="petal-ring ring-inner">{petals(10).map((_,i)=><i key={i} style={{'--i':i} as React.CSSProperties}/>)}</div><div className="flower-core">✦</div></div>
          <div className="silk-ribbon ribbon-one" /><div className="silk-ribbon ribbon-two" /><div className="art-note"><span>✦</span><div><small>AI MAGIC</small><strong>Inspired by your lines</strong></div></div>
        </div>
        <div className="scroll-cue"><span>SCROLL TO BLOOM</span><i>↓</i></div>
      </section>

      <div className="bloom-marquee" aria-label="Poovili creative features"><div><span>SKETCH</span><i>✿</i><span>PLACE</span><i>✦</i><span>BLOOM</span><i>❀</i><span>SHARE</span><i>✦</i><span>ONAM</span><i>✿</i><span>SKETCH</span><i>❀</i><span>PLACE</span><i>✦</i><span>BLOOM</span></div></div>

      <section className="studio-intro" id="studio">
        <div className="color-orb studio-orb-one" /><div className="color-orb studio-orb-two" />
        <div className="floral-divider">✦　❀　✦</div><div className="section-kicker">YOUR CANVAS</div>
        <h2>Oru line-il ninnu,<br /><em>oru lokam vare.</em></h2>
        <p>Perfect aavanam ennilla. Just start drawing — baaki magic njangal cheyyam.</p>
        <Studio />
      </section>

      <section className="how-section" id="how">
        <div className="floating-sprig sprig-one">✿<span>✦</span>❀</div>
        <div className="how-heading"><div><span className="section-kicker">SIMPLE AANU</span><h2>Moonnu cheriya steps.<br /><em>Unlimited magic.</em></h2></div><p>Traditional pookalam craftum, powerful image AI-yum orumichu. Ninte idea thanne hero.</p></div>
        <div className="steps-line">
          <article><span>01</span><div className="step-icon sketch-icon">⌁</div><h3>Rough aayi varaykku</h3><p>Circles, petals, random lines — neat aavanam ennilla.</p></article>
          <article><span>02</span><div className="step-icon photo-icon">▣</div><h3>Space upload cheyyu</h3><p>Optional aanu. Photo undenkil perspective extra realistic.</p></article>
          <article><span>03</span><div className="step-icon magic-icon">✦</div><h3>Magic kaanu</h3><p>Fresh petals, real shadows, ninte exact pattern. Share-ready.</p></article>
        </div>
      </section>

      <section className="showcase">
        <div className="showcase-image"><img src="/images/heavenly-pookalam.png" alt="Photorealistic pookalam in a bright Kerala courtyard" /><div className="silk-overlay" /><span className="image-stamp">100% YOUR IDEA<br />AI POLISHED</span></div>
        <div className="showcase-copy"><span className="section-kicker">NEXT-LEVEL REALISM</span><h2>Petal vare.<br /><em>Perfect alla — real.</em></h2><p>Lighting, floor perspective, flower texture, tiny imperfections — ellam manassilaakki aanu Poovili render cheyyunnathu.</p><ul><li><b>✦</b><span><strong>Sketch-faithful geometry</strong>Ninte core design maari pokilla.</span></li><li><b>✦</b><span><strong>Place-aware realism</strong>Shadowsum scale-um photo-ne match cheyyum.</span></li><li><b>✦</b><span><strong>Kerala-first prompting</strong>Correct flowers, colours, craft details.</span></li></ul><a className="dark-link" href="#studio">Try it with my idea <span>→</span></a></div>
      </section>

      <section className="explore" id="explore">
        <div className="rainbow-wash" />
        <div className="explore-head"><div><span className="section-kicker">POOVILI COMMUNITY</span><h2>Lokam muzhuvan<br /><em>poothu nilkkatte.</em></h2></div><div><p>Malayalikalude imagination, oru beautiful gallery-il.</p><a href="#studio">Create yours ↗</a></div></div>
        <div className="gallery-grid">{gallery.map((item,index)=><article className={`gallery-card card-${index+1}`} key={item.title}><div className="gallery-image"><img src="/images/heavenly-pookalam.png" alt={`${item.title} community pookalam`} style={{objectPosition:item.crop}}/><span>{item.tag}</span><button aria-label={`Like ${item.title}`}>♡</button></div><div className="gallery-meta"><div><h3>{item.title}</h3><p>by {item.author}</p></div><span>♥ {item.likes}</span></div></article>)}</div>
        <button className="load-more">Iniyum kaanikkoo <span>↓</span></button>
      </section>

      <section className="quote-section"><div className="quote-flower">❀</div><p className="malayalam-quote">“പൂക്കളം ഒരു ചിത്രം മാത്രമല്ല.<br />ഒരുമിച്ചിരിക്കുന്നതിന്റെ ഓർമ്മയാണ്.”</p><span>A POOKALAM ISN&apos;T JUST A DESIGN. IT&apos;S A MEMORY OF TOGETHERNESS.</span></section>

      <section className="final-cta"><div className="cta-orbit"><i>✿</i><i>✦</i><i>❀</i></div><div className="petal-sky cta-petals" aria-hidden="true">{petals(10).map((_,i)=><i key={i} style={{'--p':i} as React.CSSProperties}>{i%2?'✦':'✿'}</i>)}</div><PookalamMark /><span className="section-kicker">THIS ONAM</span><h2>Ninte pookalam<br /><em>ivide thudangunnu.</em></h2><p>No design skills venda. Oru idea mathi.</p><a className="primary-btn" href="#studio">Start creating — free <span>✦</span></a></section>

      <footer><a className="brand" href="#top"><PookalamMark small/><span>Poovili</span></a><p>Made with <span>♥</span> in Kerala, for Malayalis everywhere.</p><div><a href="#studio">Studio</a><a href="#explore">Explore</a><a href="mailto:hello@poovili.in">Contact</a></div><small>© 2026 POOVILI</small></footer>
    </main>
  );
}
