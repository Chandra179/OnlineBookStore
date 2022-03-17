import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Typography, Stack, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { bookDetails } from "../../Api";
import { useAccount } from "../../Hooks/index";
import {
  getCurrentUser,
  qtyValidator,
  getCartItem,
  setCartItem,
  userCartBadge,
} from "../../Utils/helpers";
import Cover from "../../Components/Book/Cover";
import Description from "../../Components/Book/Description";
import Title from "../../Components/Book/Title";
import Author from "../../Components/Book/Author";
import Price from "../../Components/Book/Price";
import Quantity from "../../Components/Book/Quantity";
import Alert from "../../Components/Alert";
import styles from "./styles";

function BookDetails() {
  // ===========================================================================
  // Context
  // ===========================================================================

  const { setCartBadge } = useAccount();

  // ===========================================================================
  // State
  // ===========================================================================

  const [book, setBook] = useState({});
  const [qty, setQty] = useState(1);
  const [isItemExist, setIsItemExist] = useState(false);
  const [isItemAdded, setIsItemAdded] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // ===========================================================================
  // Custom Var
  // ===========================================================================

  let navigate = useNavigate();
  const userEmail = getCurrentUser();
  const normalPrice = Number(book.price);
  const validPrice = totalPrice
    ? totalPrice.toFixed(2)
    : normalPrice.toFixed(2);

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const handleQtyChange = (event) => {
    var validQty = qtyValidator(event.target.value, book.stock);
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
    // save cart item to local storage
    cartItem[book.name] = {
      cover: book.cover,
      qty: qtys,
      normalPrice: normalPrice,
      totalPrice: qtys * normalPrice,
      stock: book.stock,
    };
    setCartItem(userEmail, cartItem);
    setIsItemAdded(true);
    setIsItemExist(false);
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
      <Grid item lg={2} d={2} sm={3} xs={12} sx={styles.coverWrap}>
        <Cover cover={book.cover} type={"details"} />
      </Grid>
      
      <Grid item lg={7} md={7} sm={9} xs={12}>
        <Box sx={styles.contentWrap}>
          <Title name={book.name} type={"details"} />
          <Author authorList={book.book_author} />
          <Box mt={1}>
            <Description desc={book.description} />
          </Box>
        </Box>
      </Grid>

      <Grid item lg={3} md={3} sm={12} xs={12}>
        <Box sx={styles.shoppingCartWrap}>
          {isItemExist && <Alert name={"Item is in cart"} severity="error" />}
          {isItemAdded && <Alert name={"Item is added to cart"} severity="success" />}

          <Box sx={{ boxShadow: 1 }}>
            <Box sx={styles.priceWrap}>
              <Typography sx={{ letterSpacing: 1 }}>
                Subtotal
              </Typography>
              <Box pr={2} sx={{ marginLeft: "auto" }}>
                <Price price={validPrice} type={"details"} />
              </Box>
            </Box>
            <Box sx={styles.qtyWrap}>
              <Quantity qty={qty} qtyChange={handleQtyChange} />
            </Box>
            <Stack>
              <Button
                onClick={handleAddToCart}
                variant="contained"
                sx={styles.addToCartBtn}
                startIcon={<AddIcon />}
              >
                Add to cart
              </Button>
              <Button variant="outlined" sx={styles.buyNowBtn}>
                Buy now
              </Button>
            </Stack>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default BookDetails;
