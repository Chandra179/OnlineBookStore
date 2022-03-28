import React, { useEffect, useState } from "react";
import {
  Divider,
  Box,
  Grid,
  CircularProgress,
  IconButton,
} from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

import Qtys from "../Components/Cart/Qtys";
import CartHeader from "../Components/Cart/CartHeader";
import ItemCheckbox from "../Components/Cart/ItemCheckbox";
import BookCover from "../Components/Cart/BookCover";
import BookTitle from "../Components/Cart/BookTitle";
import TotalBookPrice from "../Components/Cart/BookTotalPrice";
import RemoveProduct from "../Components/Cart/RemoveProduct";
import Checkout from "../Components/Cart/Checkout";

import { useCart, useUpdateCart } from "../Hooks";
import Styles from "./Styles";
import Wrapper from "../Components/Cart/Wrapper";
import {
  getCartItem,
  getCurrentUser,
  qtyValidator,
  totalCartItems,
} from "../Utils/helpers";

export default function Cart() {
  const userEmail = getCurrentUser();
  const { setCartBadge } = useCart();
  const [cart, setCart] = useUpdateCart();

  /** Handle product quantity input change */
  const handleInputQty = async (title, normalPrice, stock, event) => {
    var qty = Number(event.target.value);
    var validQty = qtyValidator(qty, stock);

    await setCart((prevState) => {
      let items = { ...prevState };
      items[title]["qty"] = validQty;
      items[title]["totalPrice"] = validQty * normalPrice;
      return items;
    });
    await setCartBadge(totalCartItems(userEmail));
  };

  /** Handle product decrement */
  const handleDecrementQty = async (title, normalPrice, stock, event) => {
    var qty = Number(cart[title]["qty"]);
    if (qty < 1) {
      return;
    }
    var validQty = await qtyValidator(qty, stock);
    await setCart((prevState) => {
      let items = { ...prevState };
      items[title]["qty"] = validQty - 1;
      items[title]["totalPrice"] = validQty * normalPrice;
      return items;
    });
    await setCartBadge(totalCartItems(userEmail));
  };

  /** Handle product increment */
  const handleIncrementQty = async (title, normalPrice, stock, event) => {
    var qty = Number(cart[title]["qty"]);
    var validQty = await qtyValidator(qty, stock);

    await setCart((prevState) => {
      let items = { ...prevState };
      items[title]["qty"] = validQty === stock ? stock : validQty + 1 ;
      items[title]["totalPrice"] = validQty * normalPrice;
      return items;
    });
    await setCartBadge(totalCartItems(userEmail));
  };

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
                  <Qtys
                    qty={qty}
                    inputQty={(e) =>
                      handleInputQty(title, normalPrice, stock, e)
                    }
                    decrementQty={(e) =>
                      handleDecrementQty(title, normalPrice, stock, e)
                    }
                    incrementQty={(e) =>
                      handleIncrementQty(title, normalPrice, stock, e)
                    }
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
