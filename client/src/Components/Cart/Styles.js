const Styles = {
    divider: {
      marginLeft: { lg: 5, md: 5, sm: 5, xs: 2 },
      paddingTop: 2,
      marginBottom: 3,
      borderBottomWidth: 2,
    },
    containerBox: {
      marginRight: { xl: 4, lg: 4, md: 4, sm: 6, xs: 2 },
    },
    contentBox: {
      marginLeft: { lg: 5, md: 5, sm: 5, xs: 2 },
    },
    itemBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
    },
  
    /**
     * CHECKBOX AND COVER
     */
    checkBoxAndCoverBox: {
      display: "flex",
      alignItems: "center",
    },
    
    coverCard: {
      width: 120,
      maxWidth: {
        lg: 120,
        md: 120,
        sm: 110,
        xs: 80,
      },
    },
  
    /**
     * TITLE AND PRICE
     */
    titleText:{
      fontWeight: 500,
      letterSpacing: 1.3,
      fontSize: {
        lg: 15,
        md: 15,
        sm: 15,
        xs: 12,
      }
    },
  
    priceBox: {
      justifyContent: {
        lg: "flex-end",
        md: "flex-end",
        sm: "flex-end",
        xs: "flex-start",
      },
      display: "flex",
    },
  
    priceText:{
      fontSize: {
        lg: 16,
        md: 16,
        sm: 16,
        xs: 13,
      },
      fontWeight: 600,
    },
  
    /**
     * QUANTITY
     */
    quantityBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 2,
      height: { lg: 40, md: 40, sm: 40, xs: 30 },
    },
  
    iconStyles:{
      fontSize: {
        lg: 24,
        md: 24,
        sm: 24,
        xs: 20,
      },
      color: "#3664d9",
    },
  
    quantityInputProps: {
      fontSize: 14,
      height: 12,
      borderRadius: 0,
      textAlign: "center",
    },
    
    /**
     * CLOSE ICON
     */
    closeIcon: {
      width: 0, 
      height: 0, 
      paddingTop: 0.2,
    }
  
  };
  
  export default Styles;