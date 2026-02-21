/* ═══════════════════════════════════════════════
   CONFIG (loaded from config.yaml)
   ═══════════════════════════════════════════════ */
const CACHE_BUST = '';
let CONFIG;

async function loadConfig() {
  const res = await fetch('config.yaml' + CACHE_BUST);
  const text = await res.text();
  CONFIG = jsyaml.load(text);
}

/* ═══════════════════════════════════════════════
   ICONS (Lucide-style SVGs)
   ═══════════════════════════════════════════════ */
const ICONS = {
  location: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',

  link: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',

  twitter: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16h-4.267z"></path><path d="M4 20l6.768 -6.768"></path><path d="M20 4l-6.768 6.768"></path></svg>',

  github: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>',

  instagram: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>',

  linkedin: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>',

  email: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>',

  copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>',

  check: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',

  arrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>',

  menu: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>',
};

/* ═══════════════════════════════════════════════
   STATE
   ═══════════════════════════════════════════════ */
let currentLang = 'ar';
let currentPage = 'home';
let pageCache = {};
let availableFiles = {};
let manifests = {};

/* ═══════════════════════════════════════════════
   CORE FUNCTIONS
   ═══════════════════════════════════════════════ */

async function fetchMd(path, lang) {
  const key = path + '.' + lang;
  if (pageCache[key] !== undefined) return pageCache[key];
  try {
    const res = await fetch('pages/' + path + '.' + lang + '.md' + CACHE_BUST);
    if (!res.ok) throw new Error('Not found');
    const text = await res.text();
    pageCache[key] = text;
    return text;
  } catch {
    pageCache[key] = null;
    return null;
  }
}

function parseFrontMatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: text };
  const meta = {};
  match[1].split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(s => s.trim());
    }
    meta[key] = value;
  });
  return { meta, body: match[2] };
}

async function detectAvailableFiles() {
  for (const [slug, arLabel, enLabel] of CONFIG.pages) {
    availableFiles[slug] = {
      ar: arLabel != null,
      en: enLabel != null
    };
  }

  const checks = [];
  for (const [slug] of CONFIG.collections) {
    checks.push(
      fetch('pages/' + slug + '/_manifest.json' + CACHE_BUST)
        .then(res => {
          if (!res.ok) throw new Error('Not found');
          return res.json();
        })
        .then(data => { manifests[slug] = data; })
        .catch(() => { manifests[slug] = { entries: [] }; })
    );
  }
  await Promise.all(checks);
}

function hasPage(slug, lang) {
  return availableFiles[slug] && availableFiles[slug][lang] === true;
}

function setLang(lang) {
  currentLang = lang;
  try { localStorage.setItem('lang', lang); } catch(e) {}
  route();
}

/* ═══════════════════════════════════════════════
   RENDERING
   ═══════════════════════════════════════════════ */

function renderSidebar() {
  const a = CONFIG.author;
  const lang = currentLang;
  const name = a.name[lang] || a.name.ar || '';
  const bio = a.bio[lang] || a.bio.ar || '';

  let socialHtml = '';
  for (const s of a.social) {
    const icon = ICONS[s.platform] || ICONS.link;
    socialHtml += `<a href="${s.url}" class="social-link" target="_blank" rel="noopener" aria-label="${s.label}">${icon}<span>${s.label}</span></a>`;
  }

  const html = `
    <div class="sidebar-inner">
      <div class="profile-card">
        <img class="avatar" src="${a.avatar}" alt="${name}" loading="lazy">
        <h2 class="author-name">${name}</h2>
        <p class="author-bio">${bio}</p>
      </div>
      <div class="author-info">
        ${a.location ? `<div class="info-item">${ICONS.location}<span>${a.location}</span></div>` : ''}
        ${a.website ? `<div class="info-item">${ICONS.link}<a href="${a.website.url}" target="_blank" rel="noopener">${a.website.label}</a></div>` : ''}
      </div>
      <div class="author-links">
        ${socialHtml}
      </div>
    </div>
  `;

  document.getElementById('sidebar').innerHTML = html;
}

function renderNav() {
  const nav = document.getElementById('nav-links');
  nav.innerHTML = '';

  const base = currentPage.split('/')[0];

  for (const [slug, arLabel, enLabel] of CONFIG.pages) {
    if (!hasPage(slug, currentLang)) continue;
    const a = document.createElement('a');
    a.href = '#' + slug;
    a.textContent = currentLang === 'ar' ? arLabel : enLabel;
    if (base === slug) a.classList.add('active');
    nav.appendChild(a);
  }

  for (const [slug, arLabel, enLabel] of CONFIG.collections) {
    const manifest = manifests[slug];
    if (!manifest || manifest.entries.length === 0) continue;
    const a = document.createElement('a');
    a.href = '#' + slug;
    a.textContent = currentLang === 'ar' ? arLabel : enLabel;
    if (base === slug) a.classList.add('active');
    nav.appendChild(a);
  }
}

