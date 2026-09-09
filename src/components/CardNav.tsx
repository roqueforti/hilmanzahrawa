// @ts-nocheck
'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import './CardNav.css';

const CardNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
  buttonBgColor,
  buttonTextColor,
  onCtaClick
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        contentEl.offsetHeight;

        const topBar = 64;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 270;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 64, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor, border: '1px solid var(--border-light)' }}>
        <div className="card-nav-top">
          <div className="logo-container">
            {typeof logo === 'string' && !logo.startsWith('http') && !logo.startsWith('/') ? (
              <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ fontWeight: 900, fontSize: '1.05rem', letterSpacing: '-0.02em', color: menuColor || 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                  {logo}
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(0, 175, 185, 0.12)', padding: '0.25rem 0.75rem', borderRadius: '50px', border: '1px solid rgba(0, 175, 185, 0.35)', backdropFilter: 'blur(10px)' }} className="hide-on-mobile">
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--vibrant-coral, #f07167)', boxShadow: '0 0 8px #f07167' }} />
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--cerulean, #0081a7)', letterSpacing: '0.06em', fontFamily: 'var(--font-mono, monospace)' }}>OPEN FOR PROJECTS 🌊</span>
                </div>
              </a>
            ) : (
              <img src={logo} alt={logoAlt} className="logo" />
            )}
          </div>

          {/* DIRECT DESKTOP NAVIGATION: Work · Services · Case Studies · About · Articles · Contact */}
          <nav className="card-nav-desktop-links" aria-label="Main Navigation">
            <a href="#work" className="desktop-nav-link">Work</a>
            <a href="#expertise" className="desktop-nav-link">Services</a>
            <a href="#case-study" className="desktop-nav-link">Case Studies</a>
            <a href="#creative" className="desktop-nav-link">Creative</a>
            <a href="#thoughts" className="desktop-nav-link">Articles</a>
            <a href="#about" className="desktop-nav-link">About</a>
            <a href="#contact" className="desktop-nav-link">Contact</a>
          </nav>

          <div className="card-nav-right-actions">
            <button
              type="button"
              className="card-nav-cta-button"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
              onClick={onCtaClick}
            >
              Let's Talk ↗
            </button>

            <div
              className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
              onClick={toggleMenu}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleMenu();
                }
              }}
              role="button"
              aria-label={isExpanded ? 'Close menu' : 'Open menu'}
              aria-expanded={isExpanded}
              tabIndex={0}
              style={{ color: menuColor || '#000' }}
            >
              <div className="hamburger-line" />
              <div className="hamburger-line" />
            </div>
          </div>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a key={`${lnk.label}-${i}`} className="nav-card-link" href={lnk.href} aria-label={lnk.ariaLabel} style={{ color: item.textColor }}>
                    <ArrowUpRight size={16} className="nav-card-link-icon" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
