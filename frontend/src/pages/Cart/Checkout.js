import React from "react";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useCheckout } from "../../hooks/useCheckout";

export default function Checkout({ userEmail, cartItem, selectedCheckbox }) {
  var totalPrice = 0;
  var totalQty = 0;
  let history = useHistory();
  const { setIsAppbarDisabled } = useCheckout();

  for (var key in cartItem) {
    if (selectedCheckbox.includes(key)) {
      totalQty += Number(cartItem[key]["qty"]);
      totalPrice += cartItem[key]["totalPrice"];
    }
  }

  function handleCheckout() {
    Object.keys(cartItem).forEach(function (key) {
      if (cartItem[key]["qty"] === "") {
        cartItem[key]['qty'] = 1
        cartItem[key]['totalPrice'] = cartItem[key]['normalPrice']
        localStorage.setItem(userEmail, JSON.stringify(cartItem));
        return;
      }
    });
    history.push("/cart/checkout");
    setIsAppbarDisabled(true);
  }

  return (
    <Box
      sx={{
        marginTop: {
          lg: 6,
          md: 6,
          sm: 3,
          xs: 3,
        },
        minWidth: 200,
        marginRight: 5,
        marginLeft: {
          lg: 2,
          md: 2,
          sm: 6,
          xs: 6,
        },
      }}
    >
      <Box
        sx={{
          boxShadow: 1,
          padding: "10px 20px 20px 20px",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            marginRight: "auto",
            display: "flex",
          }}
        >
          <Typography>Subtotal ({totalQty}) item:</Typography>
          <Typography sx={{ fontWeight: 600 }}>&nbsp; ${totalPrice}</Typography>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            paddingTop: 1,
          }}
        >
          <Button
            variant="contained"
            sx={{
              height: 22,
              fontSize: 14,
              textTransform: "none",
            }}
            disabled={totalQty === 0 ? true : false}
            onClick={handleCheckout}
          >
            Proceed to checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
