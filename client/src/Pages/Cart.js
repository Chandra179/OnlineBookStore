import React from "react";
import { Divider, Box, Grid } from "@mui/material";

import QtyInput from "../Components/Cart/QtyInput";
import CartHeader from "../Components/Cart/CartHeader";
import ItemCheckbox from "../Components/Cart/ItemCheckbox";
import BookCover from "../Components/Cart/BookCover";
import BookTitle from "../Components/Cart/BookTitle";
import TotalBookPrice from "../Components/Cart/BookTotalPrice";

import { useCart } from "../Hooks";
import Styles from "./Styles";

export default function Cart() {
  const { cart } = useCart();

  return (
    <>
      {!cart || Object.keys(cart).length === 0 ? (
        <p>cart empty</p>
      ) : (
        <Grid container>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Box sx={Styles.containerBox}>
              <CartHeader />
              <Divider sx={Styles.divider} />
              <Box sx={Styles.contentBox}>
                <Box>
                  {Object.keys(cart).map(function(key) {
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
                          <BookCover bookCover={cover} />
                        </Box>

                        <Grid container direction="column">
                          <Grid
                            container
                            direction="row"
                            alignItems="flex-start"
                            justifyContent="space-between"
                          >
                            <BookTitle bookTitle={title} />
                            <TotalBookPrice price={totalPrice} />
                          </Grid>
                          <QtyInput
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
              </Box>
            </Box>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Checkout />
          </Grid>
        </Grid>
      )}
    </>
  );
}
