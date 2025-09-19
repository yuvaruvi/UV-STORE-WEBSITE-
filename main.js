document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");
  const productsSection = document.getElementById("products");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  // Product data
  const products = [
    { id: 1, name: "Hustle Tee", price: 599, image: "images/hustle-tee.jpg" },
    { id: 2, name: "Grind Hoodie", price: 1199, image: "images/grind-hoodie.jpg" },
    { id: 3, name: "Dream Big Tee", price: 599, image: "images/dream-tee.jpg" },
  ];

  // Cart
  let cart = [];

  // Simulate loading delay
  setTimeout(() => {
    loader.style.display = "none";
    content.style.display = "block";
    loadProducts();
  }, 1500);

  // Load products dynamically
  function loadProducts() {
    productsSection.innerHTML = "";
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;

      productsSection.appendChild(productCard);
    });
  }

  // Add to cart
  window.addToCart = function (id) {
    const product = products.find((p) => p.id === id);
    if (product) {
      cart.push(product);
      updateCartUI();
    }
  };

  // Update cart UI
  function updateCartUI() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ₹${item.price}`;
      cartItems.appendChild(li);
      total += item.price;
    });
    cartTotal.textContent = `Total: ₹${total}`;
  }
});
