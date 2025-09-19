/* Cart utility for static site. Uses localStorage key "uv_cart" */
class Cart {
  constructor() {
    this.key = 'uv_cart';
    this.items = JSON.parse(localStorage.getItem(this.key) || '[]');
    this.updateBadge();
  }

  save() { localStorage.setItem(this.key, JSON.stringify(this.items)); this.updateBadge(); }

  add(productId, qty = 1) {
    const existing = this.items.find(i => i.id === productId);
    if (existing) existing.qty += qty;
    else {
      const product = PRODUCTS.find(p => p.id === productId);
      if (!product) return;
      this.items.push({ id: productId, name: product.name, price: product.price, img: product.img, qty });
    }
    this.save();
  }

  remove(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this.save();
  }

  updateQty(productId, qty) {
    if (qty <= 0) { this.remove(productId); return; }
    const item = this.items.find(i => i.id === productId);
    if (item) { item.qty = qty; this.save(); }
  }

  clear() { this.items = []; this.save(); }

  getTotal() {
    return this.items.reduce((s,i) => s + i.qty * i.price, 0);
  }

  getCount() {
    return this.items.reduce((s,i) => s + i.qty, 0);
  }

  updateBadge() {
    document.querySelectorAll('#cart-count').forEach(el => {
      el.textContent = this.getCount();
      // small pop animation
      if (this.getCount() > 0) {
        el.animate([{ transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 260, easing: 'cubic-bezier(.2,.9,.2,1)' });
      }
    });
  }

  getItems(){ return this.items; }
}

window.UV_CART = new Cart();
