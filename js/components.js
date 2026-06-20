/* ============================================================
   COMPONENTS.JS — Shared Navbar, Footer, and Utilities
   ============================================================ */

/* ── Unified Configuration ───────────────────────────────────── */
const CONFIG = {
  socials: {
    github: 'https://github.com/rajveersingh11',
    linkedin: 'https://www.linkedin.com/in/rajveer-singh-403a5824a',
    email: 'rajveersinghshekhawat3234@gmail.com',
    phone: '+919521324077'
  }
};

// Immediate IIFE to set theme class on document element and prevent flashes
(function() {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    document.documentElement.classList.add('light-theme');
  } else {
    document.documentElement.classList.remove('light-theme');
  }
})();

const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Primary Navigation Links (max 6 items for clean scanning)
const primaryNavLinks = [
  { href: '../index.html',          label: 'Home',         page: 'index.html' },
  { href: 'projects.html',          label: 'Projects',     page: 'projects.html' },
  { href: 'research.html',          label: 'Research',     page: 'research.html' },
  { href: 'about.html',             label: 'About',        page: 'about.html' },
  { href: 'blogs.html',             label: 'Blog',         page: 'blogs.html' },
];

// Secondary dropdown links
const secondaryNavLinks = [
  { href: 'academics.html',         label: 'Academics',    page: 'academics.html' },
  { href: 'achievements.html',      label: 'Achievements', page: 'achievements.html' },
  { href: 'feedbacks.html',         label: 'Feedback',     page: 'feedbacks.html' },
  { href: 'game.html',              label: 'AI Quiz',      page: 'game.html' },
];

const contactLink = { href: 'contact.html', label: 'Contact', page: 'contact.html' };

