import Typography from "@mui/material/Typography";
/*
    map book author
*/
const bookAuthor = (book_author) => {
    if (book_author === undefined) return;
    var bookAuthorLength = book_author.length - 1;
    var authorList = [];

    authorList.push(
      <Typography
        key={"by"}
        sx={{
          fontSize: {
            lg: 17,
            md: 17,
            sm: 13,
            xs: 13,
          },
          paddingRight: 1,
        }}
      >
        by
      </Typography>
    );

    book_author.map((e, i) => {
      var authors =
        i === bookAuthorLength ? e.author_name : e.author_name + ",";
      authorList.push(
        <Typography
          key={i}
          sx={{
            color: "rgb(0, 113, 133)",
            fontSize: {
              lg: 14,
              md: 14,
              sm: 13,
              xs: 13,
            },
            paddingRight: 1,
          }}
        >
          {authors}
        </Typography>
      );
    });
    return authorList;
  };
  
  const BookHelper = {
    bookAuthor,
  };
  
  export default BookHelper;
  