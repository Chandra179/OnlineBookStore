import axios from "axios";

async function bookList(numPage) {
  const response = await axios
    .get("http://127.0.0.1:8000/book", { params: { page: numPage} })
    .then((response) => {
      const resp = {
        'total_book': response.headers.total_book,
        'book': response.data,
      }
      return resp;
    });
  return response;
}

async function bookDetail(title) {
  const response = await axios
    .get("http://127.0.0.1:8000/book/detail", { params: { title: title} })
    .then((response) => {
      return response.data;
    });
  return response;
}

const BookService = {
    bookList,
    bookDetail
};

export default BookService;