/* ── Inject Navbar ───────────────────────────────────────────── */
function injectNavbar(rootPrefix = '../') {
  // Prepend skip-to-content link for accessibility
  const skipLink = document.createElement('a');
  skipLink.className = 'skip-link';
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to content';
  document.body.insertAdjacentElement('afterbegin', skipLink);

  const isHome = currentPage === 'index.html' || currentPage === '';

  // Generate links for desktop navbar
  const primaryHTML = primaryNavLinks.map(l => {
    let href = l.href;
    if (rootPrefix === '') {
      href = href.replace('../', '');
    } else if (rootPrefix === '../' && !href.startsWith('../')) {
      href = rootPrefix + href;
    }
    const isActive = currentPage === l.page ? 'active' : '';
    const ariaCurrent = currentPage === l.page ? 'aria-current="page"' : '';
    return `<a href="${href}" class="${isActive}" ${ariaCurrent} aria-label="${l.label}">${l.label}</a>`;
  }).join('');

  const secondaryHTML = secondaryNavLinks.map(l => {
    let href = l.href;
    if (rootPrefix === '') {
      href = href.replace('../', '');
    } else if (rootPrefix === '../' && !href.startsWith('../')) {
      href = rootPrefix + href;
    }
    const isActive = currentPage === l.page ? 'active' : '';
    const ariaCurrent = currentPage === l.page ? 'aria-current="page"' : '';
    return `<a href="${href}" class="${isActive}" ${ariaCurrent} aria-label="${l.label}">${l.label}</a>`;
  }).join('');

  let contactHref = contactLink.href;
  if (rootPrefix === '') {
    contactHref = contactHref.replace('../', '');
  } else if (rootPrefix === '../' && !contactHref.startsWith('../')) {
    contactHref = rootPrefix + contactHref;
  }
  const contactActive = currentPage === contactLink.page ? 'active' : '';
  const contactAria = currentPage === contactLink.page ? 'aria-current="page"' : '';
  const contactCtaHTML = `<a href="${contactHref}" class="${contactActive} nav-cta" ${contactAria} aria-label="${contactLink.label}">${contactLink.label}</a>`;

  const logoHref = isHome ? '#' : `${rootPrefix}index.html`;

  const navbar = document.createElement('nav');
  navbar.className = 'navbar';
  navbar.setAttribute('role', 'navigation');
  navbar.innerHTML = `
    <a href="${logoHref}" class="nav-logo" aria-label="Home">
      RS<span>.</span>ai<span class="cursor"></span>
    </a>
    <div class="nav-links" role="menubar">
      ${primaryHTML}
      <div class="nav-dropdown">
        <button class="dropdown-trigger" aria-haspopup="true" aria-expanded="false" aria-label="More links dropdown">
          More 
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="1 1 5 5 9 1" />
          </svg>
        </button>
        <div class="dropdown-menu" role="menu">
          ${secondaryHTML}
        </div>
      </div>
      ${contactCtaHTML}
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
        <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>
    </div>
    <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-menu">
      <span></span><span></span><span></span>
    </button>
  `;
  document.body.insertAdjacentElement('afterbegin', navbar);

  // Generate mobile menu links with structured hierarchy
  const mobilePrimaryLinks = primaryNavLinks.map(l => {
    let href = l.href;
    if (rootPrefix === '') href = href.replace('../', '');
    else if (rootPrefix === '../' && !href.startsWith('../')) href = rootPrefix + href;
    const isActive = currentPage === l.page ? 'active' : '';
    return `<a href="${href}" class="${isActive}">${l.label}</a>`;
  }).join('');

  const mobileSecondaryLinks = secondaryNavLinks.map(l => {
    let href = l.href;
    if (rootPrefix === '') href = href.replace('../', '');
    else if (rootPrefix === '../' && !href.startsWith('../')) href = rootPrefix + href;
    const isActive = currentPage === l.page ? 'active' : '';
    return `<a href="${href}" class="${isActive} mobile-sub-link">${l.label}</a>`;
  }).join('');

  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.id = 'mobile-menu';
  mobileMenu.innerHTML = `
    ${mobilePrimaryLinks}
    <div class="mobile-divider"></div>
    <span class="mobile-group-title">More</span>
    ${mobileSecondaryLinks}
    <div class="mobile-divider"></div>
    ${contactCtaHTML}
  `;
  document.body.insertAdjacentElement('afterbegin', mobileMenu);

  // Hamburger toggle & mobile menu state
  const hamburger = document.getElementById('hamburger');
  const mMenu = document.getElementById('mobile-menu');

  function openMobileMenu() {
    mMenu.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    // Focus first link in mobile menu for keyboard accessibility
    const firstLink = mMenu.querySelector('a');
    if (firstLink) firstLink.focus();
    document.addEventListener('keydown', handleFocusTrap);
  }

  function closeMobileMenu() {
    mMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', handleFocusTrap);
    hamburger.focus();
  }

  // Focus trap for mobile menu
  function handleFocusTrap(e) {
    if (e.key !== 'Tab') return;
    const focusable = mMenu.querySelectorAll('a, button');
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mMenu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close mobile menu on link click
  mMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Navbar scrolled class
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Handle Theme Toggle action
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      document.documentElement.classList.toggle('light-theme', isLight);
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  // Accessibility: Handle dropdown aria attributes on hover/focus
  const dropdownContainer = navbar.querySelector('.nav-dropdown');
  const dropdownTrigger = navbar.querySelector('.dropdown-trigger');
  if (dropdownContainer && dropdownTrigger) {
    const showMenu = () => dropdownTrigger.setAttribute('aria-expanded', 'true');
    const hideMenu = () => dropdownTrigger.setAttribute('aria-expanded', 'false');
    dropdownContainer.addEventListener('mouseenter', showMenu);
    dropdownContainer.addEventListener('mouseleave', hideMenu);
    dropdownContainer.addEventListener('focusin', showMenu);
    dropdownContainer.addEventListener('focusout', (e) => {
      if (!dropdownContainer.contains(e.relatedTarget)) {
        hideMenu();
      }
    });
  }
}

/* ── Inject Footer ───────────────────────────────────────────── */
function injectFooter(rootPrefix = '../') {
  const year = new Date().getFullYear();
  const footer = document.createElement('footer');
  footer.setAttribute('role', 'contentinfo');
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="nav-logo">RS<span>.</span>ai</div>
        <p>AI & Python Engineer building intelligent automation tools, generative AI apps, and scalable ML pipelines. Based in Jaipur, India.</p>
        <div class="footer-social">
          <a href="${CONFIG.socials.linkedin}" target="_blank" rel="noopener" class="social-btn" aria-label="LinkedIn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="${CONFIG.socials.github}" target="_blank" rel="noopener" class="social-btn" aria-label="GitHub">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="mailto:${CONFIG.socials.email}" class="social-btn" aria-label="Email">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </a>
          <a href="tel:${CONFIG.socials.phone}" class="social-btn" aria-label="Phone">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Navigation</h4>
        <ul>
          <li><a href="${rootPrefix}index.html">Home</a></li>
          <li><a href="${rootPrefix}pages/projects.html">Projects</a></li>
          <li><a href="${rootPrefix}pages/research.html">Research</a></li>
          <li><a href="${rootPrefix}pages/about.html">About</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>More</h4>
        <ul>
          <li><a href="${rootPrefix}pages/academics.html">Academics</a></li>
          <li><a href="${rootPrefix}pages/achievements.html">Achievements</a></li>
          <li><a href="${rootPrefix}pages/blogs.html">Blogs</a></li>
          <li><a href="${rootPrefix}pages/feedbacks.html">Feedback</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="${rootPrefix}pages/contact.html">Get In Touch</a></li>
          <li><a href="mailto:${CONFIG.socials.email}">Send Email</a></li>
          <li><a href="tel:${CONFIG.socials.phone}">+91-95213-24077</a></li>
          <li><a href="${rootPrefix}resume.pdf" target="_blank">Download CV</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${year} <span>Rajveer Singh</span>. Crafted with precision & passion.</p>
      <p>Built with <span>HTML</span>, <span>CSS</span> & <span>JavaScript</span></p>
    </div>
  `;
  document.body.appendChild(footer);
}

/* ── Reveal on Scroll ────────────────────────────────────────── */
function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

/* ── Typing Effect ───────────────────────────────────────────── */
function typeText(el, texts, speed = 80, pause = 2200) {
  let ti = 0, ci = 0, deleting = false;
  function tick() {
    const text = texts[ti];
    el.textContent = deleting ? text.slice(0, ci--) : text.slice(0, ci++);
    if (!deleting && ci > text.length) { deleting = true; setTimeout(tick, pause); return; }
    if (deleting && ci < 0) { deleting = false; ti = (ti + 1) % texts.length; ci = 0; }
    setTimeout(tick, deleting ? speed / 2 : speed);
  }
  tick();
}

/* ── Particle Canvas with IntersectionObserver ────────────────── */
function initParticles(canvasId) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId = null;
  const N = 40; // Capped at 40 for optimal performance (O(n^2) connections search)

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 1.5 + 0.5;
      this.a = Math.random() * 0.6 + 0.2;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = document.documentElement.classList.contains('light-theme') 
        ? `rgba(0,138,163,${this.a})`
        : `rgba(0,212,255,${this.a})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: N }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const strokeColor = document.documentElement.classList.contains('light-theme')
            ? `rgba(0,138,163,${0.12 * (1 - dist / 120)})`
            : `rgba(0,212,255,${0.15 * (1 - dist / 120)})`;
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animId = requestAnimationFrame(loop);
  }

  init();
  window.addEventListener('resize', resize);

  // IntersectionObserver to pause particles animation loop when offscreen
  const canvasObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        if (!animId) loop();
      } else {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      }
    });
  }, { threshold: 0.05 });

  canvasObserver.observe(canvas);

  return () => {
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener('resize', resize);
    canvasObserver.disconnect();
  };
}

