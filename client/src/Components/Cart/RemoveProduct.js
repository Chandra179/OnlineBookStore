import React from "react";
import { Box, IconButton } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
//
import { useCart } from "../../Hooks";
import {
  deleteCheckoutItem,
  getCurrentUser,
  removeCart,
} from "../../Utils/helpers";

export default function RemoveProduct({ title }) {
  // ===========================================================================
  // Context
  // ===========================================================================

  const {
    cart,
    setCart,
    cartBadge,
    selectedCheckbox,
    setSelectedCheckbox,
    setCartBadge,
  } = useCart();

  // ===========================================================================
  // Var
  // ===========================================================================

  const userEmail = getCurrentUser();

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const removeProduct = (title) => {
    if (!cart) {
      setCart(null);
      return;
    }

    /** Filter Checkout */
    if (selectedCheckbox.length !== 0) {
      var checkoutFiltered = selectedCheckbox.filter((e) => e !== title);
      setSelectedCheckbox(checkoutFiltered);

      // delete checkout localstorage if checkout empty
      if (selectedCheckbox.length === 1) {
        deleteCheckoutItem(userEmail);
      }
    }

    /**  Filter Cart  */
    var cartFiltered = Object.fromEntries(
      Object.entries(cart).filter(([key, value]) => key !== title)
    );
    setCart(cartFiltered);

    // remove cart badge if empty
    if (!Object.keys(cartFiltered).length) {
      setCartBadge(0);
    } else {
      setCartBadge(cartBadge - cart[title]["qty"]);
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
        sx={{ width: 0, height: 0, paddingTop: 0.2 }}
      >
        <CloseSharpIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Box>
  );
}
