import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { bookDetails } from "../Api";
import { useCart } from "../Hooks/index";
import {
  getCurrentUser,
  qtyValidator,
  getCartItem,
  setCartItem,
  userCartBadge,
} from "../Utils/helpers";
import Cover from "../Components/Book/Cover";
import Description from "../Components/Book/Description";
import Title from "../Components/Book/Title";
import Author from "../Components/Book/Author";
import Price from "../Components/Book/Price";
import Quantity from "../Components/Book/Quantity";

// ===========================================================================
// Styles
// ===========================================================================

const coverWrap = {
  display: "flex",
  justifyContent: "center",
  backgroundColor: {
    lg: "white",
    md: "white",
    sm: "white",
    xs: "rgb(250, 250, 250)",
  },
};

const contentWrap = {
  marginTop: { lg: 0, md: 0, sm: 0, xs: 2 },
  paddingRight: { lg: 4, md: 4, sm: 4, xs: 0 },
};

const shoppingCartWrap = {
  marginTop: { lg: 0, md: 0, sm: 4, xs: 4 },
};

const priceWrap = {
  display: "flex",
  paddingTop: 1,
  paddingLeft: 1.5,
  paddingBottom: 1,
  alignItems: "center",
};

const qtyWrap = {  
  maxWidth: 80,
  minWidth: 30,
  margin: 1.3,
}

const addToCartBtn = {
  margin: "10px 10px 0px 10px",
  fontSize: 12,
}

const buyNowBtn = {
  margin: "10px 10px 10px 10px", 
  fontSize: 12
}

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
  const [totalPrice, setTotalPrice] = useState(0);

  // ===========================================================================
  // Custom Var
  // ===========================================================================

  let navigate = useNavigate();
  const userEmail = getCurrentUser();
  const normalPrice = Number(book.price);
  const validPrice = totalPrice ? totalPrice.toFixed(2) : normalPrice.toFixed(2);

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const handleQtyChange = (event) => {
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
      <Grid item lg={2} d={2} sm={3} xs={12} sx={coverWrap}>
        <Cover cover={book.cover} type={"details"} />
      </Grid>
      <Grid item lg={7} md={7} sm={9} xs={12}>
        <Box sx={contentWrap}>
          <Title name={book.name} type={"details"} />
          <Author authorList={book.book_author} />
          <Box mt={1}>
            <Description desc={book.description} />
          </Box>
        </Box>
      </Grid>

      {/* NAAMAA */}
      <Grid item lg={3} md={3} sm={12} xs={12}>
        <Box sx={shoppingCartWrap}>
          {isItemExist && <Alert name={"Item is in cart"} severity="error" />}
          {isItemAdded && <Alert name={"Item is added to cart"} severity="success" />}

          <Box sx={{ boxShadow: 1 }}>
            <Box sx={priceWrap}>
              <Typography sx={{ letterSpacing: 1 }}>Subtotal</Typography>
              <Box pr={2} sx={{ marginLeft: "auto" }}>
                <Price price={validPrice} type={"details"} />
              </Box>
            </Box>
            <Box sx={qtyWrap}>
              <Quantity qty={qty} qtyChange={handleQtyChange} />
            </Box>
            <Stack>
              <Button
                onClick={handleAddToCart}
                variant="contained"
                sx={addToCartBtn}
                startIcon={<AddIcon />}
              >
                Add to cart
              </Button>
              <Button
                variant="outlined"
                sx={buyNowBtn}
              >
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
