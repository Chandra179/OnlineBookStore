import React, { useState, useRef, useEffect } from "react";

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

import BookService from "../services/book.service"
import usePagination from "./Pagination";

export default function Home(props) {
    const [bookList, setBookList] = useState([]);
    let [page, setPage] = useState(1);
    const PER_PAGE = 10;
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
                <Grid item xs={2}>
                    <p>Filter</p>
                </Grid>
                <Grid item xs={10}>
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
                                            <Grid item xs={2}>
                                                <Card sx={{ maxWidth: 150, height: 170 }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="170"
                                                        image="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                                                        alt="green iguana"
                                                    />
                                                </Card>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <ListItemText>{v.title}</ListItemText>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    <Divider />
                                </div>
                            );
                        })}
                    </List>
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
            </Grid>
        </Box>
    );
}
