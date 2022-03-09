/**
 * @param {String} userEmail
 * @param {Array} cartItemKeys checkout items
 */
function setCheckoutItem (userEmail, cartItemKeys) {
  localStorage.setItem(userEmail + "Checkout", JSON.stringify(cartItemKeys));
};



/**
 * @param {String} userEmail
 * @returns {Array} list of checkout items
 */
function getCheckoutItem (userEmail) {
  return localStorage.getItem(userEmail + "Checkout")
    ? JSON.parse(localStorage.getItem(userEmail + "Checkout"))
    : [];
};



/**
 * @param {String} userEmail
 */
function deleteCheckoutItem (userEmail) {
  localStorage.removeItem(userEmail + "Checkout");
};


const CheckoutHelper = {
  setCheckoutItem,
  getCheckoutItem,
  deleteCheckoutItem
}

export default CheckoutHelper;