// In-page measurements of the ui-craft skill. Thresholds here and in the skill are the same numbers:
// change a rule in references/ and change it here in the same commit (references/11-measure.md).
// Every function takes a Playwright `page`, so the same code can be called from your own Playwright scripts.

export const RULES = ['text-edge', 'box-edge', 'clipped', 'off-scale', 'row-align', 'font-scale', 'line-length', 'state-shift', 'page-overflow'];
export const CODES = { 'text-edge': 'T', 'box-edge': 'B', clipped: 'C', 'off-scale': 'S', 'row-align': 'R', 'font-scale': 'F', 'line-length': 'L', 'state-shift': 'H', 'page-overflow': 'O' };

/** Config passed into the page: scales and selectors from the project profile (lib/common.mjs, DEFAULT_PROFILE). */
export function pageConfig(profile, keep = 40) {
  const fonts = [...profile.fonts].sort((a, b) => a - b);
  return {
    spacing: [...new Set([...profile.spacing, ...profile['spacing-extra']])],
    fonts,
    heroFonts: profile['hero-fonts'],
    heroFrom: fonts[fonts.length - 1] ?? 30,
    heroMax: profile['hero-max'],
    heroNumbersOnly: profile['hero-numbers-only'],
    lineLength: profile['line-length'],
    keep,
    primary: profile.primary,
    main: profile.main,
    sel: profile.selectors,
    viewportWidth: null,
  };
}

