/* ============================================================
   FEEDBACKS.JS
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const { injectNavbar, injectFooter, initReveal, animateCounter } = window.PortfolioUtils;
  injectNavbar('../');
  injectFooter('../');
  initReveal();

  // Animate client count counter
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target.querySelector('[data-target]');
        if (el) animateCounter(el, parseInt(el.dataset.target), 1400);
        statObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.fb-stat').forEach(s => statObserver.observe(s));

  // Animate progress bars
  document.querySelectorAll('.progress-fill').forEach(f => f.style.width = '0%');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = e.target;
        setTimeout(() => fill.style.width = (fill.dataset.width || 0) + '%', 150);
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.progress-fill').forEach(f => barObserver.observe(f));
});
