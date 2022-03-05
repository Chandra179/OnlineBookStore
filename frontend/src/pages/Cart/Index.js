import React, { useState, useEffect } from "react";
// MUI
import {
  Divider,
  Card,
  Button,
  Checkbox,
  TextField,
  FormControl,
  Box,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
// HELPER
import CheckoutHelper from "../../helper/checkout.helper";
import CartHelper from "../../helper/cart.helper";
import InputValidatorHelper from "../../helper/inputValidator.helper";
// SERVICE
import AuthService from "../../services/auth.service";
// COMPONENT
import Header from "./Header";
import Checkout from "./Checkout";
// CONTEXT
import { useCart } from "../../hooks/useCart";
import Styles from "./Styles";

export default function Cart() {
  const { setCartBadge } = useCart();
  const userEmail = AuthService.getCurrentUser();
  const [selectedCheckbox, setSelectedCheckbox] = useState(
    // Populate checkbox value with checkout item
    CheckoutHelper.getCheckoutItem(userEmail)
  );
  const [cartItem, setCartItem] = useState(CartHelper.getCartItem(userEmail));
  const cartItemKeys = cartItem ? Object.keys(cartItem) : 0;
  const isAllCheckboxSelected =
    cartItemKeys.length > 0 && selectedCheckbox.length === cartItemKeys.length;

  /**
   * Handle select all checkbox
   */
  const selectAllCheckbox = (event) => {
    const value = event.target.value;
    if (value === "all") {
      // unselect all checkbox
      if (selectedCheckbox.length === cartItemKeys.length) {
        CheckoutHelper.deleteCheckoutItem(userEmail);
        setSelectedCheckbox([]);
      }
      // select all checkbox
      if (selectedCheckbox.length !== cartItemKeys.length) {
        CheckoutHelper.setCheckoutItem(userEmail, cartItemKeys);
        setSelectedCheckbox(cartItemKeys);
      }
      return;
    }
  };

  /**
   * Handle select checkbox
   */
  const selectCheckbox = (event) => {
    const value = event.target.value;
    // select per item
    const list = [...selectedCheckbox];
    const index = list.indexOf(value);
    index === -1 ? list.push(value) : list.splice(index, 1);
    CheckoutHelper.setCheckoutItem(userEmail, list);
    setSelectedCheckbox(list);

    // if all cart item in checkout removed, then remove storage
    if (list.length === 0) {
      CheckoutHelper.deleteCheckoutItem(userEmail);
      return;
    }
  };

  /**
   * Handle product quantity input change
   */
  const handleQtyChange = (title, normalPrice, stock, event) => {
    var qty = CartHelper.qtyStockValidator(event.target.value, stock);
    const item = CartHelper.getCartItem(userEmail);
    if (Object.keys(item).length !== 0) {
      var newPrice = qty * normalPrice;

      item[title]["qty"] = qty;
      item[title]["totalPrice"] = newPrice;

      localStorage.setItem(userEmail, JSON.stringify(item));
      setCartItem(JSON.parse(localStorage.getItem(userEmail)));
      setCartBadge(CartHelper.cartBadge(userEmail));
    }
  };

  /**
   * handle delete product
   */
  const removeProduct = (title) => {
    if (!cartItem) {
      setCartItem(null);
      return;
    }
    var checkoutItem = CheckoutHelper.getCheckoutItem(userEmail);

    // filter cart item with given title
    if (checkoutItem.length !== 0) {
      var checkoutFiltered = checkoutItem.filter((e) => e !== title);
      CheckoutHelper.setCheckoutItem(userEmail, checkoutFiltered);
      setSelectedCheckbox(CheckoutHelper.getCheckoutItem(userEmail));

      // delete localstorage if checkout empty
      if (checkoutItem.length - 1 === 0) {
        CheckoutHelper.deleteCheckoutItem(userEmail);
      }
    }
    var cartFiltered = Object.fromEntries(
      Object.entries(cartItem).filter(([key, value]) => key !== title)
    );
    CartHelper.setCartItem(userEmail, cartFiltered);
    setCartItem(CartHelper.getCartItem(userEmail));
    setCartBadge(CartHelper.cartBadge(userEmail));

    // delete localStorage if cart empty
    if (Object.keys(cartItem).length - 1 === 0) {
      CartHelper.deleteCartItem(userEmail);
    }
  };

  return (
    <>
      {cartItem === null || Object.keys(cartItem).length === 0 ? (
        <p>cart empty</p>
      ) : (
        <Grid container>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Box sx={Styles.boxContainer}>
              <Header
                selectAllCheckbox={selectAllCheckbox}
                isAllCheckboxSelected={isAllCheckboxSelected}
              />
              <Divider sx={Styles.divider} />
              <Box sx={Styles.boxContent}>
                <Box>
                  {Object.keys(cartItem).map(function (key) {
                    var title = key;
                    var normalPrice = cartItem[key]["normalPrice"];
                    var qty = cartItem[key]["qty"];
                    var totalPrice =
                      qty === "" ? normalPrice : cartItem[key]["totalPrice"];
                    var cover = cartItem[key]["cover"];
                    var stock = cartItem[key]["stock"];

                    return (
                      <Box
                        key={key}
                        mb={3}
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          {/* CHECKBOX AND COVER */}
                          <Box mr={1} sx={Styles.coverBox}>
                            <Box key={key}>
                              <Checkbox
                                value={key}
                                onChange={selectCheckbox}
                                checked={selectedCheckbox.includes(key)}
                              />
                            </Box>
                            <Card sx={Styles.coverCard}>
                              <CardMedia component="img" image={cover} />
                            </Card>
                          </Box>

                          {/* DESCRIPTION */}
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            {/* TITLE */}
                            <Box>
                              <Typography sx={Styles.descTitle}>
                                {title}
                              </Typography>
                            </Box>
                            {/* PRICE */}
                            <Box>
                              <Typography sx={Styles.descPrice}>
                                $ {totalPrice.toFixed(2)}
                              </Typography>
                            </Box>
                          </Box>

                          <Divider sx={{ bottomWidth: 1 }} />
                        </Box>
                        {/* QTY, DELETE */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              paddingTop: 2,
                              width: 80,
                              height: { lg: 40, md: 40, sm: 40, xs: 30 },
                            }}
                          >
                            <FormControl fullWidth>
                              <TextField
                                id="outlined-number-qty"
                                label="Qty"
                                type="tel"
                                onChange={(e) =>
                                  handleQtyChange(title, normalPrice, stock, e)
                                }
                                onKeyPress={(event) =>
                                  InputValidatorHelper(event)
                                }
                                value={qty}
                                size="small"
                              />
                            </FormControl>
                          </Box>

                          <Box sx={{ marginTop: 3 }}>
                            <Button
                              variant="contained"
                              sx={{
                                textTransform: "none",
                                height: {
                                  lg: 30,
                                  md: 30,
                                  sm: 28,
                                  xs: 26,
                                },
                              }}
                              onClick={(e) => removeProduct(title, e)}
                            >
                              <Typography
                                sx={{
                                  fontSize: {
                                    lg: 16,
                                    md: 16,
                                    sm: 14,
                                    xs: 12,
                                  },
                                }}
                              >
                                Delete
                              </Typography>
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Checkout
              userEmail={userEmail}
              cartItem={cartItem}
              selectedCheckbox={selectedCheckbox}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
