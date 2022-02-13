import axios from "axios";


async function genreList() {
  const response = await axios
    .get("http://127.0.0.1:8000/book/genre-list")
    .then((response) => {
      return response.data.genre;
    });
  return response;
}


async function booksPerGenre() {
  const response = await axios
    .get("http://127.0.0.1:8000/book/top-ten-books")
    .then((response) => {
      return response.data;
    });
  return response;
}


async function booksByGenre(genre, page) {
  const response = await axios
    .get("http://127.0.0.1:8000/book", { params: { genre: genre, page: page} })
    .then((response) => {
      const resp = {
        'total_book': response.headers.total_book,
        'book': response.data,
      }
      return resp;
    });
  return response;
}


async function bookDetail(name) {
  const response = await axios
    .get("http://127.0.0.1:8000/book/detail", { params: { name: name} })
    .then((response) => {
      return response.data;
    });
  return response;
}

const BookService = {
    genreList,
    booksPerGenre,
    booksByGenre,
    bookDetail
};

export default BookService;