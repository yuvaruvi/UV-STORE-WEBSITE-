// ==========================
// Preloader & Gold Loader Bar
// ==========================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const loaderBar = document.getElementById('loader-bar');

  // Animate loader bar to 100%
  let width = 0;
  const loaderInterval = setInterval(() => {
    if (width >= 100) {
      clearInterval(loaderInterval);
    } else {
      width += 5;
      loaderBar.style.width = width + '%';
    }
  }, 20);

  // Fade out preloader
  if (preloader) {
    preloader.style.opacity = '0';
    preloader.style.pointerEvents = 'none';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  }

  // Reveal all fade-in sections
  const fadeIns = document.querySelectorAll('.fade-in');
  fadeIns.forEach(section => section.classList.add('visible'));
});

// ==========================
// Smooth Scroll for Anchor Links
// ==========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==========================
// Hamburger Menu Toggle (for mobile)
// ==========================
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');

if(navToggle){
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
}

// ==========================
// Cart Count Update (basic hookup)
// ==========================
function updateCartCount(count){
  const cartCount = document.getElementById('cart-count');
  if(cartCount){
    cartCount.textContent = count;
  }
}

// Example: hook this with your cart.js add/remove
window.addToCart = function(id, name, price){
  // Call your cart.js function here
  // e.g., Cart.addItem(id, name, price);
  console.log(`Added ${name} - ₹${price}`);
  // Increment count visually
  const cartCount = document.getElementById('cart-count');
  let count = parseInt(cartCount.textContent) || 0;
  cartCount.textContent = count + 1;
}
