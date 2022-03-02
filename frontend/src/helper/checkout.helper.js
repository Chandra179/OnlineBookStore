/**
 * @param {str} props.userEmail
 * @param {list} props.cartItemKeys
 */
const setCheckoutItem = (userEmail, cartItemKeys) => {
  localStorage.setItem(userEmail + "Checkout", JSON.stringify(cartItemKeys));
};



/**
 * @param {str} props.userEmail
 */
const getCheckoutItem = (userEmail) => {
  return localStorage.getItem(userEmail + "Checkout")
    ? JSON.parse(localStorage.getItem(userEmail + "Checkout"))
    : [];
};



/**
 * @param {str} props.userEmail
 */
const deleteCheckoutItem = (userEmail) => {
  localStorage.removeItem(userEmail + "Checkout");
};


const CheckoutHelper = {
  setCheckoutItem,
  getCheckoutItem,
  deleteCheckoutItem,
};

export default CheckoutHelper;
