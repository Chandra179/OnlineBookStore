import React, { useState, useEffect } from 'react';
import AuthService from '../services/auth.service';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useCart } from "../hooks/useCart";
import { useHistory } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function ItemList({ cartItem }) {
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

            {Object.keys(cartItem).map(function (key) {
                var title = key;
                var qty = cartItem[key];
                return (
                    <Grid item
                        key={key}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}>
                        <Grid lg={4}
                        md={4}
                        sm={4}
                        xs={4}>
                            {title}
                        </Grid>
                        <Grid lg={4}
                        md={4}
                        sm={4}
                        xs={4}>
                            {qty}
                        </Grid>
                    </Grid>
                );
            })}
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
