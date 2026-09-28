/* eslint-disable */
// Preview harness only — mirrors not-found.tsx + shelf-scene.tsx with plain <img> and raw class names.
const COVERS_L = [
  { src: '/Images/hero-covers/the-hobbit.jpg', title: 'The Hobbit', r: -2.2, sm: true },
  { src: '/Images/hero-covers/circe.jpg', title: 'Circe', r: 1.2, label: true, leans: true },
];
const COVERS_R = [
  { src: '/Images/hero-covers/beloved.jpg', title: 'Beloved', r: -1.2, label: true },
  { src: '/Images/hero-covers/the-left-hand-of-darkness.jpg', title: 'The Left Hand of Darkness', r: 2.4 },
  { src: '/Images/hero-covers/the-waves.jpg', title: 'The Waves', r: -1.6, sm: true },
];
function PImg({ src, contain }) {
  const [ok, setOk] = React.useState(true);
  if (!ok) return null;
  return <img src={src} alt="" onError={() => setOk(false)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: contain ? 'contain' : 'cover', objectPosition: contain ? '50% 100%' : '50% 50%' }} />;
}
function Slot({ c, i, replay = 0, onLeanEnd }) {
  const lean = c.leans ? (replay === 0 ? ' leanIntro' : ' leanNow') : '';
  return (
    <div className={'slot' + (c.sm ? ' hideSm' : '')} style={{ '--r': c.r + 'deg', '--d': (0.3 + i * 0.09) + 's' }}>
      <div key={c.leans ? replay : undefined} className={'leaner' + lean} onAnimationEnd={c.leans ? onLeanEnd : undefined}>
        <div className="cover">
          <span className="nfFallback">{c.title}</span>
          <PImg src={c.src} />
          {c.label && <span className="label">4</span>}
        </div>
      </div>
    </div>
  );
}
function Scene({ replayable = true }) {
  const [replay, setReplay] = React.useState(0);
  const [leaning, setLeaning] = React.useState(true);
  const enter = () => { if (!replayable || leaning) return; setLeaning(true); setReplay((n) => n + 1); };
  const end = (e) => { if (e.target === e.currentTarget) setLeaning(false); };
  return (
    <div className="scene" aria-hidden="true">
      <div className="row" onMouseEnter={enter}>
        <div className="sprigWrap"><div className="sprig"><span className="nfFallbackSprig"></span><PImg src="/Images/about/botanical-sprig.png" contain /></div></div>
        {COVERS_L.map((c, i) => <Slot key={c.src} c={c} i={i} replay={replay} onLeanEnd={end} />)}
        <div className="gap"></div>
        {COVERS_R.map((c, i) => <Slot key={c.src} c={c} i={i} replay={replay} onLeanEnd={end} />)}
      </div>
      <div className="bar">
        <div className="rail"></div>
        <div className="shelf"></div>
      </div>
    </div>
  );
}
export default function Preview404() {
  return (
    <div className="preview">
      <nav className="nav">
        <a href="/" className="logo">
          <span className="avenorLogo">AVENOR</span>
          <span className="tagline">The Digital Sanctuary for Readers</span>
        </a>
        <div className="navLinks">
          <a href="/discover">Discover</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </nav>
      <main className="main">
        <span className="srOnly">Error 404</span>
        <Scene />
        <div className="copy">
          <p className="eyebrow">Page not found</p>
          <h1 className="title">This page isn&rsquo;t on the shelf.</h1>
          <p className="body">
            It may have been moved, renamed, or never written at all. Let&rsquo;s find you something worth reading.
          </p>
          <div className="actions">
            <a href="/" className="btnPrimary">
              Back to home
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a href="/discover" className="btnSecondary">
              Discover books
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
          <p className="tertiary">
            Or <a href="/about#team">browse the team behind Avenor</a>
          </p>
        </div>
      </main>
    </div>
  );
}
