import React from "react";
// MUI
import { Divider, Box, Grid } from "@mui/material";
// SERVICE
import AuthService from "../../services/auth.service";
// COMPONENT
import CartHeader from "./contents/CartHeader";
import Checkout from "./contents/Checkout";
import ItemCheckbox from "./contents/ItemCheckbox";
import BookCover from "./contents/BookCover";
import BookPrice from "./contents/BookPrice";
import BookTitle from "./contents/BookTitle";
import QtyInput from "./contents/QtyInput";
// CONTEXT
import { useCart } from "../../hooks/useCart";
import Styles from "./Styles";
import RemoveProduct from "./contents/RemoveProduct";

export default function Cart() {
  const { setCartBadge, selectedCheckbox, cartItem } = useCart();

  return (
    <>
      {cartItem === null || Object.keys(cartItem).length === 0 ? (
        <p>cart empty</p>
      ) : (
        <Grid container>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Box sx={Styles.containerBox}>
              <CartHeader />
              <Divider sx={Styles.divider} />
              <Box sx={Styles.contentBox}>
                <Box>
                  {Object.keys(cartItem).map(function(key) {
                    var title = key;
                    var normalPrice = cartItem[key]["normalPrice"];
                    var qty = cartItem[key]["qty"];
                    var cover = cartItem[key]["cover"];
                    var totalPrice = cartItem[key]["totalPrice"];
                    var stock = cartItem[key]["stock"];

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
                            <BookPrice totalPrice={totalPrice} />
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
            <Checkout cartItem={cartItem} selectedCheckbox={selectedCheckbox} />
          </Grid>
        </Grid>
      )}
    </>
  );
}
