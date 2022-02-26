import React from "react";
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
} from "@mui/material";
import CartHelper from "../../helper/cart.helper";
import { useCart } from "../../hooks/useCart";
import InputValidatorHelper from "../../helper/inputValidator.helper";

/**
 * 
 * @param {str} userEmail 
 * @param {object} cartItem
 * @param {state} setCartItem
 * @param {function} handleSelectedCheckbox
 * @param {list} selectedCheckbox
 * @param {state} setSelectedCheckbox
 */

export default function Item({
  userEmail,
  cartItem,
  setCartItem,
  handleSelectedCheckbox,
  selectedCheckbox,
  setSelectedCheckbox,
}) {
  const { setCartBadge } = useCart();

  /*
    Handle product quantity input change
  */
  const handleQtyChange = (title, normalPrice, stock, event) => {
    var newQty = event.target.value;
    if (newQty > stock) {
      newQty = stock;
    }
    if (newQty.toString()[0] !== "0") {
      // get cart item
      const item = localStorage.getItem(userEmail);
      if (item) {
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

  /*
    Handle remove product
  */
  const removeProduct = (title) => {
    // if cart not exist
    if (!cartItem) {
      setCartItem(null);
      return;
    }
    var checkoutItem =
      localStorage.getItem(userEmail + "Checkout")
        ? JSON.parse(localStorage.getItem(userEmail + "Checkout"))
        : null;
        
    // given title, if there is item in localstorage then remove item
    if (checkoutItem) {
      var checkoutFiltered = checkoutItem.filter((e) => e !== title);
      localStorage.setItem(
        userEmail + "Checkout",
        JSON.stringify(checkoutFiltered)
      );
      setSelectedCheckbox(JSON.parse(localStorage.getItem(userEmail + "Checkout")));

      // if storage empty
      if (checkoutItem.length - 1 === 0) {
        localStorage.removeItem(userEmail + "Checkout");
      }
    }

    var cartFiltered = Object.fromEntries(
      Object.entries(cartItem).filter(([key, value]) => key !== title)
    );

    localStorage.setItem(userEmail, JSON.stringify(cartFiltered));
    setCartItem(JSON.parse(localStorage.getItem(userEmail)));
    setCartBadge(CartHelper.cartBadge(userEmail));

    if (Object.keys(cartItem).length - 1 === 0) {
      localStorage.removeItem(userEmail);
    }
  };

  return (
    <Box>
      {Object.keys(cartItem).map(function (key) {
        var title = key;
        var normalPrice = cartItem[key]["normalPrice"];
        var qty = cartItem[key]["qty"];
        var totalPrice = qty === "" ? normalPrice : cartItem[key]["totalPrice"];
        var cover = cartItem[key]["cover"];
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
                    sx={{ marginRight: 1, width: 0, height: 0 }}
                    value={key}
                    onChange={handleSelectedCheckbox}
                    checked={selectedCheckbox.includes(key)}
                  />
                </Box>

                <Card
                  sx={{
                    width: 120,
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
                          xs: 12,
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
                        id="outlined-number-qty"
                        label="Qty"
                        type="tel"
                        onChange={(e) =>
                          handleQtyChange(title, normalPrice, stock, e)
                        }
                        onKeyPress={(event) => InputValidatorHelper(event)}
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
                        sx={{ fontSize: { lg: 16, md: 16, sm: 14, xs: 12 } }}
                      >
                        Delete
                      </Typography>
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  marginLeft: "auto",
                }}
              >
                <Box sx={{ display: 'flex'}}>
                  <Typography
                    sx={{
                      fontSize: {
                        lg: 16,
                        md: 16,
                        sm: 15,
                        xs: 12,
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
