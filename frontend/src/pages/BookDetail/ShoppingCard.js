import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import Alert from "../../components/Alert";
import AuthService from "../../services/auth.service";
import { useCart } from "../../hooks/useCart";
import CartHelper from "../../helper/cart.helper";
import InputValidatorHelper from "../../helper/inputValidator.helper";


function ShoppingCard({ bookDetail }) {
  const [itemExistAlert, setItemExistAlert] = useState(false);
  const [itemAddedAlert, setItemAddedAlert] = useState(false);

  // price per book, eg: 1 book -> $22
  const normalPrice = Number(bookDetail.price);

  // Total book price, eg: 10 * $22 = $220
  const [totalPrice, setTotalPrice] = useState(1);

  const [qty, setQty] = useState(1);
  const userEmail = AuthService.getCurrentUser();
  const { setCartBadge } = useCart();
  const history = useHistory();


  // handle item qty change
  const handleQtyChange = (event) => {
    var qty = event.target.value;
    
    // if input exceed book stock then set qty to stock
    if (qty > bookDetail.stock) {
      qty = bookDetail.stock;
    }
    // first input cannot be 0
    if (qty.toString()[0] !== "0") {
      setQty(qty);
    }
    setTotalPrice(qty * normalPrice);
  };

  
  // handle adding item to cart
  const handleAddToCart = () => {
    // if input is empty, then set to 1
    const qtys = (qty === "" ? 1 : qty);
    if (qtys === 1) {
      setQty(1);
      setTotalPrice(qtys * normalPrice);
    }
    // redirect to signin if not logged in
    if (!userEmail) {
      history.push("/signin");
      return;
    }

    /**
    * Handle add item to cart, 
    * item will be saved in local storage as object.
    * key  : user email
    */

    // get user cart
    const userCart = localStorage.getItem(userEmail);
    // if user cart not exist, then create empty object
    const cartItem = userCart
      ? JSON.parse(localStorage.getItem(userEmail))
      : {};

    // check if book already in cart
    const duplicateItems = bookDetail.name in cartItem;
    cartItem[bookDetail.name] = {
      cover: bookDetail.cover,
      qty: qtys,
      normalPrice: normalPrice,
      totalPrice: qtys * normalPrice,
      stock: bookDetail.stock,
    };

    // if cart not initialized, then create new cart and save the item
    if (!Object.keys(cartItem)) {
      localStorage.setItem(userEmail, JSON.stringify(cartItem));
      setItemAddedAlert(true);
      setCartBadge(CartHelper.cartBadge(userEmail));
      return;
    }
    // update item if duplicate
    if (duplicateItems) {
      setItemExistAlert(true);
      setItemAddedAlert(false);
      return;
    }
    // if item not duplicate
    if (!duplicateItems) {
      localStorage.setItem(userEmail, JSON.stringify(cartItem));
      setItemAddedAlert(true);
      setCartBadge(CartHelper.cartBadge(userEmail));
      return;
    }
  };

  return (
    <Box
      sx={{
        marginTop: {
          lg: 0,
          md: 0,
          sm: 4,
          xs: 4,
        },
      }}
    >
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
              {totalPrice === 1
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
                  max: bookDetail.stock,
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
  );
}

export default ShoppingCard;
