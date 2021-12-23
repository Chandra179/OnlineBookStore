import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Pagination from '@mui/material/Pagination';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import BookService from "../services/book.service"
import usePagination from "../components/Pagination";

import { useCart } from "../hooks/useCart";

function MyPagination({ page, count, handleChange }) {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Box p="5">
                <Pagination
                    count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChange}
                />
            </Box>
        </Grid>
    )
}

function BookList({ _DATA }) {
    return (
        <List>
            {_DATA.currentData().map(function (v, i) {
                return (
                    <div key={i}>
                        <ListItem>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="flex-start"
                            >
                                <Grid item
                                    lg={2}
                                    md={2}
                                    sm={2}
                                    xs={3}
                                    sx={{ marginRight: 2 }}>
                                    <Card sx={{ maxWidth: 250, maxHeight: 250 }}>
                                        <CardMedia
                                            component="img"
                                            width="200"
                                            image={v.cover}
                                        />
                                    </Card>
                                </Grid>
                                <Grid item
                                    lg={9}
                                    md={9}
                                    sm={9}
                                    xs={8}>
                                    <ListItemText sx={{ margin: 0, padding: 0 }}>
                                        <Link to={{
                                            pathname: `/home-detail/${v.title.replace(/\s+/g, '-').toLowerCase()}`
                                        }}>
                                            <Typography sx={{
                                                color: "black",
                                                fontSize: {
                                                    lg: 20,
                                                    md: 20,
                                                    sm: 18,
                                                    xs: 16
                                                }
                                            }}>
                                                {v.title}
                                            </Typography>
                                        </Link>
                                    </ListItemText>
                                    <ListItemText sx={{ margin: 0, padding: 0 }}>
                                        <Typography sx={{
                                            color: "rgb(0, 113, 133)",
                                            fontSize: {
                                                lg: 16,
                                                md: 16,
                                                sm: 14,
                                                xs: 14
                                            }
                                        }}>
                                            by {v.author}
                                        </Typography>
                                    </ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider sx={{ margin: 2, borderBottomWidth: 2 }} />
                    </div>
                );
            })}
        </List>
    )
}

export default function Home(props) {
    const { cartItem, setCartItem } = useCart();
    console.log('state ->', cartItem);
    console.log('setState ->', setCartItem);

    const [bookList, setBookList] = useState([]);
    let [page, setPage] = useState(1);
    const PER_PAGE = 2;
    const count = Math.ceil(bookList.length / PER_PAGE);
    const _DATA = usePagination(bookList, PER_PAGE);
    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    useEffect(() => {
        BookService.bookList().then(
            (data) => {
                setBookList(data)
            },
            (error) => {
                console.log(error)
            }
        )
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item
                lg={2}
                md={2}
                sm={3}
                xs={3}>
                <p>Filter</p>
                <button onClick={() => setCartItem(1)}>
                    Cart Item {cartItem}
                </button>
            </Grid>
            <Grid item
                lg={10}
                md={10}
                sm={12}
                xs={12}>
                <BookList _DATA={_DATA} />
                <MyPagination
                    count={count}
                    page={page}
                    handleChange={handleChange} />
            </Grid>
        </Grid>
    );
}
