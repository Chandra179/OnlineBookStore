import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./styles";

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

  return (
    <Box display="flex" sx={styles.bookAuthor.container}>
      <Typography sx={styles.bookAuthor.by}>by</Typography>
      <Typography noWrap sx={styles.bookAuthor.author}>
        {bookAuthorList}
      </Typography>
    </Box>
  );
};

export const setCartItem = (userEmail, cartItem) => {
  localStorage.setItem(userEmail, JSON.stringify(cartItem));
};

export const getCartItem = (userEmail) => {
  const cartItems = localStorage.getItem(userEmail)
    ? JSON.parse(localStorage.getItem(userEmail))
    : {};
  return cartItems;
};

export const removeCart = (userEmail) => {
  localStorage.removeItem(userEmail);
};

export const userCartBadge = (userEmail) => {
  const cartItem = JSON.parse(localStorage.getItem(userEmail));
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

export const isItemInCart = (userEmail) => {
  const item = getCartItem(userEmail);
  if (Object.keys(item).length !== 0) {
    return item;
  }
};

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

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  var user = localStorage.getItem("user");
  if (user) {
    return String(JSON.parse(user)["email"]);
  }
};

export const getToken = () => {
  var token = localStorage.getItem("user");
  if (token) {
    return JSON.parse(token)["token"];
  }
};