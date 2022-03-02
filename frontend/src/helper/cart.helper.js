/**
 * @param {str} props.userEmail
 */
const getCartItem = (userEmail) => {
  const cartItem = localStorage.getItem(userEmail)
    ? JSON.parse(localStorage.getItem(userEmail))
    : {};
  return cartItem;
};



/**
 * @param {str} props.userEmail
 * @param {obj} props.cartItem
 */
const setCartItem = (userEmail, cartItem) => {
  localStorage.setItem(userEmail, JSON.stringify(cartItem));
};



/**
 * @param {str} props.userEmail
 * count cart item
 */
const cartBadge = (userEmail) => {
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
 * @param {str} props.qty
 */
const qtyStockValidator = (qty, stock) => {
  var newQty = qty;
  if (newQty > stock) {
    newQty = stock;
  }
  if (newQty.toString()[0] !== "0") {
    return newQty;
  } else {
    return '';
  }
};


const CartHelper = {
  cartBadge,
  getCartItem,
  setCartItem,
  qtyStockValidator
};

export default CartHelper;
