// Runs inside the page. Deterministic: every frame is a pure function of time t (seconds).
(() => {
  const scenes = [...document.querySelectorAll('.scene')].map((el) => ({
    el, start: +el.dataset.start, dur: +el.dataset.dur,
    anims: [...el.querySelectorAll('[data-at]')], counts: [...el.querySelectorAll('[data-count]')],
    seq: el.querySelector('img[data-frames]'), zoom: el.querySelector('img[data-zoom]'),
    blobs: [...el.querySelectorAll('.blob')],
  }));
  const total = scenes.length ? scenes[scenes.length - 1].start + scenes[scenes.length - 1].dur : 0;
  const bar = document.querySelector('.progress i');
  const brand = document.querySelector('.brandbar');
  const clamp = (x) => Math.max(0, Math.min(1, x));
  const easeOut = (p) => 1 - (1 - p) ** 3;
  const easeInOut = (p) => (p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2);
  const FADE = 0.28;

  window.__seek = async (t) => {
    const waits = [];
    scenes.forEach((s, i) => {
      const local = t - s.start;
      const last = i === scenes.length - 1;
      const on = local >= 0 && (local < s.dur || last);
      s.el.style.display = on ? 'flex' : 'none';
      if (!on) return;
      // crossfade: the incoming scene fades in over the previous one
      s.el.style.opacity = i === 0 ? 1 : clamp(local / FADE);
      s.el.style.zIndex = 2;
      if (brand) brand.className = 'brandbar ' + (s.el.classList.contains('dark') ? 'on-dark' : s.el.classList.contains('accent') ? 'on-accent' : 'on-light');
      for (const a of s.anims) {
        const p = easeOut(clamp((local - +a.dataset.at) / 0.55));
        a.style.opacity = p;
        a.style.transform = `translateY(${(1 - p) * 70}px)`;
      }
      for (const c of s.counts) {
        const target = +c.dataset.count;
        const p = easeOut(clamp((local - +(c.dataset.countAt || 0.2)) / 0.9));
        c.textContent = (c.dataset.prefix || '') + Math.round(target * p).toLocaleString(c.dataset.locale || 'ru').replace(/ | /g, ' ') + (c.dataset.suffix || '');
      }
      s.blobs.forEach((b, k) => {
        b.style.transform = `translate(${Math.sin(t * 0.5 + k * 2) * 46}px, ${Math.cos(t * 0.4 + k) * 46}px)`;
      });
      if (s.zoom) {
        const p = easeInOut(clamp((local - 0.5) / Math.max(0.1, s.dur - 1)));
        const travel = Math.max(0, s.zoom.offsetHeight - s.zoom.parentElement.clientHeight) * (+s.zoom.dataset.zoom || 0);
        s.zoom.style.transform = `translateY(${-travel * p}px)`;
      }
      if (s.seq) {
        const n = +s.seq.dataset.frames;
        const idx = Math.min(n - 1, Math.max(0, Math.floor(local * +s.seq.dataset.fps)));
        const src = s.seq.dataset.pattern.replace('%d', String(idx + 1).padStart(5, '0'));
        if (s.seq.dataset.cur !== src) { s.seq.dataset.cur = src; s.seq.src = src; waits.push(s.seq.decode().catch(() => {})); }
      }
    });
    // keep the outgoing scene visible under the incoming one during the crossfade
    scenes.forEach((s, i) => {
      const next = scenes[i + 1];
      if (next && t >= next.start && t < next.start + FADE) { s.el.style.display = 'flex'; s.el.style.opacity = 1; s.el.style.zIndex = 1; }
    });
    if (bar) bar.style.width = `${clamp(t / total) * 100}%`;
    await Promise.all(waits);
  };

  // Shrink text per scene until it fits the safe area; report the smallest font used.
  window.__fit = (minScale) => scenes.map((s, i) => {
    s.el.style.display = 'flex';
    const content = s.el.querySelector('.content');
    const media = s.el.classList.contains('media');
    let k = 1;
    const over = () => (media ? content.offsetHeight > 560 : content.scrollHeight > content.clientHeight + 1) || content.scrollWidth > content.clientWidth + 1;
    while (over() && k > minScale) { k = Math.round((k - 0.03) * 100) / 100; s.el.style.setProperty('--s', k); }
    const sizes = [...content.querySelectorAll('h1,h2,p,li,.kicker,.link,.button,.unit')].map((e) => parseFloat(getComputedStyle(e).fontSize));
    const r = { scene: i + 1, scale: k, overflow: over(), minFont: sizes.length ? Math.min(...sizes) : null };
    s.el.style.display = 'none';
    return r;
  });
})();
