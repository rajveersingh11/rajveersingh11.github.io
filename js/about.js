/* ============================================================
   ABOUT.JS
   ============================================================ */
PortfolioUtils.initPage('../', () => {

  // ── Animate progress bars on visibility ─────────────────────
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = e.target.querySelector('.progress-fill');
        if (fill) {
          const w = fill.dataset.width || '0';
          setTimeout(() => fill.style.width = w + '%', 100);
        }
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.prof-item').forEach(el => barObserver.observe(el));

  // ── Initialise all progress bars at 0 ───────────────────────
  document.querySelectorAll('.progress-fill').forEach(f => f.style.width = '0%');
});
