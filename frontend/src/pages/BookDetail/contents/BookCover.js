import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Styles from "../Styles";

/**
 * @param {str} cover
 */
const BookCover = ({cover}) => {
  return (
    <Grid item lg={2} md={2} sm={3} xs={12} sx={Styles.bookCover.Grid}>
      <Card sx={Styles.bookCover.Card}>
        <CardMedia component="img" image={cover} />
      </Card>
    </Grid>
  );
};

export default BookCover;
