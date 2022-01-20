import React, { useState, useEffect } from 'react';

import { useCart } from "../hooks/useCart";
import MyDialog from "../components/Dialog";

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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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

function QtySelect({ qty, setQty, classes }) {

    const handleChange = (event) => {
        setQty(event.target.value);
    };

    return (
        <Box className={classes.qtyBox}>
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
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                </Select>
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
    const classes = useStyles();
    //const { cartItem, setCartItem } = useCart();
    const [qty, setQty] = useState(1);
    const [dialog, setDialog] = useState(false);
    const userEmail = JSON.parse(localStorage.getItem('user'))['email'];

    // We are using email as key to store user items to cart
    const userCart = localStorage.getItem(userEmail);

    const handleAddToCart = () => {
        // items that user added
        var newItems = {
            title: bookDetail.title,
            qty: qty
        }
        // store items to cart if cart is empty or not exist
        if (userCart === "undefined" || userCart === null) {
            var items = []
            items.push(newItems)
            localStorage.setItem(userEmail, JSON.stringify(items));
        } else { // if an items already exist in cart, then update cart item
            var oldItems = JSON.parse(localStorage.getItem(userEmail));
            var duplicateItems = JSON.stringify(oldItems).includes(JSON.stringify(newItems));

            if (duplicateItems) {
                setDialog(true);
            } else {
                oldItems.push(newItems);
                localStorage.setItem(userEmail, JSON.stringify(oldItems));
            }
        }
    };

    return (
        <>
        {dialog ? <MyDialog openDialog={true} /> : <div />}
        <Card className={classes.cardSize}>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <QtySelect
                qty={qty}
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
