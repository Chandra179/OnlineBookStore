import React, { useState, useRef, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

import Pagination from '@mui/material/Pagination';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import BookService from "../services/book.service"
import usePagination from "./Pagination";

function MyPagination({page, count, handleChange}) {
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
            {_DATA.currentData().map(v => {
                return (
                    <div>
                        <ListItem>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="flex-start"
                            >
                                <Grid item xs={2} sx={{ marginRight: 4 }}>
                                    <Card sx={{ maxWidth: 220, height: 240 }}>
                                        <CardMedia
                                            component="img"
                                            height="240"
                                            image={v.cover}
                                        />
                                    </Card>
                                </Grid>
                                <Grid item xs={9}>
                                    <ListItemText sx={{ margin: 0, padding: 0 }}>
                                        <Link to={{
                                            pathname: `/home-detail/${v.title}`,
                                            item: { title: v.title }
                                        }}>
                                            <Typography variant="h6" sx={{ color: "black" }}>
                                                {v.title}
                                            </Typography>
                                        </Link>
                                    </ListItemText>
                                    <ListItemText sx={{ margin: 0, padding: 0 }}>
                                        <Typography variant="subtitle1" sx={{ color: "rgb(0, 113, 133)" }}>
                                            by {v.book_author}
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
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item
                    lg={2}
                    md={2}
                    sm={3}
                    xs={3}>
                    <p>Filter</p>
                </Grid>
                <Grid item lg={10} md={10} sm={12} xs={12}>
                    <BookList _DATA={_DATA}/>
                    <MyPagination count={count} page={page} handleChange={handleChange}/>
                </Grid>
            </Grid>
        </Box>
    );
}
