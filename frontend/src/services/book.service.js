import axios from "axios";

async function bookList(numPage) {
  const response = await axios
    .get("http://127.0.0.1:8000/book/", { params: { page: numPage} })
    .then((response) => {
      const resp = {
        'total_book': response.headers.total_book,
        'book': response.data,
      }
      return resp;
    });
  return response;
}

const BookService = {
    bookList,
};

export default BookService;