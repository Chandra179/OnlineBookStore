import React from "react";
import { Typography } from "@mui/material";

export const bookAuthor = (book_author) => {
  if (!book_author) return;
  var bookAuthorLength = book_author.length - 1;
  var bookAuthorList = [];

  // put "," to author name until n-2
  // beverly, ross, rachel
  book_author.map((e, i) => {
    var author = i === bookAuthorLength ? e.author_name : e.author_name + ", ";
    return bookAuthorList.push(author);
  });
  return bookAuthorList;
};

export const inputHelperText = (input) => {
  return (
    input && (
      <Typography component={"span"} sx={{ fontSize: 12 }}>
        {input}
      </Typography>
    )
  );
};

// ===========================================================================
// Auth
// ===========================================================================

export const getCurrentUser = () => {
  var user = localStorage.getItem("user");
  if (user) {
    return String(JSON.parse(user)["email"]);
  }
};

export const getUserToken = () => {
  var token = localStorage.getItem("user");
  if (token) {
    return JSON.parse(token)["token"];
  }
};

export const logout = () => {
  const userEmail = getCurrentUser();
  const cart = getCartItem(userEmail)
  const checkout = getCartItem(userEmail)
  
  if (!Object.keys(cart).length) {
    localStorage.removeItem(userEmail + "Cart");
  }
  if (!checkout.length) {
    localStorage.removeItem(userEmail + "Checkout");
  }
  localStorage.removeItem("user");
};

// ===========================================================================
// Cart
// ===========================================================================

export const setCartItem = (userEmail, cartItem) => {
  localStorage.setItem(userEmail + "Cart", JSON.stringify(cartItem));
};

export const getCartItem = (userEmail) => {
  const cartItems = localStorage.getItem(userEmail + "Cart")
    ? JSON.parse(localStorage.getItem(userEmail + "Cart"))
    : {};
  return cartItems;
};

export const removeCart = (userEmail) => {
  localStorage.removeItem(userEmail + "Cart");
};

export const totalCartItems = (userEmail) => {
  const cartItem = JSON.parse(localStorage.getItem(userEmail + "Cart"));
  if (cartItem) {
    const cartKeys = Object.keys(cartItem).length;
    var qty = 0;
    for (var i = 0; i < cartKeys; i++) {
      // get qty for each item
      qty += Number(Object.values(cartItem)[i]["qty"]);
    }
  }
  return qty;
};

// ===========================================================================
// Checkout
// ===========================================================================

export const setCheckoutItem = (userEmail, cartItemKeys) => {
  localStorage.setItem(userEmail + "Checkout", JSON.stringify(cartItemKeys));
};

export const getCheckoutItem = (userEmail) => {
  return localStorage.getItem(userEmail + "Checkout")
    ? JSON.parse(localStorage.getItem(userEmail + "Checkout"))
    : [];
};

export const deleteCheckoutItem = (userEmail) => {
  localStorage.removeItem(userEmail + "Checkout");
};

// ===========================================================================
// Validator
// ===========================================================================

export const qtyValidator = (qty, stock) => {
  var newQty = qty;
  if (qty > stock) {
    newQty = stock;
  }
  if (newQty.toString()[0] !== "0") {
    return newQty;
  } else {
    return 0;
  }
};

export const numberOnly = (event) => {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
};

export const textOnly = (event) => {
  if (!/^[a-zA-Z]+$/.test(event.key)) {
    event.preventDefault();
  }
};
