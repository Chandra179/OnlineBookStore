import axios from "axios";
import  { Redirect } from 'react-router-dom';

const signin = (email, password) => {
  return axios
    .post("http://127.0.0.1:8000/account/signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify({
          'token': response.data.token,
          'email': response.data.email
        }));
      }
      return response.data;
    });
};

const signup = (email, password) => {
  return axios
    .post("http://127.0.0.1:8000/account/signup", {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify({
          'token': response.data.token,
          'email': response.data.email
        }));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
   var userToken = localStorage.getItem("user");
   if (userToken === null) {
     return ""
   } else {
     return JSON.parse(userToken)['email'];
   }
};

const AuthService = {
  signin,
  signup,
  logout,
  getCurrentUser,
};

export default AuthService;