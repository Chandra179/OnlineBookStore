import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useCart } from "../hooks/useCart";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Divider } from "@mui/material";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import { makeStyles } from '@mui/styles';
import AuthService from "../services/auth.service";
import CartHelper from "../helper/cart.helper";


const useStyles = makeStyles({
    cartHeaderGrid: {
        paddingLeft: 60,
        paddingTop: 60
    },
    bookContainerGrid: {
        paddingLeft: 45,
        paddingBottom: 45,
    },
    boxCheckbox: {
        marginTop: 65,
        marginRight: 20
    },
    bookCoverCard: {
        width: 120,
        marginRight: 25,
        boxShadow: "none"
    },
    bookTitle: {
        fontWeight: 500,
        letterSpacing: 1.3,
        fontSize: 17
    },
    availableStock: {
        letterSpacing: 1.3,
        fontSize: 12,
        color: "green"
    },
    limitedStock: {
        letterSpacing: 1.3,
        fontSize: 12,
        color: "red"
    },
    productQtyBox: {
        paddingTop: 20,
        width: 80,
        height: 30
    },
    removeProductBox: {
        marginTop: 55,
        color: "blue"
    },
    removeProductButton: {
        fontSize: 10,
        minWidth: "0px"
    }
});

function CartHeader({ handleSelectedCheckbox, isAllCheckboxSelected, classes }) {
    return (
        <Grid
            container
            display="flex"
            direction="row"
            className={classes.cartHeaderGrid}
        >
            <Grid item
                lg={10}
                md={10}
                sm={10}
                xs={10}>
                <Typography variant="h6">Your cart</Typography>
            </Grid>
            <Grid item
                lg={2}
                md={2}
                sm={2}
                xs={2}
                sx={{ boxShadow: 1 }}>
                <Typography variant="p">Select all</Typography>
                <Checkbox
                    value="all"
                    onChange={handleSelectedCheckbox}
                    checked={isAllCheckboxSelected} />
            </Grid>
        </Grid>
    );
}

function CheckoutCard() {
    return (
        <Grid container sx={{ boxShadow: 1, marginTop: 5 }}>
            <Grid item>
                <Typography variant="h6" sx={{ paddingTop: 6 }}>Checkout</Typography>
            </Grid>
        </Grid>
    );
}

function Book({
    classes,
    cartItem,
    handleSelectedCheckbox,
    selectedCheckbox,
    handleQtyChange,
    qtyInputNumberOnly,
    removeProduct }) {

    return (
        <>
            {Object.keys(cartItem).map(function (key) {
                var title = key;
                var cover = cartItem[key]["cover"];
                var qty = cartItem[key]["qty"];
                var stock = cartItem[key]["stock"];

                return (
                    <Grid container
                        direction="row"
                        key={key}
                        className={classes.bookContainerGrid}
                    >
                        <Grid item
                            display="flex"
                            lg={10}
                            md={10}
                            sm={10}
                            xs={10}
                        >
                            {/* CHECKBOX */}
                            <Box key={key} className={classes.boxCheckbox}>
                                <Checkbox
                                    value={key}
                                    onChange={handleSelectedCheckbox}
                                    checked={selectedCheckbox.includes(key)}
                                />
                            </Box>

                            {/* BOOK COVER */}
                            <Card className={classes.bookCoverCard}>
                                <CardMedia component="img" image={cover} />
                            </Card>

                            <Box>
                                {/* BOOK TITLE */}
                                <Typography className={classes.bookTitle}>
                                    {title}
                                </Typography>

                                {/* PRODUCT QTY */}
                                <Box className={classes.productQtyBox}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-number"
                                            label="Qty"
                                            type="number"
                                            onChange={(e) => handleQtyChange(title, stock, e)}
                                            onKeyPress={(event) => qtyInputNumberOnly(event)}
                                            value={qty}
                                        />
                                    </FormControl>
                                </Box>

                                {/* REMOVE PRODUCT */}
                                <Box className={classes.removeProductBox}>
                                    <Button
                                        onClick={(e) => removeProduct(title, e)}
                                        size="small"
                                        className={classes.removeProductButton}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>

                        {/* PRODUCT PRICE */}
                        <Grid item
                            lg={2}
                            md={2}
                            sm={2}
                            xs={2}
                            sx={{ boxShadow: 1 }}
                        >
                            <Typography>$28.00</Typography>
                        </Grid>
                    </Grid>
                );
            })}
        </>
    );
}

