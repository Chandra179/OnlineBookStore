const Styles = {
  /**
   * CONTENT
   */
  divider: {
    marginLeft: { lg: 5, md: 5, sm: 5, xs: 2 },
    paddingTop: 2,
    marginBottom: 3,
    borderBottomWidth: 2,
  },
  boxContainer: {
    marginRight: { xl: 4, lg: 4, md: 4, sm: 6, xs: 2 },
  },
  boxContent: {
    marginLeft: { lg: 5, md: 5, sm: 5, xs: 2 },
  },

  /**
   * CHECKBOX AND COVER
   */
  coverBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  coverCard: {
    width: 120,
    maxWidth: { lg: 120, md: 120, sm: 120, xs: 80 },
  },

  /**
   * DESCRIPTION
   */
  descTitle: {
    fontWeight: 500,
    letterSpacing: 1.3,
    fontSize: {
      lg: 17,
      md: 17,
      sm: 16,
      xs: 12,
    },
  },
  descPrice: {
    fontSize: { lg: 16, md: 16, sm: 15, xs: 12 },
    fontWeight: 600,
  },
};

export default Styles;
