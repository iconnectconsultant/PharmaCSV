
(function(){
  const $ = (q, el=document) => el.querySelector(q);
  const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));

  // year
  const yEl = $("#year");
  if (yEl) yEl.textContent = String(new Date().getFullYear());

  // ===== Reveal below-fold after first intent =====
  const body = document.body;
  const reveal = () => body.classList.add("revealed");

  // Reveal on scroll a bit
  let revealedOnce = false;
  window.addEventListener("scroll", () => {
    if (revealedOnce) return;
    if (window.scrollY > 40) {
      revealedOnce = true;
      reveal();
    }
  }, { passive:true });

  // Reveal on decision clicks
  $$("[data-reveal='true']").forEach(el => {
    el.addEventListener("click", () => {
      reveal();
    });
  });

  // ===== Tabs =====
  const tabs = $$(".tab");
  const panels = $$(".tabpanel");
  function setTab(name){
    tabs.forEach(t => {
      const active = t.dataset.tab === name;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });
    panels.forEach(p => p.classList.toggle("is-active", p.dataset.panel === name));
  }
  tabs.forEach(t => t.addEventListener("click", () => setTab(t.dataset.tab)));

  // allow jump links to open a tab
  $$("[data-tab]").forEach(a => {
    a.addEventListener("click", () => {
      const tab = a.getAttribute("data-tab");
      if (tab) setTab(tab);
    });
  });

  // ===== Smooth scroll + section highlight =====
  function highlight(target){
    target.classList.add("flash");
    setTimeout(() => target.classList.remove("flash"), 850);
  }

  $$('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      reveal();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", href);
      highlight(target);
    });
  });

  // ===== Trainer modal =====
  const modal = $("#trainerModal");
  const openBtn = $("#openTrainer");
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  };
  const openModal = () => {
    if (!modal) return;
    reveal();
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  };
  if (openBtn) openBtn.addEventListener("click", openModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t.getAttribute && t.getAttribute("data-close") === "true") {
        closeModal();
      }
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
})();
