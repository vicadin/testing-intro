function addToCart(cart, product, quantity = 1) {
  if (typeof quantity !== 'number' || quantity <= 0) {
    throw new RangeError('Кол-во должно быть больше нуля');
  }

  const existing = cart.find((item) => item.id === product.id);
  const currentQuantity = existing ? existing.quantity : 0;
  const targetQuantity = currentQuantity + quantity;

  if (targetQuantity > product.stock) {
    throw new RangeError('Нельзя добавить больше товара, чем есть на складе');
  }

  if (existing) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: targetQuantity } : item
    );
  }

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, id, newQuantity) {
  const item = cart.find((entry) => entry.id === id);
  if (!item) {
    return cart;
  }

  if (typeof newQuantity !== 'number' || newQuantity <= 0) {
    throw new RangeError('Кол-во должно быть больше нуля');
  }

  if (newQuantity > item.stock) {
    throw new RangeError('Нельзя указать кол-во больше остатка');
  }

  return cart.map((entry) =>
    entry.id === id ? { ...entry, quantity: newQuantity } : entry
  );
}

function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode = '') {
  const subtotal = calculateCartSubtotal(cart);
  if (subtotal === 0) {
    return { subtotal: 0, discount: 0, delivery: 0, total: 0 };
  }

  const delivery = subtotal >= 50000 ? 0 : 30000;
  const isPromo = typeof promoCode === 'string' && promoCode.trim().toUpperCase() === 'SAVE10';
  const discount = isPromo && subtotal >= 20000 ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount + delivery;

  return { subtotal, discount, delivery, total };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
