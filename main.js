// ==========================
// Preloader & Gold Loader Bar
// ==========================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const loaderBar = document.getElementById('loader-bar');

  // Animate loader bar smoothly
  let width = 0;
  const loaderInterval = setInterval(() => {
    if (width >= 100) {
      clearInterval(loaderInterval);
    } else {
      width += 2; // slower and smoother
      loaderBar.style.width = width + '%';
    }
  }, 15);

  // Fade out preloader after page load
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
// Hamburger Menu Toggle (Mobile)
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
// Search Toggle
// ==========================
const searchToggle = document.getElementById('searchToggle');
if(searchToggle){
  searchToggle.addEventListener('click', () => {
    const searchBox = document.getElementById('searchBox');
    if(searchBox){
      searchBox.classList.toggle('visible');
    }
  });
}

// ==========================
// Fade-in on Scroll (dynamic)
// ==========================
const revealOnScroll = () => {
  const fadeIns = document.querySelectorAll('.fade-in');
  const windowBottom = window.innerHeight + window.scrollY;

  fadeIns.forEach(el => {
    if(windowBottom > el.offsetTop + 100){
      el.classList.add('visible');
    }
  });
};
window.addEventListener('scroll', revealOnScroll);

// ==========================
// Cart Functionality Hookup
// ==========================
function updateCartCount(count){
  const cartCount = document.getElementById('cart-count');
  if(cartCount){
    cartCount.textContent = count;
  }
}

// Example function to add item to cart
window.addToCart = function(id, name, price){
  console.log(`Added ${name} - ₹${price}`);
  // Increment cart count
  const cartCount = document.getElementById('cart-count');
  let count = parseInt(cartCount.textContent) || 0;
  cartCount.textContent = count + 1;

  // Here you can call your cart.js logic to actually store the item
  // e.g., Cart.addItem(id, name, price);
}

// ==========================
// Newsletter Form
// ==========================
const newsletterForm = document.getElementById('newsletter-form');
if(newsletterForm){
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[name="email"]').value;
    console.log(`Newsletter signup: ${email}`);
    alert('Thanks! You are signed up.');
    newsletterForm.reset();
  });
}

// ==========================
// Set current year in footer
// ==========================
document.getElementById('year').textContent = new Date().getFullYear();
