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
  IconButton,
} from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
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

      CartHelper.setCartItem(userEmail, item);
      setCartItem(CartHelper.getCartItem(userEmail));
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


  const minusProduct = (title, normalPrice, stock, event) => {
    const item = CartHelper.getCartItem(userEmail);
    if (Object.keys(item).length !== 0) {
      var newQty = item[title]["qty"] - 1;
      var qty = CartHelper.qtyStockValidator(newQty, stock);

      item[title]["qty"] = qty
      item[title]["totalPrice"] = qty * normalPrice;;

      CartHelper.setCartItem(userEmail, item);
      setCartItem(CartHelper.getCartItem(userEmail));
      setCartBadge(CartHelper.cartBadge(userEmail));
    }
  }

  const plusProduct = (title, normalPrice, stock, event) => {
    const item = CartHelper.getCartItem(userEmail);
    if (Object.keys(item).length !== 0) {
      var newQty = item[title]["qty"] + 1;
      var qty = CartHelper.qtyStockValidator(newQty, stock);

      item[title]["qty"] = qty
      item[title]["totalPrice"] = qty * normalPrice;;

      CartHelper.setCartItem(userEmail, item);
      setCartItem(CartHelper.getCartItem(userEmail));
      setCartBadge(CartHelper.cartBadge(userEmail));
    }
  }
  

  return (
    <>
      {cartItem === null || Object.keys(cartItem).length === 0 ? (
        <p>cart empty</p>
      ) : (
        <Grid container>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Box
              sx={{
                marginRight: { xl: 4, lg: 4, md: 4, sm: 6, xs: 2 },
              }}
            >
              <Header
                selectAllCheckbox={selectAllCheckbox}
                isAllCheckboxSelected={isAllCheckboxSelected}
              />
              <Divider
                sx={{
                  marginLeft: { lg: 5, md: 5, sm: 5, xs: 2 },
                  paddingTop: 2,
                  marginBottom: 3,
                  borderBottomWidth: 2,
                }}
              />
              <Box
                sx={{
                  marginLeft: { lg: 5, md: 5, sm: 5, xs: 2 },
                }}
              >
                <Box>
                  {Object.keys(cartItem).map(function (key) {
                    var title = key;
                    var normalPrice = cartItem[key]["normalPrice"];
                    var qty = cartItem[key]["qty"];
                    var totalPrice = qty
                      ? cartItem[key]["totalPrice"]
                      : normalPrice;
                    var cover = cartItem[key]["cover"];
                    var stock = cartItem[key]["stock"];

                    return (
                      <Box
                        key={key}
                        mb={3}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                      >
                        <Box
                          pr={1}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          {/* CHECKBOX */}
                          <Box pr={1}>
                            <Checkbox
                              sx={{ width: 20, height: 20 }}
                              value={key}
                              onChange={selectCheckbox}
                              checked={selectedCheckbox.includes(key)}
                            />
                          </Box>
                          {/* COVER */}
                          <Box>
                            <Card
                              sx={{
                                width: 120,
                                maxWidth: {
                                  lg: 120,
                                  md: 120,
                                  sm: 110,
                                  xs: 80,
                                },
                              }}
                            >
                              <CardMedia component="img" image={cover} />
                            </Card>
                          </Box>
                        </Box>

                        <Grid container direction="column">
                          <Grid
                            container
                            direction="row"
                            alignItems="flex-start"
                            justifyContent="space-between"
                          >
                            {/* TITLE */}
                            <Grid direction="column">
                              <Box
                                mb={0.4}
                                sx={{
                                  width: { lg: 470, md: 340, sm: 340 },
                                  maxWidth: { xs: 280 },
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontWeight: 500,
                                    letterSpacing: 1.3,
                                    fontSize: {
                                      lg: 16,
                                      md: 15,
                                      sm: 15,
                                      xs: 12,
                                    },
                                  }}
                                >
                                  {title}
                                </Typography>
                              </Box>
                            </Grid>
                            {/* PRICE */}
                            <Grid direction="column">
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
                            </Grid>
                          </Grid>

                          {/* QUANTITY INPUT */}
                          <Grid direction="row">
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 2,
                                height: { lg: 40, md: 40, sm: 40, xs: 30 },
                              }}
                            >
                              <Box mb={1}>
                                <IconButton
                                  size="small"
                                  value={qty}
                                  onClick={(e) =>
                                    minusProduct(
                                      title,
                                      normalPrice,
                                      stock,
                                      e
                                    )
                                  }
                                >
                                  <RemoveCircleOutlineOutlinedIcon
                                    sx={{ fontSize: 24, color: "#3664d9" }}
                                  />
                                </IconButton>
                              </Box>
                              <Box sx={{ width: 60 }}>
                                <FormControl fullWidth>
                                  <TextField
                                    variant="standard"
                                    id="outlined-number-qty"
                                    type="tel"
                                    onChange={(e) =>
                                      handleQtyChange(
                                        title,
                                        normalPrice,
                                        stock,
                                        e
                                      )
                                    }
                                    onKeyPress={(event) =>
                                      InputValidatorHelper(event)
                                    }
                                    value={qty}
                                    size="small"
                                    inputProps={{
                                      style: {
                                        height: 12,
                                        borderRadius: 0,
                                        textAlign: "center",
                                      },
                                    }}
                                  />
                                </FormControl>
                              </Box>
                              <Box mb={1}>
                                <IconButton
                                  size="small"
                                  onClick={(e) =>
                                    plusProduct(
                                      title,
                                      normalPrice,
                                      stock,
                                      e
                                    )
                                  }
                                >
                                  <AddCircleOutlineOutlinedIcon
                                    sx={{ fontSize: 24, color: "#3664d9" }}
                                  />
                                </IconButton>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                        <Box ml={2}>
                          <IconButton
                            sx={{ width: 0, height: 0, paddingTop: 0 }}
                            size="small"
                            onClick={(e) => removeProduct(title, e)}
                          >
                            <CloseSharpIcon />
                          </IconButton>
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