function entryHasBothLangs(collectionSlug, entrySlug) {
  const manifest = manifests[collectionSlug];
  if (!manifest) return false;
  const entry = manifest.entries.find(e => e.slug === entrySlug);
  if (!entry) return false;
  return !!(entry.langs.ar && entry.langs.en);
}

function renderLangToggle() {
  const toggle = document.getElementById('lang-toggle');
  const segments = currentPage.split('/');
  const base = segments[0];
  const child = segments[1] || null;

  let showToggle = false;

  const isCollection = CONFIG.collections.some(([slug]) => slug === base);

  if (isCollection && child) {
    showToggle = entryHasBothLangs(base, child);
  } else if (isCollection) {
    showToggle = true;
  } else {
    showToggle = hasPage(base, 'ar') && hasPage(base, 'en');
  }

  toggle.style.display = showToggle ? 'flex' : 'none';

  const buttons = toggle.querySelectorAll('button');
  buttons[0].classList.toggle('active', currentLang === 'ar');
  buttons[1].classList.toggle('active', currentLang === 'en');
}

/* ═══════════════════════════════════════════════
   ROUTER
   ═══════════════════════════════════════════════ */

async function route() {
  const hash = location.hash.replace('#', '') || 'home';
  currentPage = hash;

  const segments = hash.split('/');
  const base = segments[0];
  const child = segments[1] || null;

  const isCollection = CONFIG.collections.some(([slug]) => slug === base);

  if (isCollection && child) {
    await renderEntry(base, child);
  } else if (isCollection) {
    renderListing(base);
  } else {
    await renderStaticPage(base);
  }
}

/* ═══════════════════════════════════════════════
   PAGE RENDERERS
   ═══════════════════════════════════════════════ */

async function renderStaticPage(slug) {
  const contentEl = document.getElementById('content');

  let lang = currentLang;
  if (!hasPage(slug, lang)) {
    lang = lang === 'ar' ? 'en' : 'ar';
    currentLang = lang;
    try { localStorage.setItem('lang', lang); } catch(e) {}
  }

  const md = await fetchMd(slug, lang);
  if (!md) {
    contentEl.innerHTML = '<h1>Page not found</h1><p>This page does not exist.</p>';
    applyDirection(lang);
    renderSidebar(); renderNav(); renderLangToggle();
    return;
  }

  applyDirection(lang);
  contentEl.innerHTML = marked.parse(md);
  postProcessContent(contentEl);
  renderSidebar(); renderNav(); renderLangToggle();
  retriggerAnimation(contentEl);

  const h1 = contentEl.querySelector('h1');
  if (h1) document.title = h1.textContent + ' — ' + siteName(lang);
  updateMetaTags(document.title);
  renderFooter();
  window.scrollTo(0, 0);
}

function renderListing(collectionSlug) {
  const contentEl = document.getElementById('content');
  const manifest = manifests[collectionSlug];
  const collectionConfig = CONFIG.collections.find(([slug]) => slug === collectionSlug);

  if (!manifest || !collectionConfig) {
    contentEl.innerHTML = '<h1>Not found</h1>';
    applyDirection(currentLang);
    renderSidebar(); renderNav(); renderLangToggle();
    return;
  }

  const [, arLabel, enLabel, type] = collectionConfig;
  const lang = currentLang;
  const title = lang === 'ar' ? arLabel : enLabel;

  applyDirection(lang);

  let html = `<div class="listing-header"><h1>${title}</h1></div>`;

  if (type === 'blog') {
    html += '<div class="entry-cards">';
    for (const entry of manifest.entries) {
      const meta = getEntryMeta(entry, lang);
      if (!meta) continue;

      const coverClass = meta.cover ? '' : ' no-cover';
      const coverStyle = meta.cover ? ` style="background-image: url('${meta.cover}')"` : '';
      const tagsHtml = (meta.tags || [])
        .map(t => `<span class="tag">${t}</span>`)
        .join('');

      html += `
        <a href="#${collectionSlug}/${entry.slug}" class="entry-card">
          <div class="entry-card-cover${coverClass}"${coverStyle}></div>
          <div class="entry-card-body">
            <div class="entry-card-meta">
              <time>${formatDate(meta.date, lang)}</time>
            </div>
            <h2 class="entry-card-title">${meta.title}</h2>
            <p class="entry-card-excerpt">${meta.excerpt}</p>
            ${tagsHtml ? `<div class="entry-card-tags">${tagsHtml}</div>` : ''}
          </div>
        </a>`;
    }
    html += '</div>';

  } else {
    html += '<div class="post-list">';
    for (const entry of manifest.entries) {
      const meta = getEntryMeta(entry, lang);
      if (!meta) continue;

      html += `
        <a href="#${collectionSlug}/${entry.slug}" class="post-item">
          <time class="post-item-date">${formatDate(meta.date, lang)}</time>
          <div class="post-item-body">
            <h3 class="post-item-title">${meta.title}</h3>
            <p class="post-item-excerpt">${meta.excerpt}</p>
          </div>
        </a>`;
    }
    html += '</div>';
  }

  contentEl.innerHTML = html;
  renderSidebar(); renderNav(); renderLangToggle();
  retriggerAnimation(contentEl);
  document.title = title + ' — ' + siteName(lang);
  updateMetaTags(document.title);
  renderFooter();
  window.scrollTo(0, 0);
}

