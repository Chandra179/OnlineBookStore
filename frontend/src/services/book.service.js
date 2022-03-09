import axios from "axios";


/**
 * 
 * @returns {Array} list of genre, eg: [biography, fiction]
 */
async function genreList() {
  const response = await axios
    .get("http://127.0.0.1:8000/book/genre-list")
    .then((response) => {
      return response.data.genre;
    });
  return response;
}


/**
 * 
 * @param {String} genre genre name
 * @param {Number} page page number
 * @returns {object} total books and list of books for given genre and page number
 */
async function booksByGenre(genre, page) {
  const response = await axios
    .get("http://127.0.0.1:8000/book", { params: { genre: genre, page: page} })
    .then((response) => {
      const resp = {
        'total_book': response.headers.total_book,
        'books': response.data,
      }
      return resp;
    });
  return response;
}


/**
 * 
 * @param {String} name book name
 * @returns {object} details of book, eg: author, cover, title, etc.
 */
async function bookDetails(name) {
  const response = await axios
    .get("http://127.0.0.1:8000/book/detail", { params: { name: name} })
    .then((response) => {
      return response.data;
    });
  return response;
}

const BookService = {
    genreList,
    booksByGenre,
    bookDetails
};

export default BookService;