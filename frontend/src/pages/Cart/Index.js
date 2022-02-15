import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import AuthService from "../../services/auth.service";

import Item from "./Item";
import Header from "./Header";
import Checkout from "./Checkout";

export default function Cart() {
  const userEmail = AuthService.getCurrentUser();
  const [selectedCheckbox, setSelectedCheckbox] = useState(
    localStorage.getItem(userEmail + "Cart") !== null
      ? JSON.parse(localStorage.getItem(userEmail + "Cart"))
      : []
  );
  const [cartItem, setCartItem] = useState(
    // IF cart is not empty then:
    localStorage.getItem(userEmail) !== null
      ? JSON.parse(localStorage.getItem(userEmail))
      : null
  );
  // IF cart is not empty then:
  const cartItemKeys = cartItem !== null ? Object.keys(cartItem) : 0;
  const allCheckboxSelected =
    cartItemKeys.length > 0 && selectedCheckbox.length === cartItemKeys.length;

  const handleSelectedCheckbox = (event) => {
    const value = event.target.value;
    if (value === "all") {
      if (selectedCheckbox.length === cartItemKeys.length) {
        localStorage.removeItem(userEmail + "Cart");
        setSelectedCheckbox([]);
        return;
      }
      if (selectedCheckbox.length !== cartItemKeys.length) {
        localStorage.setItem(userEmail + "Cart", JSON.stringify(cartItemKeys));
        setSelectedCheckbox(cartItemKeys);
        return;
      }
      return;
    }
    const list = [...selectedCheckbox];
    const index = list.indexOf(value);
    index === -1 ? list.push(value) : list.splice(index, 1);
    localStorage.setItem(userEmail + "Cart", JSON.stringify(list));
    setSelectedCheckbox(list);

    if (list.length === 0) {
      localStorage.removeItem(userEmail + "Cart");
      return;
    }
  };

  console.log(cartItem)
  return (
    <>
      {cartItem === null || Object.keys(cartItem).length === 0 ? (
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
              <Header
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
                <Item
                  userEmail={userEmail}
                  cartItem={cartItem}
                  setCartItem={setCartItem}
                  handleSelectedCheckbox={handleSelectedCheckbox}
                  selectedCheckbox={selectedCheckbox}
                  setSelectedCheckbox={setSelectedCheckbox}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <Checkout cartItem={cartItem} selectedCheckbox={selectedCheckbox} />
          </Grid>
        </Grid>
      )}
    </>
  );
}
