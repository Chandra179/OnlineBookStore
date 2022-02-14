import React from "react";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CartHelper from "../../helper/cart.helper";
import { useCart } from "../../hooks/useCart";

export default function Item({
  userEmail,
  cartItem,
  setCartItem,
  handleSelectedCheckbox,
  selectedCheckbox,
}) {
  const { setCartBadge } = useCart();

  const handleQtyChange = (title, normalPrice, stock, event) => {
    var newQty = event.target.value;
    if (newQty > stock) {
      newQty = stock;
    }
    if (newQty.toString()[0] !== "0") {
      const item = localStorage.getItem(userEmail);
      console.log(item)
      if (item !== null) {
        var newItem = JSON.parse(item);
        var newPrice = newQty * normalPrice;

        newItem[title]["qty"] = newQty;
        newItem[title]["totalPrice"] = newPrice;

        // localStorage.setItem(userEmail, JSON.stringify(newItem));

        // setCartItem(JSON.parse(localStorage.getItem(userEmail)));
        // setCartBadge(CartHelper.cartBadge(userEmail));
      }
    }
  };

  console.log(selectedCheckbox)
  console.log(cartItem)

  const removeProduct = (title) => {
    var cartItem =
      localStorage.getItem(userEmail) !== null
        ? JSON.parse(localStorage.getItem(userEmail))
        : null;


    var cartFiltered = Object.fromEntries(
      Object.entries(cartItem).filter(([key, value]) => key !== title)
    );

    // var checkoutFiltered = checkoutItem.filter((e) => e !== title);
    // if (checkoutFiltered.length === 0) {
    //   localStorage.removeItem(userEmail + "Cart");
    // }

    //localStorage.setItem(userEmail + "Cart", JSON.stringify(checkoutFiltered));
    localStorage.setItem(userEmail, JSON.stringify(cartFiltered));
    setCartItem(JSON.parse(localStorage.getItem(userEmail)));
    setCartBadge(CartHelper.cartBadge(userEmail));
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
    <>
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
              paddingBottom: 5,
              display: "flex",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box key={key}>
                  <Checkbox
                    sx={{ marginRight: 1 }}
                    value={key}
                    onChange={handleSelectedCheckbox}
                    checked={selectedCheckbox.includes(key)}
                  />
                </Box>

                <Card
                  sx={{
                    minWidth: 90,
                    maxWidth: {
                      lg: 120,
                      md: 120,
                      sm: 120,
                      xs: 90,
                    },
                    marginRight: 2,
                  }}
                >
                  <CardMedia component="img" image={cover} />
                </Card>
              </Box>

              {/* CART BODY */}
              <Box sx={{ marginRight: 4 }}>
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

                <Box
                  sx={{
                    paddingTop: 2,
                    width: 80,
                    height: { lg: 50, md: 50, sm: 50, xs: 40 },
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
                    />
                  </FormControl>
                </Box>

                <Box sx={{ marginTop: 3.5 }}>
                  <Button
                    variant="contained"
                    onClick={(e) => removeProduct(title, e)}
                  >
                    <Typography
                      sx={{
                        fontSize: 12,
                        paddingLeft: 0.2,
                        letterSpacing: 1,
                      }}
                    >
                      Delete
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* PRODUCT PRICE */}
            <Box sx={{ marginLeft: "auto" }}>
              <Typography>$ {totalPrice.toFixed(2)}</Typography>
            </Box>
          </Box>
        );
      })}
    </>
  );
}
