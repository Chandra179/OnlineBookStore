import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

/**
 * 
 * @param {list} props.book_author
 */

const bookAuthor = (book_author) => {
  if (!book_author) return;
  var bookAuthorLength = book_author.length - 1;
  var bookAuthorList = [];

  book_author.map((e, i) => {
    var authors = i === bookAuthorLength ? e.author_name : e.author_name + ", ";
    return bookAuthorList.push(authors);
  });

  return (
    <Box
      display="flex"
      sx={{
        alignItems: "baseline",
        width: {
          lg: 600,
          md: 600,
          sm: 600,
          xs: 200,
        },
      }}
    >
      <Typography
        sx={{
          fontSize: {
            lg: 14,
            md: 14,
            sm: 12,
            xs: 12,
          },
          marginRight: 1,
        }}
      >
        by
      </Typography>
      <Typography noWrap sx={{ color: "rgb(0, 113, 133)", fontSize: 12 }}>
        {bookAuthorList}
      </Typography>
    </Box>
  );
};

const BookHelper = {
  bookAuthor,
};

export default BookHelper;
