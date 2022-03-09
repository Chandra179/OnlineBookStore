import axios from "axios";

/**
 * 
 * @param {String} token auth token
 * @returns {object} list of user address
 */
async function getAddress(token) {
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


/**
 * 
 * @param {String} token auth token
 * @param {object} address address input
 * @returns {String} add new address
 */
async function postAddress(token, address) {
  const headers = {
    Authorization: `Token ${token}`,
  };
  const response = await axios
    .post("http://127.0.0.1:8000/account/address", address, { headers: headers })
    .then((response) => {
      return response.data;
    });
  return response;
}

const AddressService = {
  getAddress,
  postAddress,
};

export default AddressService;
