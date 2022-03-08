import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useCheckout } from "../../hooks/useCheckout";
import CartHelper from "../../helper/cart.helper";
import PaymentService from "../../services/payment.service";
import AuthService from "../../services/auth.service";
import { useOrder } from "../../hooks/useOrder";


function Checkout({ cartItem, selectedCheckbox }) {
  let history = useHistory()
  const { setClientSecret } = useOrder()
  const [orderItems, setOrderItems] = useState({})
  const [totalQty, setTotalQty] = useState(0)
  const { setIsAppbarDisabled } = useCheckout()
  const userEmail = AuthService.getCurrentUser()
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    var totalItemPrice = 0
    var totalItemQty = 0
    var totalItems = {}
    
    for (var key in cartItem) {
      if (selectedCheckbox.includes(key)) {
        totalItems[key] = {
          price: parseFloat(cartItem[key]["totalPrice"]).toFixed(2),
          qty: parseFloat(cartItem[key]["qty"])
        }
        totalItemPrice += parseFloat(cartItem[key]["totalPrice"]);
        totalItemQty += parseFloat(cartItem[key]["qty"]);
      }
    }
    setTotalPrice(totalItemPrice.toFixed(2));
    setTotalQty(totalItemQty);
    setOrderItems(totalItems);
  }, [cartItem, selectedCheckbox]);


  function handleCheckout() {
    // if user checkout with empty item, the change empty value to 1
    Object.keys(cartItem).forEach(function (key) {
      if (!cartItem[key]["qty"]) {
        cartItem[key]["qty"] = 1;
        cartItem[key]["totalPrice"] = cartItem[key]["normalPrice"];
        CartHelper.setCartItem(userEmail, cartItem);
      }
    });
    history.push("/cart/checkout");
    setIsAppbarDisabled(true);

    // HANDLE PAYMENT
    // must validate token in backend!!
    const token = AuthService.getToken();
    PaymentService.addPayment(token, orderItems).then(
      (data) => {
        localStorage.setItem(userEmail + 'Order', data['clientSecret'])
        setClientSecret(localStorage.getItem(userEmail + 'Order'))
      },
      (error) => {
        console.log(error.response);
      }
    );
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
            disabled={totalQty ? false : true}
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

Checkout.propTypes = {
  cartItem: PropTypes.object,
  selectedCheckbox: PropTypes.array
}
export default Checkout;