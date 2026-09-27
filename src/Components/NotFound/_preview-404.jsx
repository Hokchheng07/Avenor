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
        {COVERS_R.map((c, i) => <Slot key={c.src} c={c} i={COVERS_L.length + i} />)}
        <span className="shelf"></span>
      </div>
    </div>
  );
}
const Arrow = () => (
  <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);
function NotFoundPreview({ theme = 'light', width = 1440, height = 900 }) {
  const [k, setK] = React.useState(0);
  return (
    <div data-theme={theme} style={{ width: +width, height: +height, overflow: 'hidden', position: 'relative', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,.12), 0 12px 32px rgba(0,0,0,.10)' }}>
      <div key={k} className="page" style={{ '--nf-min-h': height + 'px' }}>
        <a href="#" className="back" onClick={(e) => e.preventDefault()}>← Back to Avenor</a>
        <main className="main">
          <span className="srOnly">Error 404</span>
          <Scene />
          <div className="copy">
            <p className="eyebrow">Page not found</p>
            <h1 className="title">This page isn’t on the shelf.</h1>
            <p className="body">It may have been moved, renamed, or never written at all. Let’s find you something worth reading.</p>
            <div className="actions">
              <a href="#" className="button" onClick={(e) => e.preventDefault()}>Back to home<Arrow /></a>
              <a href="#" className="link" onClick={(e) => e.preventDefault()}>Discover books<Arrow /></a>
            </div>
            <p className="tertiary">Or <a href="#" onClick={(e) => e.preventDefault()}>browse the team behind Avenor</a></p>
          </div>
        </main>
      </div>
      <button onClick={() => setK((n) => n + 1)} style={{ position: 'absolute', right: 12, bottom: 12, font: '600 12px system-ui', padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(0,0,0,.15)', background: 'rgba(255,255,255,.9)', color: '#333', cursor: 'pointer' }}>Replay intro</button>
    </div>
  );
}
function FrameStrip({ theme = 'light' }) {
  const frames = [[0.25, 'Shelf draws'], [0.55, 'Covers drop'], [0.9, 'Covers settle'], [1.2, 'The 4s rise'], [1.6, 'Settled'], [2.4, 'Circe leans into the gap']];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 440px)', gap: 16 }}>
      {frames.map(([t, label]) => (
        <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div data-theme={theme} style={{ width: 440, height: 136, borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,.12)' }}>
            <div className="page frozen" style={{ width: 760, '--nf-min-h': '235px', '--scrub': -t + 's', padding: '16px 16px 40px', justifyContent: 'center', transform: 'scale(' + (440 / 760) + ')', transformOrigin: '0 0' }}>
              <Scene replayable={false} />
            </div>
          </div>
          <div style={{ font: '500 13px system-ui', color: '#555' }}>{t.toFixed(2)}s · {label}</div>
        </div>
      ))}
    </div>
  );
}
module.exports = { NotFoundPreview, FrameStrip };
