import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import GenreList from "../Components/GenreList";
import { genreList } from "../Api";
import { useSearchParams } from "react-router-dom";
import { useCart, useOrder } from "../Hooks";
import {
  deleteCheckoutItem,
  deleteOrderItems,
  deletePaymentId,
  getCurrentUser,
  totalCartItems,
} from "../Utils/helpers";
import CustomAlert from "../Components/Alert";

function Home() {
  // ===========================================================================
  // Context
  // ===========================================================================

  const {
    cart,
    selectedCheckbox,
    setCart,
    setCartBadge,
  } = useCart();

  // ===========================================================================
  // State
  // ===========================================================================

  const [listOfGenre, setListOfGenre] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const userEmail = getCurrentUser();
  const isPaymentSucceed = searchParams.get("redirect_status")

  // ===========================================================================
  // Hooks
  // ===========================================================================

  useEffect(() => {
    async function succedProcess() {
      if (isPaymentSucceed === "succeeded") {
        let cloneCart = Object.assign({}, cart);
        selectedCheckbox.forEach((e) => delete cloneCart[e]);
        await setCart(cloneCart);
        await setCartBadge(totalCartItems(userEmail));
        deleteCheckoutItem(userEmail);
        deleteOrderItems(userEmail);
        deletePaymentId(userEmail);
      }
    }

    genreList().then(
      (data) => {
        setListOfGenre(data);
      },
      (error) => {
        console.log(error);
      }
    );
    succedProcess();
  }, [searchParams]);

  return (
    <>
    {isPaymentSucceed && <CustomAlert severity="success" name="Order succeed!" />}
    <Grid container mt={1}>
      <GenreList list={listOfGenre} />
    </Grid>
    </>
  );
}

export default Home;
