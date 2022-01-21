import React, { useState, useEffect } from 'react';
import AuthService from '../services/auth.service';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useCart } from "../hooks/useCart";
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';


function CartHeader() {
    return (
        <Grid container sx={{ p: 5, boxShadow: 1 }}>
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
        </Grid>
    );
}

function ItemList({ cartItem }) {
    return (
        <>
            {Object.keys(cartItem).map(function (key) {
                var title = key;
                var cover = cartItem[key]['cover'];
                var qty = cartItem[key]['qty'];
                return (
                    <Grid container key={key} sx={{ paddingLeft: 5, paddingTop: 3}}>
                        <Grid item 
                            lg={2}
                            md={2}
                            sm={2}
                            xs={2}
                            sx={{boxShadow: 1}}>
                            <Card sx={{ width: 115 }}>
                                <CardMedia
                                    component="img"
                                    image={cover}
                                />
                            </Card>
                        </Grid>
                        <Grid item 
                            lg={4}
                            md={4}
                            sm={4}
                            xs={4}
                            sx={{boxShadow: 1}}>
                                <Typography sx={{ fontWeight: 500, letterSpacing: 1.3, fontSize: 17 }}>
                                    {title}
                                </Typography>
                        </Grid>
                        <Grid item 
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            sx={{boxShadow: 1}}>
                            {qty}
                        </Grid>
                    </Grid>
                );
            })}
        </>
    )
}

function CheckoutCard() {
    return (
        <Grid container sx={{ boxShadow: 1 }}>
            <p>chandra</p>
        </Grid>
    )
}

export default function Cart() {
    const history = useHistory();
    const { userEmail, cartItem, setCartItem } = useCart();

    useEffect(() => {
        if (userEmail === "") {
            history.push("/signin");
        } else {
            return false;
        }
    }, []);

    if (cartItem === null) {
        return (
            <p>cart empty</p>
        );
    } else {
        return (
            <Grid container spacing={2}>
                <Grid item
                    lg={8}
                    md={8}
                    sm={8}
                    xs={8}>
                    <CartHeader />
                    <ItemList cartItem={cartItem} />
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
}