async function renderEntry(collectionSlug, entrySlug) {
  const contentEl = document.getElementById('content');
  const manifest = manifests[collectionSlug];
  const collectionConfig = CONFIG.collections.find(([slug]) => slug === collectionSlug);

  if (!manifest || !collectionConfig) {
    contentEl.innerHTML = '<h1>Not found</h1>';
    applyDirection(currentLang);
    renderSidebar(); renderNav(); renderLangToggle();
    return;
  }

  const [, arLabel, enLabel] = collectionConfig;

  const entry = manifest.entries.find(e => e.slug === entrySlug);
  let lang = currentLang;
  if (entry && !entry.langs[lang]) {
    lang = lang === 'ar' ? 'en' : 'ar';
    currentLang = lang;
    try { localStorage.setItem('lang', lang); } catch(e) {}
  }

  const md = await fetchMd(collectionSlug + '/' + entrySlug, lang);
  if (!md) {
    const backLabel = currentLang === 'ar' ? arLabel : enLabel;
    contentEl.innerHTML = `
      <a href="#${collectionSlug}" class="back-link">${ICONS.arrowLeft} ${backLabel}</a>
      <h1>Post not found</h1>
      <p>This entry does not exist.</p>`;
    applyDirection(lang);
    renderSidebar(); renderNav(); renderLangToggle();
    return;
  }

  const { meta, body } = parseFrontMatter(md);

  applyDirection(lang);

  const backLabel = lang === 'ar' ? arLabel : enLabel;
  const tagsHtml = (meta.tags || [])
    .map(t => `<span class="tag">${t}</span>`)
    .join('');

  let headerHtml = `<a href="#${collectionSlug}" class="back-link">${ICONS.arrowLeft} ${backLabel}</a>`;

  if (meta.cover) {
    headerHtml += `<img class="entry-cover" src="${meta.cover}" alt="${meta.title || ''}">`;
  }

  headerHtml += `
    <div class="entry-meta">
      ${meta.date ? `<time>${formatDate(meta.date, lang)}</time>` : ''}
      ${tagsHtml ? `<div class="entry-tags">${tagsHtml}</div>` : ''}
    </div>`;

  contentEl.innerHTML = headerHtml + marked.parse(body);
  postProcessContent(contentEl);
  renderSidebar(); renderNav(); renderLangToggle();
  retriggerAnimation(contentEl);
  document.title = (meta.title || entrySlug) + ' — ' + siteName(lang);
  updateMetaTags(document.title, meta.excerpt, meta.cover);
  renderFooter();
  window.scrollTo(0, 0);
}

/* ═══════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════ */

function siteName(lang) {
  return CONFIG.siteName[lang] || CONFIG.siteName.ar;
}

function applyTheme() {
  if (!CONFIG.theme || !CONFIG.theme.accent) return;
  const hex = CONFIG.theme.accent.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  document.documentElement.style.setProperty('--accent', CONFIG.theme.accent);
  document.documentElement.style.setProperty('--accent-light', `rgba(${r},${g},${b},0.08)`);

  // Update favicon with accent color and first letter of site name
  const letter = (CONFIG.siteName.ar || 'S').charAt(0);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="${CONFIG.theme.accent}"/><text x="16" y="23" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#fff">${letter}</text></svg>`;
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  let link = document.querySelector('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.type = 'image/svg+xml';
  link.href = url;
}

function updateMetaTags(title, description, image) {
  const desc = description || (CONFIG.seo && CONFIG.seo.description && (CONFIG.seo.description[currentLang] || CONFIG.seo.description.ar)) || '';
  let img = image || (CONFIG.seo && CONFIG.seo.image) || '';
  if (img && !img.startsWith('http')) {
    img = location.origin + (img.startsWith('/') ? '' : '/') + img;
  }
  const pageTitle = title || document.title;

  const setMeta = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute('content', value);
  };

  setMeta('meta[name="description"]', desc);
  setMeta('meta[property="og:title"]', pageTitle);
  setMeta('meta[property="og:description"]', desc);
  setMeta('meta[property="og:image"]', img);
  setMeta('meta[property="og:url"]', location.href);
  setMeta('meta[name="twitter:title"]', pageTitle);
  setMeta('meta[name="twitter:description"]', desc);
  setMeta('meta[name="twitter:image"]', img);
}

