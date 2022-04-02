import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

import { getCurrentUser, qtyValidator } from "../../Utils/helpers";
import Alert from "../Alert";
import { useCart } from "../../Hooks";
import TotalPrice from "./TotalPrice";
import QuantityInput from "./QuantityInput";
import ActionBtn from "./ActionBtn";

const wrapper = {
  marginTop: { lg: 0, md: 0, sm: 4, xs: 4 },
};

function ShoppingCart({ price, stock, name, cover }) {
  // ===========================================================================
  // Context
  // ===========================================================================

  const { cart, setCart, cartBadge, setCartBadge } = useCart();

  // ===========================================================================
  // State
  // ===========================================================================

  const [isItemExist, setIsItemExist] = useState(false);
  const [isItemAdded, setIsItemAdded] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0); // Total book price, eg: 10 * $22 = $220
  const [qty, setQty] = useState(1);

  // ===========================================================================
  // Var
  // ===========================================================================

  const navigate = useNavigate();
  const normalPrice = Number(price); // price for 1 book, eg: 1 book -> $22

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const handleQtyChange = (event) => {
    var validQty = qtyValidator(event.target.value, stock);
    setQty(validQty);
    setTotalPrice(validQty * normalPrice);
  };

  const handleAddToCart = () => {
    const userEmail = getCurrentUser();
    if (!userEmail) {
      navigate("/signin");
      return;
    }

    const isItemDuplicate = name in cart;
    if (isItemDuplicate) {
      setIsItemExist(true);
      setIsItemAdded(false);
      return;
    }

    // if qty input is empty or 0 then set to 1
    const qtys = qty ? qty : 1;
    if (qtys === 1) {
      setQty(1);
    }

    let items = Object.assign({}, cart);
    items[name] = {
      cover: cover,
      qty: qtys,
      normalPrice: normalPrice,
      totalPrice: qtys * normalPrice,
      stock: stock,
    };
    setCart(items);
    setIsItemAdded(true);
    setIsItemExist(false);
    setCartBadge(cartBadge + qtys);
  };

  return (
    <Grid item lg={3} md={3} sm={12} xs={12}>
      <Box sx={wrapper}>
        {isItemExist && <Alert name={"Item is in cart"} severity="error" />}
        {isItemAdded && (
          <Alert name={"Item is added to cart"} severity="success" />
        )}

        <Box boxShadow={1}>
          <TotalPrice
            price={totalPrice ? totalPrice.toFixed(2) : normalPrice.toFixed(2)}
          />
          <QuantityInput qtyChange={handleQtyChange} stock={stock} qty={qty} />
          <ActionBtn addToCart={handleAddToCart} />
        </Box>
      </Box>
    </Grid>
  );
}

export default ShoppingCart;
