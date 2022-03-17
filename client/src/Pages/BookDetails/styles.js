const styles = {
  coverWrap: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: {
      lg: "white",
      md: "white",
      sm: "white",
      xs: "rgb(250, 250, 250)",
    },
  },
  contentWrap: {
    marginTop: { lg: 0, md: 0, sm: 0, xs: 2 },
    paddingRight: { lg: 4, md: 4, sm: 4, xs: 0 },
  },
  shoppingCartWrap: {
    marginTop: { lg: 0, md: 0, sm: 4, xs: 4 },
  },
  priceWrap: {
    display: "flex",
    paddingTop: 1,
    paddingLeft: 1.5,
    paddingBottom: 1,
    alignItems: "center",
  },
  qtyWrap: {
    maxWidth: 80,
    minWidth: 30,
    margin: 1.3,
  },
  addToCartBtn: {
    margin: "10px 10px 0px 10px",
    fontSize: 12,
  },
  buyNowBtn: {
    margin: "10px 10px 10px 10px",
    fontSize: 12,
  },
};

export default styles;