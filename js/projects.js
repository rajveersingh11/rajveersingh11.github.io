/* ============================================================
   PROJECTS.JS — Search, Filter, and Reveal
   ============================================================ */
PortfolioUtils.initPage("../", () => {
  const grid = document.getElementById("projects-grid");
  const noResults = document.getElementById("no-results");
  const countEl = document.getElementById("count-num");
  const searchEl = document.getElementById("project-search");
  const clearBtn = document.getElementById("clear-search");

  let activeFilter = "all";
  let activeStatus = "all";
  let searchQuery = "";

  /* ── Filter helper ──────────────────────────────────────── */
  function applyFilters() {
    const cards = grid.querySelectorAll(".project-card");
    let visible = 0;

    cards.forEach((card) => {
      const tags = card.dataset.tags || "";
      const status = card.dataset.status || "";
      const title = card.dataset.title || "";
      const langs = card.dataset.langs || "";

      const matchFilter =
        activeFilter === "all" ||
        tags
          .split(",")
          .map((t) => t.trim().toLowerCase())
          .includes(activeFilter.toLowerCase());
      const matchStatus = activeStatus === "all" || status === activeStatus;
      const matchSearch =
        !searchQuery ||
        title.toLowerCase().includes(searchQuery) ||
        langs.toLowerCase().includes(searchQuery) ||
        tags.toLowerCase().includes(searchQuery);

      if (matchFilter && matchStatus && matchSearch) {
        card.classList.remove("hidden");
        visible++;
      } else {
        card.classList.add("hidden");
      }
    });

    countEl.textContent = visible;
    noResults.style.display = visible === 0 ? "block" : "none";
    grid.style.display = visible === 0 ? "none" : "grid";
  }

  /* ── Tag filter buttons ─────────────────────────────────── */
  document.querySelectorAll(".filter-btn:not(.status-btn)").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn:not(.status-btn)")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  /* ── Status buttons ─────────────────────────────────────── */
  document.querySelectorAll(".status-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".status-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeStatus = btn.dataset.status;
      applyFilters();
    });
  });

  /* ── Search input ───────────────────────────────────────── */
  searchEl.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    applyFilters();
  });

  /* ── Clear search ───────────────────────────────────────── */
  clearBtn.addEventListener("click", () => {
    searchEl.value = "";
    searchQuery = "";
    activeFilter = "all";
    activeStatus = "all";
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    document.querySelector('[data-filter="all"]').classList.add("active");
    document
      .querySelector('.status-btn[data-status="all"]')
      .classList.add("active");
    applyFilters();
  });
});