function renderFooter() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  const text = (CONFIG.footer[currentLang] || CONFIG.footer.ar)
    .replace('{year}', new Date().getFullYear());
  footer.innerHTML = text;
}

function applyDirection(lang) {
  const dir = CONFIG.langDir[lang] || 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lang;
  document.body.dir = dir;
}

function postProcessContent(contentEl) {
  contentEl.querySelectorAll('table').forEach(table => {
    if (table.parentElement.classList.contains('table-wrapper')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });

  processCodeBlocks(contentEl);
  processMermaidBlocks(contentEl);
}

function retriggerAnimation(el) {
  el.style.animation = 'none';
  el.offsetHeight;
  el.style.animation = '';
}

function formatDate(dateStr, lang) {
  try {
    const date = new Date(dateStr + 'T00:00:00');
    return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  } catch {
    return dateStr;
  }
}

function getEntryMeta(entry, lang) {
  return entry.langs[lang] || entry.langs.ar || entry.langs.en || null;
}

function toggleSidebar() {
  document.body.classList.toggle('sidebar-open');
}

/* ═══════════════════════════════════════════════
   CODE BLOCK HIGHLIGHTING + COPY
   ═══════════════════════════════════════════════ */

async function copyToClipboard(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
  btn.innerHTML = ICONS.check + ' Copied!';
  btn.classList.add('copied');
  setTimeout(() => {
    btn.innerHTML = ICONS.copy + ' Copy';
    btn.classList.remove('copied');
  }, 2000);
}

function processCodeBlocks(contentEl) {
  contentEl.querySelectorAll('pre code').forEach(codeEl => {
    if (codeEl.classList.contains('language-mermaid')) return;

    hljs.highlightElement(codeEl);

    const pre = codeEl.parentElement;
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement('button');
    btn.className = 'code-copy-btn';
    btn.innerHTML = ICONS.copy + ' Copy';
    btn.addEventListener('click', () => copyToClipboard(codeEl.textContent, btn));
    wrapper.appendChild(btn);
  });
}

/* ═══════════════════════════════════════════════
   MERMAID DIAGRAM RENDERING
   ═══════════════════════════════════════════════ */

async function processMermaidBlocks(contentEl) {
  const codeBlocks = contentEl.querySelectorAll('pre code.language-mermaid');
  if (codeBlocks.length === 0) return;

  codeBlocks.forEach(code => {
    const pre = code.parentElement;
    const wrapper = document.createElement('div');
    wrapper.className = 'mermaid-wrapper';
    const mermaidDiv = document.createElement('div');
    mermaidDiv.className = 'mermaid';
    mermaidDiv.textContent = code.textContent;
    wrapper.appendChild(mermaidDiv);
    pre.parentNode.replaceChild(wrapper, pre);
  });

  try {
    await mermaid.run({ querySelector: '.mermaid' });
  } catch (e) {
    console.warn('Mermaid rendering error:', e);
  }
}

/* ═══════════════════════════════════════════════
   INITIALIZATION
   Wait for DOMContentLoaded so deferred CDN scripts
   (marked, hljs, mermaid) are loaded and ready.
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'neutral',
    securityLevel: 'loose',
    fontFamily: 'IBM Plex Sans, sans-serif'
  });

  marked.setOptions({ breaks: false, gfm: true });

  document.getElementById('menu-btn').innerHTML = ICONS.menu;

  window.addEventListener('hashchange', route);
  document.getElementById('menu-btn').addEventListener('click', toggleSidebar);
  document.getElementById('sidebar-overlay').addEventListener('click', () => {
    document.body.classList.remove('sidebar-open');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.body.classList.remove('sidebar-open');
  });

  (async () => {
    document.getElementById('content').innerHTML = '<div class="loading">Loading...</div>';
    await loadConfig();
    try { currentLang = localStorage.getItem('lang') || CONFIG.defaultLang; } catch(e) {}
    applyTheme();
    document.title = siteName(currentLang);
    await detectAvailableFiles();
    await route();
  })();
});
