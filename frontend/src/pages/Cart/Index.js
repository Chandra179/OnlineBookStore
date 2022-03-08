import React, { useState } from "react";
// MUI
import {
  Divider,
  Card,
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
import InputHelper from "../../helper/input.helper";
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
    const item = CartHelper.isItemInCart(userEmail);
    if (!item) window.location.reload();

    var qty = Number(event.target.value)
    var validQty = CartHelper.qtyValidator(qty, stock);
   
    item[title]["qty"] = validQty;
    item[title]["totalPrice"] = validQty * normalPrice;

    CartHelper.setCartItem(userEmail, item);
    setCartItem(CartHelper.getCartItem(userEmail));
    setCartBadge(CartHelper.cartBadge(userEmail));
  };

  const incrementProduct = (title, normalPrice, stock, event) => {
    const item = CartHelper.isItemInCart(userEmail)
    if (!item) window.location.reload()

    var qty = Number(item[title]["qty"]);
    var validQty = CartHelper.qtyValidator(qty, stock);

    item[title]["qty"] = validQty + 1;
    item[title]["totalPrice"] = item[title]["qty"] * normalPrice;

    CartHelper.setCartItem(userEmail, item);
    setCartItem(CartHelper.getCartItem(userEmail));
    setCartBadge(CartHelper.cartBadge(userEmail));

  };

  const decrementProduct = (title, normalPrice, stock, event) => {
    const item = CartHelper.isItemInCart(userEmail)
    if (!item) window.location.reload()

    var qty = Number(item[title]["qty"]);
    if (qty < 1) return;
    
    var validQty = CartHelper.qtyValidator(qty, stock);
    item[title]["qty"] = validQty - 1;
    item[title]["totalPrice"] = item[title]["qty"] * normalPrice;

    CartHelper.setCartItem(userEmail, item);
    setCartItem(CartHelper.getCartItem(userEmail));
    setCartBadge(CartHelper.cartBadge(userEmail));
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
      CartHelper.removeCart(userEmail);
    }
  };

  return (
    <>
      {cartItem === null || Object.keys(cartItem).length === 0 ? (
        <p>cart empty</p>
      ) : (
        <Grid container>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Box sx={Styles.containerBox}>
              <Header
                selectAllCheckbox={selectAllCheckbox}
                isAllCheckboxSelected={isAllCheckboxSelected}
              />
              <Divider sx={Styles.divider} />
              <Box sx={Styles.contentBox}>
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
                      <Box key={key} mb={3} sx={Styles.itemBox}>
                        <Box pr={1} sx={Styles.checkBoxAndCoverBox}>
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
                            <Card sx={Styles.coverCard}>
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
                            <Grid item lg={9} md={9} sm={9} xs={12} mb={0.4}>
                              <Box>
                                <Typography sx={Styles.titleText}>
                                  {title}
                                </Typography>
                              </Box>
                            </Grid>
                            {/* PRICE */}
                            <Grid item lg={3} md={3} sm={3} xs={12}>
                              <Box sx={Styles.priceBox}>
                                <Typography sx={Styles.priceText}>
                                  $ {totalPrice.toFixed(2)}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>

                          {/* QUANTITY INPUT */}
                          <Grid>
                            <Box sx={Styles.quantityBox}>
                              <Box mb={1}>
                                <IconButton
                                  size="small"
                                  value={qty}
                                  onClick={(e) =>
                                    decrementProduct(
                                      title,
                                      normalPrice,
                                      stock,
                                      e
                                    )
                                  }
                                >
                                  <RemoveCircleOutlineOutlinedIcon
                                    sx={Styles.iconStyles}
                                  />
                                </IconButton>
                              </Box>
                              <Box sx={{ width: 60 }}>
                                <FormControl fullWidth>
                                  <TextField
                                    variant="standard"
                                    type="tel"
                                    size="small"
                                    value={qty}
                                    onKeyPress = {(e) => InputHelper.numberOnly(e)}
                                    onChange={(e) =>
                                      handleQtyChange(
                                        title,
                                        normalPrice,
                                        stock,
                                        e
                                      )
                                    }
                                    inputProps={{
                                      style: Styles.quantityInputProps,
                                    }}
                                  />
                                </FormControl>
                              </Box>
                              <Box mb={1}>
                                <IconButton
                                  size="small"
                                  onClick={(e) =>
                                    incrementProduct(
                                      title,
                                      normalPrice,
                                      stock,
                                      e
                                    )
                                  }
                                >
                                  <AddCircleOutlineOutlinedIcon
                                    sx={Styles.iconStyles}
                                  />
                                </IconButton>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                        <Box ml={2}>
                          <IconButton
                            size="small"
                            onClick={(e) => removeProduct(title, e)}
                            sx={Styles.closeIcon}
                          >
                            <CloseSharpIcon sx={{ fontSize: 20 }} />
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
              cartItem={cartItem}
              selectedCheckbox={selectedCheckbox}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
