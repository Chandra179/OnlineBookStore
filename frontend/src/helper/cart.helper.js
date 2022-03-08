/**
 * @param {String} userEmail
 * @param {Array} cartItem
 */
 function setCartItem (userEmail, cartItem) {
  localStorage.setItem(userEmail, JSON.stringify(cartItem));
};



/**
 * @param {String} userEmail
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
 * count cart item
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
 * @param {number} qty
 * @param {number} stock
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