import React from "react";
// MUI
import { Divider, Box, Grid } from "@mui/material";
import CartHeader from "../Components/Cart/CartHeader";
import Items from "../Components/Cart/Items";
import {
  getCurrentUser,
  getCheckoutItem,
  getCartItem,
  setCheckoutItem,
  deleteCheckoutItem,
} from "../Utils/helpers";
import Styles from "./Styles";

export default function Cart() {
  const userEmail = getCurrentUser();
  const [selectedCheckbox, setSelectedCheckbox] = useState(
    getCheckoutItem(userEmail)
  );
  const [cartItem, setCartItem] = useState(getCartItem(userEmail));
  const cartItemKeys = cartItem ? Object.keys(cartItem) : 0;
  const isAllCheckboxSelected =
    cartItemKeys.length > 0 && selectedCheckbox.length === cartItemKeys.length;

  /**
   * Handle select all checkbox
   */
  const handleSelectAllCheckbox = (event) => {
    const value = event.target.value;
    if (value === "all") {
      // unselect all checkbox
      if (selectedCheckbox.length === cartItemKeys.length) {
        deleteCheckoutItem(userEmail);
        setSelectedCheckbox([]);
        return;
      }
      // select all checkbox
      if (selectedCheckbox.length !== cartItemKeys.length) {
        setCheckoutItem(userEmail, cartItemKeys);
        setSelectedCheckbox(cartItemKeys);
        return;
      }
    }
  };

  /**
   * Handle select checkbox
   */
  const handleSelectCheckbox = (event) => {
    const value = event.target.value;
    const selectedItems = [...selectedCheckbox];
    const index = selectedItems.indexOf(value);
    index === -1 ? selectedItems.push(value) : selectedItems.splice(index, 1);
    setCheckoutItem(userEmail, selectedItems);
    setSelectedCheckbox(selectedItems);

    // if no item is selected, then remove localstorage
    if (selectedItems.length === 0) {
      deleteCheckoutItem(userEmail);
      return;
    }
  };

  return (
    <>
      {!cartItem || Object.keys(cartItem).length === 0 ? (
        <p>cart empty</p>
      ) : (
        <Grid container>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Box sx={Styles.containerBox}>
              <CartHeader
                selectAllCheckbox={handleSelectAllCheckbox}
                isAllCheckboxSelected={isAllCheckboxSelected}
              />
              <Divider sx={Styles.divider} />
              <Items
                cartItem={cartItem}
                handleSelectCheckbox={handleSelectCheckbox}
                selectedCheckbox={selectedCheckbox}
              />
            </Box>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Checkout />
          </Grid>
        </Grid>
      )}
    </>
  );
}
