import React from "react";
import { Box, IconButton } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
//
import { useCart } from "../../../hooks/useCart";
import CheckoutHelper from "../../../helper/checkout.helper";
import CartHelper from "../../../helper/cart.helper";
import AuthService from "../../../services/auth.service";
import Styles from "../Styles";

export default function RemoveProduct({ title }) {
  const userEmail = AuthService.getCurrentUser();
  const {
    cartItem,
    setCartItem,
    setSelectedCheckbox,
    setCartBadge,
  } = useCart();
  
  /**
   * handle delete product
   */
  const removeProduct = (title) => {
    if (!cartItem) {
      setCartItem(null);
      return;
    }
    var checkoutItem = CheckoutHelper.getCheckoutItem(userEmail);

    // filter cart item with given title
    if (checkoutItem.length !== 0) {
      var checkoutFiltered = checkoutItem.filter((e) => e !== title);
      CheckoutHelper.setCheckoutItem(userEmail, checkoutFiltered);
      setSelectedCheckbox(CheckoutHelper.getCheckoutItem(userEmail));

      // delete localstorage if checkout empty
      if (checkoutItem.length - 1 === 0) {
        CheckoutHelper.deleteCheckoutItem(userEmail);
      }
    }
    var cartFiltered = Object.fromEntries(
      Object.entries(cartItem).filter(([key, value]) => key !== title)
    );
    CartHelper.setCartItem(userEmail, cartFiltered);
    setCartItem(CartHelper.getCartItem(userEmail));
    setCartBadge(CartHelper.cartBadge(userEmail));

    // delete localStorage if cart empty
    if (Object.keys(cartItem).length - 1 === 0) {
      CartHelper.removeCart(userEmail);
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
