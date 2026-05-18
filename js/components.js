/* ============================================================
   COMPONENTS.JS — Shared Navbar, Footer, and Utilities
   ============================================================ */

/* ── Detect Current Page ─────────────────────────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

const navLinks = [
  { href: '../index.html',          label: 'Home',         page: 'index.html' },
  { href: 'about.html',             label: 'About',        page: 'about.html' },
  { href: 'projects.html',          label: 'Projects',     page: 'projects.html' },
  { href: 'research.html',          label: 'Research',     page: 'research.html' },
  { href: 'academics.html',         label: 'Academics',    page: 'academics.html' },
  { href: 'achievements.html',      label: 'Achievements', page: 'achievements.html' },
  { href: 'blogs.html',             label: 'Blogs',        page: 'blogs.html' },
  { href: 'feedbacks.html',         label: 'Feedback',     page: 'feedbacks.html' },
  { href: 'game.html',              label: 'AI Quiz',      page: 'game.html' },
  { href: 'contact.html',           label: 'Contact',      page: 'contact.html', cta: true },
];

/* ── Inject Navbar ───────────────────────────────────────────── */
function injectNavbar(rootPrefix = '../') {
  const linksHTML = navLinks.map(l => {
    const href = l.href.startsWith('../') && rootPrefix === '' 
      ? l.href.replace('../', '') 
      : l.href.startsWith('../') 
        ? (rootPrefix === '../' ? l.href : l.href.replace('../', ''))
        : l.href;
    const isActive = currentPage === l.page ? 'active' : '';
    const isCta    = l.cta ? 'nav-cta' : '';
    return `<a href="${href}" class="${isActive} ${isCta}" aria-label="${l.label}">${l.label}</a>`;
  }).join('');

  const navbar = document.createElement('nav');
  navbar.className = 'navbar';
  navbar.setAttribute('role', 'navigation');
  navbar.innerHTML = `
    <a href="${rootPrefix}index.html" class="nav-logo" aria-label="Home">
      RS<span>.</span>ai<span class="cursor"></span>
    </a>
    <div class="nav-links" role="menubar">${linksHTML}</div>
    <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  `;
  document.body.insertAdjacentElement('afterbegin', navbar);

  // Mobile menu
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.id = 'mobile-menu';
  mobileMenu.innerHTML = linksHTML;
  document.body.insertAdjacentElement('afterbegin', mobileMenu);

  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const mMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    const open = mMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Close mobile menu on link click
  mMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
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
          <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-btn" aria-label="LinkedIn">in</a>
          <a href="https://github.com"   target="_blank" rel="noopener" class="social-btn" aria-label="GitHub">GH</a>
          <a href="mailto:rajveersinghshekhawat3234@gmail.com" class="social-btn" aria-label="Email">@</a>
          <a href="tel:+919521324077" class="social-btn" aria-label="Phone">☎</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Navigation</h4>
        <ul>
          <li><a href="${rootPrefix}index.html">Home</a></li>
          <li><a href="${rootPrefix}pages/about.html">About</a></li>
          <li><a href="${rootPrefix}pages/projects.html">Projects</a></li>
          <li><a href="${rootPrefix}pages/research.html">Research</a></li>
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
          <li><a href="mailto:rajveersinghshekhawat3234@gmail.com">Send Email</a></li>
          <li><a href="tel:+919521324077">+91-9521324077</a></li>
          <li><a href="#">Download CV</a></li>
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

/* ── Particle Canvas ─────────────────────────────────────────── */
function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;
  const N = 80;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
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
      ctx.fillStyle = `rgba(0,212,255,${this.a})`;
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
          ctx.strokeStyle = `rgba(0,212,255,${0.15 * (1 - dist / 120)})`;
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
  loop();
  window.addEventListener('resize', () => { resize(); });

  return () => cancelAnimationFrame(animId);
}

/* ── Counter Animation ───────────────────────────────────────── */
function animateCounter(el, target, duration = 1500, suffix = '') {
  let start = 0, startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ── Toast Notification ──────────────────────────────────────── */
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const colors = { info: '#00d4ff', success: '#00ff9f', error: '#ff4757', warning: '#ffa502' };
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
    background: #0e1e2e; border: 1px solid ${colors[type]};
    color: #c8dde8; padding: 1rem 1.5rem; border-radius: 8px;
    font-family: 'Share Tech Mono', monospace; font-size: 0.85rem;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
    transform: translateX(120%); transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
    max-width: 320px; line-height: 1.5;
    border-left: 3px solid ${colors[type]};
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.style.transform = 'translateX(0)', 10);
  setTimeout(() => {
    toast.style.transform = 'translateX(120%)';
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

/* ── Export ──────────────────────────────────────────────────── */
window.PortfolioUtils = {
  injectNavbar, injectFooter, initReveal,
  typeText, initParticles, animateCounter, showToast
};
