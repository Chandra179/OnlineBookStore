import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

/*
    map book author
*/
const bookAuthor = (book_author) => {
  if (book_author === undefined) return;
  var bookAuthorLength = book_author.length - 1;
  var authorList = [];

  book_author.map((e, i) => {
    var authors = i === bookAuthorLength ? e.author_name : e.author_name + ",";
    return authorList.push(
      <Typography
        key={i}
        sx={{
          color: "rgb(0, 113, 133)",
          fontSize: {
            lg: 14,
            md: 14,
            sm: 14,
            xs: 14,
          },
          paddingRight: 1,
        }}
      >
        {authors}
      </Typography>
    );
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "baseline",
      }}
    >
      <Typography
        sx={{
          fontSize: {
            lg: 16,
            md: 16,
            sm: 14,
            xs: 14,
          },
          marginRight: 1,
        }}
      >
        by
      </Typography>
      <Box sx={{ display: "flex" }}>{authorList}</Box>
    </Box>
  );
};

const BookHelper = {
  bookAuthor,
};

export default BookHelper;
