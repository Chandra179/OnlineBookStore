import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import BookCover from "./contents/BookCover";
import BookDescription from "./contents/BookDescription";
import ShoppingCart from "./contents/ShoppingCart";
import { bookDetails } from "../Api";
import { useCart } from "../Hooks/index";
import {
  getCurrentUser,
  qtyValidator,
  getCartItem,
  setCartItem,
  userCartBadge,
} from "../Utils/helpers";

function BookDetails() {
  // ===========================================================================
  // Context
  // ===========================================================================

  const { setCartBadge } = useCart();

  // ===========================================================================
  // State
  // ===========================================================================

  const [book, setBook] = useState({});
  const [qty, setQty] = useState(1);
  const [isItemExist, setIsItemExist] = useState(false);
  const [isItemAdded, setIsItemAdded] = useState(false);

  /** Total book price, eg: 10 * $22 = $220 */
  const [totalPrice, setTotalPrice] = useState(0);

  // ===========================================================================
  // Custom Var
  // ===========================================================================
  
  let navigate = useNavigate();
  const userEmail = getCurrentUser();

  /** price for 1 book, eg: 1 book -> $22  */
  const normalPrice = Number(book.price);

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const handleQtyChange = (event) => {
    /** Handle qty input */
    var validQty = qtyValidator(event.target.value, stock);
    setQty(validQty);
    setTotalPrice(validQty * normalPrice);
  };

  const handleAddToCart = () => {
    if (!userEmail) {
      navigate("/signin");
      return;
    }
    // IMPORTANT!: check if user token is valid in backend
    const cartItem = getCartItem(userEmail);
    const isItemDuplicate = book.name in cartItem;

    if (isItemDuplicate) {
      setIsItemExist(true);
      setIsItemAdded(false);
      return;
    }
    // if qty input is empty then set to 1
    const qtys = qty ? qty : 1;
    if (qtys === 1) {
      setQty(1);
    }
    cartItem[book.name] = {
      cover: book.cover,
      qty: qtys,
      normalPrice: normalPrice,
      totalPrice: qtys * normalPrice,
      stock: book.stock,
    };
    /**
     * Handle add item to cart,
     * item will be saved in local storage as object.
     * object key : user email
     */
    setCartItem(userEmail, cartItem);
    setIsItemAdded(true);
    setIsItemExist(false);

    // update cart badge with newest item
    setCartBadge(userCartBadge(userEmail));
  };

  // ===========================================================================
  // Hooks
  // ===========================================================================

  useEffect(() => {
    // get bookName from url path, eg: http/..../steve jobs
    const bookName = window.location.pathname
      .split("/")
      .pop()
      .split("-")
      .join(" ");

    bookDetails(bookName).then(
      (data) => {
        setBook(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <Grid
      container
      direction="row"
      display="flex"
      alignItems="flex-start"
      p={4}
    >
      <BookCover cover={book.cover} />
      <BookDescription
        authorList={book.book_author}
        name={book.name}
        description={book.description}
      />
      <ShoppingCart
        isItemExist={isItemExist}
        isItemAdded={isItemAdded}
        totalPrice={totalPrice}
        price={normalPrice}
        qtyChange={handleQtyChange}
        stock={book.stock}
        qty={qty}
        addToCart={handleAddToCart}
      />
    </Grid>
  );
}

export default BookDetails;
