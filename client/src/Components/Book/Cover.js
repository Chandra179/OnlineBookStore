import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const styles = {
  coverList: {
    minWidth: 120,
    maxWidth: { lg: 170, md: 160, sm: 150, xs: 120 },
    marginRight: { lg: 3, md: 3, sm: 2, xs: 0 },
  },
  coverDetails: {
    minWidth: 120,
    maxWidth: { lg: 170, md: 160, sm: 150, xs: 120 },
    marginRight: { lg: 3, md: 3, sm: 2, xs: 0 },
  },
  coverCart: {
    minWidth: 120,
    maxWidth: { lg: 170, md: 160, sm: 150, xs: 120 },
    marginRight: { lg: 3, md: 3, sm: 2, xs: 0 },
  },
};

const Cover = ({ cover, type }) => {
  let typeSx;
  switch (type) {
    case "list":
      typeSx = styles.coverList;
      break;
    case "detail":
      typeSx = styles.coverDetails;
      break;
    case "cart":
      typeSx = styles.coverCart;
  }
  // const type = types | 'detail' | 'cart' | 'list'
  // if detail then classname= DETAIl
  return (
    <Card sx={typeSx}>
      <CardMedia component="img" image={cover} />
    </Card>
  );
};

export default Cover;
