import React from "react";
import { Box, Grid, FormControl, TextField, IconButton } from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
//
import { useCart } from "../../Hooks";
import Styles from "./Styles";
import {
  getCartItem,
  getCurrentUser,
  numberOnly,
  qtyValidator,
  setCartItem,
  totalCartItems,
} from "../../Utils/helpers";

export default function QtyInput({ title, qty, normalPrice, stock }) {
  const userEmail = getCurrentUser();
  const { cart, setCart, cartBadge, setCartBadge } = useCart();

  /**
   * Handle product quantity input change
   */
  const handleQtyChange = (title, normalPrice, stock, event) => {
    var qty = Number(event.target.value);
    var validQty = qtyValidator(qty, stock);

    let cartItems = Object.assign({}, cart);
    cartItems[title]["qty"] = validQty;
    cartItems[title]["totalPrice"] = validQty * normalPrice;

    setCart(cartItems);
    setCartBadge(cartBadge + validQty);
  };

  /**
   * Handle product decrement
   */
  const decrementProduct = (title, normalPrice, stock, event) => {
    var qty = Number(cart[title]["qty"]);
    if (qty < 1) {
      return;
    }
    let cartItems = Object.assign({}, cart);
    cartItems[title]["qty"] = qty - 1;
    cartItems[title]["totalPrice"] = cartItems[title]["qty"] * normalPrice;

    setCart(cartItems);
    setCartBadge(cartBadge - 1);
  };

  /**
   * Handle product increment
   */
  const incrementProduct = (title, normalPrice, stock, event) => {
    var qty = Number(cart[title]["qty"]);
    let cartItems = Object.assign({}, cart);

    cartItems[title]["qty"] = qty === stock ? stock : qty + 1;
    cartItems[title]["totalPrice"] = cartItems[title]["qty"] * normalPrice;

    setCart(cartItems);
    setCartBadge(cartBadge + 1);
  };

  if (!Object.keys(cart).length) {
    return <p>cart empty</p>;
  }

  return (
    <Grid>
      <Box sx={Styles.quantityBox}>
        {/* DECREMENT */}
        <Box mb={1}>
          <IconButton
            size="small"
            value={qty}
            onClick={(e) => decrementProduct(title, normalPrice, stock, e)}
          >
            <RemoveCircleOutlineOutlinedIcon sx={Styles.iconStyles} />
          </IconButton>
        </Box>
        {/* INPUT */}
        <Box sx={{ width: 60 }}>
          <FormControl fullWidth>
            <TextField
              variant="standard"
              type="tel"
              size="small"
              value={qty}
              onKeyPress={(e) => numberOnly(e)}
              onChange={(e) => handleQtyChange(title, normalPrice, stock, e)}
              inputProps={{
                style: Styles.quantityInputProps,
              }}
            />
          </FormControl>
        </Box>
        {/* INCREMENT */}
        <Box mb={1}>
          <IconButton
            size="small"
            onClick={(e) => incrementProduct(title, normalPrice, stock, e)}
          >
            <AddCircleOutlineOutlinedIcon sx={Styles.iconStyles} />
          </IconButton>
        </Box>
      </Box>
    </Grid>
  );
}
