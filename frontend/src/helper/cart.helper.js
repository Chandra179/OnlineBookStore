/**
 * @param {str} props.userEmail
 * @param {obj} props.cartItem
 */
 const setCartItem = (userEmail, cartItem) => {
  localStorage.setItem(userEmail, JSON.stringify(cartItem));
};



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
 */
 const deleteCartItem = (userEmail) => {
  localStorage.removeItem(userEmail);
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
  if (qty > stock) {
    newQty = stock;
  } else if (qty < 1) {
    newQty = 0;
  }
  if (newQty.toString()[0] !== "0") {
    return newQty;
  } else {
    return '';
  }
};


const checkItemInCart = (userEmail) => {
  const item = getCartItem(userEmail)
  if (Object.keys(item).length !== 0) {
    return item;
  }
}


const CartHelper = {
  cartBadge,
  setCartItem,
  getCartItem,
  deleteCartItem,
  qtyStockValidator,
  checkItemInCart
};

export default CartHelper;
