import axios from "axios";

async function bookList() {
  const response = await axios
    .get("http://127.0.0.1:8000/book/")
    .then((response) => {
      return response;
    });
  return response;
}

const BookService = {
    bookList,
};

export default BookService;