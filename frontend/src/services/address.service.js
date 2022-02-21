import axios from "axios";
import AuthService from "./auth.service";

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
