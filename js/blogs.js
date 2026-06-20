/* blogs.js */
PortfolioUtils.initPage("../", () => {
  // ── Category filter ──────────────────────────────────────────
  const grid = document.getElementById("blogs-grid");
  const noBlogsEl = document.getElementById("no-blogs");
  const featured = document.querySelector(".blog-featured");

  document.querySelectorAll(".blog-filter .filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".blog-filter .filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.cat;

      // Filter grid cards
      let visible = 0;
      grid.querySelectorAll(".blog-card").forEach((card) => {
        const match = cat === "all" || card.dataset.cat === cat;
        card.classList.toggle("hidden", !match);
        if (match) visible++;
      });

      // Featured post
      if (featured) {
        const fmatch = cat === "all" || featured.dataset.cat === cat;
        featured.style.display = fmatch ? "" : "none";
      }

      noBlogsEl.style.display =
        visible === 0 && !(cat === "all") ? "block" : "none";
    });
  });

  // ── Newsletter ────────────────────────────────────────────────
  const nlBtn = document.getElementById("nl-btn");
  const nlInput = document.querySelector(".nl-input");
  if (nlBtn && nlInput) {
    nlBtn.addEventListener("click", () => {
      const email = nlInput.value.trim();
      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRx.test(email)) {
        showToast("Please enter a valid email address.", "error");
        return;
      }
      // In production: integrate with Mailchimp / ConvertKit / EmailJS
      showToast("✓ Subscribed! You'll hear from me soon.", "success");
      nlInput.value = "";
    });
  }
});
