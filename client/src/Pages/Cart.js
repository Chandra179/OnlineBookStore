import React from "react";
// MUI
import { Divider, Box, Grid } from "@mui/material";
import Checkout from "./contents/Checkout";
import { useAccount } from "../Hooks/index";
import {
  getCurrentUser,
  getCheckoutItem,
  getCartItem,
  deleteCheckoutItem,
  setCheckoutItem,
} from "../Utils/helpers";
import SelectAllCheckbox from "../Components/Cart/Checkbox/SelectAllCheckbox";
import YourCart from "../Components/Cart/YourCart";
import HeaderWrapper from "../Components/Cart/HeaderWrapper";
import CartItems from "../Components/CartItems";

const divider = {
  marginLeft: { lg: 5, md: 5, sm: 5, xs: 2 },
  paddingTop: 2,
  marginBottom: 3,
  borderBottomWidth: 2,
};
const containerBox = {
  marginRight: { xl: 4, lg: 4, md: 4, sm: 6, xs: 2 },
};

export default function Cart() {
  const userEmail = getCurrentUser();
  const { cartBadge, setCartBadge } = useAccount();

  const [cartItem, setCartItem] = useState(getCartItem(userEmail));
  const [selectedCheckbox, setSelectedCheckbox] = useState(
    getCheckoutItem(userEmail)
  );

  const cartItemKeys = cartItem ? Object.keys(cartItem) : 0;
  const isAllCheckboxSelected =
    cartItemKeys.length > 0 && selectedCheckbox.length === cartItemKeys.length;

  const handleSelectCheckbox = (event) => {
    const value = event.target.value;
    // select per item
    const list = [...selectedCheckbox];
    const index = list.indexOf(value);
    index === -1 ? list.push(value) : list.splice(index, 1);
    setCheckoutItem(userEmail, list);
    setSelectedCheckbox(list);

    // if all cart item in checkout removed, then remove storage
    if (list.length === 0) {
      deleteCheckoutItem(userEmail);
      return;
    }
  };

  const handleSelectAllCheckbox = (event) => {
    const value = event.target.value;
    if (value === "all") {
      // unselect all checkbox
      if (selectedCheckbox.length === cartItemKeys.length) {
        deleteCheckoutItem(userEmail);
        setSelectedCheckbox([]);
        return;
      }
      // select all checkbox
      if (selectedCheckbox.length !== cartItemKeys.length) {
        setCheckoutItem(userEmail, cartItemKeys);
        setSelectedCheckbox(cartItemKeys);
        return;
      }
    }
  };

  return (
    <React.Fragment>
      {!cartItem || Object.keys(cartItem).length === 0 ? (
        <p>cart empty</p>
      ) : (
        <Grid container>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Box sx={containerBox}>
              <HeaderWrapper>
                <YourCart />
                <SelectAllCheckbox
                  selectAllCheckbox={handleSelectAllCheckbox}
                  isAllCheckboxSelected={isAllCheckboxSelected}
                />
              </HeaderWrapper>
              <Divider sx={divider} />
              <CartItems cartItem={cartItem} />
            </Box>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Checkout />
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
