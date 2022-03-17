const styles = {
  cover: {
    grid: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: {
        lg: "white",
        md: "white",
        sm: "white",
        xs: "rgb(250, 250, 250)",
      },
    },
    card: {
      minWidth: 120,
      maxWidth: { lg: 170, md: 160, sm: 150, xs: 120 },
      marginRight: { lg: 3, md: 3, sm: 2, xs: 0 },
    },
  },
  details: {
    wrap: {
      marginTop: { lg: 0, md: 0, sm: 0, xs: 2 },
      paddingRight: { lg: 4, md: 4, sm: 4, xs: 0 },
    },
    name: {
      color: "black",
      fontSize: { lg: 24, md: 22, sm: 20, xs: 16 },
      fontWeight: 600,
    },
    desc: {
      fontSize: { lg: 15, md: 14, sm: 13, xs: 12 },
    },
  },
  cart: {
    wrap: {
      marginTop: { lg: 0, md: 0, sm: 4, xs: 4 },
    },
    wrap2: {
      display: "flex",
      paddingTop: 1,
      paddingLeft: 1.5,
      paddingBottom: 1,
      alignItems: "center",
    },
    wrap3: {
      maxWidth: 80,
      minWidth: 30,
      margin: 1.3,
    },
    fieldInput: {
      "& #outlined-number-label": {
        fontSize: 14,
      },
    },
    addToCartBtn: {
      margin: "10px 10px 0px 10px",
      fontSize: 12,
    },
    buyNowBtn: {
      margin: "10px 10px 10px 10px",
      fontSize: 12,
    },
  },
};

export default styles;
