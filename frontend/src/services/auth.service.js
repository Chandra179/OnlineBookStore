import axios from "axios";

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

// Get current user Email
const getCurrentUser = () => {
   var userToken = localStorage.getItem("user");
   if (userToken) {
    return JSON.parse(userToken)['email'];
   } else {
     console.log('TOKEN is not set')
   }
};

const AuthService = {
  signin,
  signup,
  logout,
  getCurrentUser,
};

export default AuthService;