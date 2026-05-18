/* ============================================================
   HOME.JS — Landing Page Interactivity
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const { injectNavbar, injectFooter, initReveal, typeText, initParticles, animateCounter } = window.PortfolioUtils;

  // Inject shared components (root level — no prefix needed)
  injectNavbar('');
  injectFooter('');
  initReveal();

  // ── Particle canvas ──────────────────────────────────────────
  initParticles('hero-canvas');

  // ── Typing effect ─────────────────────────────────────────── 
  const typedEl = document.getElementById('role-typed');
  if (typedEl) {
    typeText(typedEl, [
      'AI systems',
      'ML pipelines',
      'RAG applications',
      'intelligent bots',
      'GenAI solutions',
      'smart APIs',
    ], 75, 2000);
  }

  // ── Animated counters ─────────────────────────────────────── 
  // Hero metric cards
  const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target.querySelector('.metric-num');
        if (el && el.dataset.target) {
          animateCounter(el, parseInt(el.dataset.target), 1200, el.dataset.suffix || '');
        }
        metricObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.metric-card').forEach(c => metricObserver.observe(c));

  // Stats strip counters
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const numEl = e.target.querySelector('.stat-num');
        if (numEl && numEl.dataset.target) {
          animateCounter(numEl, parseInt(numEl.dataset.target), 1500);
        }
        statObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-item').forEach(c => statObserver.observe(c));

  // ── Terminal typewriter ────────────────────────────────────── 
  const lines = document.querySelectorAll('.t-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateX(-10px)';
    line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateX(0)';
    }, 400 + i * 200);
  });

  // ── Smooth active nav link ─────────────────────────────────── 
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === 'index.html' || a.getAttribute('href') === '') {
      a.classList.add('active');
    }
  });
});
