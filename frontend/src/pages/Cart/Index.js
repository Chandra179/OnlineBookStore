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

  return (
    <>
      {cartItem === null || Object.keys(cartItem).length === 0 ? (
        <p>cart empty</p>
      ) : (
        <Grid container>
          <Grid item lg={8} md={8} sm={12} xs={12} sx={{boxShadow: 1}}>
            <Box
              sx={{
                marginRight: {
                  xl: 4,
                  lg: 4,
                  md: 4,
                  sm: 6,
                  xs: 2,
                },
              }}
            >
              <Header
                handleSelectedCheckbox={handleSelectedCheckbox}
                allCheckboxSelected={allCheckboxSelected}
              />
              <Divider
                sx={{
                  marginLeft: {
                    lg: 5,
                    md: 5,
                    sm: 5,
                    xs: 2
                  },
                  paddingTop: 2,
                  marginBottom: 4,
                  borderBottomWidth: 2,
                }}
              />
              <Box
                sx={{
                  marginLeft: {
                    lg: 5,
                    md: 5,
                    sm: 5,
                    xs: 2
                  }
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
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Checkout cartItem={cartItem} selectedCheckbox={selectedCheckbox} />
          </Grid>
        </Grid>
      )}
    </>
  );
}
