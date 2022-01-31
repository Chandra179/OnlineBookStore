import React, { useState } from 'react';

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


const useStyles = makeStyles({
    cardSize: {
        maxWidth: '300'
    },
    addToCart: {
        margin: '10px 10px 0px 10px',
    },
    buyNow: {
        margin: '10px 10px 10px 10px',
    },
    qtyBox: {
        maxWidth: '80px',
        minWidth: '80px',
        margin: '10px 10px 0px 10px',
    },
});

function QtyInput({ qty, stock, setQty, classes }) {

    const handleQtyChange = (event) => {
        setQty(event.target.value);
    };

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
    const { setCartLength } = useCart();
    const [qty, setQty] = useState(1);
    const [itemExistAlert, setItemExistAlert] = useState(false);
    const [itemAddedAlert, setItemAddedAlert] = useState(false);

    const handleAddToCart = () => {
        const userEmail = AuthService.getCurrentUser();
        if (userEmail === "") {
            history.push('/signin');
        } else {
            // get user items using user email as key
            const userCart = localStorage.getItem(userEmail);

            // items that user added to cart
            var newItems = {}
            newItems[bookDetail.name] = {
                'cover': bookDetail.cover,
                'qty': qty,
                'stock': bookDetail.stock,
            }

            // add first new item to cart
            if (userCart === "undefined" || userCart === null) {
                localStorage.setItem(userEmail, JSON.stringify(newItems));
                const item = JSON.parse(localStorage.getItem(userEmail));
                if (item !== null) {
                    setCartLength(Object.keys(item).length);
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
                        'qty': qty,
                        'stock': bookDetail.stock,
                    }
                    localStorage.setItem(userEmail, JSON.stringify(oldItems));
                    const item = JSON.parse(localStorage.getItem(userEmail));
                    if (item !== null) {
                        setCartLength(Object.keys(item).length);
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

            <Card className={classes.cardSize}>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                    </Typography>
                </CardContent>
                <QtyInput
                    qty={qty}
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
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </>
    );
}

export default ShoppingCard;
