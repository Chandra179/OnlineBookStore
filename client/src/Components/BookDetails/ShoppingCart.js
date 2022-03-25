import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
//
import {
  getCurrentUser,
  qtyValidator,
  getCartItem,
  setCartItem,
  totalCartItems,
} from "../../Utils/helpers";
import Alert from "../Alert";
import { useAccount } from "../../Hooks";
import TotalPrice from "../ShoppingCart/TotalPrice";
import QuantityInput from "../ShoppingCart/QuantityInput";
import ActionBtn from "../ShoppingCart/ActionBtn";

const wrapper = {
  marginTop: { lg: 0, md: 0, sm: 4, xs: 4 },
};

function ShoppingCart({ price, stock, name, cover }) {
  const navigate = useNavigate();
  const [isItemExist, setIsItemExist] = useState(false);
  const [isItemAdded, setIsItemAdded] = useState(false);

  // price for 1 book, eg: 1 book -> $22
  const normalPrice = Number(price);

  // Total book price, eg: 10 * $22 = $220
  const [totalPrice, setTotalPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const { setCartBadge } = useAccount();

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
    // IMPORTANT!: check if user token is valid in backend

    const cartItem = getCartItem(userEmail);
    const isItemDuplicate = name in cartItem;

    if (isItemDuplicate) {
      setIsItemExist(true);
      setIsItemAdded(false);
      return;
    }
    // if qty input is empty then set to 1
    const qtys = qty ? qty : 1;
    if (qtys === 1) setQty(1);

    cartItem[name] = {
      cover: cover,
      qty: qtys,
      normalPrice: normalPrice,
      totalPrice: qtys * normalPrice,
      stock: stock,
    };
    /**
     * Handle add item to cart,
     * item will be saved in local storage as object.
     * object key : user email + 'Cart'
     */
    setCartItem(userEmail, cartItem);
    setIsItemAdded(true);
    setIsItemExist(false);
    setCartBadge(totalCartItems(userEmail));
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
          <QuantityInput
            qtyChange={handleQtyChange}
            stock={stock}
            qty={qty}
          />
          <ActionBtn addToCart={handleAddToCart} />
        </Box>
      </Box>
    </Grid>
  );
}

export default ShoppingCart;
