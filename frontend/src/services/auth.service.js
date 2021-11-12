import axios from "axios";


const signin = (email, password) => {
  return axios
    .post("http://127.0.0.1:8000/account/", {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const signup = (email, password) => {
  return axios
    .post("http://127.0.0.1:8000/account/", {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  signin,
  logout,
  getCurrentUser,
};

export default AuthService;