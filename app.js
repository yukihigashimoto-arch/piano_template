(() => {
  "use strict";
  const c = window.SCHOOL_CONFIG;
  if (!c) {
    console.error("SCHOOL_CONFIG が読み込まれていません。");
    return;
  }

  const qs = (s, root = document) => root.querySelector(s);
  const qsa = (s, root = document) => [...root.querySelectorAll(s)];
  const setText = (selector, value) => qsa(`[data-bind="${selector}"]`).forEach(el => el.textContent = value ?? "");
  const setHref = (selector, value) => qsa(`[data-link="${selector}"]`).forEach(el => el.setAttribute("href", value || "#"));

  document.documentElement.style.setProperty("--theme", c.theme.themeColor);
  document.documentElement.style.setProperty("--theme-dark", c.theme.themeDark);
  document.documentElement.style.setProperty("--accent", c.theme.accentColor);
  document.documentElement.style.setProperty("--bg", c.theme.backgroundColor);
  document.documentElement.style.setProperty("--text", c.theme.textColor);

  document.title = c.school.title;
  const desc = qs('meta[name="description"]');
  if (desc) desc.content = c.school.description;

  setText("schoolName", c.school.name);
  setText("schoolNameShort", c.school.shortName);
  setText("heroEyebrow", c.hero.eyebrow);
  setText("heroTitle", c.hero.title);
  setText("heroLead", c.hero.lead);
  setText("heroBottomText", c.hero.bottomText);
  setText("aboutTitle", c.about.title);
  setText("aboutCatch", c.about.catch);
  setText("aboutText", c.about.text);
  setText("featureHeading", c.feature.heading);
  setText("teacherHeading", c.teacher.heading);
  setText("teacherCatch", c.teacher.catch);
  setText("teacherMessage", c.teacher.message);
  setText("teacherName", c.teacher.name);
  setText("teacherCareerHeading", c.teacher.careerHeading || "経歴");
  setText("courseHeading", c.course.heading);
  setText("courseNote", c.course.note);
  setText("trialHeading", c.trial.heading);
  setText("trialMiniText", c.trial.miniText);
  setText("pcQrText", c.pcQr?.text || "スマートフォンで\nアクセスはこちら");
  setText("pcQrLabel", c.pcQr?.label || "access with smartphone");
  setText("contactLead", c.contact.lead);
  setText("primaryCtaLabel", c.contact.primary.label);
  setText("secondaryCtaLabel", c.contact.secondary.label);
  setText("instagramText", c.contact.instagram.text);
  setText("address", c.access.address);
  setText("accessText", c.access.accessText);
  setText("lessonHours", c.access.lessonHours);

  setHref("primaryCta", c.contact.primary.url);
  setHref("secondaryCta", c.contact.secondary.url);
  setHref("instagram", c.contact.instagram.url);

  const renderPcQr = () => {
    const canvas = qs("#pcQrCanvas");
    const url = c.pcQr?.url || "";
    if (!canvas || !url || !window.LocalQRCodeMatrix || !window.LocalQRErrorCorrectLevel) return;

    const qr = new window.LocalQRCodeMatrix(0, window.LocalQRErrorCorrectLevel.M);
    qr.addData(url);
    qr.make();

    const count = qr.getModuleCount();
    const quiet = 4;
    const total = count + quiet * 2;
    const cssSize = 112;
    const ratio = Math.max(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(cssSize * ratio);
    canvas.height = Math.round(cssSize * ratio);
    canvas.style.width = `${cssSize}px`;
    canvas.style.height = `${cssSize}px`;

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cell = canvas.width / total;
    ctx.fillStyle = "#000000";
    for (let row = 0; row < count; row++) {
      for (let col = 0; col < count; col++) {
        if (!qr.isDark(row, col)) continue;
        const x0 = Math.round((col + quiet) * cell);
        const y0 = Math.round((row + quiet) * cell);
        const x1 = Math.round((col + quiet + 1) * cell);
        const y1 = Math.round((row + quiet + 1) * cell);
        ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
      }
    }
  };

  renderPcQr();

  const imageMap = {
    hero: c.images.hero,
    about: c.images.about,
    teacher: c.images.teacher
  };
  Object.entries(imageMap).forEach(([key, src]) => {
    const el = qs(`[data-img="${key}"]`);
    if (el && src) el.src = src;
  });

  const navMarkup = c.nav.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");
  qs("#desktopNav").innerHTML = navMarkup;
  qs("#footerNav").innerHTML = navMarkup;

  const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
  const nl2br = (value = "") => escapeHtml(value).replace(/\n/g, '<br>');

  const renderNews = (items = [], profileUrl = "") => {
    const limited = items.slice(0, c.news?.maxItems || 3);
    qs("#newsList").innerHTML = limited.map(item => `
      <a class="news-item" href="${escapeHtml(item.url || profileUrl || '#')}" target="_blank" rel="noopener noreferrer">
        <time class="news-date">${escapeHtml(item.date || '')}</time>
        <div class="news-body"><span class="news-category">${escapeHtml(item.category || 'note')}</span><p class="news-title">${escapeHtml(item.title || '')}</p></div>
        <span class="news-arrow">→</span>
      </a>`).join("");

    qsa("[data-note-all]").forEach(el => {
      el.href = profileUrl || c.news?.profileUrl || "https://note.com/";
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });
  };

  const formatNoteDate = (value = "") => {
    const d = new Date(value.replace(" ", "T") + (value.includes("T") ? "" : "Z"));
    if (Number.isNaN(d.getTime())) return value.slice(0, 10).replaceAll("-", ".");
    return new Intl.DateTimeFormat("ja-JP", {
      timeZone: "Asia/Tokyo",
      year: "numeric", month: "2-digit", day: "2-digit"
    }).format(d).replaceAll("/", ".");
  };

  const loadNoteNews = async () => {
    const feedUrl = c.news?.feedUrl || "";
    const profileUrl = c.news?.profileUrl || "https://note.com/";

    if (!feedUrl || feedUrl.includes("YOUR_NOTE_ID")) {
      qs("#newsList").innerHTML = `<p class="news-empty">school-config.js にnoteのURLを設定すると、最新記事がここに表示されます。</p>`;
      qsa("[data-note-all]").forEach(el => el.href = profileUrl);
      return;
    }

    try {
      const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
      const res = await fetch(endpoint, { cache: "no-store" });
      if (!res.ok) throw new Error(`NEWS HTTP ${res.status}`);
      const payload = await res.json();
      if (payload.status !== "ok") throw new Error(payload.message || "RSS conversion failed");

      const items = (payload.items || []).map(item => ({
        date: formatNoteDate(item.pubDate || ""),
        category: "note",
        title: item.title || "",
        url: item.link || profileUrl
      }));
      renderNews(items, profileUrl);
    } catch (error) {
      console.warn("note NEWSを読み込めませんでした。", error);
      qs("#newsList").innerHTML = `<p class="news-empty">NEWSを読み込めませんでした。<a href="${escapeHtml(profileUrl)}" target="_blank" rel="noopener noreferrer">noteを見る →</a></p>`;
      qsa("[data-note-all]").forEach(el => el.href = profileUrl);
    }
  };

  loadNoteNews();

  const careerItems = Array.isArray(c.teacher.career) ? c.teacher.career : [];
  const careerArea = qs("#teacherCareer");
  const careerList = qs("#teacherCareerList");
  if (careerArea && careerList) {
    if (careerItems.length) {
      careerList.innerHTML = careerItems.map(item => `
        <div class="teacher-career__item">
          <span class="teacher-career__year">${escapeHtml(item.year || '')}</span>
          <span class="teacher-career__detail">${escapeHtml(item.detail || '')}</span>
        </div>`).join("");
    } else {
      careerArea.hidden = true;
    }
  }

  qs("#features").innerHTML = c.feature.items.map((item, i) => `
    <article class="feature-item">
      <div class="feature-item__image"><img src="${c.images.features?.[i] || './feature-1.svg'}" alt="${item.title}"></div>
      <span class="feature-item__index">FEATURE ${String(i + 1).padStart(2, '0')}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>`).join("");

  if (c.featuredPlan?.enabled) {
    qs('#featuredPlan').innerHTML = `
      <article class="featured-plan">
        <div class="featured-plan__badge">${nl2br(c.featuredPlan.badge || '')}</div>
        <div class="featured-plan__side">${escapeHtml(c.featuredPlan.sideLabel || '')}</div>
        <h3 class="featured-plan__title"><span>${escapeHtml(c.featuredPlan.title || '')}</span></h3>
        <div class="featured-plan__main">
          <div class="featured-plan__label">${escapeHtml(c.featuredPlan.feeLabel || '')}</div>
          <div class="featured-plan__price">${escapeHtml(c.featuredPlan.price || '')}<small>${escapeHtml(c.featuredPlan.priceUnit || '')}</small></div>
          <div class="featured-plan__tax">${nl2br(c.featuredPlan.taxText || '')}</div>
        </div>
        <p class="featured-plan__note">${nl2br(c.featuredPlan.note || '')}</p>
      </article>`;
  } else {
    qs('#featuredPlan').innerHTML = '';
  }

  qs("#courses").innerHTML = c.course.items.map(item => `
    <article class="course-card">
      <span class="course-card__tag">${item.tag || ''}</span>
      <h3>${item.name}</h3>
      <p class="course-price">${item.price} <small>${item.unit || ''}</small></p>
      <p class="course-desc">${item.text || ''}</p>
    </article>`).join("");

  qs("#trialSteps").innerHTML = c.trial.steps.map((item, i) => `
    <div class="step"><span class="step__number">${String(i + 1).padStart(2, '0')}</span><div><h3>${item.title}</h3><p>${item.text}</p></div></div>`).join("");

  qs("#faqList").innerHTML = c.faq.map((item, i) => `
    <div class="faq-item">
      <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-${i}"><span>${item.q}</span><span>＋</span></button>
      <div class="faq-answer" id="faq-${i}"><div><p>${item.a}</p></div></div>
    </div>`).join("");

  qsa(".faq-question").forEach(btn => btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    item.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", item.classList.contains("is-open") ? "true" : "false");
  }));

  const map = qs("#mapArea");
  if (c.access.mapEmbedUrl) {
    const iframe = document.createElement("iframe");
    iframe.src = c.access.mapEmbedUrl;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.title = `${c.school.name} 地図`;
    map.appendChild(iframe);
  } else {
    map.innerHTML = `<div class="map-placeholder">MAP<br><small>school.config.js の mapEmbedUrl に<br>Google Maps の埋め込みURLを設定してください。</small></div>`;
  }

  qs("#year").textContent = new Date().getFullYear();
})();
