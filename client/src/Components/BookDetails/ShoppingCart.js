import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// MUI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
// COMPONENTS
import Alert from "../../../components/Alert";
// SERVICE
import AuthService from "../../../services/auth.service";
// CONTEXT
import { useCart } from "../../../hooks/useCart";
// HELPER
import CartHelper from "../../../helper/cart.helper";
import InputHelper from "../../../helper/input.helper";
import { getCurrentUser } from "../../Utils/helpers";
import styles from "./styles";

function ShoppingCart({ price, stock, name, cover }) {
  const history = useHistory();
  const userEmail = getCurrentUser();
  const [isItemExist, setIsItemExist] = useState(false);
  const [isItemAdded, setIsItemAdded] = useState(false);

  // price for 1 book, eg: 1 book -> $22
  const normalPrice = Number(price);

  // Total book price, eg: 10 * $22 = $220
  const [totalPrice, setTotalPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const { setCartBadge } = useCart();

  /**
   * Handle qty input
   */
  const handleQtyChange = (event) => {
    var qty = CartHelper.qtyValidator(event.target.value, stock);
    setQty(qty);
    setTotalPrice(qty * normalPrice);
  };

  /**
   * Handle add item to cart,
   * item will be saved in local storage as object.
   * object key : user email
   */
  const handleAddToCart = () => {
    if (!userEmail) {
      history.push("/signin");
      return;
    }
    // IMPORTANT!: check if user token is valid in backend

    const cartItem = CartHelper.getCartItem(userEmail);
    const isItemDuplicate = name in cartItem;

    if (isItemDuplicate) {
      setIsItemExist(true);
      setIsItemAdded(false);
      return;
    }
    // if qty input is empty then set to 1
    const qtys = qty ? qty : 1;
    if (qtys === 1) {
      setQty(1);
    }
    cartItem[name] = {
      cover: cover,
      qty: qtys,
      normalPrice: normalPrice,
      totalPrice: qtys * normalPrice,
      stock: stock,
    };
    CartHelper.setCartItem(userEmail, cartItem);
    setIsItemAdded(true);
    setIsItemExist(false);

    // update cart badge with newest item
    const cartBadge = CartHelper.cartBadge(userEmail);
    setCartBadge(cartBadge);
  };

  return (
    <Grid item lg={3} md={3} sm={12} xs={12}>
      <Box sx={styles.cart.wrap}>
        {isItemExist && <Alert name={"Item is in cart"} severity="error" />}
        {isItemAdded && <Alert name={"Item is added to cart"} severity="success" />}

        <Box sx={{ boxShadow: 1 }}>
          <Box sx={styles.cart.wrap2}>
            <Typography sx={{ letterSpacing: 1 }}>Subtotal</Typography>
            <Box pr={2} sx={{ marginLeft: "auto" }}>
              <Typography variant="h6">
                $ {totalPrice ? totalPrice.toFixed(2) : normalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <Box sx={styles.cart.wrap3}>
            <FormControl fullWidth>
              <TextField
                id="outlined-number"
                label="Qty"
                type="tel"
                onChange={handleQtyChange}
                InputProps={{
                  inputProps: {
                    max: stock,
                    min: 1,
                  },
                  style: {
                    height: 52,
                  },
                }}
                onKeyPress={(event) => InputHelper.numberOnly(event)}
                value={qty}
                sx={styles.cart.fieldInput}
              />
            </FormControl>
          </Box>
          <Stack>
            <Button
              onClick={handleAddToCart}
              variant="contained"
              sx={styles.cart.addToCartBtn}
              startIcon={<AddIcon />}
            >
              Add to cart
            </Button>
            <Button variant="outlined" sx={styles.cart.buyNowBtn}>
              Buy now
            </Button>
          </Stack>
        </Box>
      </Box>
    </Grid>
  );
}

export default ShoppingCart;
