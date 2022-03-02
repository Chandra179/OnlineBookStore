import axios from "axios";

/**
 * 
 * @param {Token} token 
 * @returns {obj} list of user address
 */
async function addPayment(token) {
  const headers = {
    Authorization: `Token ${token}`,
  };
  const response = await axios
    .get("http://127.0.0.1:8000/account/address", { headers: headers })
    .then((response) => {
      return response.data;
    });
  return response;
}

const PaymentService = {
    addPayment,
};

export default PaymentService;
