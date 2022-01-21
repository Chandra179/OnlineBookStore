import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useCart } from "../hooks/useCart";

function ItemList() {
    return (
        <Grid container sx={{ p: 4, boxShadow: 1 }} spacing={2}>
            {/* ROW 1 */}
            <Grid item
                lg={9}
                md={9}
                sm={9}
                xs={9}>
                <Typography>Your cart</Typography>
            </Grid>
            <Grid item
                lg={3}
                md={3}
                sm={3}
                xs={3}>
                <Typography>Your items</Typography>
            </Grid>

            {/* ROW 2 */}
            <Grid item
                lg={2}
                md={2}
                sm={2}
                xs={2}>
                <Typography>Item image</Typography>
            </Grid>
            <Grid item
                lg={2}
                md={2}
                sm={2}
                xs={2}>
                <Typography>Item Name</Typography>
            </Grid>
            <Grid item
                lg={2}
                md={2}
                sm={2}
                xs={2}>
                <Typography>Item Counter</Typography>
            </Grid>
            <Grid item
                lg={2}
                md={2}
                sm={2}
                xs={2}>
                <Typography>Item Price</Typography>
            </Grid>
            <Grid item
                lg={2}
                md={2}
                sm={2}
                xs={2}>
                <Typography>Remove Item</Typography>
            </Grid>
        </Grid>

    )
}

function CheckoutCard() {
    return (
        <Grid container sx={{ boxShadow: 1 }}>
            <Typography>checkout</Typography>
        </Grid>
    )
}

export default function Cart() {
    const { cartItem, setCartItem } = useCart();
    return (
        <Grid container spacing={2}>
            <Grid item
                lg={8}
                md={8}
                sm={8}
                xs={8}>
                <ItemList />
                {cartItem}
            </Grid>
            <Grid item
                lg={4}
                md={4}
                sm={4}
                xs={4}>
                <CheckoutCard />
            </Grid>
        </Grid>
    );
}
