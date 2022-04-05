import React from "react";
import {
  Divider,
  Box,
  Grid,
} from "@mui/material";

import QuantityInput from "../Components/Cart/QuantityInput";
import CartHeader from "../Components/Cart/CartHeader";
import ItemCheckbox from "../Components/Cart/ItemCheckbox";
import BookCover from "../Components/Cart/BookCover";
import BookTitle from "../Components/Cart/BookTitle";
import TotalBookPrice from "../Components/Cart/BookTotalPrice";
import RemoveProduct from "../Components/Cart/RemoveProduct";
import Checkout from "../Components/Cart/Checkout";
import Styles from "./Styles";
import Wrapper from "../Components/Cart/Wrapper";
import { useCart } from "../Hooks";

export default function Cart() {
  // ===========================================================================
  // Context
  // ===========================================================================

  const { cart } = useCart();

  if (!Object.keys(cart).length) {
    return <p>cart empty</p>;
  }

  return (
    <Grid container>
      <Wrapper>
        <CartHeader />
        <Divider sx={Styles.divider} />
        <Box sx={Styles.contentBox}>
          {Object.keys(cart).map(function (key) {
            var title = key;
            var normalPrice = cart[key]["normalPrice"];
            var qty = cart[key]["qty"];
            var cover = cart[key]["cover"];
            var totalPrice = cart[key]["totalPrice"];
            var stock = cart[key]["stock"];

            return (
              <Box key={key} mb={3} sx={Styles.itemBox}>
                <Box pr={1} sx={Styles.checkBoxAndCoverBox}>
                  <ItemCheckbox itemKey={key} />
                  <BookCover cover={cover} />
                </Box>
                <Grid container direction="column">
                  <Grid
                    container
                    direction="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                  >
                    <BookTitle title={title} />
                    <TotalBookPrice price={totalPrice} />
                  </Grid>
                  <QuantityInput
                    title={title}
                    normalPrice={normalPrice}
                    stock={stock}
                    qty={qty}
                  />
                </Grid>
                <RemoveProduct title={title} />
              </Box>
            );
          })}
        </Box>
      </Wrapper>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <Checkout />
      </Grid>
    </Grid>
  );
}
