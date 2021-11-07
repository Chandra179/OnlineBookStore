import axios from "axios";

const API_URL = "http://127.0.0.1:8000/account/";

const login = (email, password) => {
  return axios
    .post(API_URL, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.email) {
        localStorage.setItem("user", JSON.stringify(response.data.email));
      }
      return response.data.email;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;