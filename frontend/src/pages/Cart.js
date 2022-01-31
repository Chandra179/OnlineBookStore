import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useCart } from "../hooks/useCart";
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


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

function Book({ history, userEmail, cartItem, setCartItem }) {

    const handleQtyChange = (title, event) => {
        var newQty = event.target.value;
        if (userEmail === "") {
            history.push('/signin');
        } else {
            const userCart = localStorage.getItem(userEmail);
            if (userCart !== null) {
                var oldItems = JSON.parse(userCart);
                oldItems[title]['qty'] = newQty;
                localStorage.setItem(userEmail, JSON.stringify(oldItems));
                setCartItem(JSON.parse(localStorage.getItem(userEmail)));
            }
        }
    };

    const removeProduct = () => {
    }

    return (
        <>
            {Object.keys(cartItem).map(function (key) {
                var title = key;
                var cover = cartItem[key]['cover'];
                var qty = cartItem[key]['qty'];
                var stock = cartItem[key]['stock'];
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

                            {/* AVAILABLE STOCK */}
                            {stock >= 10 ?
                                <Typography sx={{ letterSpacing: 1.3, fontSize: 12, color: 'green' }}>
                                    In stock
                                </Typography>
                                :
                                <Typography sx={{ letterSpacing: 1.3, fontSize: 12, color: 'red' }}>
                                    {stock} items left!
                                </Typography>
                            }

                            {/* PRODUCT QTY */}
                            <Box sx={{ paddingTop: 2, width: 80 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="outlined-number"
                                        label="Number"
                                        type="number"
                                        onChange={(e) => handleQtyChange(title, e)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={qty}
                                    />
                                </FormControl>
                            </Box>

                            {/* REMOVE PRODUCT */}
                            <Box sx={{ paddingTop: 2, color: 'blue' }}>
                                <Button
                                    onClick={removeProduct}
                                    size="small"
                                    sx={{ fontSize: 10, padding: 0 }}>
                                    Delete
                                </Button>
                            </Box>

                        </Grid>
                        <Grid item
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            sx={{ boxShadow: 1 }}>
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
        }
    }, [userEmail, history]);

    return (
        <>
            {cartItem === null ?
                <p>cart empty</p>
                :
                <Grid container spacing={2}>
                    <Grid item
                        lg={8}
                        md={8}
                        sm={8}
                        xs={8}>
                        <CartHeader />
                        <Book
                            history={history}
                            userEmail={userEmail}
                            cartItem={cartItem} 
                            setCartItem={setCartItem} />
                    </Grid>
                    <Grid item
                        lg={4}
                        md={4}
                        sm={4}
                        xs={4}>
                        <CheckoutCard />
                    </Grid>
                </Grid>
            }
        </>
    );
}