/** Stop items S1–S7: text to edge, box to edge, clipped text, spacing scale, row alignment, font scale, line length. */
export async function measureUi(page, config) {
  return page.evaluate((cfg) => {
    const { spacing, fonts, heroFonts, heroFrom, heroMax, heroNumbersOnly, lineLength, keep, sel } = cfg;
    const sx = window.scrollX;
    const sy = window.scrollY;
    const counts = { 'text-edge': 0, 'box-edge': 0, clipped: 0, 'off-scale': 0, 'row-align': 0, 'font-scale': 0, 'line-length': 0, 'state-shift': 0, 'page-overflow': 0 };
    const violations = [];
    const kept = {};
    const round = (n) => Math.round(n * 10) / 10;
    const describe = (el) => {
      const cls = typeof el.className === 'string' ? el.className.trim().split(/\s+/)[0] : '';
      const mark = el.getAttribute('data-testid') || el.getAttribute('data-slot') || el.getAttribute('role') || (el.id ? `#${el.id}` : '') || (cls ? `.${cls}` : '');
      const text = (el.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 32);
      return `${el.tagName.toLowerCase()}${mark ? `[${mark}]` : ''}${text ? ` "${text}"` : ''}`;
    };
    const short = (el) => describe(el).split(' "')[0];
    const add = (rule, el, value, r) => {
      counts[rule] += 1;
      kept[rule] = (kept[rule] ?? 0) + 1;
      if (kept[rule] > keep) return;
      const b = r ?? el.getBoundingClientRect();
      violations.push({ rule, value, where: describe(el), rect: { x: round(b.left + sx), y: round(b.top + sy), w: round(b.width), h: round(b.height) } });
    };
    const closest = (el, selector) => {
      try {
        return el.closest(selector);
      } catch {
        return null;
      }
    };

    // An open dialog, sheet or menu: only it is measured; the page under it is measured on its own screen.
    // A menu or listbox counts only when it floats over the page: a navigation list marked role="menu" inside the layout is part of the page.
    const floats = (el) => {
      // positioned on its own layer somewhere between the element and the nearest landmark: a dropdown; a list that simply sits in a landmark is not
      for (let cur = el; cur && cur !== document.body; cur = cur.parentElement) {
        if (cur !== el && cur.matches('nav, header, aside, main, footer, [role="navigation"], [role="banner"], [role="main"]')) return false;
        const position = getComputedStyle(cur).position;
        if (position === 'fixed' || position === 'absolute') return true;
      }
      return false;
    };
    const dialogs = [...document.querySelectorAll('[role="dialog"], [role="alertdialog"], [role="menu"], [role="listbox"], dialog[open]')].filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.width <= 1 || r.height <= 1 || getComputedStyle(el).visibility === 'hidden') return false;
      const role = el.getAttribute('role');
      return role === 'menu' || role === 'listbox' ? floats(el) : true;
    });
    const roots = dialogs.length ? dialogs.filter((el) => !dialogs.some((other) => other !== el && other.contains(el))) : [document.body];

    const styleCache = new WeakMap();
    const css = (el) => {
      let s = styleCache.get(el);
      if (!s) {
        s = getComputedStyle(el);
        styleCache.set(el, s);
      }
      return s;
    };
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      if (r.width <= 2 || r.height <= 2) return false;
      if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return false;
      return true;
    };
    const alpha = (color) => {
      if (!color || color === 'transparent') return 0;
      const m = color.match(/rgba?\(([^)]+)\)/);
      if (m) {
        const parts = (m[1] ?? '').split(/[,/ ]+/).filter(Boolean);
        return parts.length >= 4 ? parseFloat(parts[3] ?? '1') : 1;
      }
      const slash = color.match(/\/\s*([\d.]+%?)\s*\)/);
      const part = slash?.[1];
      if (part) return part.endsWith('%') ? parseFloat(part) / 100 : parseFloat(part);
      return 1;
    };
    const effectiveBg = (el) => {
      for (let cur = el; cur; cur = cur.parentElement) {
        const bg = css(cur).backgroundColor;
        if (alpha(bg) > 0.05) return bg;
      }
      return 'page';
    };
    // Frame: a visible edge on each side — border, own background, or a shadow ring.
    const frameCache = new WeakMap();
    const frameOf = (el) => {
      if (frameCache.has(el)) return frameCache.get(el) ?? null;
      const s = css(el);
      const bw = { top: parseFloat(s.borderTopWidth), right: parseFloat(s.borderRightWidth), bottom: parseFloat(s.borderBottomWidth), left: parseFloat(s.borderLeftWidth) };
      const edge = (width, color) => width >= 0.5 && alpha(color) > 0.1;
      const sides = { top: edge(bw.top, s.borderTopColor), right: edge(bw.right, s.borderRightColor), bottom: edge(bw.bottom, s.borderBottomColor), left: edge(bw.left, s.borderLeftColor) };
      const ownBg = alpha(s.backgroundColor) > 0.05 && s.backgroundColor !== effectiveBg(el.parentElement);
      // shadow or ring: at least one layer with a visible colour and a non-zero size (utility frameworks emit empty transparent layers first)
      const shadow =
        s.boxShadow === 'none'
          ? false
          : s.boxShadow.split(/,(?![^(]*\))/).some((layer) => {
              const color = layer.match(/(rgba?\([^)]*\)|oklch\([^)]*\)|oklab\([^)]*\)|color\([^)]*\)|#[0-9a-f]+)/i)?.[0] ?? '';
              const sizes = (layer.replace(color, '').match(/-?[\d.]+px/g) ?? []).map(parseFloat);
              return alpha(color) > 0.05 && sizes.some((size) => Math.abs(size) > 0.25);
            });
      const filled = ownBg || s.backgroundImage !== 'none' || shadow;
      let frame = null;
      if (filled || sides.top || sides.right || sides.bottom || sides.left) {
        // an inline link underlined with a bottom border is not a container
        const underline = s.display === 'inline' && !filled && sides.bottom && !sides.top && !sides.left && !sides.right;
        if (!underline) {
          const r = el.getBoundingClientRect();
          frame = {
            el,
            top: filled || sides.top,
            right: filled || sides.right,
            bottom: filled || sides.bottom,
            left: filled || sides.left,
            inner: { left: r.left + bw.left, top: r.top + bw.top, right: r.right - bw.right, bottom: r.bottom - bw.bottom },
            height: r.height,
            width: r.width,
          };
        }
      }
      frameCache.set(el, frame);
      return frame;
    };
    const containerOf = (start) => {
      for (let cur = start; cur && cur !== document.documentElement; cur = cur.parentElement) {
        const frame = frameOf(cur);
        if (frame) return frame;
      }
      return null;
    };

    const canvas = document.createElement('canvas').getContext('2d');
    const inkCache = new Map();
    const ink = (el, text) => {
      const s = css(el);
      const font = `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
      const sample = s.textTransform === 'uppercase' ? text.toUpperCase() : text;
      const key = `${font}|${sample.slice(0, 60)}`;
      let m = inkCache.get(key);
      if (!m && canvas) {
        canvas.font = font;
        const t = canvas.measureText(sample.slice(0, 60));
        m = { fontAscent: t.fontBoundingBoxAscent, ascent: t.actualBoundingBoxAscent, descent: Math.max(0, t.actualBoundingBoxDescent) };
        inkCache.set(key, m);
      }
      return m ?? { fontAscent: parseFloat(s.fontSize) * 0.9, ascent: parseFloat(s.fontSize) * 0.7, descent: 0 };
    };

    const fontSizes = {};
    const offScale = {};
    let minX = null;
    let minY = null;
    let maxLineChars = 0;
    let heroTexts = 0;
    const baselineOf = new WeakMap();
    const firstLineMid = new WeakMap();
    const allFonts = [...fonts, ...heroFonts];

    // ---- text: distance to the frame, font size, line length
    const range = document.createRange();
    for (const root of roots) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const text = (node.textContent ?? '').replace(/\s+/g, ' ').trim();
        const parent = node.parentElement;
        if (!text || !parent || parent.closest('svg, script, style, noscript, [data-ui-overlay]')) continue;
        if (!visible(parent)) continue;
        range.selectNodeContents(node);
        const lines = [...range.getClientRects()].filter((r) => r.width > 0.5 && r.height > 0.5);
        if (!lines.length) continue;
        // lines of one text: rectangles with a different vertical position
        const rows = [];
        for (const r of lines) if (!rows.some((row) => Math.abs(row.top - r.top) < 2)) rows.push(r);
        const firstRow = rows[0];
        const lastRow = rows[rows.length - 1];
        if (!firstRow || !lastRow) continue;
        let box = { left: Math.min(...lines.map((r) => r.left)), right: Math.max(...lines.map((r) => r.right)), top: firstRow.top, bottom: lastRow.bottom };

        const s = css(parent);
        const size = round(parseFloat(s.fontSize));
        fontSizes[String(size)] = (fontSizes[String(size)] ?? 0) + 1;
        if (!allFonts.includes(size)) add('font-scale', parent, `${size} px is not in the scale ${allFonts.join('/')}`);
        else if (size > heroFrom && (!heroNumbersOnly || /\d/.test(text))) {
          // above the regular scale: only the leading number of the screen; a third such text is no longer "the main one"
          heroTexts += 1;
          if (heroTexts > heroMax) add('font-scale', parent, `${size} px: already ${heroTexts} texts larger than ${heroFrom} px on the screen, allowed ${heroMax} (one leading number)`);
        } else if (size > heroFrom) add('font-scale', parent, `${size} px on text without digits: sizes above ${heroFrom} px are for the leading number only`);

        const perLine = Math.ceil(text.length / rows.length);
        if (perLine > maxLineChars) maxLineChars = perLine;
        if (perLine > lineLength) add('line-length', parent, `${perLine} characters per line, limit ${lineLength}`);

        // ink: from the top of capitals and digits to the descenders of this very line
        const m = ink(parent, text);
        const baseTop = firstRow.top + m.fontAscent;
        const baseBottom = lastRow.top + m.fontAscent;
        if (!baselineOf.has(parent)) baselineOf.set(parent, baseTop);
        if (!firstLineMid.has(parent)) firstLineMid.set(parent, firstRow.top + firstRow.height / 2);
        box = { ...box, top: baseTop - m.ascent, bottom: baseBottom + m.descent };

        // clipping by ancestors: the visible part of the text is measured
        const frame = containerOf(parent);
        if (!frame) continue;
        let hidden = false;
        let clippedByWrapper = null;
        // between the text and the frame there is an area scrolled along this axis: the distance depends on the scroll position and is not measured
        let scrollLeftSide = false;
        let scrollRightSide = false;
        let scrollY = false;
        for (let cur = parent; cur; cur = cur.parentElement) {
          const cs = css(cur);
          if (cur !== frame.el || cur === parent) {
            // only the side the content is scrolled to is skipped: at the scroll start the left edge is real
            if (/auto|scroll/.test(cs.overflowX) && cur.scrollWidth > cur.clientWidth + 1) {
              if (cur.scrollLeft > 0.5) scrollLeftSide = true;
              if (cur.scrollLeft + cur.clientWidth < cur.scrollWidth - 1) scrollRightSide = true;
            }
            if (/auto|scroll/.test(cs.overflowY) && cur.scrollHeight > cur.clientHeight + 1) scrollY = true;
          }
          if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
            const cr = cur.getBoundingClientRect();
            const cut = { left: Math.max(box.left, cr.left), right: Math.min(box.right, cr.right), top: Math.max(box.top, cr.top), bottom: Math.min(box.bottom, cr.bottom) };
            // text half gone beyond the edge of a scroll area (a table wider than its frame): scroll position, not padding
            const scrolls = /auto|scroll/.test(cs.overflowX + cs.overflowY);
            const cutOff = cut.left > box.left + 0.5 || cut.right < box.right - 0.5 || cut.top > box.top + 0.5 || cut.bottom < box.bottom - 0.5;
            if (scrolls && cutOff) hidden = true;
            // text is cut by a wrapper with hidden overflow (not by the text element itself: the rule below checks that)
            if (!scrolls && cutOff && cur !== parent && cut.right - cut.left > 1 && cut.bottom - cut.top > 1 && (cut.left > box.left + 1 || cut.right < box.right - 1)) clippedByWrapper = cur;
            box = cut;
            if (box.right - box.left < 1 || box.bottom - box.top < 1) hidden = true;
          }
          if (cur === frame.el) break;
        }
        if (clippedByWrapper) add('clipped', parent, `text is cut by the wrapper ${short(clippedByWrapper)}`);
        if (hidden) continue;
        // minimums: a regular container 8 horizontally and 4 vertically; a badge up to 24 px high — 6 and 3;
        // a counter up to 20 px and a sign in a circle (initials, day number) — 4 and 2
        const fs = css(frame.el);
        const round50 = Math.abs(frame.width - frame.height) <= 2 && parseFloat(fs.borderTopLeftRadius) >= frame.height / 2 - 1;
        const minH = frame.height <= 20 || round50 ? 4 : frame.height <= 24 ? 6 : 8;
        const minV = frame.height <= 20 ? 2 : frame.height <= 24 ? 3 : 4;
        const d = {
          left: frame.left ? box.left - frame.inner.left : Infinity,
          right: frame.right ? frame.inner.right - box.right : Infinity,
          top: frame.top ? box.top - frame.inner.top : Infinity,
          bottom: frame.bottom ? frame.inner.bottom - box.bottom : Infinity,
        };
        const dx = Math.min(scrollLeftSide ? Infinity : d.left, scrollRightSide ? Infinity : d.right);
        const dy = scrollY ? Infinity : Math.min(d.top, d.bottom);
        if (dx !== Infinity && (minX === null || dx < minX)) minX = round(dx);
        if (dy !== Infinity && (minY === null || dy < minY)) minY = round(dy);
        const bad = [];
        if (dx < minH - 0.5) bad.push(`horizontally ${round(dx)} px, minimum ${minH}`);
        if (dy < minV - 0.5) bad.push(`vertically ${round(dy)} px, minimum ${minV}`);
        if (bad.length) add('text-edge', parent, `to the edge of ${short(frame.el)}: ${bad.join('; ')}`, { left: box.left, top: box.top, width: box.right - box.left, height: box.bottom - box.top });
      }
    }

    // ---- elements: spacing scale, clipping, box at the frame, rows
    const px = (value) => (value && value.unit === 'px' && typeof value.value === 'number' ? value.value : null);
    const spacingProps = ['padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left'];
    const onScale = (value) => {
      const abs = Math.abs(value);
      // above 96 px it is not rhythm but room for a pinned panel or a computed offset: the scale does not apply
      if (abs > 96) return true;
      return abs < 0.25 || spacing.some((step) => Math.abs(step - abs) < 0.25);
    };
    const all = [];
    for (const root of roots) all.push(root, ...root.querySelectorAll('*'));
    for (const el of all) {
      if (el === document.body || (el.closest('svg') !== null && el.tagName.toLowerCase() !== 'svg')) continue;
      if (el.closest('[data-ui-overlay]')) continue;
      if (!visible(el)) continue;
      const s = css(el);
      const tag = el.tagName.toLowerCase();
      const rect = el.getBoundingClientRect();

      // spacing scale: specified values, not computed "auto"
      const map = el.computedStyleMap?.();
      if (map && tag !== 'svg' && !(tag === 'input' && ['hidden', 'checkbox', 'radio', 'file'].includes(el.type))) {
        const offs = [];
        for (const prop of spacingProps) {
          const value = px(map.get(prop));
          if (value !== null && !onScale(value)) offs.push(`${prop} ${round(value)}`);
        }
        if (/flex|grid/.test(s.display) && el.children.length > 1) {
          for (const prop of ['row-gap', 'column-gap']) {
            const value = px(map.get(prop));
            if (value !== null && !onScale(value)) offs.push(`${prop} ${round(value)}`);
          }
        }
        if (offs.length) {
          for (const off of offs) {
            const key = off.replace(/-(top|right|bottom|left)/, '');
            offScale[key] = (offScale[key] ?? 0) + 1;
          }
          add('off-scale', el, `${offs.join(', ')} px: not in the scale`);
        }
      }

      // clipped text: the element has its own text and it does not fit
      const ownText = [...el.childNodes].some((n) => n.nodeType === 3 && (n.textContent ?? '').trim());
      if (ownText || tag === 'input') {
        const clipX = (s.overflowX === 'hidden' || s.overflowX === 'clip') && el.scrollWidth - el.clientWidth > 1;
        const lineHeight = parseFloat(s.lineHeight) || parseFloat(s.fontSize) * 1.4;
        const clipY = (s.overflowY === 'hidden' || s.overflowY === 'clip') && el.scrollHeight - el.clientHeight > lineHeight * 0.6;
        if (clipX || clipY) {
          const ellipsis = s.textOverflow === 'ellipsis' || s.getPropertyValue('-webkit-line-clamp') !== 'none';
          // ellipsis is acceptable only when the full text is given in a title (08-long-words.md); never on a button, tab or badge label
          const titled = el.closest('[title]') !== null && el.closest('[title]').title.trim().length > 0;
          const control = closest(el, `button, [role="tab"], [role="button"], ${sel.badge}`);
          const soleLabel = control !== null && (control.textContent ?? '').trim() === (el.textContent ?? '').trim();
          if (!(ellipsis && titled && !soleLabel)) add('clipped', el, ellipsis ? (soleLabel ? 'a button, tab or badge label is cut with an ellipsis' : 'ellipsis without the full text in a title') : 'text is cut without an ellipsis');
        }
      }

      // a badge, button, field or icon right at the container frame
      const own = tag === 'svg' || tag === 'img' || tag === 'input' || tag === 'textarea' ? true : frameOf(el) !== null;
      if (own && s.position !== 'absolute' && s.position !== 'fixed' && s.position !== 'sticky') {
        const frame = containerOf(el.parentElement);
        if (frame) {
          const gaps = [
            frame.left ? rect.left - frame.inner.left : Infinity,
            frame.right ? frame.inner.right - rect.right : Infinity,
            frame.top ? rect.top - frame.inner.top : Infinity,
            frame.bottom ? frame.inner.bottom - rect.bottom : Infinity,
          ];
          const tight = gaps.filter((gap) => gap > 0.75 && gap < 3.5);
          if (tight.length) add('box-edge', el, `gap to the edge of ${short(frame.el)} is ${round(Math.min(...tight))} px: either flush (0) or at least 4`);
        }
      }

      // row: children of a flex row stand on one line — by centre or by baseline; tall blocks may share a top or a bottom
      if ((s.display === 'flex' || s.display === 'inline-flex') && s.flexDirection.startsWith('row')) {
        const kids = [...el.children].filter((kid) => {
          const ks = css(kid);
          return ks.position !== 'absolute' && ks.position !== 'fixed' && visible(kid);
        });
        const used = new Set();
        for (const first of kids) {
          if (used.has(first)) continue;
          const a = first.getBoundingClientRect();
          const line = kids.filter((kid) => {
            if (used.has(kid)) return false;
            const b = kid.getBoundingClientRect();
            const overlap = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
            return overlap > Math.min(a.height, b.height) * 0.5;
          });
          line.forEach((kid) => used.add(kid));
          if (line.length < 2) continue;
          const boxes = line.map((kid) => kid.getBoundingClientRect());
          const spread = (values) => Math.max(...values) - Math.min(...values);
          const centers = spread(boxes.map((b) => b.top + b.height / 2));
          const tops = spread(boxes.map((b) => b.top));
          const bottoms = spread(boxes.map((b) => b.bottom));
          const fromText = (kid, store) => {
            const ownValue = store.get(kid);
            if (ownValue !== undefined) return ownValue;
            const tw = document.createTreeWalker(kid, NodeFilter.SHOW_TEXT);
            while (tw.nextNode()) {
              const p = tw.currentNode.parentElement;
              if (p && store.has(p)) return store.get(p) ?? null;
            }
            return null;
          };
          const baselines = line.map((kid) => fromText(kid, baselineOf)).filter((b) => b !== null);
          const baselineOk = baselines.length >= 2 && spread(baselines) <= 2;
          const compact = boxes.every((b) => b.height <= 56);
          // a checkbox or icon next to multi-line text stands by the first line
          const firstLines = spread(line.map((kid, i) => fromText(kid, firstLineMid) ?? boxes[i].top + boxes[i].height / 2));
          const ok = centers <= 2 || baselineOk || firstLines <= 2 || (!compact && (tops <= 2 || bottoms <= 2));
          if (!ok) {
            const mids = boxes.map((b) => b.top + b.height / 2);
            const median = [...mids].sort((x, y) => x - y)[Math.floor(mids.length / 2)] ?? 0;
            let worst = first;
            let worstGap = -1;
            line.forEach((kid, i) => {
              const gap = Math.abs((mids[i] ?? median) - median);
              if (gap > worstGap) {
                worstGap = gap;
                worst = kid;
              }
            });
            add('row-align', worst, `row ${short(el)}: centres differ by ${round(centers)} px${baselines.length >= 2 ? `, baselines by ${round(spread(baselines))} px` : ''}, limit 2`);
          }
        }
      }
    }

    // ---- layout of the main area
    let layout = null;
    let main = null;
    try {
      main = cfg.main ? document.querySelector(cfg.main) : null;
    } catch {
      main = null;
    }
    main = main ?? document.querySelector('main, [role="main"]') ?? document.body;
    if (main && !dialogs.length) {
      const mr = main.getBoundingClientRect();
      const ms = css(main);
      const inner = { left: mr.left + parseFloat(ms.paddingLeft), right: mr.right - parseFloat(ms.paddingRight) };
      let left = Infinity;
      let right = -Infinity;
      for (const el of main.querySelectorAll('*')) {
        if (el.children.length || !visible(el)) continue;
        const r = el.getBoundingClientRect();
        if (r.right > mr.right + 1 || r.left < mr.left - 1) continue;
        left = Math.min(left, r.left);
        right = Math.max(right, r.right);
      }
      if (right > left) {
        const width = inner.right - inner.left;
        layout = { mainWidth: round(width), contentWidth: round(right - left), contentLeft: round(left - inner.left), voidRight: round(inner.right - right), voidRightShare: round((inner.right - right) / width) };
      }
    }

    // ---- S9: the page scrolls sideways
    // a phone browser widens its layout viewport to fit the content, so the requested width is the reference, not innerWidth
    const wanted = cfg.viewportWidth ?? window.innerWidth;
    const pageOverflowX = Math.max(0, document.documentElement.scrollWidth - wanted);
    if (pageOverflowX > 1) {
      counts['page-overflow'] = 1;
      violations.push({ rule: 'page-overflow', value: `the page is ${round(pageOverflowX)} px wider than the window`, where: 'html', rect: { x: wanted - 28, y: sy + 16, w: 24, h: window.innerHeight - 32 } });
    }

    return {
      url: location.href.startsWith('file:') ? location.pathname.split('/').pop() : location.pathname,
      viewport: { w: window.innerWidth, h: window.innerHeight },
      scope: dialogs.length ? 'dialog' : 'page',
      counts,
      stops: Object.values(counts).reduce((sum, n) => sum + n, 0),
      minTextEdgeX: minX,
      minTextEdgeY: minY,
      fontSizes,
      offScale,
      maxLineChars,
      pageOverflowX: round(pageOverflowX),
      layout,
      violations,
    };
  }, config);
}

/** S8: hover and focus do not move the layout. The element, its parent and its next sibling are measured before and after. Visible part only, up to `limit` targets. */
export async function measureStateShift(page, config, limit = 40) {
  const targets = await page.evaluate(
    ({ max, card }) => {
      const scope = [...document.querySelectorAll('[role="dialog"], [role="alertdialog"], dialog[open]')].filter((el) => el.getBoundingClientRect().width > 1);
      const root = scope[scope.length - 1] ?? document.body;
      const out = [];
      let els = [];
      try {
        els = [...root.querySelectorAll(`a[href], button, [role="tab"], [role="button"], [role="checkbox"], [role="switch"], input, textarea, tr, ${card}`)];
      } catch {
        els = [...root.querySelectorAll('a[href], button, [role="tab"], [role="button"], [role="checkbox"], [role="switch"], input, textarea, tr')];
      }
      let index = 0;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.width < 8 || r.height < 8 || r.top < 0 || r.bottom > window.innerHeight || r.left < 0 || r.right > window.innerWidth) continue;
        if (el.disabled) continue;
        const x = r.left + r.width / 2;
        const y = r.top + r.height / 2;
        const top = document.elementFromPoint(x, y);
        if (!top || !(el === top || el.contains(top))) continue;
        el.setAttribute('data-ui-shift', String(index));
        out.push({ x, y, index });
        index += 1;
        if (out.length >= max) break;
      }
      return out;
    },
    { max: limit, card: config.sel.card },
  );
  const read = (index) =>
    page.evaluate((i) => {
      const el = document.querySelector(`[data-ui-shift="${i}"]`);
      if (!el) return null;
      const box = (node) => {
        if (!node) return [0, 0, 0, 0];
        const r = node.getBoundingClientRect();
        return [r.left + window.scrollX, r.top + window.scrollY, r.width, r.height];
      };
      return { self: box(el), parent: box(el.parentElement), next: box(el.nextElementSibling), where: `${el.tagName.toLowerCase()} "${(el.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 32)}"` };
    }, index);
  const differs = (a, b) => a.some((value, i) => Math.abs(value - (b[i] ?? 0)) > 0.5);
  const found = [];
  for (const target of targets) {
    await page.mouse.move(2, 2);
    const before = await read(target.index);
    if (!before) continue;
    await page.mouse.move(target.x, target.y);
    await page.waitForTimeout(60);
    const hovered = await read(target.index);
    // a tab is not focused: focus may select it and change the screen under the next measurements and the screenshot
    await page.evaluate((i) => {
      const el = document.querySelector(`[data-ui-shift="${i}"]`);
      if (el && el.getAttribute('role') !== 'tab') el.focus({ preventScroll: true });
    }, target.index);
    await page.waitForTimeout(40);
    const focused = await read(target.index);
    await page.evaluate(() => document.activeElement?.blur?.());
    for (const [state, after] of [
      ['hover', hovered],
      ['focus', focused],
    ]) {
      if (!after) continue;
      if (differs(before.self, after.self) || differs(before.parent, after.parent) || differs(before.next, after.next)) {
        found.push({ rule: 'state-shift', value: `${state} changes the size or position (the element, its parent or its neighbour)`, where: before.where, rect: { x: before.self[0] ?? 0, y: before.self[1] ?? 0, w: before.self[2] ?? 0, h: before.self[3] ?? 0 } });
        break;
      }
    }
  }
  await page.mouse.move(2, 2);
  await page.evaluate(() => document.querySelectorAll('[data-ui-shift]').forEach((el) => el.removeAttribute('data-ui-shift')));
  return found;
}

/**
 * Composition figures of the first viewport of the main area (references/12-composition.md, rubric-best.md).
 * Not stop items: numbers for section K of the checklist and for the rubric.
 */
export async function measureComposition(page, config) {
  return page.evaluate((cfg) => {
    const { sel } = cfg;
    let main = null;
    let mainSource = 'profile';
    try {
      main = cfg.main ? document.querySelector(cfg.main) : null;
    } catch {
      main = null;
    }
    if (!main) {
      main = document.querySelector('main, [role="main"]');
      mainSource = 'main';
    }
    if (!main) {
      main = document.body;
      mainSource = 'body';
    }
    const round = (n, digits = 2) => Math.round(n * 10 ** digits) / 10 ** digits;
    const vh = window.innerHeight;
    const mr = main.getBoundingClientRect();
    const view = { left: Math.max(mr.left, 0), right: Math.min(mr.right, window.innerWidth), top: Math.max(mr.top, 0), bottom: vh };
    const viewArea = Math.max(1, (view.right - view.left) * (view.bottom - view.top));
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      if (r.width <= 2 || r.height <= 2) return false;
      return !el.checkVisibility || el.checkVisibility({ opacityProperty: true, visibilityProperty: true });
    };
    const inView = (r) => r.bottom > view.top && r.top < view.bottom && r.right > view.left && r.left < view.right;
    const matches = (el, selector) => {
      try {
        return el.matches(selector);
      } catch {
        return false;
      }
    };
    const closest = (el, selector) => {
      try {
        return el.closest(selector);
      } catch {
        return null;
      }
    };
    const probe = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    const rgba = (color) => {
      if (!probe || !color) return null;
      probe.clearRect(0, 0, 1, 1);
      probe.fillStyle = 'rgba(0,0,0,0)';
      probe.fillStyle = color;
      probe.fillRect(0, 0, 1, 1);
      const d = probe.getImageData(0, 0, 1, 1).data;
      return [d[0] ?? 0, d[1] ?? 0, d[2] ?? 0, (d[3] ?? 0) / 255];
    };
    const colorCache = new Map();
    const parse = (color) => {
      if (!colorCache.has(color)) colorCache.set(color, rgba(color));
      return colorCache.get(color) ?? null;
    };
    const chroma = (c) => (c ? Math.max(c[0], c[1], c[2]) - Math.min(c[0], c[1], c[2]) : 0);
    const same = (a, b) => !!a && !!b && Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) <= 6 && a[3] > 0.9;
    const ownBgOf = (el, s) => {
      const bg = parse(s.backgroundColor);
      const parentBg = el.parentElement ? parse(getComputedStyle(el.parentElement).backgroundColor) : null;
      return bg && bg[3] > 0.05 && !(parentBg && parentBg[3] > 0.05 && same(bg, parentBg)) ? bg : null;
    };

    // ---- primary colour: the profile, then common custom properties, then the most frequent fill of chromatic buttons
    const buttonLike = `button, a, [role="button"], input[type="submit"], input[type="button"]`;
    const rootStyle = getComputedStyle(document.documentElement);
    let primary = null;
    let primarySource = null;
    if (cfg.primary) {
      primary = parse(cfg.primary.startsWith('--') ? rootStyle.getPropertyValue(cfg.primary).trim() : cfg.primary);
      if (primary && primary[3] > 0.9) primarySource = 'profile';
      else primary = null;
    }
    if (!primary) {
      for (const name of ['--primary', '--color-primary', '--primary-color', '--brand', '--color-brand', '--brand-primary', '--accent-color']) {
        const value = rootStyle.getPropertyValue(name).trim();
        const parsed = value ? parse(value) : null;
        if (parsed && parsed[3] > 0.9 && chroma(parsed) >= 16) {
          primary = parsed;
          primarySource = `css ${name}`;
          break;
        }
      }
    }
    if (!primary) {
      const tally = new Map();
      for (const el of main.querySelectorAll(buttonLike)) {
        if (!visible(el)) continue;
        const r = el.getBoundingClientRect();
        if (r.width < 24 || r.height < 24) continue;
        const bg = ownBgOf(el, getComputedStyle(el));
        if (!bg || bg[3] < 0.9 || chroma(bg) < 40) continue;
        const key = bg.slice(0, 3).join(',');
        tally.set(key, (tally.get(key) ?? 0) + 1);
      }
      const best = [...tally.entries()].sort((a, b) => b[1] - a[1])[0];
      if (best) {
        primary = [...best[0].split(',').map(Number), 1];
        primarySource = 'guessed from buttons';
      }
    }

    // ---- frames (containers)
    // a link-button (up to 56 px high) is a control; a taller link-card stays a container
    const isControl = (el) =>
      matches(el, `button, input, textarea, select, [role="button"], [role="tab"], [role="checkbox"], [role="switch"], svg, img, ${sel.button}, ${sel.badge}`) || (el.tagName === 'A' && el.getBoundingClientRect().height <= 56);
    const frames = [];
    let tintArea = 0;
    let primaryButtons = 0;
    for (const el of main.querySelectorAll('*')) {
      if (el.closest('svg') && el.tagName.toLowerCase() !== 'svg') continue;
      if (el.closest('[data-ui-overlay]')) continue;
      if (!visible(el)) continue;
      const r = el.getBoundingClientRect();
      if (!inView(r)) continue;
      const s = getComputedStyle(el);
      const bg = ownBgOf(el, s);
      if (bg && primary && same(bg, primary) && r.width >= 24 && r.height >= 24 && matches(el, buttonLike)) primaryButtons += 1;
      if (bg && chroma(bg) >= 16 && bg[3] > 0.3) {
        // a nested fill of the same kind is not counted twice: the area is taken only from the topmost coloured ancestor
        let nested = false;
        for (let cur = el.parentElement; cur && cur !== main; cur = cur.parentElement) {
          const pb = parse(getComputedStyle(cur).backgroundColor);
          if (pb && pb[3] > 0.3 && chroma(pb) >= 16) {
            nested = true;
            break;
          }
        }
        if (!nested) {
          const w = Math.min(r.right, view.right) - Math.max(r.left, view.left);
          const h = Math.min(r.bottom, view.bottom) - Math.max(r.top, view.top);
          if (w > 0 && h > 0) tintArea += w * h;
        }
      }
      if (isControl(el) || r.width < 120 || r.height < 40) continue;
      const borders = [s.borderTopWidth, s.borderRightWidth, s.borderBottomWidth, s.borderLeftWidth].filter((w, i) => {
        const c = parse([s.borderTopColor, s.borderRightColor, s.borderBottomColor, s.borderLeftColor][i] ?? '');
        return parseFloat(w) >= 0.5 && !!c && c[3] > 0.1;
      }).length;
      if (borders >= 3 || (bg && r.height <= 2000)) frames.push({ el, r });
    }
    // A section of a panel flush with its edges (a column of a sheet, a table header, a totals strip) is not "a card in a card": it divides the panel
    const flush = (inner, outer) => [Math.abs(inner.left - outer.left), Math.abs(inner.top - outer.top), Math.abs(outer.right - inner.right), Math.abs(outer.bottom - inner.bottom)].filter((gap) => gap <= 2).length >= 2;
    const depthOf = (el) => {
      const self = frames.find((frame) => frame.el === el);
      return frames.filter((other) => other.el !== el && other.el.contains(el) && !(self && flush(self.r, other.r))).length;
    };
    const top = frames.filter((frame) => !frames.some((other) => other.el !== frame.el && other.el.contains(frame.el)));
    const nestedFramesMax = frames.reduce((max, frame) => Math.max(max, depthOf(frame.el) + 1), 0);
    let sameSizeFrames = 0;
    for (const a of top) {
      const count = top.filter((b) => Math.abs(a.r.width - b.r.width) <= 4 && Math.abs(a.r.height - b.r.height) <= 4).length;
      sameSizeFrames = Math.max(sameSizeFrames, count);
    }
    const areas = top.map((frame) => frame.r.width * frame.r.height).sort((x, y) => x - y);
    const median = areas[Math.floor(areas.length / 2)] ?? 0;
    const areaRatio = areas.length >= 3 && median > 0 ? (areas[areas.length - 1] ?? 0) / median : null;

    // ---- texts: sizes, edges, colour, digits
    const sizeChars = {};
    const sizeCount = {};
    const lefts = [];
    const rights = [];
    let colored = 0;
    let texts = 0;
    let numbers = 0;
    let tabular = 0;
    let lowest = view.top;
    let heroBox = null;
    const range = document.createRange();
    const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
    // a number with digit groups ("650 000", "12,480", "1.250.000") or five and more digits in a row; years and short ids are not column numbers
    const grouped = /(?<![\d.,])\d{1,3}(?:[\s  ,.'’]\d{3})+(?!\d)|\d{5,}/;
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = (node.textContent ?? '').replace(/\s+/g, ' ').trim();
      const parent = node.parentElement;
      if (!text || !parent || parent.closest('svg, script, style, noscript, [data-ui-overlay]') || !visible(parent)) continue;
      range.selectNodeContents(node);
      const rects = [...range.getClientRects()].filter((r) => r.width > 0.5 && r.height > 0.5);
      const first = rects[0];
      if (!first || !inView(first)) continue;
      const s = getComputedStyle(parent);
      const size = String(Math.round(parseFloat(s.fontSize) * 10) / 10);
      sizeChars[size] = (sizeChars[size] ?? 0) + text.length;
      sizeCount[size] = (sizeCount[size] ?? 0) + 1;
      texts += 1;
      const fontPx = parseFloat(s.fontSize);
      if (!heroBox || fontPx > heroBox.size) heroBox = { size: fontPx, x: (first.left + first.right) / 2, y: (first.top + first.bottom) / 2 };
      lefts.push(Math.min(...rects.map((r) => r.left)));
      rights.push(Math.max(...rects.map((r) => r.right)));
      lowest = Math.max(lowest, Math.min(view.bottom, Math.max(...rects.map((r) => r.bottom))));
      // text on a filled button or badge is not counted as coloured text: the fill is counted
      const onFill = closest(parent, `button, ${sel.button}, ${sel.badge}`);
      if (!onFill && chroma(parse(s.color)) > 60) colored += 1;
      if (grouped.test(text)) {
        numbers += 1;
        if (/tabular-nums/.test(s.fontVariantNumeric) || /tnum/.test(s.fontFeatureSettings) || /mono/i.test(s.fontFamily)) tabular += 1;
      }
    }
    const sizes = Object.keys(sizeCount)
      .map(Number)
      .sort((a, b) => b - a);
    const heroSize = sizes[0] ?? 0;
    const bodySize = Number(Object.entries(sizeChars).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 14);
    const shared = (values, value) => values.filter((other) => Math.abs(other - value) <= 2).length >= 3;
    const aligned = lefts.filter((left, i) => shared(lefts, left) || shared(rights, rights[i] ?? -1)).length;

    // ---- lines and gaps: equal gaps between same-level blocks, shared top of columns, shared start of rows
    // the visual box of a block: its frame if it has one, otherwise the outermost texts and frames inside
    const visualBox = (el) => {
      const own = frames.find((frame) => frame.el === el);
      if (own) return { top: own.r.top, bottom: own.r.bottom, left: own.r.left };
      let boxTop = Infinity;
      let boxBottom = -Infinity;
      let boxLeft = Infinity;
      const take = (r) => {
        boxTop = Math.min(boxTop, r.top);
        boxBottom = Math.max(boxBottom, r.bottom);
        boxLeft = Math.min(boxLeft, r.left);
      };
      for (const frame of frames) if (el.contains(frame.el)) take(frame.r);
      let controls = [];
      try {
        controls = [...el.querySelectorAll(`button, input, textarea, [role="progressbar"], ${sel.button}`)];
      } catch {
        controls = [...el.querySelectorAll('button, input, textarea, [role="progressbar"]')];
      }
      for (const control of controls) if (visible(control)) take(control.getBoundingClientRect());
      const inner = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      while (inner.nextNode()) {
        const node = inner.currentNode;
        const holder = node.parentElement;
        if (!(node.textContent ?? '').trim() || !holder || holder.closest('svg, script, style, .sr-only, .visually-hidden') || !visible(holder)) continue;
        range.selectNodeContents(node);
        for (const r of range.getClientRects()) if (r.width > 0.5 && r.height > 0.5) take(r);
      }
      return boxTop === Infinity ? null : { top: boxTop, bottom: boxBottom, left: boxLeft };
    };
    const shown = (el) => {
      if (!visible(el) || !inView(el.getBoundingClientRect())) return false;
      const position = getComputedStyle(el).position;
      return position !== 'fixed' && position !== 'absolute';
    };
    const mainWidth = view.right - view.left;
    let columnTopSpread = null;
    let groupGapSpread = null;
    const stacks = [main];
    for (const el of main.querySelectorAll('div, section, article, aside')) {
      if (!shown(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.width < mainWidth * 0.25 || r.height < 160) continue;
      const kids = [...el.children].filter((kid) => shown(kid) && kid.getBoundingClientRect().height >= 24);
      if (kids.length < 2) continue;
      const rects = kids.map((kid) => kid.getBoundingClientRect());
      const sideBySide = rects.every((kr, i) => i === 0 || kr.left >= (rects[i - 1]?.right ?? 0) - 1) && rects.every((kr) => kr.width >= 240 && kr.height >= 120);
      // page columns: stand side by side and together take most of the main area width
      if (sideBySide && r.width >= mainWidth * 0.5) {
        const tops = kids.map((kid) => visualBox(kid)?.top).filter((value) => typeof value === 'number');
        if (tops.length >= 2) columnTopSpread = Math.max(columnTopSpread ?? 0, round(Math.max(...tops) - Math.min(...tops), 1));
      }
      const stacked = rects.every((kr, i) => i === 0 || kr.top >= (rects[i - 1]?.bottom ?? 0) - 1);
      if (stacked && kids.length >= 3 && !frames.some((frame) => frame.el === el || (frame.el.contains(el) && frame.el !== main))) stacks.push(el);
    }
    for (const el of stacks) {
      // same-level blocks: children of one container outside frames, at least 40 px high and half the container wide
      const width = el.getBoundingClientRect().width;
      const boxes = [...el.children]
        .filter((kid) => shown(kid) && kid.getBoundingClientRect().height >= 40 && kid.getBoundingClientRect().width >= width * 0.5)
        .map((kid) => visualBox(kid))
        .filter(Boolean);
      if (boxes.length < 3) continue;
      const gaps = boxes.slice(1).map((box, i) => box.top - (boxes[i]?.bottom ?? box.top));
      groupGapSpread = Math.max(groupGapSpread ?? 0, round(Math.max(...gaps) - Math.min(...gaps), 1));
    }
    let rowStartSpread = null;
    const firstTextLeft = (el) => {
      const inner = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      while (inner.nextNode()) {
        const node = inner.currentNode;
        const holder = node.parentElement;
        if (!(node.textContent ?? '').trim() || !holder || closest(holder, `svg, .sr-only, .visually-hidden, ${sel.avatar}, ${sel.badge}`) || !visible(holder)) continue;
        range.selectNodeContents(node);
        const r = [...range.getClientRects()].find((rect) => rect.width > 0.5 && rect.height > 0.5);
        if (r) return r.left;
      }
      return null;
    };
    const spreadOf = (cells) => {
      const rows = cells.filter((cell) => shown(cell) && !/right|center|end/.test(getComputedStyle(cell).textAlign));
      // only rows under one another: items in a line (tabs, counters) do not belong here
      if (!rows.every((cell, i) => i === 0 || cell.getBoundingClientRect().top >= (rows[i - 1]?.getBoundingClientRect().bottom ?? 0) - 1)) return;
      const starts = rows.map(firstTextLeft).filter((value) => value !== null);
      if (starts.length < 3) return;
      rowStartSpread = Math.max(rowStartSpread ?? 0, round(Math.max(...starts) - Math.min(...starts), 1));
    };
    for (const list of main.querySelectorAll('ul, ol')) spreadOf([...list.children].filter((item) => item.tagName === 'LI'));
    for (const body of main.querySelectorAll('tbody')) {
      const rows = [...body.children].filter((row) => row.tagName === 'TR');
      const width = Math.max(0, ...rows.map((row) => row.children.length));
      for (let column = 0; column < width; column += 1) spreadOf(rows.map((row) => row.children[column]).filter(Boolean));
    }

    // ---- weight and voids: an empty centre of a row, a right half heavier than the left, separate icons
    // a grid of 24 × N cells 40 px high; a cell is occupied if it holds text, a control, an icon or a framed panel
    const COLS = 24;
    const ROW = 40;
    const rowsCount = Math.max(1, Math.ceil((view.bottom - view.top) / ROW));
    const grid = Array.from({ length: rowsCount }, () => Array.from({ length: COLS }, () => false));
    const cellW = mainWidth / COLS;
    const occupy = (r) => {
      const c0 = Math.max(0, Math.floor((r.left - view.left) / cellW));
      const c1 = Math.min(COLS - 1, Math.floor((r.right - view.left - 0.5) / cellW));
      const r0 = Math.max(0, Math.floor((r.top - view.top) / ROW));
      const r1 = Math.min(rowsCount - 1, Math.floor((r.bottom - view.top - 0.5) / ROW));
      for (let y = r0; y <= r1; y += 1) for (let x = c0; x <= c1; x += 1) grid[y][x] = true;
    };
    for (const frame of frames) occupy(frame.r);
    let looseIcons = 0;
    let solid = [];
    try {
      solid = [...main.querySelectorAll(`button, input, textarea, select, svg, img, [role="progressbar"], ${sel.button}, ${sel.badge}, ${sel.avatar}`)];
    } catch {
      solid = [...main.querySelectorAll('button, input, textarea, select, svg, img, [role="progressbar"]')];
    }
    for (const el of solid) {
      if (el.closest('[data-ui-overlay]') || !visible(el)) continue;
      const r = el.getBoundingClientRect();
      if (!inView(r)) continue;
      occupy(r);
      if (el.tagName.toLowerCase() === 'svg' && !closest(el, `button, input, [role="tab"], [role="checkbox"], ${sel.button}, ${sel.avatar}`) && r.width <= 32) looseIcons += 1;
    }
    const cells = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
    while (cells.nextNode()) {
      const node = cells.currentNode;
      const holder = node.parentElement;
      if (!(node.textContent ?? '').trim() || !holder || holder.closest('svg, script, style, .sr-only, .visually-hidden, [data-ui-overlay]') || !visible(holder)) continue;
      range.selectNodeContents(node);
      for (const r of range.getClientRects()) if (r.width > 0.5 && r.height > 0.5 && inView(r)) occupy(r);
    }
    let rowVoidMax = 0;
    let leftCells = 0;
    let rightCells = 0;
    // the page header (title on the left, buttons on the right) is an accepted device: its rows do not count as voids
    const pageTitle = main.querySelector('h1');
    const headerRows = pageTitle && visible(pageTitle) ? Math.ceil((pageTitle.getBoundingClientRect().bottom + 8 - view.top) / ROW) : 0;
    for (const [y, line] of grid.entries()) {
      const firstUsed = line.indexOf(true);
      const lastUsed = line.lastIndexOf(true);
      line.forEach((used, x) => {
        if (!used) return;
        if (x < COLS / 2) leftCells += 1;
        else rightCells += 1;
      });
      if (firstUsed < 0 || firstUsed === lastUsed || y < headerRows) continue;
      let run = 0;
      for (let x = firstUsed; x <= lastUsed; x += 1) {
        run = line[x] ? 0 : run + 1;
        rowVoidMax = Math.max(rowVoidMax, run / COLS);
      }
    }
    const rightShare = leftCells + rightCells > 0 ? round(rightCells / (leftCells + rightCells)) : null;

    const result = {
      mainSource,
      primarySource,
      heroSize,
      heroCount: sizeCount[String(heroSize)] ?? 0,
      bodySize,
      heroRatio: round(heroSize / Math.max(1, bodySize)),
      heroX: heroBox ? round((heroBox.x - view.left) / Math.max(1, view.right - view.left)) : null,
      heroY: heroBox ? round((heroBox.y - view.top) / Math.max(1, view.bottom - view.top)) : null,
      sizeLevels: sizes.length,
      framesFirstViewport: frames.length,
      topLevelFrames: top.length,
      sameSizeFrames,
      areaRatio: areaRatio === null ? null : round(areaRatio),
      nestedFramesMax,
      alignedShare: round(texts ? aligned / texts : 1),
      primaryButtons,
      tintShare: round(tintArea / viewArea, 3),
      coloredTextShare: round(texts ? colored / texts : 0),
      firstViewportFill: round((lowest - view.top) / Math.max(1, view.bottom - view.top)),
      scrollScreens: round(document.documentElement.scrollHeight / vh),
      tabularShare: numbers ? round(tabular / numbers) : null,
      columnTopSpread,
      groupGapSpread,
      rowStartSpread,
      rowVoidMax: round(rowVoidMax),
      rightShare,
      looseIcons,
      flags: [],
    };
    if (result.heroRatio < 2 || result.heroCount > 2) result.flags.push('no-hero');
    else if ((result.heroX ?? 0) > 0.6 || (result.heroY ?? 0) > 0.5) result.flags.push('hero-off');
    if (result.sameSizeFrames >= 4) result.flags.push('equal-cards');
    if (result.framesFirstViewport > 8) result.flags.push('frame-heavy');
    if (result.nestedFramesMax >= 3) result.flags.push('nested-frames');
    if (result.primaryButtons > 1) result.flags.push('multi-primary');
    if (result.tintShare > 0.16 || result.coloredTextShare > 0.25) result.flags.push('color-noise');
    if (result.alignedShare < 0.6) result.flags.push('loose-alignment');
    if (result.tabularShare !== null && result.tabularShare < 0.9) result.flags.push('numbers-not-tabular');
    if (result.firstViewportFill < 0.6) result.flags.push('half-empty');
    if (columnTopSpread !== null && columnTopSpread > 4) result.flags.push('columns-top-off');
    if (groupGapSpread !== null && groupGapSpread > 8) result.flags.push('uneven-gaps');
    if (rowStartSpread !== null && rowStartSpread > 2) result.flags.push('ragged-rows');
    // on a phone there is one column: voids in a row and the weight of the sides are not judged
    if (mainWidth >= 700 && result.rowVoidMax > 0.25) result.flags.push('hollow-row');
    if (mainWidth >= 700 && rightShare !== null && rightShare > 0.58) result.flags.push('right-heavy');
    if (looseIcons > 12) result.flags.push('icon-noise');
    return result;
  }, config);
}

/** "Squint": the same viewport blurred and grey. If the main thing is not visible on it, there is no hierarchy (COMP-9). */
export async function squintShot(page, path) {
  await page.evaluate(() => {
    document.documentElement.style.filter = 'blur(5px) grayscale(1)';
  });
  await page.screenshot({ path, animations: 'disabled', caret: 'hide' });
  await page.evaluate(() => {
    document.documentElement.style.filter = '';
  });
}
