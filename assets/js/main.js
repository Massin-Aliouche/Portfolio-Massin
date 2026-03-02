// ============================================
// PORTFOLIO TECH/CYBERSÉCURITÉ - MAIN JS
// Navigation, Animations & Visual Effects
// ============================================

// ============================================
// SECURITY: HTML Escape function to prevent XSS
// ============================================
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function sanitizeUrl(url) {
  if (!url) return '#';
  try {
    const parsed = new URL(url, window.location.origin);
    if (['http:', 'https:'].includes(parsed.protocol)) {
      return parsed.href;
    }
  } catch (e) {}
  return '#';
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Active navigation highlighting
  highlightActiveNav();
  // 2. Smooth scroll for anchor links
  setupSmoothScroll();
  // 3. Staggered scroll reveal animations
  setupScrollAnimations();
  // 4. Mobile menu close on link click
  setupMobileMenuClose();
  // 5. Project filters (page: projets.html)
  setupProjectFilters();
  // 6. RSS feeds (page: vt.html)
  setupRSSFeeds();
  // 7. Particle background
  initParticles();
  // 8. Cursor glow (desktop only)
  initCursorGlow();
  // 9. 3D card tilt on hover
  initCardTilt();
});

// ============================================
// ACTIVE NAVIGATION
// ============================================
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage ||
        (currentPage === 'index.html' && linkHref === '/') ||
        (currentPage === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        const headerOffset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
}

// ============================================
// SCROLL REVEAL WITH STAGGER
// ============================================
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger children if inside a grid
        const parent = entry.target.closest('.grid');
        if (parent) {
          const siblings = Array.from(parent.querySelectorAll('[data-animate]'));
          const index = siblings.indexOf(entry.target);
          entry.target.style.animationDelay = `${index * 0.1}s`;
        }
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate]').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ============================================
// MOBILE MENU
// ============================================
function setupMobileMenuClose() {
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menuToggle = document.querySelector('[x-data]');
      if (menuToggle && window.Alpine) {
        try {
          Alpine.$data(menuToggle).mobileMenuOpen = false;
        } catch (e) {
          // Fallback: click the close button
          const closeBtn = document.querySelector('.mobile-menu button[aria-label]');
          if (closeBtn) closeBtn.click();
        }
      }
    });
  });
}

// ============================================
// PROJECT FILTERS
// ============================================
function setupProjectFilters() {
  const filterBar = document.querySelector('.filter-bar');
  if (!filterBar) return;

  const buttons = Array.from(filterBar.querySelectorAll('.filter-btn'));
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.project-card'));

  function applyFilter(filter) {
    buttons.forEach(b => b.classList.toggle('active', b.dataset.filter === filter));

    cards.forEach(card => {
      const tech = (card.dataset.tech || '').toLowerCase();
      if (filter === 'all' || tech.includes(filter)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  applyFilter('all');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      applyFilter(btn.dataset.filter);
    });
  });
}

