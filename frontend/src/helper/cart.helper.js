const cartLength = (userEmail) => {
    const itemInCart = JSON.parse(localStorage.getItem(userEmail))
    if (itemInCart !== null) {
        const cartKeys = Object.keys(itemInCart).length;
        var itemQty = 0;
        for (var i = 0; i < cartKeys; i++) {
            itemQty += Number(Object.values(itemInCart)[i]['qty']);
        }
    }
    return itemQty;
};

const CartHelper = {
    cartLength,
};

export default CartHelper;