import React, { useEffect, useState } from 'react';

import Alert from "./Alert";
import AuthService from '../services/auth.service';
import { useHistory } from "react-router-dom";
import { useCart } from "../hooks/useCart";

import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import CartHelper from "../helper/cart.helper";


const useStyles = makeStyles({
    addToCart: {
        margin: '10px 10px 0px 10px',
    },
    buyNow: {
        margin: '10px 10px 10px 10px',
    },
    qtyBox: {
        maxWidth: '80px',
        minWidth: '80px',
        margin: '10px 10px 10px 10px',
    },
});

function QtyInput({ qty, stock, setQty, normalPrice, setTotalPrice, classes }) {

    const handleQtyChange = (event) => {
        var qty = event.target.value
        if (qty > stock) {
            qty = stock;
        }
        if (qty.toString()[0] !== '0') {
            setQty(qty);
        }
        setTotalPrice(qty * normalPrice)
    };

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
        <Box className={classes.qtyBox}>
            <FormControl fullWidth>
                <TextField
                    id="outlined-number"
                    label="Number"
                    type="number"
                    onChange={handleQtyChange}
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
    );
}

function AddToCartButton({ handleAddToCart, classes }) {
    return (
        <Button
            onClick={handleAddToCart}
            variant="contained"
            className={classes.addToCart}
            startIcon={<AddIcon />}>
            Add to cart
        </Button>
    );
}

function ShoppingCard({ bookDetail }) {
    const history = useHistory();
    const classes = useStyles();
    const { setCartBadge } = useCart();

    const normalPrice = Number(bookDetail.price);

    const [qty, setQty] = useState(1);
    const [totalPrice, setTotalPrice] = useState(1);
    const [itemExistAlert, setItemExistAlert] = useState(false);
    const [itemAddedAlert, setItemAddedAlert] = useState(false);


    const handleAddToCart = () => {
        const userEmail = AuthService.getCurrentUser();
        if (userEmail === "") {
            console.log(userEmail);
            history.push('/signin');
        } else {
            // get user items using user email as key
            const userCart = localStorage.getItem(userEmail);

            // items that user added to cart
            var newItems = {}
            newItems[bookDetail.name] = {
                'cover': bookDetail.cover,
                'qty': qty,
                'normalPrice': normalPrice,
                'totalPrice': totalPrice,
                'stock': bookDetail.stock,
            }

            // add first new item to cart
            if (userCart === "undefined" || userCart === null) {
                localStorage.setItem(userEmail, JSON.stringify(newItems));
                const item = JSON.parse(localStorage.getItem(userEmail));
                if (item !== null) {
                    setCartBadge(CartHelper.cartBadge(userEmail));
                }
                setItemAddedAlert(true);
                setItemExistAlert(false);
            } else { // update cart items
                var oldItems = JSON.parse(localStorage.getItem(userEmail));
                var duplicateItems = bookDetail.name in oldItems;
                if (duplicateItems) {
                    setItemExistAlert(true);
                    setItemAddedAlert(false);
                } else {
                    oldItems[bookDetail.name] = {
                        'cover': bookDetail.cover,
                        'normalPrice': normalPrice,
                        'totalPrice': totalPrice,
                        'qty': qty,
                        'stock': bookDetail.stock,
                    }
                    localStorage.setItem(userEmail, JSON.stringify(oldItems));
                    const item = JSON.parse(localStorage.getItem(userEmail));
                    if (item !== null) {
                        setCartBadge(CartHelper.cartBadge(userEmail));
                    }
                    setItemAddedAlert(true);
                }
            }
        }
    };

    return (
        <>
            {itemExistAlert ? <Alert cartItemExist={"Item is in cart"} /> : <div />}
            {itemAddedAlert ? <Alert cartItemAdded={"Item is added to cart"} /> : <div />}

            <Card>
                <Box
                    sx={{
                        display: 'flex',
                        paddingTop: 1,
                        paddingLeft: 1.5,
                        paddingBottom: 1,
                        alignItems: 'center'
                    }}
                >
                    <Typography sx={{ letterSpacing: 1 }}>Subtotal</Typography>
                    <Box sx={{ marginLeft: 'auto', paddingRight:2 }}>
                        <Typography variant="h5">
                            $ {totalPrice === 1 ? normalPrice.toFixed(2) : totalPrice.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
                <QtyInput
                    qty={qty}
                    normalPrice={normalPrice}
                    setTotalPrice={setTotalPrice}
                    stock={bookDetail.stock}
                    setQty={setQty}
                    classes={classes} />
                <Stack>
                    <AddToCartButton
                        handleAddToCart={handleAddToCart}
                        classes={classes}
                    />
                    <Button variant="outlined" className={classes.buyNow}>
                        Buy now
                    </Button>
                </Stack>
            </Card >
        </>
    );
}

export default ShoppingCard;
