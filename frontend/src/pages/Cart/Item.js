import React from "react";
import {
  Divider,
  Grid,
  Card,
  Button,
  Checkbox,
  TextField,
  FormControl,
  Box,
  CardMedia,
  Typography,
} from "@mui/material";

import CartHelper from "../../helper/cart.helper";
import { useCart } from "../../hooks/useCart";

export default function Item({
  userEmail,
  cartItem,
  setCartItem,
  handleSelectedCheckbox,
  selectedCheckbox,
  setSelectedCheckbox,
}) {
  const { setCartBadge } = useCart();

  const handleQtyChange = (title, normalPrice, stock, event) => {
    var newQty = event.target.value;
    if (newQty > stock) {
      newQty = stock;
    }
    if (newQty.toString()[0] !== "0") {
      const item = localStorage.getItem(userEmail);
      if (item !== null) {
        var newItem = JSON.parse(item);
        var newPrice = newQty * normalPrice;

        newItem[title]["qty"] = newQty;
        newItem[title]["totalPrice"] = newPrice;

        localStorage.setItem(userEmail, JSON.stringify(newItem));

        setCartItem(JSON.parse(localStorage.getItem(userEmail)));
        setCartBadge(CartHelper.cartBadge(userEmail));
      }
    }
  };

  const removeProduct = (title) => {
    var checkoutItem =
      localStorage.getItem(userEmail + "Cart") !== null
        ? JSON.parse(localStorage.getItem(userEmail + "Cart"))
        : null;

    var cartFiltered = Object.fromEntries(
      Object.entries(cartItem).filter(([key, value]) => key !== title)
    );

    if (checkoutItem !== null) {
      var checkoutFiltered = checkoutItem.filter((e) => e !== title);
      localStorage.setItem(
        userEmail + "Cart",
        JSON.stringify(checkoutFiltered)
      );
      setSelectedCheckbox(JSON.parse(localStorage.getItem(userEmail + "Cart")));

      if (checkoutItem.length - 1 === 0) {
        localStorage.removeItem(userEmail + "Cart");
      }
    }

    localStorage.setItem(userEmail, JSON.stringify(cartFiltered));
    setCartItem(JSON.parse(localStorage.getItem(userEmail)));
    setCartBadge(CartHelper.cartBadge(userEmail));

    if (Object.keys(cartItem).length - 1 === 0) {
      localStorage.removeItem(userEmail);
    }
  };

  const qtyInputNumberOnly = (event) => {
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
    <Box>
      {Object.keys(cartItem).map(function (key) {
        var title = key;
        var normalPrice = cartItem[key]["normalPrice"];
        var totalPrice = cartItem[key]["totalPrice"];
        var cover = cartItem[key]["cover"];
        var qty = cartItem[key]["qty"];
        var stock = cartItem[key]["stock"];

        return (
          <Box
            key={key}
            sx={{
              marginBottom: 3,
            }}
          >
            <Box sx={{ display: "flex", marginBottom: 3 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", marginRight: 2 }}
              >
                <Box key={key} sx={{ marginRight: 1 }}>
                  <Checkbox
                    sx={{ marginRight: 1, width:0, height:0 }}
                    value={key}
                    onChange={handleSelectedCheckbox}
                    checked={selectedCheckbox.includes(key)}
                  />
                </Box>

                <Card
                  sx={{
                    minWidth: 80,
                    maxWidth: {
                      lg: 120,
                      md: 120,
                      sm: 120,
                      xs: 80,
                    },
                  }}
                >
                  <CardMedia component="img" image={cover} />
                </Card>
              </Box>

              <Box sx={{ display: "flex" }}>
                {/* CART BODY */}
                <Box sx={{ marginRight: 3 }}>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        letterSpacing: 1.3,
                        fontSize: {
                          lg: 17,
                          md: 17,
                          sm: 16,
                          xs: 13,
                        },
                      }}
                    >
                      {title}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      paddingTop: 2,
                      width: 80,
                      height: { lg: 40, md: 40, sm: 40, xs: 30 },
                    }}
                  >
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-number"
                        label="Qty"
                        type="number"
                        onChange={(e) =>
                          handleQtyChange(title, normalPrice, stock, e)
                        }
                        onKeyPress={(event) => qtyInputNumberOnly(event)}
                        value={qty}
                        size='small'
                      />
                    </FormControl>
                  </Box>

                  <Box sx={{ marginTop: 3 }}>
                    <Button
                      variant="contained"
                      sx={{ textTransform: "none", height: 30 }}
                      onClick={(e) => removeProduct(title, e)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  marginLeft: "auto",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: {
                        lg: 16,
                        md: 16,
                        sm: 15,
                        xs: 13,
                      },
                      fontWeight: 600,
                    }}
                  >
                    $ {totalPrice.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider sx={{ bottomWidth: 1 }} />
          </Box>
        );
      })}
    </Box>
  );
}
