import axios from "axios";

export const signin = async(email, password) => {
  return axios
    .post("http://127.0.0.1:8000/account/signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: response.data.token,
            email: response.data.email,
          })
        );
      }
      return response.data;
    });
};

export const signup = async(email, password) => {
  return axios
    .post("http://127.0.0.1:8000/account/signup", {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: response.data.token,
            email: response.data.email,
          })
        );
      }
      return response.data;
    });
};

export const getAddress = async(token) => {
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

export const postAddress = async(token, address) => {
  const headers = {
    Authorization: `Token ${token}`,
  };
  const response = await axios
    .post("http://127.0.0.1:8000/account/address", address, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    });
  return response;
}

export const genreList = () => {
  const response = await axios
    .get("http://127.0.0.1:8000/book/genre-list")
    .then((response) => {
      return response.data.genre;
    });
  return response;
}

export const booksByGenre = async(genre, page) => {
  const response = await axios
    .get("http://127.0.0.1:8000/book", { params: { genre: genre, page: page } })
    .then((response) => {
      const resp = {
        total_book: response.headers.total_book,
        books: response.data,
      };
      return resp;
    });
  return response;
}

export const bookDetails = async(name) => {
  const response = await axios
    .get("http://127.0.0.1:8000/book/detail", { params: { name: name } })
    .then((response) => {
      return response.data;
    });
  return response;
}