// ============================================
// RSS FEEDS
// ============================================
function setupRSSFeeds() {
  const rssContainer = document.getElementById('rssContainer');
  const feedSelect = document.getElementById('feedSelect');
  const refreshBtn = document.getElementById('refreshFeeds');
  const rssStatus = document.getElementById('rssStatus');

  if (!rssContainer || !feedSelect || !refreshBtn) return;

  const FEEDS = {
    zdnet: { title: 'ZDNet Security', url: 'https://www.zdnet.com/topic/security/rss.xml' },
    thehackernews: { title: 'The Hacker News', url: 'https://thehackernews.com/rss' },
    krebsonsecurity: { title: 'KrebsOnSecurity', url: 'https://krebsonsecurity.com/feed/' },
    arstechnica: { title: 'Ars Technica Security', url: 'https://feeds.arstechnica.com/arstechnica/security' }
  };

  const PROXY = 'https://api.allorigins.win/raw?url=';
  const CACHE_TTL = 1000 * 60 * 10;
  const LOCAL_JSON = 'assets/data/rss.json';

  function setStatus(msg) {
    if (rssStatus) rssStatus.textContent = msg;
  }

  function formatDate(d) {
    try { return new Date(d).toLocaleString(); } catch (e) { return ''; }
  }

  function parseFeed(text) {
    const doc = new DOMParser().parseFromString(text, 'application/xml');
    return Array.from(doc.querySelectorAll('item, entry')).map(node => ({
      title: node.querySelector('title')?.textContent || '',
      link: node.querySelector('link')?.textContent || node.querySelector('link')?.getAttribute('href') || '',
      pubDate: node.querySelector('pubDate')?.textContent || node.querySelector('updated')?.textContent || '',
      description: node.querySelector('description')?.textContent || node.querySelector('content')?.textContent || ''
    }));
  }

  function renderItems(items) {
    rssContainer.innerHTML = '';
    if (!items || items.length === 0) {
      rssContainer.innerHTML = '<div class="rss-empty">Aucun article trouvé.</div>';
      return;
    }
    items.slice(0, 8).forEach(it => {
      const card = document.createElement('article');
      card.className = 'rss-card';
      const safeTitle = escapeHtml(it.title);
      const safeLink = sanitizeUrl(it.link);
      const safeDate = escapeHtml(formatDate(it.pubDate));
      const safeExcerpt = escapeHtml((it.description || '').slice(0, 200)) + ((it.description && it.description.length > 200) ? '...' : '');
      card.innerHTML = `
        <h4><a class="rss-link" href="${safeLink}" target="_blank" rel="noopener noreferrer">${safeTitle}</a></h4>
        <div class="rss-meta">${safeDate}</div>
        <div class="rss-excerpt">${safeExcerpt}</div>
      `;
      rssContainer.appendChild(card);
    });
  }

  async function fetchFeed(feedId) {
    const feed = FEEDS[feedId];
    if (!feed) return [];

    const cacheKey = 'rss_cache_' + feedId;
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
      if (cached && (Date.now() - cached.fetchedAt) < CACHE_TTL) return cached.items;
    } catch (e) {}

    setStatus('Chargement...');
    const proxies = [PROXY, 'https://r.jina.ai/http://'];
    for (const p of proxies) {
      try {
        const url = p + encodeURIComponent(feed.url);
        const res = await fetch(url);
        if (!res.ok) throw new Error('fetch failed ' + res.status);
        const text = await res.text();
        const items = parseFeed(text);
        if (items && items.length > 0) {
          localStorage.setItem(cacheKey, JSON.stringify({ items, fetchedAt: Date.now() }));
          setStatus('Dernière mise à jour: ' + new Date().toLocaleTimeString());
          return items;
        }
      } catch (err) {
        console.warn('Proxy failed:', p, err);
      }
    }
    setStatus('Impossible de charger le flux (CORS/proxy).');
    return [];
  }

  async function fetchAll() {
    setStatus('Chargement de tous les flux...');
    const all = [];
    for (const id of Object.keys(FEEDS)) {
      const items = await fetchFeed(id);
      all.push(...items.map(i => ({ ...i, _source: FEEDS[id].title })));
    }
    all.sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0));
    setStatus('Chargement terminé');
    renderItems(all);
  }

  async function initFeeds() {
    try {
      const res = await fetch(LOCAL_JSON + '?_=' + Date.now(), { cache: 'no-store' });
      if (res.ok) {
        const payload = await res.json();
        if (payload && Array.isArray(payload.items) && payload.items.length > 0) {
          setStatus('Chargé depuis rss.json');
          renderItems(payload.items);
          return;
        }
      }
    } catch (e) {}
    fetchAll();
  }

  initFeeds();

  feedSelect.addEventListener('change', async (e) => {
    const val = e.target.value;
    if (val === 'all') { fetchAll(); }
    else { setStatus('Chargement...'); renderItems(await fetchFeed(val)); }
  });

  refreshBtn.addEventListener('click', async () => {
    const val = feedSelect.value;
    if (val === 'all') {
      Object.keys(FEEDS).forEach(id => localStorage.removeItem('rss_cache_' + id));
      fetchAll();
    } else {
      localStorage.removeItem('rss_cache_' + val);
      renderItems(await fetchFeed(val));
    }
  });
}

// ============================================
// PARTICLE BACKGROUND (lightweight canvas)
// ============================================
function initParticles() {
  // Skip on mobile
  if (window.innerWidth < 768) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  let w, h, particles;
  const PARTICLE_COUNT = 60;
  const CONNECTION_DIST = 150;
  const COLORS = ['#00e5ff', '#b44dff', '#ff6ec7', '#56e372'];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.5 + 0.3
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
          ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
}

// ============================================
// CURSOR GLOW (desktop only)
// ============================================
function initCursorGlow() {
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.innerWidth < 768) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  let mouseX = -500, mouseY = -500;
  let glowX = -500, glowY = -500;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    // Smooth lerp follow
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animate);
  }
  animate();
}

// ============================================
// 3D CARD TILT ON HOVER
// ============================================
function initCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cards = document.querySelectorAll('.project-card, .skill-card');

  cards.forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.style.perspective = '800px';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const menuToggle = document.querySelector('[x-data]');
    if (menuToggle && window.Alpine) {
      try {
        Alpine.$data(menuToggle).mobileMenuOpen = false;
      } catch (e2) {
        const closeBtn = document.querySelector('.mobile-menu button[aria-label]');
        if (closeBtn) closeBtn.click();
      }
    }
  }
});

// ============================================
// PREVENT SCROLL WHEN MOBILE MENU OPEN
// ============================================
document.addEventListener('alpine:init', () => {
  // Use MutationObserver to detect menu open/close
  const observer = new MutationObserver(() => {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
      const isVisible = menu.style.display !== 'none' && !menu.hasAttribute('x-cloak');
      document.body.style.overflow = isVisible ? 'hidden' : '';
    }
  });
  const nav = document.querySelector('nav[x-data]');
  if (nav) observer.observe(nav, { subtree: true, attributes: true, attributeFilter: ['style'] });
});
