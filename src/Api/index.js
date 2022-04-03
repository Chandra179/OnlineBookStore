import axios from "axios";

export const signin = async(email, password) => {
  return await axios
    .post("account/signin", {
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
  return await axios
    .post("account/signup", {
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
    .get("account/address", { headers: headers })
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
    .post("account/address", address, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    });
  return response;
}

export const genreList = async() => {
  const response = await axios
    .get("book/genre-list")
    .then((response) => {
      return response.data.genre;
    });
  return response;
}

export const getBooksByGenre = async(genre, page) => {
  const response = await axios
    .get("book", { params: { genre: genre, page: page } })
    .then((response) => {
      console.log(response)
      console.log(response.data)
      const resp = {
        total_book: response.headers.total_book,
        books: response.data,
      };
      return resp;
    });
  return response;
}

export const getBookDetails = async(name) => {
  const response = await axios
    .get("book/detail", { params: { name: name } })
    .then((response) => {
      return response.data;
    });
  return response;
}
