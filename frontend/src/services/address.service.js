import axios from "axios";
import AuthService from './auth.service'

async function getAddress() {
    const token =  AuthService.getToken()
    const headers = {
    'Authorization': `Token ${token}`
    }
  const response = await axios
    .get("http://127.0.0.1:8000/account/address", {headers: headers})
    .then((response) => {
      return response.data;
    });
  return response;
}

async function postAddress() {
  const response = await axios
    .get("http://127.0.0.1:8000/account/address")
    .then((response) => {
      return response.data;
    });
  return response;
}

const AddresService = {
  getAddress,
  postAddress,
};

export default AddresService;
