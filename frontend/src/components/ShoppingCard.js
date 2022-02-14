import React, { useState } from "react";

import Alert from "./Alert";
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";
import { useCart } from "../hooks/useCart";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import CartHelper from "../helper/cart.helper";

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
    if (userEmail) {
      // get user items using user email as key
      const userCart = localStorage.getItem(userEmail);
      // NEW -> service.addtocart

      var newItems = {};
      newItems[bookDetail.name] = {
        cover: bookDetail.cover,
        qty: qty,
        normalPrice: normalPrice,
        totalPrice: qty * normalPrice,
      };

      // add first new item to cart
      if (userCart === undefined || userCart === null) {
        localStorage.setItem(userEmail, JSON.stringify(newItems));
        const item = JSON.parse(localStorage.getItem(userEmail));
        if (item !== null) {
          setCartBadge(CartHelper.cartBadge(userEmail));
        }
        setItemAddedAlert(true);
        setItemExistAlert(false);
      } else {
        // update cart items
        var oldItems = JSON.parse(localStorage.getItem(userEmail));
        var duplicateItems = bookDetail.name in oldItems;
        if (duplicateItems) {
          setItemExistAlert(true);
          setItemAddedAlert(false);
        } else {
          oldItems[bookDetail.name] = {
            cover: bookDetail.cover,
            qty: qty,
            normalPrice: normalPrice,
            totalPrice: qty * normalPrice
          };
          localStorage.setItem(userEmail, JSON.stringify(oldItems));
          const item = JSON.parse(localStorage.getItem(userEmail));
          if (item !== null) {
            setCartBadge(CartHelper.cartBadge(userEmail));
          }
          setItemAddedAlert(true);
        }
      }
    } else {
      history.push("/signin");
    }
  };

  return (
    <Box
      sx={{
        marginTop: 4,
        marginRight: 4,
        marginLeft: {
          lg: 0,
          md: 4,
          sm: 4,
          xs: 4,
        },
      }}
    >
      {itemExistAlert ? <Alert cartItemExist={"Item is in cart"} /> : <div />}
      {itemAddedAlert ? (
        <Alert cartItemAdded={"Item is added to cart"} />
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
