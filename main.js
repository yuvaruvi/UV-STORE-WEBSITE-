document.addEventListener('DOMContentLoaded', () => {
  // YEAR
  document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

  // PRELOADER: simulate progressive load
  const preloader = document.getElementById('preloader');
  const loaderBar = document.getElementById('loader-bar');
  let progress = 0;
  const progStep = () => {
    progress += Math.random() * 18 + 8;
    if (progress >= 98) progress = 98;
    loaderBar.style.width = progress + '%';
    if (!preloader.classList.contains('hidden')) setTimeout(progStep, 220 + Math.random() * 160);
  };
  progStep();

  window.addEventListener('load', () => {
    // finish loader
    loaderBar.style.width = '100%';
    setTimeout(()=> {
      preloader.classList.add('hidden');
      // small background hero zoom out
      document.querySelector('.hero-bg')?.animate([{ transform: 'scale(1.02)'}, { transform: 'scale(1)' }], { duration: 900, easing: 'ease-out'})
    }, 480);
  });

  // NAV toggle for mobile
  const navToggle = document.getElementById('navToggle');
  navToggle?.addEventListener('click', () => {
    document.querySelector('.nav')?.classList.toggle('open');
  });

  // Render featured on index
  const featuredTarget = document.getElementById('featured-products');
  if (featuredTarget && window.PRODUCTS) {
    renderProductsGrid(featuredTarget, PRODUCTS.slice(0,6));
  }

  // Hook add-to-cart (delegation)
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart');
    if (btn) {
      const id = btn.dataset.id;
      window.UV_CART.add(id, 1);
      window.UV_CART.updateBadge();
      btn.textContent = 'Added';
      setTimeout(()=> btn.textContent = 'Add to cart', 800);
    }
  });

  // Newsletter (only front-end)
  document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const em = e.target.querySelector('input[name="email"]').value;
    alert('Thanks — we will notify ' + em + ' when the next drop is ready.');
    e.target.reset();
  });

  // IntersectionObserver for reveals (stagger)
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(()=> entry.target.classList.add('show'), idx * 80);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => obs.observe(el));

  // Small hero parallax on mouse move (desktop only)
  const hero = document.getElementById('hero');
  if (hero && window.matchMedia('(hover: hover)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const w = hero.clientWidth, h = hero.clientHeight;
      const rx = (e.clientX - w/2) / w;
      const ry = (e.clientY - h/2) / h;
      const bg = document.querySelector('.hero-bg');
      if (bg) bg.style.transform = `translate(${rx * 8}px, ${ry * 6}px) scale(1)`;
    });
    hero.addEventListener('mouseleave', () => {
      const bg = document.querySelector('.hero-bg');
      if (bg) bg.style.transform = 'translate(0px,0px) scale(1)';
    });
  }
});

/* Render helpers (same style as earlier) */
function formatINR(v){ return '₹' + v.toFixed(0); }

function renderProductCard(p){
  const el = document.createElement('article');
  el.className = 'product-card reveal';
  el.innerHTML = `
    <div class="product-media"><img src="${p.img}" alt="${p.name}"></div>
    <div class="product-meta">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
        <div class="product-title">${p.name}</div>
        <div class="product-price">${formatINR(p.price)}</div>
      </div>
      <p class="muted" style="margin:8px 0 0">${p.desc}</p>
    </div>
    <div style="display:flex;gap:10px;align-items:center;justify-content:flex-end;margin-top:12px">
      <button class="add-to-cart" data-id="${p.id}">Add to cart</button>
    </div>
  `;
  return el;
}

function renderProductsGrid(targetEl, productsArray) {
  targetEl.innerHTML = '';
  productsArray.forEach((p, i) => {
    const node = renderProductCard(p);
    targetEl.appendChild(node);
    // small stagger reveal
    setTimeout(()=> node.classList.add('show'), 120 * i);
  });
}
