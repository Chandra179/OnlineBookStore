import React from "react";
import { Box, IconButton } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
//
import { useCart } from "../../Hooks";
import Styles from "./Styles";
import {
  deleteCheckoutItem,
  getCartItem,
  getCheckoutItem,
  getCurrentUser,
  removeCart,
  setCartItem,
  setCheckoutItem,
  totalCartItems,
} from "../../Utils/helpers";

export default function RemoveProduct({ title }) {
  const userEmail = getCurrentUser();
  const { cart, setCart, cartBadge, setSelectedCheckbox, setCartBadge } = useCart();

  /**
   * handle delete product
   */
  const removeProduct = (title) => {
    if (!cart) {
      setCart(null);
      return;
    }
    var checkoutItem = getCheckoutItem(userEmail);

    // filter cart item with given title
    if (checkoutItem.length !== 0) {
      var checkoutFiltered = checkoutItem.filter((e) => e !== title);
      setCheckoutItem(userEmail, checkoutFiltered);
      setSelectedCheckbox(getCheckoutItem(userEmail));

      // delete localstorage if checkout empty
      if (checkoutItem.length - 1 === 0) {
        deleteCheckoutItem(userEmail);
      }
    }
    var cartFiltered = Object.fromEntries(
      Object.entries(cart).filter(([key, value]) => key !== title)
    );

    setCart(cartFiltered);
    
    if (!Object.keys(cartFiltered).length) {
      setCartBadge(0)
    } else {
      setCartBadge(cartBadge - cart[title]["qty"])
    }

    // delete localStorage if cart empty
    if (Object.keys(cart).length - 1 === 0) {
      removeCart(userEmail);
    }
  };

  return (
    <Box ml={2}>
      <IconButton
        size="small"
        onClick={(e) => removeProduct(title, e)}
        sx={Styles.closeIcon}
      >
        <CloseSharpIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Box>
  );
}
