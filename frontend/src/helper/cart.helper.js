/*
    count total item in user cart
*/
const cartBadge = (userEmail) => {
  const item = JSON.parse(localStorage.getItem(userEmail));
  if (item !== null) {
    const cartKeys = Object.keys(item).length;
    var itemQty = 0;
    for (var i = 0; i < cartKeys; i++) {
      itemQty += Number(Object.values(item)[i]["qty"]);
    }
  }
  return itemQty;
};

const CartHelper = {
  cartBadge,
};

export default CartHelper;
