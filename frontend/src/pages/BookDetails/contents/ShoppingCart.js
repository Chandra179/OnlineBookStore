import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// MUI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
// COMPONENTS
import Alert from "../../../components/Alert";
// SERVICE
import AuthService from "../../../services/auth.service";
// CONTEXT
import { useCart } from "../../../hooks/useCart";
// HELPER
import CartHelper from "../../../helper/cart.helper";
import InputHelper from "../../../helper/input.helper";

/**
 *
 * @param {Object} bookDetails book description: title, price, stock, etc.
 */
function ShoppingCart({ bookDetails }) {
  const history = useHistory();
  const userEmail = AuthService.getCurrentUser();
  const [isItemExist, setIsItemExist] = useState(false);
  const [isItemAdded, setIsItemAdded] = useState(false);
  
  // price for 1 book, eg: 1 book -> $22
  const normalPrice = Number(bookDetails.price);

  // Total book price, eg: 10 * $22 = $220
  const [totalPrice, setTotalPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const { setCartBadge } = useCart();

  /**
   * Handle qty input
   */
  const handleQtyChange = (event) => {
    var qty = CartHelper.qtyValidator(event.target.value, bookDetails.stock);
    setQty(qty);
    setTotalPrice(qty * normalPrice);
  };

  /**
   * Handle add item to cart,
   * item will be saved in local storage as object.
   * object key : user email
   */
  const handleAddToCart = () => {
    if (!userEmail) {
      history.push("/signin");
      return;
    }
    // IMPORTANT!: check if user token is valid in backend

    const cartItem = CartHelper.getCartItem(userEmail);
    const isItemDuplicate = bookDetails.name in cartItem;

    if (isItemDuplicate) {
      setIsItemExist(true);
      setIsItemAdded(false);
      return;
    }
    // if qty input is empty then set to 1
    const qtys = qty ? qty : 1;
    if (qtys === 1) {
      setQty(1);
    }
    cartItem[bookDetails.name] = {
      cover: bookDetails.cover,
      qty: qtys,
      normalPrice: normalPrice,
      totalPrice: qtys * normalPrice,
      stock: bookDetails.stock,
    };
    CartHelper.setCartItem(userEmail, cartItem);
    setIsItemAdded(true);
    setIsItemExist(false);

    // update cart badge with newest item
    const cartBadge = CartHelper.cartBadge(userEmail)
    setCartBadge(cartBadge);
  };

  return (
    <Grid item lg={3} md={3} sm={12} xs={12}>
      <Box
        sx={{
          marginTop: { lg: 0, md: 0, sm: 4, xs: 4 },
        }}
      >
        {isItemExist ? (
          <Alert name={"Item is in cart"} severity="error" />
        ) : (
          <div />
        )}
        {isItemAdded ? (
          <Alert name={"Item is added to cart"} severity="success" />
        ) : (
          <div />
        )}

        <Box sx={{ boxShadow: 1 }}>
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
            <Box pr={2} sx={{ marginLeft: "auto" }}>
              <Typography variant="h6">
                ${" "}
                {totalPrice ? totalPrice.toFixed(2) : normalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              maxWidth: 80,
              minWidth: 30,
              margin: 1.3,
            }}
          >
            <FormControl fullWidth>
              <TextField
                id="outlined-number"
                label="Qty"
                type="tel"
                onChange={handleQtyChange}
                InputProps={{
                  inputProps: {
                    max: bookDetails.stock,
                    min: 1,
                  },
                  style: {
                    height: 52,
                  },
                }}
                onKeyPress={(event) => InputHelper.numberOnly(event)}
                value={qty}
                sx={{
                  // override mui style
                  "& #outlined-number-label": {
                    fontSize: 14,
                  },
                }}
              />
            </FormControl>
          </Box>
          <Stack>
            <Button
              onClick={handleAddToCart}
              variant="contained"
              sx={{
                margin: "10px 10px 0px 10px",
                fontSize: 12,
              }}
              startIcon={<AddIcon />}
            >
              Add to cart
            </Button>
            <Button
              variant="outlined"
              sx={{ margin: "10px 10px 10px 10px", fontSize: 12 }}
            >
              Buy now
            </Button>
          </Stack>
        </Box>
      </Box>
    </Grid>
  );
}

export default ShoppingCart;