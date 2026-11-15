// In-page measurements of the ux-clarity checklist: sideways scroll (D1), touch targets (H1, H2), small text (H3),
// primary buttons in the viewport (A2), labels cut or wrapped to three lines (G6).
// Every function takes a Playwright `page`, so the same code can be called from your own Playwright scripts.

export const CODES = { 'target-44': 'T', 'target-24': 'X', 'small-text': 'F', clipped: 'C', 'three-lines': '3', cut: 'E', overflow: 'O' };

export function pageConfig(profile, viewportWidth) {
  return {
    touchTarget: profile['touch-target'],
    minFont: profile['min-font'],
    primary: profile.primary,
    sel: profile.selectors,
    viewportWidth,
  };
}

export async function measureUx(page, config) {
  return page.evaluate((cfg) => {
    const { touchTarget, minFont, sel } = cfg;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const sx = window.scrollX;
    const sy = window.scrollY;
    const marks = [];
    const mark = (kind, r) => marks.push({ kind, rect: { x: Math.round(r.left + sx), y: Math.round(r.top + sy), w: Math.round(r.width), h: Math.round(r.height) } });
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return false;
      if (r.bottom < 0 || r.top > vh || r.right < 0 || r.left > vw) return false;
      const s = getComputedStyle(el);
      return s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0.05;
    };
    const targets = [...document.querySelectorAll('a[href], button, [role="button"], [role="tab"], [role="checkbox"], [role="radio"], [role="switch"], [role="menuitem"], input, select, textarea')].filter(
      (el) => visible(el) && !el.disabled && el.type !== 'hidden',
    );
    // The typed value of a field is never read: it may be a password or personal data. A field is named by its label, name or type.
    const isButtonInput = (el) => el.tagName === 'INPUT' && ['submit', 'button', 'reset'].includes(el.type);
    const fieldName = (el) => el.labels?.[0]?.textContent || el.placeholder || el.getAttribute('name') || `${el.tagName.toLowerCase()}${el.type ? `[${el.type}]` : ''}`;
    const name = (el) => {
      const text = el.getAttribute('aria-label') || (isButtonInput(el) ? el.value : '') || (['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) ? fieldName(el) : el.textContent) || el.tagName;
      return text.trim().replace(/\s+/g, ' ').slice(0, 40);
    };
    const small = [];
    // WCAG 2.5.8: a target under 24 px is acceptable when its 24 × 24 area around the centre does not touch neighbouring targets
    const boxes = [];
    for (const el of targets) {
      let r = el.getBoundingClientRect();
      // visually hidden elements (a "skip to content" link, a native select under a custom one) are not touch targets
      if (r.width <= 2 || r.height <= 2) continue;
      // checkbox, radio and switch: people press the label, so the label is measured
      const role = el.getAttribute('role');
      if ((el.tagName === 'INPUT' && (el.type === 'checkbox' || el.type === 'radio')) || role === 'checkbox' || role === 'radio' || role === 'switch') {
        const label = el.closest('label') ?? (el.id ? document.querySelector(`label[for="${CSS.escape(el.id)}"]`) : null);
        if (label) r = label.getBoundingClientRect();
      }
      // an inline link inside a sentence is the WCAG 2.5.8 exception
      const inline = el.tagName === 'A' && getComputedStyle(el).display === 'inline' && el.parentElement && (el.parentElement.textContent ?? '').trim().length > (el.textContent ?? '').trim().length + 20;
      if (inline) continue;
      const w = Math.max(r.width, 24);
      const h = Math.max(r.height, 24);
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      boxes.push({ el, l: cx - w / 2, t: cy - h / 2, r: cx + w / 2, b: cy + h / 2, side: Math.min(r.width, r.height), rect: r });
      if (Math.min(r.width, r.height) < touchTarget) {
        small.push(`${name(el)} ${Math.round(r.width)}×${Math.round(r.height)}`);
        mark('target-44', r);
      }
    }
    let under24 = 0;
    const crowdedTargets = [];
    const smallTexts = [];
    for (const box of boxes) {
      if (box.side >= 24) continue;
      const crowded = boxes.some((other) => other !== box && !box.el.contains(other.el) && !other.el.contains(box.el) && other.l < box.r && other.r > box.l && other.t < box.b && other.b > box.t);
      if (crowded) {
        under24 += 1;
        if (crowdedTargets.length < 25) crowdedTargets.push(`${name(box.el)} ${Math.round(box.rect.width)}×${Math.round(box.rect.height)}`);
        mark('target-24', box.rect);
      }
    }
    let textUnder12 = 0;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const seen = new Set();
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      if (!parent || seen.has(parent) || !(node.textContent ?? '').trim()) continue;
      seen.add(parent);
      if (parent.closest('script, style, noscript, [data-ui-overlay]') || !visible(parent)) continue;
      if (parseFloat(getComputedStyle(parent).fontSize) < minFont) {
        textUnder12 += 1;
        if (smallTexts.length < 25) smallTexts.push(`${(parent.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 40)} ${Math.round(parseFloat(getComputedStyle(parent).fontSize) * 10) / 10} px`);
        mark('small-text', parent.getBoundingClientRect());
      }
    }

    // ---- primary buttons in the viewport: the profile selector, or buttons filled with the primary colour
    const probe = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    const parse = (color) => {
      if (!probe || !color) return null;
      probe.clearRect(0, 0, 1, 1);
      probe.fillStyle = 'rgba(0,0,0,0)';
      probe.fillStyle = color;
      probe.fillRect(0, 0, 1, 1);
      const d = probe.getImageData(0, 0, 1, 1).data;
      return [d[0], d[1], d[2], d[3] / 255];
    };
    const chroma = (c) => (c ? Math.max(c[0], c[1], c[2]) - Math.min(c[0], c[1], c[2]) : 0);
    const same = (a, b) => !!a && !!b && Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) <= 6 && a[3] > 0.9;
    const buttonLike = 'button, a, [role="button"], input[type="submit"], input[type="button"]';
    let primaryButtons = [];
    let primarySource = null;
    let bySelector = null;
    if (sel['primary-button']) {
      try {
        bySelector = [...document.querySelectorAll(sel['primary-button'])];
      } catch {
        bySelector = null;
      }
    }
    if (bySelector) {
      primaryButtons = bySelector.filter(visible).map(name);
      primarySource = 'profile selector';
    } else {
      const rootStyle = getComputedStyle(document.documentElement);
      let primary = null;
      if (cfg.primary) {
        primary = parse(cfg.primary.startsWith('--') ? rootStyle.getPropertyValue(cfg.primary).trim() : cfg.primary);
        if (primary && primary[3] > 0.9) primarySource = 'profile colour';
        else primary = null;
      }
      if (!primary) {
        for (const prop of ['--primary', '--color-primary', '--primary-color', '--brand', '--color-brand', '--brand-primary', '--accent-color']) {
          const value = rootStyle.getPropertyValue(prop).trim();
          const parsed = value ? parse(value) : null;
          if (parsed && parsed[3] > 0.9 && chroma(parsed) >= 16) {
            primary = parsed;
            primarySource = `css ${prop}`;
            break;
          }
        }
      }
      const filled = [];
      for (const el of document.querySelectorAll(buttonLike)) {
        if (!visible(el)) continue;
        const r = el.getBoundingClientRect();
        if (r.width < 24 || r.height < 24) continue;
        const bg = parse(getComputedStyle(el).backgroundColor);
        if (!bg || bg[3] < 0.9) continue;
        filled.push({ el, bg });
      }
      if (!primary) {
        const tally = new Map();
        for (const item of filled) {
          if (chroma(item.bg) < 40) continue;
          const key = item.bg.slice(0, 3).join(',');
          tally.set(key, (tally.get(key) ?? 0) + 1);
        }
        const best = [...tally.entries()].sort((a, b) => b[1] - a[1])[0];
        if (best) {
          primary = [...best[0].split(',').map(Number), 1];
          primarySource = 'guessed from buttons';
        }
      }
      if (primary) primaryButtons = filled.filter((item) => same(item.bg, primary)).map((item) => name(item.el));
    }

    // ---- labels: cut by width (ellipsis or hidden overflow), wrapped to three lines, cut by the edge of a sideways scroller
    const clipped = [];
    const seenLabel = new Set();
    const shown = (el) => {
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return false;
      const s = getComputedStyle(el);
      return s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0.05;
    };
    const push = (kind, el) => {
      const text = (el.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 80);
      if (!text || seenLabel.has(`${kind}:${text}`)) return;
      seenLabel.add(`${kind}:${text}`);
      clipped.push({ kind, text });
      mark(kind, el.getBoundingClientRect());
    };
    const closest = (el, selector) => {
      try {
        return el.closest(selector);
      } catch {
        return null;
      }
    };
    const labelWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const parents = new Set();
    while (labelWalker.nextNode()) {
      const parent = labelWalker.currentNode.parentElement;
      if (parent && (labelWalker.currentNode.textContent ?? '').trim()) parents.add(parent);
    }
    for (const el of parents) {
      if (!shown(el) || el.closest('[aria-hidden="true"], .sr-only, .visually-hidden, time, script, style, [data-ui-overlay]')) continue;
      // the element itself or a near ancestor cuts: text-overflow, hidden overflow, line-clamp
      let box = el;
      for (let depth = 0; box && depth < 4; depth += 1, box = box.parentElement) {
        const s = getComputedStyle(box);
        const cuts = s.overflowX === 'hidden' || s.overflowX === 'clip' || s.textOverflow === 'ellipsis';
        if (cuts && box.scrollWidth > box.clientWidth + 1) {
          // long data (a name, a title, a comment) may be cut; interface labels may not: buttons, tabs, links, headings, field labels, badges
          if (closest(el, `button, a[href], [role="tab"], [role="radio"], [role="menuitem"], label, th, h1, h2, h3, ${sel.badge}`)) push('clipped', box);
          break;
        }
        const clamp = s.webkitLineClamp;
        if (clamp && clamp !== 'none' && box.scrollHeight > box.clientHeight + 1 && el.closest('button, a[href], [role="tab"], label, th, h1, h2, h3')) {
          push('clipped', box);
          break;
        }
      }
    }
    let controls = [];
    try {
      controls = [...document.querySelectorAll(`button, [role="tab"], [role="radio"], ${sel.button}`)];
    } catch {
      controls = [...document.querySelectorAll('button, [role="tab"], [role="radio"]')];
    }
    for (const el of controls) {
      if (!shown(el)) continue;
      // a label in three lines: one piece of the button text wrapped to three lines or more (an icon above and a description below do not count)
      const texts = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      while (texts.nextNode()) {
        const node = texts.currentNode;
        if (!(node.textContent ?? '').trim() || node.parentElement?.closest('.sr-only, .visually-hidden, [aria-hidden="true"]')) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        const tops = new Set([...range.getClientRects()].filter((r) => r.width > 1).map((r) => Math.round(r.top / 4)));
        if (tops.size >= 3) push('three-lines', el);
      }
      // a sideways scroller cuts the label with its edge: half of a tab is visible
      for (let box = el.parentElement; box && box !== document.body; box = box.parentElement) {
        const s = getComputedStyle(box);
        if ((s.overflowX !== 'auto' && s.overflowX !== 'scroll') || box.scrollWidth <= box.clientWidth + 1) continue;
        const frame = box.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        if (r.left < frame.right - 8 && r.right > frame.right + 4) push('cut', el);
        break;
      }
    }

    // a phone browser widens its layout viewport to fit the content, so the requested width is the reference, not innerWidth
    const wanted = cfg.viewportWidth ?? vw;
    const overflowX = Math.max(0, document.documentElement.scrollWidth - wanted);
    if (overflowX > 1) marks.push({ kind: 'overflow', rect: { x: wanted - 28, y: sy + 16, w: 24, h: vh - 32 } });
    return {
      url: location.href.startsWith('file:') ? location.pathname.split('/').pop() : location.pathname,
      thresholds: { touchTarget, minFont },
      overflowX,
      targetsUnder44: small.length,
      targetsUnder24: under24,
      targetsTotal: boxes.length,
      smallTargets: small.slice(0, 25),
      crowdedTargets,
      textUnder12,
      smallTexts,
      primaryButtons,
      primarySource,
      screens: Math.round((document.documentElement.scrollHeight / vh) * 10) / 10,
      clipped,
      marks: marks.slice(0, 200),
    };
  }, config);
}
