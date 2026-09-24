(function () {
  const STORAGE_KEY = "lang";
  const toggle = document.getElementById("lang-toggle");
  const i18nNodes = document.querySelectorAll("[data-es][data-en]");

  function detectDefaultLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored;
    return navigator.language && navigator.language.toLowerCase().startsWith("en") ? "en" : "es";
  }

  function applyLang(lang) {
    i18nNodes.forEach((node) => {
      node.textContent = node.getAttribute("data-" + lang);
    });
    document.documentElement.lang = lang;
    if (toggle) toggle.textContent = lang === "es" ? "EN" : "ES";
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  let currentLang = detectDefaultLang();
  applyLang(currentLang);

  if (toggle) {
    toggle.addEventListener("click", () => {
      currentLang = currentLang === "es" ? "en" : "es";
      applyLang(currentLang);
    });
  }

  document.querySelectorAll(".video-embed[data-yt-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-yt-id");
      const iframe = document.createElement("iframe");
      iframe.className = "video-embed";
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1";
      iframe.title = "Video de casamiento";
      iframe.allow = "autoplay; encrypted-media";
      iframe.allowFullscreen = true;
      btn.replaceWith(iframe);
    });
  });

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }
})();
