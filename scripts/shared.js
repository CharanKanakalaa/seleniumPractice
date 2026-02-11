// shared.js

const STORAGE_KEY = "simpleshop_cart_v1";

// Cart utility with localStorage persistence
const Cart = {
  get() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { items: [] };
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed.items)) return { items: [] };
      return parsed;
    } catch {
      return { items: [] };
    }
  },
  set(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  },
  clear() {
    this.set({ items: [] });
  },
  count() {
    return this.get().items.reduce((acc, it) => acc + it.qty, 0);
  },
  subtotal() {
    return this.get().items.reduce((acc, it) => acc + it.price * it.qty, 0);
  },
  updateQty(id, qty) {
    const cart = this.get();
    const idx = cart.items.findIndex(i => i.id === id);
    if (idx >= 0) {
      cart.items[idx].qty = Math.max(1, qty | 0);
      this.set(cart);
    }
  },
  increment(id) {
    const cart = this.get();
    const idx = cart.items.findIndex(i => i.id === id);
    if (idx >= 0) {
      cart.items[idx].qty += 1;
      this.set(cart);
    }
  },
  decrement(id) {
    const cart = this.get();
    const idx = cart.items.findIndex(i => i.id === id);
    if (idx >= 0) {
      cart.items[idx].qty = Math.max(1, cart.items[idx].qty - 1);
      this.set(cart);
    }
  },
  remove(id) {
    const cart = this.get();
    const next = cart.items.filter(i => i.id !== id);
    this.set({ items: next });
  }
};