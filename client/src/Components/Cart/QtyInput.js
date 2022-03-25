import React from "react";
import { Box, Grid, FormControl, TextField, IconButton } from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
//
import { useCart } from "../../../hooks/useCart";
import CartHelper from "../../../helper/cart.helper";
import AuthService from "../../../services/auth.service";
import InputHelper from "../../../helper/input.helper";

import {
  getCurrentUser,
  setCartItem,
  getCartItem,
  totalCartItems,
  qtyValidator,
  numberOnly
} from "../../Utils/helpers";
import { useAccount } from "../../Hooks";
import Styles from "./Styles";

export default function QtyInput({ title, qty, normalPrice, stock }) {
  const userEmail = getCurrentUser();
  const { setCartBadge } = useAccount();

  /**
   * Handle product quantity input change
   */
  const handleQtyChange = (title, normalPrice, stock, event) => {
    const item = getCartItem(userEmail);
    if (Object.keys(item).length === 0) {
      window.location.reload();
    }

    var qty = Number(event.target.value);
    var validQty = qtyValidator(qty, stock);

    item[title]["qty"] = validQty;
    item[title]["totalPrice"] = validQty * normalPrice;

    setCartItem(userEmail, item);
    setCartBadge(totalCartItems(userEmail));
  };

  /**
   * Handle product decrement
   */
  const decrementProduct = (title, normalPrice, stock, event) => {
    const item = getCartItem(userEmail);
    if (Object.keys(item).length === 0) {
      window.location.reload();
    }

    var qty = Number(item[title]["qty"]);
    if (qty < 1) return;

    var validQty = qtyValidator(qty, stock);
    item[title]["qty"] = validQty - 1;
    item[title]["totalPrice"] = item[title]["qty"] * normalPrice;

    setCartItem(userEmail, item);
    setCartBadge(totalCartItems(userEmail));
  };

  /**
   * Handle product increment
   */
  const incrementProduct = (title, normalPrice, stock, event) => {
    const item = getCartItem(userEmail);
    if (Object.keys(item).length === 0) {
      window.location.reload();
    }
    var qty = Number(item[title]["qty"]);
    var validQty = qtyValidator(qty, stock);

    item[title]["qty"] = validQty + 1;
    item[title]["totalPrice"] = item[title]["qty"] * normalPrice;

    setCartItem(userEmail, item);
    setCartBadge(totalCartItems(userEmail));
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
