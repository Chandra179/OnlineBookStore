import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import BookService from "../services/book.service";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    coverSize: {
        maxWidth: 250,
        maxHeight: 250
    },
    titleProperties: {
        margin: 0,
        padding: 0
    },
    authorProperties: {
        margin: 0,
        padding: 0
    },
    dividerProperties: {
        margin: "20px 0px 20px 0px",
        borderBottomWidth: 2
    }
});

function Cover({ cover, classes }) {
    return (
        <Card className={classes.coverSize}>
            <CardMedia
                component="img"
                image={cover}
            />
        </Card>
    );
}

function Content({ title, author, classes }) {
    return (
        <>
            <ListItemText className={classes.titleProperties}>
                <Link to={{
                    pathname: `/book/${title.replace(/\s+/g, '-').toLowerCase()}`
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
                        {title}
                    </Typography>
                </Link>
            </ListItemText>
            <ListItemText className={classes.authorProperties}>
                <Typography sx={{
                    color: "rgb(0, 113, 133)",
                    fontSize: {
                        lg: 16,
                        md: 16,
                        sm: 14,
                        xs: 14
                    }
                }}>
                    by {author}
                </Typography>
            </ListItemText>
        </>
    );
}

function BookList({ data, classes }) {
    return (
        <List>
            {data.map(function (item, i) {
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
                                    <Cover
                                        cover={item.cover}
                                        classes={classes} />
                                </Grid>
                                <Grid item
                                    lg={9}
                                    md={9}
                                    sm={9}
                                    xs={8}>
                                    <Content
                                        title={item.title}
                                        author={item.author}
                                        classes={classes} />
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider className={classes.dividerProperties} />
                    </div>
                );
            })}
        </List>
    )
}

function MyPagination({ currentPage, totalPageNumber, handlePageClick }) {
    return (
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <Pagination count={totalPageNumber} page={currentPage} onChange={handlePageClick} />
        </Stack>
    );
}

function Home() {
    const classes = useStyles();
    const bookPerPage = 2;
    const [bookList, setBookList] = useState([]);
    const [totalBook, setTotalBook] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPageNumber = Math.ceil(totalBook / bookPerPage);

    useEffect(() => {
        // set param page dafault to 1
        BookService.bookList(currentPage).then(
            (data) => {
                setBookList(data.book);
                setTotalBook(data.total_book);
            },
            (error) => {
                console.log(error)
            }
        )
    }, []);

    const handlePageClick = async (event, value) => {
        // set param page to clicked page number
        await BookService.bookList(value).then(
            (data) => {
                setBookList(data.book);
                setTotalBook(data.total_book);
                setCurrentPage(value);
            },
            (error) => {
                console.log(error)
            }
        )
    };

    return (
        <Grid container spacing={2}>
            <Grid item
                lg={2}
                md={2}
                sm={3}
                xs={3}>
                <p>Filter</p>
            </Grid>
            <Grid
                item
                lg={10}
                md={10}
                sm={12}
                xs={12}>
                <BookList data={bookList} classes={classes} />
                <MyPagination
                    currentPage={currentPage}
                    handlePageClick={handlePageClick}
                    totalPageNumber={totalPageNumber} />
            </Grid>
        </Grid>
    );
}

export default Home;