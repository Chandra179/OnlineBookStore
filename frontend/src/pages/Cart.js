import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useCart } from "../hooks/useCart";
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
    // const StockQty = (n) => {
    //     var elements = [];
    //     for(var i=2; i < n+1; i++){
    //         elements.push(<MenuItem value={i} key={i}>{i}</MenuItem>);
    //     }
    //     return elements;
    // }
    
    return (
        <>
            {Object.keys(cartItem).map(function (key) {
                var title = key;
                var cover = cartItem[key]['cover'];
                var qty = cartItem[key]['qty'];
                return (
                    <Grid container key={key} sx={{ paddingLeft: 5, paddingTop: 3 }}>
                        <Grid item
                            lg={2}
                            md={2}
                            sm={2}
                            xs={2}
                            sx={{ boxShadow: 1 }}>
                            <Card sx={{ width: 120 }}>
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
                            sx={{ boxShadow: 1 }}>
                            <Typography sx={{ fontWeight: 500, letterSpacing: 1.3, fontSize: 17 }}>
                                {title}
                            </Typography>
                            {qty >= 10 ?
                                <Typography sx={{ letterSpacing: 1.3, fontSize: 12, color: 'green' }}>
                                    In stock
                                </Typography>
                                :
                                <Typography sx={{ letterSpacing: 1.3, fontSize: 12, color: 'red' }}>
                                    {qty} items left!
                                </Typography>
                            }

                        </Grid>
                        <Grid item
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            sx={{ boxShadow: 1 }}>
                            {/* <Box>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Qty</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={qty}
                                        label="Qty"
                                        onChange={handleChange}
                                        displayEmpty
                                    >
                                        <MenuItem value={1} key={1}>{1}</MenuItem>
                                        {StockQty(stock)}
                                    </Select>
                                </FormControl>
                            </Box> */}
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
    const { userEmail, cartItem } = useCart();

    useEffect(() => {
        if (userEmail === "") {
            history.push("/signin");
        } else {
            return false;
        }
    });

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
