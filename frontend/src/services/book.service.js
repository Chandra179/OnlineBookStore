import axios from "axios";


/**
 * 
 * @returns {list} return list of genre, eg: [biography, fiction]
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
 * @param {str} genre
 * @param {int} page 
 * @returns {obj} return books for given genre and page number
 */
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


/**
 * 
 * @param {str} name 
 * @returns {obj} return details of book, eg: author, cover, title, etc.
 */
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
    booksByGenre,
    bookDetail
};

export default BookService;