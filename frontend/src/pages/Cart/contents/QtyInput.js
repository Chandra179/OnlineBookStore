import React from "react";
import { Box, Grid, FormControl, TextField, IconButton } from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useCart } from "../../../hooks/useCart";
import CartHelper from "../../../helper/cart.helper";
import AuthService from "../../../services/auth.service";
import InputHelper from "../../../helper/input.helper";
import Styles from "../Styles";

export default function QtyInput({ title, qty, normalPrice, stock }) {
  const userEmail = AuthService.getCurrentUser();
  const { setCartItem, setCartBadge } = useCart();

  /**
   * Handle product quantity input change
   */
  const handleQtyChange = (title, normalPrice, stock, event) => {
    const item = CartHelper.isItemInCart(userEmail);
    if (!item) window.location.reload();

    var qty = Number(event.target.value);
    var validQty = CartHelper.qtyValidator(qty, stock);

    item[title]["qty"] = validQty;
    item[title]["totalPrice"] = validQty * normalPrice;

    CartHelper.setCartItem(userEmail, item);
    setCartItem(CartHelper.getCartItem(userEmail));
    setCartBadge(CartHelper.cartBadge(userEmail));
  };

  /**
   * Handle product decrement
   */
  const decrementProduct = (title, normalPrice, stock, event) => {
    const item = CartHelper.isItemInCart(userEmail);
    if (!item) window.location.reload();

    var qty = Number(item[title]["qty"]);
    if (qty < 1) return;

    var validQty = CartHelper.qtyValidator(qty, stock);
    item[title]["qty"] = validQty - 1;
    item[title]["totalPrice"] = item[title]["qty"] * normalPrice;

    CartHelper.setCartItem(userEmail, item);
    setCartItem(CartHelper.getCartItem(userEmail));
    setCartBadge(CartHelper.cartBadge(userEmail));
  };

  /**
   * Handle product increment
   */
  const incrementProduct = (title, normalPrice, stock, event) => {
    const item = CartHelper.isItemInCart(userEmail);
    if (!item) window.location.reload();

    var qty = Number(item[title]["qty"]);
    var validQty = CartHelper.qtyValidator(qty, stock);

    item[title]["qty"] = validQty + 1;
    item[title]["totalPrice"] = item[title]["qty"] * normalPrice;

    CartHelper.setCartItem(userEmail, item);
    setCartItem(CartHelper.getCartItem(userEmail));
    setCartBadge(CartHelper.cartBadge(userEmail));
  };

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
        <Box sx={{ width: 60 }}>
          {/* INPUT */}
          <FormControl fullWidth>
            <TextField
              variant="standard"
              type="tel"
              size="small"
              value={qty}
              onKeyPress={(e) => InputHelper.numberOnly(e)}
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
