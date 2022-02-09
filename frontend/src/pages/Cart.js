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
    boxCheckbox: {
        marginTop: 65,
        marginRight: 10
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


function CartHeader({ handleSelectedCheckbox, isAllCheckboxSelected }) {
    return (
        <Box
            sx={{
                boxShadow: 1,
                display: 'flex',
                marginLeft: 6,
                minWidth: 500,
                marginTop: 6,
            }}
        >
            <Box>
                <Typography variant="h6">Your cart</Typography>
            </Box>
            <Box
                sx={{
                    marginLeft: 'auto',
                    width: 90,
                    display: "flex",
                    alignItems: 'center'
                }}
            >
                <Box>
                    <Typography variant="p">Select all</Typography>
                </Box>
                <Box sx={{ marginLeft: 'auto' }}>
                    <Checkbox
                        sx={{ width: 0, height: 0 }}
                        value="all"
                        onChange={handleSelectedCheckbox}
                        checked={isAllCheckboxSelected} />
                </Box>
            </Box>
        </Box>
    );
}

function CheckoutCard() {
    return (
        <Box
            sx={{
                boxShadow: 1,
                marginTop: 6,
                minWidth: 300,
                marginRight: 5,
                marginLeft: {
                    lg: 2,
                    md: 2,
                    sm: 6,
                    xs: 6
                }
            }}
        >
            <Box>
                <Typography variant="h6">Order summary</Typography>
            </Box>
        </Box>
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
                var normalPrice = cartItem[key]["normalPrice"];
                var totalPrice = cartItem[key]["totalPrice"];
                var cover = cartItem[key]["cover"];
                var qty = cartItem[key]["qty"];
                var stock = cartItem[key]["stock"];

                return (
                    <Box
                        key={key}
                        sx={{
                            paddingBottom: 5,
                            display: 'flex'
                        }}
                    >
                        <Box sx={{ display: "flex" }}>

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
                                            onChange={(e) => handleQtyChange(title, normalPrice, stock, e)}
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
                        </Box>

                        {/* PRODUCT PRICE */}
                        <Box
                            sx={{
                                boxShadow: 1,
                                marginLeft: 'auto'
                            }}
                        >
                            <Typography>$ {totalPrice.toFixed(2)}</Typography>
                        </Box>
                    </Box>
                );
            })}
        </>
    );
}

export default function Cart() {
    const userEmail = AuthService.getCurrentUser();
    const { setCartBadge } = useCart();

    const [cartItem, setCartItem] = useState(
        // IF cart is not empty then:
        localStorage.getItem(userEmail) !== null ? JSON.parse(localStorage.getItem(userEmail)) : null
    );
    const [selectedCheckbox, setSelectedCheckbox] = useState([]);

    // IF cart is not empty then:
    const cartItemKeys = cartItem !== null ? Object.keys(cartItem) : 0
    const allCheckboxSelected = cartItemKeys.length > 0 && selectedCheckbox.length === cartItemKeys.length

    const history = useHistory();
    const classes = useStyles();


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


    const handleQtyChange = (title, normalPrice, stock, event) => {
        var newQty = event.target.value;
        if (newQty > stock) {
            newQty = stock;
        }
        if (newQty.toString()[0] !== "0") {
            const item = localStorage.getItem(userEmail);
            if (item !== null) {
                var newItem = JSON.parse(item);
                var newPrice = newQty * normalPrice;

                newItem[title]["qty"] = newQty;
                newItem[title]["totalPrice"] = newPrice;

                localStorage.setItem(userEmail, JSON.stringify(newItem));

                setCartItem(JSON.parse(localStorage.getItem(userEmail)));
                setCartBadge(CartHelper.cartBadge(userEmail));
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
        var oldItem = JSON.parse(localStorage.getItem(userEmail));

        const filteredByKey = Object.fromEntries(
            Object.entries(oldItem).filter(([key, value]) => key !== title)
        );

        localStorage.setItem(userEmail, JSON.stringify(filteredByKey));
        setCartItem(JSON.parse(localStorage.getItem(userEmail)));
        setCartBadge(CartHelper.cartBadge(userEmail));
    };


    return (
        <>
            {cartItem === null ? (
                <p>cart empty</p>
            ) : (
                <Grid container spacing={2}>
                    <Grid item
                        lg={7}
                        md={7}
                        sm={12}
                        xs={12}>
                        <Box>
                            <CartHeader
                                classes={classes}
                                handleSelectedCheckbox={handleSelectedCheckbox}
                                allCheckboxSelected={allCheckboxSelected}
                            />
                            <Divider
                                sx={{
                                    minWidth: 500,
                                    marginLeft: 6,
                                    paddingTop: 2,
                                    marginBottom: 4,
                                    borderBottomWidth: 3
                                }}
                            />
                            <Box
                                sx={{
                                    boxShadow: 1,
                                    marginLeft: 6,
                                    minWidth: 500
                                }}
                            >
                                <Book
                                    classes={classes}
                                    cartItem={cartItem}
                                    handleSelectedCheckbox={handleSelectedCheckbox}
                                    selectedCheckbox={selectedCheckbox}
                                    handleQtyChange={handleQtyChange}
                                    qtyInputNumberOnly={qtyInputNumberOnly}
                                    removeProduct={removeProduct} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item
                        lg={5}
                        md={5}
                        sm={12}
                        xs={12}>
                        <CheckoutCard />
                    </Grid>
                </Grid>
            )}
        </>
    );
}
