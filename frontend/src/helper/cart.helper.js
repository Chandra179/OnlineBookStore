/**
 * @param {String} userEmail
 * @param {Array} cartItem
 */
 function setCartItem (userEmail, cartItem) {
  localStorage.setItem(userEmail, JSON.stringify(cartItem));
};



/**
 * @param {String} userEmail
 * @returns {Object} cart items
 */
function getCartItem (userEmail) {
  const cartItem = localStorage.getItem(userEmail)
    ? JSON.parse(localStorage.getItem(userEmail))
    : {};
  return cartItem;
};



/**
 * @param {String} userEmail
 */
 function removeCart (userEmail) {
  localStorage.removeItem(userEmail);
};



/**
 * @param {String} userEmail
 * @returns {Number} total items in cart
 */
function cartBadge (userEmail) {
  const cartItem = JSON.parse(localStorage.getItem(userEmail));
  if (cartItem) {
    const cartKeys = Object.keys(cartItem).length;
    var qty = 0;
    for (var i = 0; i < cartKeys; i++) {
      qty += Number(Object.values(cartItem)[i]["qty"]);
    }
  }
  return qty;
};



/**
 * @param {Number} qty quantity input
 * @param {Number} stock book stock
 * @returns {Number} qty
 */
function qtyValidator (qty, stock) {
  var newQty = qty;
  if (qty > stock) {
    newQty = stock;
  }
  if (newQty.toString()[0] !== "0") {
    return newQty;
  } else {
    return 0;
  }
};



/**
 * @param {String} userEmail
 * @returns {Object} cart items
 */
function isItemInCart (userEmail) {
  const item = getCartItem(userEmail)
  if (Object.keys(item).length !== 0) {
    return item;
  }
}

const CartHelper = {
  setCartItem,
  getCartItem,
  removeCart,
  cartBadge,
  qtyValidator,
  isItemInCart
}

export default CartHelper;