/* ── Counter Animation ───────────────────────────────────────── */
function animateCounter(el, target, duration = 1500, suffix = '') {
  let startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    
    // For small numbers (< 10), interpolate smoothly with one decimal place
    if (target < 10) {
      el.textContent = (eased * target).toFixed(1).replace('.0', '') + suffix;
    } else {
      el.textContent = Math.floor(eased * target) + suffix;
    }
    
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ── Card Spotlight Cursor Effect ────────────────────────────── */
function initCardSpotlight() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  // Use event delegation for maximum performance on mousemove
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.card, .featured-card, .project-card, .research-item, .cert-card, .feedback-card');
    if (card) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    }
  });
}

/* ── Toast Notification ──────────────────────────────────────── */
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const colors = { 
    info: 'var(--accent)', 
    success: 'var(--accent2)', 
    error: 'var(--danger)', 
    warning: 'var(--warning)' 
  };
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
    background: var(--surface2); border: 1px solid ${colors[type]};
    color: var(--text); padding: 1rem 1.5rem; border-radius: 8px;
    font-family: var(--font-mono); font-size: 0.85rem;
    box-shadow: var(--shadow2);
    transform: translateX(120%); transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
    max-width: 320px; line-height: 1.5;
    border-left: 4px solid ${colors[type]};
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.style.transform = 'translateX(0)', 10);
  setTimeout(() => {
    toast.style.transform = 'translateX(120%)';
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

/* ── Centralized Page Initializer ────────────────────────────── */
function initPage(rootPrefix = '../', callback = null) {
  document.addEventListener('DOMContentLoaded', () => {
    injectNavbar(rootPrefix);
    injectFooter(rootPrefix);
    initReveal();
    initCardSpotlight();
    
    if (callback) callback();
  });
}

/* ── Export ──────────────────────────────────────────────────── */
window.PortfolioUtils = {
  CONFIG,
  injectNavbar, 
  injectFooter, 
  initReveal,
  typeText, 
  initParticles, 
  animateCounter, 
  showToast,
  initCardSpotlight,
  initPage
};
