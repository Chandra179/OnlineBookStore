import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import styles from "./styles";

const Cover = ({ cover, types }) => {
  // const type = types | 'detail' | 'cart' | 'list'
  // if detail then classname= DETAIl
  return (
    <Grid item lg={2} md={2} sm={3} xs={12} sx={styles.cover.grid}>
      <Card sx={styles.cover.card}>
        <CardMedia component="img" image={cover} />
      </Card>
    </Grid>
  );
};

export default Cover;
