import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

import { useCart } from "../../Hooks";
import { getCurrentUser, setCartItem } from "../../Utils/helpers";

function Checkout() {
  // ===========================================================================
  // Context
  // ===========================================================================
  const { cart, selectedCheckbox } = useCart();

  // ===========================================================================
  // State
  // ===========================================================================

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);

  // ===========================================================================
  // Var
  // ===========================================================================

  const userEmail = getCurrentUser();
  let navigate = useNavigate();

  // ===========================================================================
  // Handlers
  // ===========================================================================

  function handleCheckout() {
    // if user checkout with empty item, the change empty value to 1
    Object.keys(cart).forEach(function (key) {
      if (!cart[key]["qty"]) {
        cart[key]["qty"] = 1;
        cart[key]["totalPrice"] = cart[key]["normalPrice"];
        setCartItem(userEmail, cart);
      }
    });
    navigate("/cart/checkout");
  }

  // ===========================================================================
  // Hooks
  // ===========================================================================

  useEffect(() => {
    var totalItemPrice = 0;
    var totalItemQty = 0;

    for (var key in cart) {
      if (selectedCheckbox.includes(key)) {
        totalItemPrice += parseFloat(cart[key]["totalPrice"]);
        totalItemQty += parseFloat(cart[key]["qty"]);
      }
    }
    setTotalPrice(totalItemPrice.toFixed(2));
    setTotalQty(totalItemQty);
  }, [cart, selectedCheckbox]);

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
          <Typography sx={{ fontWeight: 600 }}>
            &nbsp; ${parseFloat(totalPrice).toFixed(2)}
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            paddingTop: 1,
          }}
        >
          <Button
            disabled={selectedCheckbox.length === 0 ? true : false}
            variant="contained"
            sx={{
              height: 22,
              fontSize: 14,
              textTransform: "none",
            }}
            onClick={handleCheckout}
          >
            Proceed to checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Checkout;
