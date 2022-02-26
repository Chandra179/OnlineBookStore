/**
 * Count cart item
 * @param {str} props.userEmail
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

const CartHelper = {
  cartBadge,
};

export default CartHelper;
