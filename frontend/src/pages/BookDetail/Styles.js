/**
 * BOOK COVER
 */
const bookCover = {
  Grid: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: {
      lg: "white",
      md: "white",
      sm: "white",
      xs: "rgb(250, 250, 250)",
    },
  },
  Card: {
    minWidth: 120,
    maxWidth: { lg: 170, md: 160, sm: 150, xs: 120 },
    marginRight: { lg: 3, md: 3, sm: 2, xs: 0 },
  },
};

/**
 * BOOK DESCRIPTION
 */
const bookDesc = {
  Box: {
    marginTop: { lg: 0, md: 0, sm: 0, xs: 2 },
    paddingRight: { lg: 4, md: 4, sm: 4, xs: 0 },
  },
  Title: {
    color: "black",
    fontSize: { lg: 24, md: 22, sm: 20, xs: 16 },
    fontWeight: 600,
  },
  Description: {
    fontSize: { lg: 15, md: 14, sm: 13, xs: 12 },
  }
};


/**
 * SHOPPING CART
 */
const shoppingCartBoxRoot = {
  marginTop: {
    lg: 0,
    md: 0,
    sm: 4,
    xs: 4,
  },
};

const Styles = {
  bookCover,
  bookDesc,
  shoppingCartBoxRoot,
};
export default Styles;
