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
import { makeStyles } from '@mui/styles';

import BookService from "../services/book.service"
import usePagination from "./Pagination";

const useStyles = makeStyles({
    coverGrid: {
        marginRight: 20
    },
    coverCard: {
        maxWidth: 200,
        maxHeight: 240
    },
    item: {
        margin: 0, 
        padding: 0
    },
    divider: {
        margin: 10, 
        borderBottomWidth: 2
    }
  });

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
    const classes = useStyles();
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
                                <Grid className={classes.coverGrid}
                                    item
                                    lg={2}
                                    md={2}
                                    sm={2}
                                    xs={3}>
                                    <Link to={{
                                        pathname: `/home-detail/${v.title}`,
                                        item: { title: v.title }
                                    }}>
                                        <Card className={classes.coverCard}>
                                            <CardMedia
                                                component="img"
                                                height="240"
                                                image={v.cover}
                                            />
                                        </Card>
                                    </Link>
                                </Grid>
                                <Grid item
                                    lg={9}
                                    md={9}
                                    sm={9}
                                    xs={8}>
                                    <ListItemText className={classes.item}>
                                        <Link to={{
                                            pathname: `/home-detail/${v.title}`,
                                            item: { title: v.title }
                                        }}>
                                            <Typography sx={{
                                                color: "black",
                                                fontSize: {
                                                    lg: 20,
                                                    md: 20,
                                                    sm: 20,
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
                                                sm: 16,
                                                xs: 14
                                            }
                                        }}>
                                            by {v.book_author}
                                        </Typography>
                                    </ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider className={classes.divider}/>
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
        <Grid container spacing={2}>
            <Grid item
                lg={2}
                md={2}
                sm={3}
                xs={3}>
                <p>Filter</p>
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
