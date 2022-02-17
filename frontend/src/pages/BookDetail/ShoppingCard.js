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

function QtyInput({ qty, stock, setQty, normalPrice, setTotalPrice, classes }) {
  const handleQtyChange = (event) => {
    var qty = event.target.value;
    if (qty > stock) {
      qty = stock;
    }
    if (qty.toString()[0] !== "0") {
      setQty(qty);
    }
    setTotalPrice(qty * normalPrice);
  };

  const InputNumberOnly = (event) => {
    var theEvent = event || window.event;
    var key;
    // Handle paste
    if (theEvent.type === "paste") {
      key = event.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  };

  return (
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
          type="number"
          onChange={handleQtyChange}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputProps: {
              max: stock,
              min: 1,
            },
          }}
          onKeyPress={(event) => InputNumberOnly(event)}
          value={qty}
        />
      </FormControl>
    </Box>
  );
}

function AddToCartButton({ handleAddToCart, classes }) {
  return (
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
  );
}

function ShoppingCard({ bookDetail }) {
  const [itemExistAlert, setItemExistAlert] = useState(false);
  const [itemAddedAlert, setItemAddedAlert] = useState(false);
  const [totalPrice, setTotalPrice] = useState(1);
  const [qty, setQty] = useState(1);

  const { setCartBadge } = useCart();
  const history = useHistory();
  const normalPrice = Number(bookDetail.price);

  const handleAddToCart = () => {
    const userEmail = AuthService.getCurrentUser();
    if (!userEmail) {
      history.push("/signin");
      return;
    }
    const userCart = localStorage.getItem(userEmail);
    const cartItem = userCart ? JSON.parse(localStorage.getItem(userEmail)) : {}
    const duplicateItems = bookDetail.name in cartItem;

    cartItem[bookDetail.name] = {
      cover: bookDetail.cover,
      qty: qty,
      normalPrice: normalPrice,
      totalPrice: qty * normalPrice,
      stock: bookDetail.stock,
    };
    // add new item
    if (Object.keys(cartItem).length === 0) {
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
    // if not duplicate and not the first item
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
        <QtyInput
          qty={qty}
          normalPrice={normalPrice}
          setTotalPrice={setTotalPrice}
          stock={bookDetail.stock}
          setQty={setQty}
        />
        <Stack>
          <AddToCartButton handleAddToCart={handleAddToCart} />
          <Button variant="outlined" sx={{ margin: "10px 10px 10px 10px" }}>
            Buy now
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default ShoppingCard;
