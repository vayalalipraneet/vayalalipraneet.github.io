// Portfolio · v2 — Mohamed Shehata-inspired (light mode)
// Centered dark pill nav · massive grotesque hero · B&W portrait · iconographic contact list

const Portfolio = (() => {
  const D = window.PORTFOLIO_DATA;
  const { useEffect, useState, useRef } = React;

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "#c8431f",
    "navStyle": "dark",
    "heroLine": "fly"
  } /*EDITMODE-END*/;

  // Alternate opening lines — pick via Tweaks
  const HERO_LINES = {
    fly: {
      head: <>Designing how new aircraft <span className="accent" style={{ fontSize: "130px" }}>fly.</span></>,
      lede: <>I'm an aerospace engineer with a deep passion for <span className="accent-soft">aviation</span> — building the <span className="accent-soft">flight dynamics models</span>, <span className="accent-soft">control laws</span> and <span className="accent-soft">engineering simulators</span> that take VTOL aircraft from clean-sheet design to <span className="accent-soft">certified flight</span>. A decade across rotorcraft research, real-time simulation and flight test.</>
    },
    flightworthy: {
      head: <>Making new aircraft <span className="accent">flightworthy.</span></>,
      lede: <>Flight physics engineer at <span className="accent-soft">Volocopter</span>, working on the <span className="accent-soft">VoloCity</span> and <span className="accent-soft">XPro</span> eVTOL programmes. I model how aircraft fly, design the laws that keep them stable, and build the simulators that prove it — through certification under EASA SC-VTOL.</>
    },
    earnWings: {
      head: <>Helping the next generation of aircraft <span className="accent">earn their wings.</span></>,
      lede: <>Aviation has been the thing since I was a kid. Today I'm a flight physics engineer building the <span className="accent-soft">dynamics models</span>, <span className="accent-soft">control laws</span> and <span className="accent-soft">simulators</span> behind two electric VTOL programmes — taking aircraft from a clean sheet of paper to the moment they're cleared to fly.</>
    },
    physics: {
      head: <>Flight physics for the aircraft of <span className="accent">tomorrow.</span></>,
      lede: <>I'm a flight simulation engineer at <span className="accent-soft">Volocopter</span>. My work sits where aerodynamics meets the control loop — flight dynamics modeling, control law design and engineering simulators that take <span className="accent-soft">VTOL aircraft</span> from prototype to <span className="accent-soft">certification</span>. A decade across rotorcraft research, real-time simulation and flight test.</>
    }
  };

  const SECTIONS = [
  ['top', 'About'],
  ['practice', 'Expertise'],
  ['stack', 'Skills'],
  ['work', 'Projects'],
  ['research', 'Research'],
  ['writing', 'Writing'],
  ['cv', 'CV']];


  // Scroll-spy
  function useScrollSpy(ids) {
    const [active, setActive] = useState(ids[0]);
    useEffect(() => {
      const onScroll = () => {
        const top = window.scrollY + 240;
        let curr = ids[0];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= top) curr = id;
        }
        setActive(curr);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return active;
  }

  // Reveal on scroll
  function Reveal({ children, delay = 0, as: Tag = 'div', className = '', style = {} }) {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {setShown(true);io.disconnect();}
      }, { threshold: 0.04, rootMargin: '0px 0px -60px 0px' });
      io.observe(el);
      return () => io.disconnect();
    }, []);
    return (
      <Tag ref={ref} className={`${className} pf-reveal ${shown ? 'is-shown' : ''}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}>
        {children}
      </Tag>);

  }

  // Slideshow — auto-rotates between images with crossfade
  function Slideshow({ images, alt = '', interval = 4500 }) {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
      if (!images || images.length < 2) return;
      const id = setInterval(() => {
        setIdx((i) => (i + 1) % images.length);
      }, interval);
      return () => clearInterval(id);
    }, [images, interval]);
    return (
      <div className="pf-fp-slides">
        {images.map((src, i) =>
        <img
          key={src}
          src={src}
          alt={i === idx ? alt : ''}
          className={`pf-fp-slide ${i === idx ? 'is-on' : ''}`}
          aria-hidden={i !== idx} />

        )}
        <div className="pf-fp-slide-dots">
          {images.map((_, i) =>
          <button
            key={i}
            type="button"
            className={`pf-fp-slide-dot ${i === idx ? 'is-on' : ''}`}
            aria-label={`Show image ${i + 1}`}
            onClick={() => setIdx(i)} />

          )}
        </div>
      </div>);

  }

  // Icons (stroke, line, minimalist — match the reference)
  const Icon = {
    phone: () =>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7a2 2 0 0 1 1.72 2.03Z" />
      </svg>,

    mail: () =>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </svg>,

    linkedin: () =>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>,

    map: () =>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>,

    scholar: () =>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 9 12 4 2 9l10 5 10-5Z" />
        <path d="M6 11v5a6 6 0 0 0 12 0v-5" />
      </svg>,

    download: () =>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" style={{ width: "40px", height: "40px" }}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="M7 10l5 5 5-5" />
        <path d="M12 15V3" />
      </svg>

  };

  function Navbar() {
    const active = useScrollSpy([...SECTIONS.map((s) => s[0]), 'contact']);
    const [menuOpen, setMenuOpen] = useState(false);
    const click = (id) => (e) => {
      e.preventDefault();
      setMenuOpen(false);
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };
    return (
      <nav className={`pf-navbar ${menuOpen ? 'is-open' : ''}`}>
        <div className="pf-navbar-bar">
          <a href="#top" onClick={click('top')} className="pf-navbar-brand">
            Praneet Vayalali<span className="dot">.</span>
          </a>
          <div className="pf-navbar-links">
            {SECTIONS.map(([id, name]) =>
            <a key={id} href={`#${id}`} onClick={click(id)}
            className={`pf-navbar-link ${active === id ? 'is-active' : ''}`}>{name}</a>
            )}
          </div>
          <a href="#contact" onClick={click('contact')} className={`pf-navbar-cta ${active === 'contact' ? 'is-active' : ''}`}>Let's Talk</a>
          <button type="button" className="pf-navbar-burger" aria-label="Menu"
          aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
            <span></span><span></span><span></span>
          </button>
        </div>
        <div className="pf-navbar-menu">
          {SECTIONS.map(([id, name]) =>
          <a key={id} href={`#${id}`} onClick={click(id)}
          className={`pf-navbar-menu-link ${active === id ? 'is-active' : ''}`}>{name}</a>
          )}
          <a href="#contact" onClick={click('contact')} className="pf-navbar-menu-link pf-navbar-menu-cta">Let's Talk</a>
        </div>
      </nav>);

  }

  function Hero({ lineKey = 'fly' }) {
    const line = HERO_LINES[lineKey] || HERO_LINES.fly;
    return (
      <section id="top" className="pf-hero">
        <Reveal>
          <div className="pf-kicker">Introduction</div>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="pf-display" style={{ fontSize: "130px" }}>{line.head}</h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="pf-hero-lede">{line.lede}</p>
        </Reveal>

        <Reveal delay={220} className="pf-hero-strip">
          <div className="pf-hero-strip-item">
            <span className="pf-hero-strip-k" style={{ height: "24px", fontSize: "15px" }}>Currently</span>
            <span className="pf-hero-strip-v" style={{ fontSize: "15px" }}>VOLOCOPTER TECHNOLOGIES GMBH</span>
          </div>
          <div className="pf-hero-strip-item">
            <span className="pf-hero-strip-k" style={{ fontSize: "15px" }}>Based</span>
            <span className="pf-hero-strip-v" style={{ fontSize: "15px" }}>Karlsruhe, DE</span>
          </div>
          <div className="pf-hero-strip-item" style={{ fontSize: "15px" }}>
            <span className="pf-hero-strip-k">Since</span>
            <span className="pf-hero-strip-v">Dec 2021</span>
          </div>
          <div className="pf-hero-strip-item">
            <span className="pf-hero-strip-k" style={{ fontSize: "15px" }}>Education</span>
            <span className="pf-hero-strip-v" style={{ fontSize: "15px" }}>PhD · RPI · 2021</span>
          </div>
        </Reveal>

        <Reveal delay={300} className="pf-hero-actions">
          <a href={D.cv} download className="pf-navbar-cta is-active" style={{ justifyContent: "flex-start", textAlign: "center", width: "170px", fontSize: "15px" }}>
            Download CV
            <Icon.download />
          </a>
        </Reveal>
      </section>);

  }

  function SectionHead({ kicker, title, accent, aside }) {
    return (
      <div className="pf-section-head">
        <div>
          <Reveal>
            <div className="pf-kicker">{kicker}</div>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="pf-display-sm">
              {title}{accent && <> <span className="accent">{accent}</span></>}
            </h2>
          </Reveal>
        </div>
        {aside &&
        <Reveal delay={120} className="pf-section-aside">{aside}</Reveal>
        }
      </div>);

  }

  function Capabilities() {
    const cards = [
    {
      kind: 'icon',
      icon:
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M28 8 L48 28 L28 48 L8 28 Z" />
            <path d="M28 18 L38 28 L28 38 L18 28 Z" />
          </svg>,

      title: 'Flight dynamics',
      body: '6-DOF nonlinear modeling, trim and linearization, system identification - from rotorcraft to multirotor eVTOL.'
    },
    {
      kind: 'photo',
      image: 'images/uh60b.jpg',
      label: 'Rotorcraft research'
    },
    {
      kind: 'icon',
      icon:
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="28" cy="28" r="20" />
            <path d="M8 28 Q 28 8 48 28" />
            <path d="M8 28 Q 28 48 48 28" />
            <circle cx="28" cy="28" r="3" fill="currentColor" />
          </svg>,

      title: 'Control law design',
      body: 'Robust, adaptive and control-allocation strategies for fault-tolerant and redundant flight control systems.'
    },
    {
      kind: 'icon',
      icon:
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="8" y="14" width="40" height="28" rx="3" />
            <path d="M16 22 H40 M16 28 H32 M16 34 H28" />
            <circle cx="44" cy="36" r="6" fill="currentColor" />
          </svg>,

      title: 'Simulation & V&V',
      body: 'Engineering simulators - fixed-base and motion-based with mixed reality - with SIL/HIL integration, validated against flight test.'
    },
    {
      kind: 'photo',
      image: 'images/praneet-simulator.png',
      label: 'At the simulator'
    },
    {
      kind: 'icon',
      icon:
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 44 L14 22 L28 12 L42 22 L42 44" />
            <path d="M22 44 V32 H34 V44" />
            <circle cx="28" cy="24" r="2" fill="currentColor" />
          </svg>,

      title: 'Certification',
      body: 'EASA SC-VTOL · MOC-2 (VTOL.2500(b)) · DO-178C · ARP 4754A - built into the development process.'
    }];

    return (
      <section id="practice" className="pf-section pf-cap-section">
        <SectionHead kicker="What I do" title="Flight dynamics, control" accent="& simulation." />
        <div className="pf-cap-grid">
          {cards.map((c, i) =>
          <Reveal key={i} delay={i * 60} className={`pf-cap-card pf-cap-kind-${c.kind}`}>
              {c.kind === 'icon' ?
            <>
                  <div className="pf-cap-iconel">{c.icon}</div>
                  <h3 className="pf-cap-title">{c.title}</h3>
                  <p className="pf-cap-body" style={{ fontSize: "20px" }}>{c.body}</p>
                </> :

            <>
                  <img src={c.image} alt="" />
                  <span className="pf-cap-label">{c.label}</span>
                </>
            }
            </Reveal>
          )}
        </div>
      </section>);

  }

  function Work() {
    const projects = [
    {
      tag: 'LIVE · VOLOCITY',
      tagColor: 'green',
      icon:
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M28 8 L44 22 L28 36 L12 22 Z" />
            <path d="M28 36 V48" />
            <path d="M20 48 H36" />
          </svg>,

      title: 'VoloCity & XPro flight simulators',
      sub: 'Engineering Simulation · Certification toward EASA SC-VTOL',
      body: [
      'Engineering simulators across fixed-base dome and motion-based mixed-reality platforms — flight dynamics models, SIL/HIL integration of avionics, V&V against bench and flight test data, and the development process under EASA MOC-2 SC-VTOL (MOC4 VTOL.2500(b)).',
      'Planning and coordination of simulator development to support aircraft design and certification. Predictive handling-qualities, aeroelastic and aeroservoelastic stability analysis for notch-filter design and safety-of-flight evidence.'],

      image: 'images/VoloCity_Aircraft_Flying_in_Bruchsal.jpg',
      images: ['images/VoloCity_Aircraft_Flying_in_Bruchsal.jpg', 'images/xpro.png'],
      cta: { label: 'Learn more about Volocopter', href: 'https://www.volocopter.com' }
    },
    {
      tag: 'VIDEO · VOLOCOPTER',
      tagColor: 'accent',
      icon:
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="8" y="14" width="32" height="28" rx="3" />
            <path d="M40 22 L48 16 L48 40 L40 34 Z" fill="currentColor" />
            <circle cx="18" cy="22" r="2" fill="currentColor" />
          </svg>,

      title: 'XR Ground Control Station',
      sub: '4-person team · 1-month prototype → refined product',
      body: [
      'Developed XR ground control station software for precision flight-test point execution within a 4-person team, progressing from a 1-month prototype to a refined implementation.',
      'The station was demonstrated as part of the public VoloCity flight-test campaign — see the clip on LinkedIn.'],

      image: 'images/xr-ground-control-station.png',
      video: 'https://www.linkedin.com/posts/volocopter_evtol-advancedairmobility-volocopter-activity-7435664822572068864-jeFx',
      cta: { label: 'Watch on LinkedIn', href: 'https://www.linkedin.com/posts/volocopter_evtol-advancedairmobility-volocopter-activity-7435664822572068864-jeFx' }
    },
    {
      tag: 'PERSONAL · IN PROGRESS',
      tagColor: 'green',
      icon:
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="16" cy="16" r="6" />
            <circle cx="40" cy="16" r="6" />
            <circle cx="16" cy="40" r="6" />
            <circle cx="40" cy="40" r="6" />
            <path d="M20 20 L36 36 M36 20 L20 36" />
            <rect x="24" y="24" width="8" height="8" rx="1.5" fill="currentColor" />
          </svg>,

      title: 'Quadcopter flight-control test bench',
      sub: 'Pixhawk · Raspberry Pi companion computer · PX4 / ROS',
      body: [
      'A small carbon-frame quadcopter I\'m building as a personal flight-control test bench — a Pixhawk autopilot paired with a Raspberry Pi companion computer for onboard compute.',
      'The platform is a sandbox to implement and explore custom flight control laws, trajectory planning, and autonomous flight in GPS-denied environments.'],

      image: 'images/quad-testbench-1.jpg',
      images: ['images/quad-testbench-1.jpg', 'images/quad-testbench-3.jpg'],
      cta: null
    },
    {
      tag: 'PhD · RPI',
      tagColor: 'dark',
      icon:
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="28" cy="28" r="18" />
            <path d="M10 28 L46 28 M28 10 L28 46" />
            <circle cx="28" cy="28" r="6" fill="currentColor" />
          </svg>,

      title: 'Post-damage control reconfiguration',
      sub: 'Damage-tolerant Fly-by-Wire · UH-60 & Compound Helicopter',
      body: [
      'PhD dissertation at Rensselaer (Prof. Farhan Gandhi) on adaptive and robust fly-by-wire flight control strategies that tolerate degradation of control effectors on VTOL aircraft with redundancy.',
      'Nonlinear flight simulation and ADS-33E handling-qualities analysis on UH-60 Black Hawk and a derivative compound helicopter — published in JAHS and CEAS Aero. Journal.'],

      image: 'images/compoundheli.jpg',
      cta: { label: 'Read on Google Scholar', href: D.scholar }
    },
    {
      tag: '3rd Place · VFS 36',
      tagColor: 'accent',
      icon:
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 44 L20 24 L28 32 L40 16 L48 44 Z" />
            <circle cx="40" cy="14" r="3" />
          </svg>,

      title: 'Extreme-altitude mountain rescue VTOL',
      sub: 'Synchropter design · VFS 36th Student Design Competition · 2018',
      body: [
      'Proposed a synchropter VTOL concept capable of search-and-rescue missions at the summit of Mt. Everest — where only one helicopter has ever landed.',
      'Developed a 6-DOF flight dynamics model and analyzed autonomous dynamics under degraded visual environment, freezing temperatures and thin air. Third place, graduate category.'],

      image: 'images/synchropter-rescue.png',
      imageFit: 'contain',
      cta: null
    }];

    return (
      <section id="work" className="pf-section pf-fp-section">
        <SectionHead kicker="Selected Projects" title="Built across" accent="a decade." aside={`${projects.length} of many.`} />
        <div className="pf-fp">
          {projects.map((p, i) =>
          <Reveal key={i} delay={i * 60} className="pf-fp-row">
              <div className={`pf-fp-icon pf-fp-icon-${i % 2 === 0 ? 'a' : 'b'}`}>
                {p.icon}
              </div>
              <div className="pf-fp-body">
                <span className={`pf-fp-tag pf-fp-tag-${p.tagColor}`}>{p.tag}</span>
                <h3>{p.title}</h3>
                <div className="pf-fp-sub" style={{ fontSize: "20px" }}>{p.sub}</div>
                {p.body.map((b, j) => <p key={j} style={{ fontSize: "20px" }}>{b}</p>)}
                {p.cta &&
              <a className="pf-fp-cta" href={p.cta.href}>
                    {p.cta.label} <span aria-hidden="true">→</span>
                  </a>
              }
              </div>
              <div className={`pf-fp-fig${p.imageFit === 'contain' ? ' pf-fp-fig-contain' : ''}`}>
                {p.video ?
              <a href={p.video} target="_blank" rel="noopener" className="pf-fp-fig-link" aria-label={`Watch ${p.title} on LinkedIn`}>
                    <img src={p.image} alt="" />
                  </a> :
              p.images && p.images.length > 1 ?
              <Slideshow images={p.images} alt={p.title} /> :

              <img src={p.image} alt="" />
              }
              </div>
            </Reveal>
          )}
        </div>

      </section>);

  }

  function Research() {
    return (
      <section id="research" className="pf-section">
        <SectionHead
          kicker="Past Research"
          title="A decade of"
          accent="rotorcraft."
          aside={`${D.research.length} programmes`} />
        <div className="pf-rsx">
          {D.research.map((r, i) =>
          <Reveal key={i} delay={i * 40} className="pf-rsx-row">
              <div className="pf-rsx-when" style={{ fontSize: "18px" }}>{r.when}</div>
              <div className="pf-rsx-body">
                <h3>{r.title}</h3>
                <div className="pf-rsx-sub" style={{ fontSize: "20px" }}>{r.where} · {r.advisor}</div>
              </div>
              <div className="pf-rsx-tag" style={{ fontSize: "18px" }}>{r.role}</div>
            </Reveal>
          )}
        </div>
      </section>);

  }

  function Writing() {
    const [open, setOpen] = useState(false);
    const journal = D.publications.journal;
    const conference = D.publications.conference;
    return (
      <section id="writing" className="pf-section">
        <SectionHead
          kicker="Writing & Awards"
          title="Peer-reviewed"
          accent="work."
          aside={`${journal.length}J · ${conference.length}C · ${D.publications.awards.length}A`} />
        <Reveal>
          <div className="pf-pub-block">
            <div className="pf-pub-hd">
              Journal Articles
              <span className="pf-pub-count">{journal.length}</span>
            </div>
            <ul className="pf-pub-list">
              {journal.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="pf-pub-block">
            <div className="pf-pub-hd">
              Conference Proceedings
              <button className="pf-pub-toggle" onClick={() => setOpen((o) => !o)}>
                {open ? '— Show less' : `+ Show all (${conference.length})`}
              </button>
            </div>
            <ul className="pf-pub-list">
              {(open ? conference : conference.slice(0, 3)).map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={160}>
          <div className="pf-pub-block">
            <div className="pf-pub-hd">
              Awards & Honours
              <span className="pf-pub-count">{D.publications.awards.length}</span>
            </div>
            <ul className="pf-pub-list pf-awd-list">
              {D.publications.awards.map((a, i) =>
              <li key={i}>
                  <span className="pf-awd-yr" style={{ fontSize: "15px" }}>{a.when}</span>
                  <span>{a.what}</span>
                  <span className="pf-awd-where" style={{ fontSize: "15px" }}>{a.where}</span>
                </li>
              )}
            </ul>
          </div>
        </Reveal>
      </section>);

  }

  function Practice() {
    const groups = D.skills;
    return (
      <section id="stack" className="pf-section">
        <SectionHead kicker="Skills" title="Tools, languages," accent="standards." />
        <Reveal>
          <p className="pf-practice-lede">
            A working list of what I use day-to-day — and a sense of where I focus.
          </p>
        </Reveal>
        <div className="pf-practice">
          <Reveal className="pf-practice-row">
            <div className="pf-practice-k" style={{ fontSize: "20px" }}>Domain</div>
            <div className="pf-practice-v">
              {D.expertise.map((e, i) =>
              <React.Fragment key={e.title}>
                  <span className="pf-practice-tag">{e.title}</span>
                  {i < D.expertise.length - 1 && <span className="pf-practice-sep">·</span>}
                </React.Fragment>
              )}
            </div>
          </Reveal>
          {Object.entries(groups).map(([group, items], gi) =>
          <Reveal key={group} delay={gi * 40} className="pf-practice-row">
              <div className="pf-practice-k" style={{ fontSize: "20px" }}>{group}</div>
              <div className="pf-practice-v">
                {items.map((s, i) =>
              <React.Fragment key={s.name}>
                    <span className="pf-practice-tag">{s.name}</span>
                    {i < items.length - 1 && <span className="pf-practice-sep">·</span>}
                  </React.Fragment>
              )}
              </div>
            </Reveal>
          )}
        </div>
      </section>);

  }

  function CV() {
    return (
      <section id="cv" className="pf-section">
        <SectionHead kicker="Education" title="Schools &" accent="theses." aside={`${D.education.length} degrees`} />
        <div className="pf-edu">
          {D.education.map((e, i) =>
          <Reveal key={i} delay={i * 40} className="pf-edu-row">
              <div className="pf-edu-when" style={{ fontSize: "15px", width: "200px" }}>{e.when}</div>
              <div className="pf-edu-body" style={{ padding: "5px" }}>
                <h3 style={{ margin: "0px 0px 6px", padding: "0px" }}>{e.degree}</h3>
                <div className="pf-edu-school" style={{ fontSize: "18px", padding: "0px" }}>{e.school} <span className="pf-muted">· {e.where}</span></div>
                <div className="pf-edu-thesis"><em style={{ fontSize: "15px", padding: "0px" }}>{e.thesis}</em> · {e.advisor}</div>
              </div>
              <div className="pf-edu-gpa">{e.gpa}</div>
            </Reveal>
          )}
        </div>
        <Reveal className="pf-cv-foot" delay={120}>
          <a href={D.cv} download className="pf-navbar-cta is-active" style={{ width: "160px", textAlign: "center", fontSize: "15px" }}>
            Download CV
            <Icon.download />
          </a>
        </Reveal>
      </section>);

  }

  function Contact() {
    const back = (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
      <section id="contact" className="pf-section">
        <SectionHead kicker="Contact" title="Build something that" accent="matters." />
        <div className="pf-contact">
          <Reveal className="pf-contact-portrait">
            <img src="images/praneet-headshot.png" alt="Praneet Vayalali" />
            <div className="pf-contact-portrait-cap">Karlsruhe · 2026</div>
          </Reveal>
          <Reveal delay={80} className="pf-channels">
            <div className="pf-channels-hd" style={{ fontSize: "20px" }}>Direct channels</div>
            <a href={`mailto:${D.email}`} className="pf-channel">
              <div className="pf-channel-icon"><Icon.mail /></div>
              <div className="pf-channel-body">
                <div className="pf-channel-k" style={{ fontSize: "15px" }}>Email</div>
                <div className="pf-channel-v" style={{ fontSize: "20px" }}>{D.email}</div>
              </div>
            </a>
            <a href={D.linkedin} className="pf-channel">
              <div className="pf-channel-icon"><Icon.linkedin /></div>
              <div className="pf-channel-body">
                <div className="pf-channel-k" style={{ fontSize: "15px" }}>LinkedIn</div>
                <div className="pf-channel-v">linkedin.com/in/praneetvayalali</div>
              </div>
            </a>
            <a href={D.scholar} className="pf-channel">
              <div className="pf-channel-icon"><Icon.scholar /></div>
              <div className="pf-channel-body">
                <div className="pf-channel-k" style={{ fontSize: "15px" }}>Google Scholar</div>
                <div className="pf-channel-v" style={{ fontSize: "20px" }}>scholar.google.com</div>
              </div>
            </a>
            <div className="pf-channel">
              <div className="pf-channel-icon"><Icon.map /></div>
              <div className="pf-channel-body">
                <div className="pf-channel-k" style={{ fontSize: "15px" }}>Location</div>
                <div className="pf-channel-v" style={{ fontSize: "20px" }}>{D.location}</div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="pf-footer">
          <button className="pf-back-top" onClick={back}>
            <span className="pf-back-top-arrow">↑</span>
            <span>Back to top</span>
          </button>
          <div className="pf-footer-meta">
            <span>© {new Date().getFullYear()} Praneet Vayalali</span>
            <a href={D.linkedin}>LinkedIn ↗</a>
            <a href={D.scholar}>Scholar ↗</a>
            <a href={`mailto:${D.email}`}>Email ↗</a>
          </div>
        </div>
      </section>);

  }

  function Now() {
    return (
      <section className="pf-section" style={{ paddingTop: 60, borderBottom: 'none' }}>
        <SectionHead kicker="Now" title="What I'm" accent="up to." />
        <div className="pf-now">
          <Reveal className="pf-now-row">
            <div className="pf-now-k">Building</div>
            <div className="pf-now-v">XR ground control station and engineering flight simulators for the <em>VoloCity</em> and <em>XPro</em> programmes.</div>
          </Reveal>
          <Reveal delay={40} className="pf-now-row">
            <div className="pf-now-k">At</div>
            <div className="pf-now-v"><a href="https://www.volocopter.com">Volocopter Technologies GmbH</a> — since Dec 2021.</div>
          </Reveal>
          <Reveal delay={80} className="pf-now-row">
            <div className="pf-now-k">Lately</div>
            <div className="pf-now-v">Aeroservoelastic stability for notch-filter design. Handling-qualities flight-test support.</div>
          </Reveal>
          <Reveal delay={120} className="pf-now-row">
            <div className="pf-now-k">Learning</div>
            <div className="pf-now-v">PX4 and ROS on the side. EASA MOC-2 revisions.</div>
          </Reveal>
        </div>
      </section>);

  }

  return function App() {
    const [tweaks, setTweak] = (window.useTweaks || ((d) => [d, () => {}]))(TWEAK_DEFAULTS);

    useEffect(() => {
      document.documentElement.style.setProperty('--pf-accent', tweaks.accent);
    }, [tweaks]);

    const TP = window.TweaksPanel;
    const TS = window.TweakSection;
    const TC = window.TweakColor;
    const TT = window.TweakToggle;
    const TSel = window.TweakSelect;

    return (
      <>
        <Navbar />
        <div className="pf-page">
          <Hero lineKey={tweaks.heroLine} />
          <Capabilities />
          <Practice />
          <Work />
          <Research />
          <Writing />
          <CV />
          <Contact />
        </div>

        {TP &&
        <TP title="Tweaks">
            <TS label="Intro line">
              {TSel && <TSel label="Opening" value={tweaks.heroLine}
            options={[
            { label: "Designing how new aircraft fly.", value: "fly" },
            { label: "Making new aircraft flightworthy.", value: "flightworthy" },
            { label: "Helping aircraft earn their wings.", value: "earnWings" },
            { label: "Flight physics for tomorrow.", value: "physics" }]
            }
            onChange={(v) => setTweak('heroLine', v)} />}
            </TS>
            <TS label="Color">
              <TC label="Accent" value={tweaks.accent}
            options={['#c8431f', '#1f5fa8', '#1f7a4a', '#2c2823', '#a02645']}
            onChange={(v) => setTweak('accent', v)} />
            </TS>
          </TP>
        }
      </>);

  };
})();

window.PortfolioApp = Portfolio;