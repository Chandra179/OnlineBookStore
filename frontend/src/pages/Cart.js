import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useCart } from "../hooks/useCart";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';


function CartHeader() {
    return (
        <Grid container sx={{ boxShadow: 1, paddingLeft: 6, paddingTop: 6 }}>
            <Grid item
                lg={12}
                md={12}
                sm={12}
                xs={12}>
                <Typography variant="h6">Your cart</Typography>
            </Grid>
        </Grid>
    );
}

function CheckoutCard() {
    return (
        <Grid container sx={{ boxShadow: 1 }}>
            <p>chandra</p>
        </Grid>
    )
}

function Book({ userEmail, cartItem, setCartItem }) {

    const handleQtyChange = (title, stock, event) => {
        var newQty = event.target.value;
        if (newQty > stock) {
            newQty = stock;
        }
        if (newQty.toString()[0] !== '0') {
            const userCart = localStorage.getItem(userEmail);
            if (userCart !== null) {
                var oldItems = JSON.parse(userCart);
                oldItems[title]['qty'] = newQty;
                localStorage.setItem(userEmail, JSON.stringify(oldItems));
                setCartItem(JSON.parse(localStorage.getItem(userEmail)));
            }
        }
    };

    const removeProduct = (title) => {
        const userCart = localStorage.getItem(userEmail);
        var oldItems = JSON.parse(userCart);
        const filteredByKey = Object.fromEntries(
            Object.entries(oldItems).filter(([key, value]) => key !== title)
        )
        localStorage.setItem(userEmail, JSON.stringify(filteredByKey));
        setCartItem(JSON.parse(localStorage.getItem(userEmail)));
    }

    const InputNumberOnly = (event) => {
        var theEvent = event || window.event;
        var key;
        // Handle paste
        if (theEvent.type === 'paste') {
            key = event.clipboardData.getData('text/plain');
        } else {
            // Handle key press
            key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    return (
        <>
            {Object.keys(cartItem).map(function (key) {
                var title = key;
                var cover = cartItem[key]['cover'];
                var qty = cartItem[key]['qty'];
                var stock = cartItem[key]['stock'];
                return (
                    <Grid container
                        direction="row"
                        alignItems="center"
                        key={key}
                        sx={{ paddingLeft: 5, paddingTop: 3 }}
                    >
                        {/* CHECKBOX */}
                        <Box sx={{ boxShadow: 1, marginRight: 1 }}>
                            <Checkbox label="checkbox" />
                        </Box>

                        {/* BOOK COVER */}
                        <Card sx={{ width: 120, marginRight: 2 }}>
                            <CardMedia
                                component="img"
                                image={cover}
                            />
                        </Card>

                        <Box sx={{ boxShadow: 1 }}>
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
                                        onChange={(e) => handleQtyChange(title, stock, e)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            inputProps: {
                                                max: stock,
                                                min: 1
                                            }
                                        }}
                                        onKeyPress={(event) => InputNumberOnly(event)}
                                        value={qty}
                                    />
                                </FormControl>
                            </Box>

                            {/* REMOVE PRODUCT */}
                            <Box sx={{ paddingTop: 2, color: 'blue' }}>
                                <Button
                                    onClick={(e) => removeProduct(title, e)}
                                    size="small"
                                    sx={{ fontSize: 10, minWidth: '0px' }}>
                                    Delete
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                );
            })}
        </>
    )
}


export default function Cart() {
    const { userEmail, cartItem, setCartItem } = useCart();

    useEffect(() => {
        if (userEmail === "") {
            window.location.href = "/signin";
        }
    }, [userEmail]);

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
