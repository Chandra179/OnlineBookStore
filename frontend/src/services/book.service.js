import axios from "axios";

const bookList = () => {
  return axios
    .get("http://127.0.0.1:8000/book/")
    .then((response) => {
      console.log('data =>', response.data)
      console.log('headers ->', response.headers)
      return response.data;
    });
};



const BookService = {
    bookList,
};

export default BookService;