export default function Cart() {
    const userEmail = AuthService.getCurrentUser();
    const { setCartLength } = useCart();
    const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem(userEmail)));
    const [selectedCheckbox, setSelectedCheckbox] = useState([]);

    const cartItemKeys = Object.keys(cartItem);
    const allCheckboxSelected = cartItemKeys.length > 0 && selectedCheckbox.length === cartItemKeys.length

    const history = useHistory();
    const classes = useStyles();

    // for x in selectedCheckbox:
    // cartItem[x].map(
    //     x.title, x.qty, x.price
    // )
    // button (checkout)
    // context? checkoutItem state <- selectedCheckbox(steve jobs, alchemist, code breaker)
    // address -> confirmation order page
    // stripe payment

    useEffect(() => {
        // IF user not logged in
        if (userEmail === "") {
            history.push("/signin");
        }
    }, [userEmail, history]);

    const handleSelectedCheckbox = (event) => {
        const value = event.target.value;
        if (value === "all") {
            setSelectedCheckbox(selectedCheckbox.length === cartItemKeys.length ? [] : cartItemKeys);
            console.log(cartItemKeys)
            return;
        }
        const list = [...selectedCheckbox];
        const index = list.indexOf(value);
        index === -1 ? list.push(value) : list.splice(index, 1);
        setSelectedCheckbox(list);
    };

    const handleQtyChange = (title, stock, event) => {
        var newQty = event.target.value;
        if (newQty > stock) {
            newQty = stock;
        }
        if (newQty.toString()[0] !== "0") {
            const userCart = localStorage.getItem(userEmail);
            if (userCart !== null) {
                var oldItems = JSON.parse(userCart);
                oldItems[title]["qty"] = newQty;
                localStorage.setItem(userEmail, JSON.stringify(oldItems));
                setCartItem(JSON.parse(localStorage.getItem(userEmail)));
                setCartLength(CartHelper.cartLength(userEmail));
            }
        }
    };

    const qtyInputNumberOnly = (event) => {
        var theEvent = event || window.event;
        var key;
        // Handle paste
        if (theEvent.type === "paste") {
            key = event.clipboardData.getData("text/plain");
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
    };

    const removeProduct = (title) => {
        var oldItems = JSON.parse(localStorage.getItem(userEmail));

        const filteredByKey = Object.fromEntries(
            Object.entries(oldItems).filter(([key, value]) => key !== title)
        );

        localStorage.setItem(userEmail, JSON.stringify(filteredByKey));
        setCartItem(JSON.parse(localStorage.getItem(userEmail)));
        setCartLength(CartHelper.cartLength(userEmail));
    };

    return (
        <>
            {cartItem === null ? (
                <p>cart empty</p>
            ) : (
                <Grid container spacing={2}>
                    <Grid item
                        lg={8}
                        md={8}
                        sm={8}
                        xs={8}>
                        <CartHeader
                            classes={classes}
                            handleSelectedCheckbox={handleSelectedCheckbox}
                            allCheckboxSelected={allCheckboxSelected} />
                        <Divider sx={{
                            marginLeft: 6,
                            paddingTop: 2,
                            marginBottom: 5
                        }} />
                        <Book
                            classes={classes}
                            cartItem={cartItem}
                            handleSelectedCheckbox={handleSelectedCheckbox}
                            selectedCheckbox={selectedCheckbox}
                            handleQtyChange={handleQtyChange}
                            qtyInputNumberOnly={qtyInputNumberOnly}
                            removeProduct={removeProduct} />
                    </Grid>
                    <Grid item
                        lg={4}
                        md={4}
                        sm={4}
                        xs={4}>
                        <CheckoutCard />
                    </Grid>
                </Grid>
            )}
        </>
    );
}
