import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Alert from "../Alert";
import { numberOnly } from "../../Utils/helpers";
import styles from "./styles";

function ShoppingCart({
  isItemExist,
  isItemAdded,
  totalPrice,
  price,
  qtyChange,
  stock,
  qty,
  addToCart,
}) {
  return (
    <Grid item lg={3} md={3} sm={12} xs={12}>
      <Box sx={styles.cart.wrap}>
        {isItemExist && <Alert name={"Item is in cart"} severity="error" />}
        {isItemAdded && (
          <Alert name={"Item is added to cart"} severity="success" />
        )}

        <Box sx={{ boxShadow: 1 }}>
          <Box sx={styles.cart.wrap2}>
            <Typography sx={{ letterSpacing: 1 }}>Subtotal</Typography>
            <Box pr={2} sx={{ marginLeft: "auto" }}>
              <Typography variant="h6">
                $ {totalPrice ? totalPrice.toFixed(2) : price.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <Box sx={styles.cart.wrap3}>
            <FormControl fullWidth>
              <TextField
                id="outlined-number"
                label="Qty"
                type="tel"
                onChange={qtyChange}
                InputProps={{
                  inputProps: {
                    max: stock,
                    min: 1,
                  },
                  style: {
                    height: 52,
                  },
                }}
                onKeyPress={(event) => numberOnly(event)}
                value={qty}
                sx={styles.cart.fieldInput}
              />
            </FormControl>
          </Box>
          <Stack>
            <Button
              onClick={addToCart}
              variant="contained"
              sx={styles.cart.addToCartBtn}
              startIcon={<AddIcon />}
            >
              Add to cart
            </Button>
            <Button variant="outlined" sx={styles.cart.buyNowBtn}>
              Buy now
            </Button>
          </Stack>
        </Box>
      </Box>
    </Grid>
  );
}

export default ShoppingCart;
