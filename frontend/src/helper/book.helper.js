import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";



const boxRoot = {
  alignItems: "baseline",
  width: {
    lg: 600,
    md: 600,
    sm: 600,
    xs: 200,
  },
};

const byStyle = {
  fontSize: {
    lg: 14,
    md: 14,
    sm: 12,
    xs: 12,
  },
  marginRight: 1,
};

const authorStyle = {
  color: "rgb(0, 113, 133)",
  fontSize: 12,
};


/**
 * @param {list} props.book_author
 * @return {list} list of author for given book
 */
const bookAuthor = (book_author) => {
  if (!book_author) return;
  var bookAuthorLength = book_author.length - 1;
  var bookAuthorList = [];

  // put "," to author name until n-2
  // beverly, chandra, viks
  book_author.map((e, i) => {
    var authors = i === bookAuthorLength ? e.author_name : e.author_name + ", ";
    return bookAuthorList.push(authors);
  });

  return (
    <Box display="flex" sx={boxRoot}>
      <Typography sx={byStyle}>by</Typography>
      <Typography noWrap sx={authorStyle}>
        {bookAuthorList}
      </Typography>
    </Box>
  );
};

const BookHelper = {
  bookAuthor,
};

export default BookHelper;
