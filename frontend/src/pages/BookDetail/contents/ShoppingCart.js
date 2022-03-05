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
import InputValidatorHelper from "../../../helper/inputValidator.helper";
// STYLES
import Styles from "../Styles";

/**
 * @param {list} bookDetails
 */
function ShoppingCart({ bookDetails }) {
  const [itemExistAlert, setItemExistAlert] = useState(false);
  const [itemAddedAlert, setItemAddedAlert] = useState(false);

  // price per book, eg: 1 book -> $22
  const normalPrice = Number(bookDetails.price);

  // Total book price, eg: 10 * $22 = $220
  const [totalPrice, setTotalPrice] = useState(1);
  const [qty, setQty] = useState(1);
  const userEmail = AuthService.getCurrentUser();
  const { setCartBadge } = useCart();
  const history = useHistory();

  const handleQtyChange = (event) => {
    var qty = CartHelper.qtyStockValidator(
      event.target.value,
      bookDetails.stock
    );
    setQty(qty);
    setTotalPrice(qty * normalPrice);
  };

  const handleAddToCart = () => {
    if (!userEmail) {
      history.push("/signin");
      return;
    }
    const qtys = qty === "" ? 1 : qty;
    if (qtys === 1) {
      setQty(1);
      setTotalPrice(qtys * normalPrice);
    }

    /**
     * Handle add item to cart,
     * item will be saved in local storage as object.
     * key  : user email
     */

    const cartItem = CartHelper.getCartItem(userEmail);
    const duplicateItems = bookDetails.name in cartItem;
    cartItem[bookDetails.name] = {
      cover: bookDetails.cover,
      qty: qtys,
      normalPrice: normalPrice,
      totalPrice: qtys * normalPrice,
      stock: bookDetails.stock,
    };

    // if cart not initialized, then create new cart and save the item
    if (!Object.keys(cartItem)) {
      CartHelper.setCartItem(userEmail, cartItem);
      setItemAddedAlert(true);
      setCartBadge(CartHelper.cartBadge(userEmail));
      return;
    }
    if (duplicateItems) {
      setItemExistAlert(true);
      setItemAddedAlert(false);
      return;
    }
    if (!duplicateItems) {
      CartHelper.setCartItem(userEmail, cartItem);
      setItemAddedAlert(true);
      setCartBadge(CartHelper.cartBadge(userEmail));
      return;
    }
  };

  return (
    <Grid item lg={3} md={3} sm={12} xs={12}>
      <Box sx={Styles.shoppingCartBoxRoot}>
        {itemExistAlert ? (
          <Alert name={"Item is in cart"} severity="error" />
        ) : (
          <div />
        )}
        {itemAddedAlert ? (
          <Alert name={"Item is added to cart"} severity="success" />
        ) : (
          <div />
        )}

        <Box
          sx={{
            boxShadow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              paddingTop: 1,
              paddingLeft: 1.5,
              paddingBottom: 1,
              alignItems: "center",
            }}
          >
            <Typography sx={{ letterSpacing: 1 }}>Subtotal</Typography>
            <Box sx={{ marginLeft: "auto", paddingRight: 2 }}>
              <Typography variant="h5">
                ${" "}
                {totalPrice <= 1
                  ? normalPrice.toFixed(2)
                  : totalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              maxWidth: "80px",
              minWidth: "80px",
              margin: "10px 10px 10px 10px",
            }}
          >
            <FormControl fullWidth>
              <TextField
                id="outlined-number"
                label="Number"
                type="tel"
                onChange={handleQtyChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    max: bookDetails.stock,
                    min: 1,
                  },
                }}
                onKeyPress={(event) => InputValidatorHelper(event)}
                value={qty}
              />
            </FormControl>
          </Box>
          <Stack>
            <Button
              onClick={handleAddToCart}
              variant="contained"
              sx={{
                margin: "10px 10px 0px 10px",
              }}
              startIcon={<AddIcon />}
            >
              Add to cart
            </Button>
            <Button variant="outlined" sx={{ margin: "10px 10px 10px 10px" }}>
              Buy now
            </Button>
          </Stack>
        </Box>
      </Box>
    </Grid>
  );
}

export default ShoppingCart;
