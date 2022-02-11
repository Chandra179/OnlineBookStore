import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useCart } from "../hooks/useCart";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Divider } from "@mui/material";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import AuthService from "../services/auth.service";
import CartHelper from "../helper/cart.helper";

function CartHeader({ handleSelectedCheckbox, allCheckboxSelected }) {
  return (
    <Box
      sx={{
        display: "flex",
        marginLeft: 6,
        marginTop: 6,
      }}
    >
      <Box>
        <Typography variant="h6">Your cart</Typography>
      </Box>
      <Box
        sx={{
          marginLeft: "auto",
          width: 90,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="p">Select all</Typography>
        </Box>
        <Box sx={{ marginLeft: "auto" }}>
          <Checkbox
            sx={{ width: 0, height: 0 }}
            value="all"
            onChange={handleSelectedCheckbox}
            checked={allCheckboxSelected}
          />
        </Box>
      </Box>
    </Box>
  );
}

function CheckoutCard() {
  return (
    <Box
      sx={{
        marginTop: 6,
        minWidth: 300,
        marginRight: 5,
        marginLeft: {
          lg: 2,
          md: 2,
          sm: 6,
          xs: 6,
        },
      }}
    >
      <Box sx={{ boxShadow: 1 }}>
        <Typography variant="h6">Order summary</Typography>
      </Box>
    </Box>
  );
}

function Book({
  cartItemKeys,
  cartItem,
  handleSelectedCheckbox,
  selectedCheckbox,
  handleQtyChange,
  qtyInputNumberOnly,
  removeProduct,
}) {
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

                <Box sx={{ marginTop: 3, color: "blue" }}>
                  <Link to="" onClick={(e) => removeProduct(title, e)}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        paddingLeft: 0.2,
                        color: "black",
                        "&:hover": {
                          color: "red",
                        },
                      }}
                    >
                      Delete
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Box>

            {/* PRODUCT PRICE */}
            <Box
              sx={{
                marginLeft: "auto",
              }}
            >
              <Typography>$ {totalPrice.toFixed(2)}</Typography>
            </Box>
          </Box>
        );
      })}
    </>
  );
}

export default function Cart() {
  const userEmail = AuthService.getCurrentUser();
  const { setCartBadge } = useCart();

  const [cartItem, setCartItem] = useState(
    // IF cart is not empty then:
    localStorage.getItem(userEmail) !== null
      ? JSON.parse(localStorage.getItem(userEmail))
      : null
  );

  // get all item with checkout: true
  const [selectedCheckbox, setSelectedCheckbox] = useState(
    Object.keys(cartItem).filter((key) => cartItem[key]["checkout"] === true)
  );

  // get all cart item
  const cartItemKeys = cartItem !== null ? Object.keys(cartItem) : 0;

  // check if cart length === allCheckBox length
  const [allCheckboxSelected, setAllCheckboxSelected] = useState(
    cartItemKeys.length > 0 && selectedCheckbox.length === cartItemKeys.length
  );



  const handleSelectedCheckbox = (event) => {
    const value = event.target.value;

    if (value === "all") {
      var item = JSON.parse(localStorage.getItem(userEmail))
      
      const isItemEqual = selectedCheckbox.length === cartItemKeys.length;
      if (isItemEqual) {
        Object.keys(item).forEach(key => {
          item[key]['checkout'] = false;
        });
        setAllCheckboxSelected(false);
        setSelectedCheckbox([]);
        localStorage.setItem(userEmail, JSON.stringify(item));
      } else {
        Object.keys(item).forEach(key => {
          item[key]['checkout'] = true;
        });
        localStorage.setItem(userEmail, JSON.stringify(item));
        setAllCheckboxSelected(true);
        setSelectedCheckbox(cartItemKeys);
      }
      return;
    }
    const list = [...selectedCheckbox];
    const index = list.indexOf(value);
    index === -1 ? list.push(value) : list.splice(index, 1);
    setSelectedCheckbox(list);
  };

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

  const removeProduct = (title) => {
    var oldItem = JSON.parse(localStorage.getItem(userEmail));

    const filteredByKey = Object.fromEntries(
      Object.entries(oldItem).filter(([key, value]) => key !== title)
    );

    localStorage.setItem(userEmail, JSON.stringify(filteredByKey));
    setCartItem(JSON.parse(localStorage.getItem(userEmail)));
    setCartBadge(CartHelper.cartBadge(userEmail));
  };

  return (
    <>
      {cartItem === null ? (
        <p>cart empty</p>
      ) : (
        <Grid container spacing={2}>
          <Grid item lg={7} md={7} sm={12} xs={12}>
            <Box
              sx={{
                marginRight: {
                  xl: 2,
                  lg: 2,
                  md: 2,
                  sm: 6,
                  xs: 6,
                },
              }}
            >
              <CartHeader
                handleSelectedCheckbox={handleSelectedCheckbox}
                allCheckboxSelected={allCheckboxSelected}
              />
              <Divider
                sx={{
                  marginLeft: 6,
                  paddingTop: 2,
                  marginBottom: 4,
                  borderBottomWidth: 3,
                }}
              />
              <Box
                sx={{
                  marginLeft: 6,
                }}
              >
                <Book
                  cartItemKeys={cartItemKeys}
                  cartItem={cartItem}
                  handleSelectedCheckbox={handleSelectedCheckbox}
                  selectedCheckbox={selectedCheckbox}
                  handleQtyChange={handleQtyChange}
                  qtyInputNumberOnly={qtyInputNumberOnly}
                  removeProduct={removeProduct}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <CheckoutCard />
          </Grid>
        </Grid>
      )}
    </>
  );
}
