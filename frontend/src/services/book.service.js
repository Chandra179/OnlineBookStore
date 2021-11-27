import axios from "axios";


const bookList = () => {
  return axios
    .get("http://127.0.0.1:8000/book/")
    .then((response) => {
      console.log('get book list =>', response.data)
      return response.data;
    });
};

const BookService = {
    bookList,
};

export default BookService;