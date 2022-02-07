import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookService from "../services/book.service";
import { useHistory } from "react-router-dom";
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
import Box from '@mui/material/Box';


const useStyles = makeStyles({
    coverSize: {
        width: 130
    },
    nameProperties: {
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


function Book({ bookList, currentPage, classes }) {
    return (
        <List>
            {bookList.map(function (item, i) {
                return (
                    <div key={i}>
                        <ListItem>
                            <Grid
                                container
                                direction="row"
                                alignItems="flex-start"
                            >
                                <Box sx={{ marginRight: 2, boxShadow: 1 }}>
                                    <Card className={classes.coverSize}>
                                        <CardMedia
                                            component="img"
                                            image={item.cover}
                                        />
                                    </Card>
                                </Box>
                                <Grid item
                                    lg={8}
                                    md={8}
                                    sm={6}
                                    xs={6}>
                                    <ListItemText className={classes.nameProperties}>
                                        <Link to={{
                                            pathname: `/${item.genre.toLowerCase()}/${currentPage}/${item.name.replace(/\s+/g, '-').toLowerCase()}`
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
                                                {item.name}
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
                                            by {item.author}
                                        </Typography>
                                    </ListItemText>
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
            <Pagination
                count={totalPageNumber}
                page={currentPage}
                onChange={handlePageClick} />
        </Stack>
    );
}

function BookList() {
    const classes = useStyles();
    const history = useHistory();

    const bookPerPage = 2;
    const [bookList, setBookList] = useState([]);
    const [totalBook, setTotalBook] = useState(0);

    const genre = window.location.pathname.split('/')[1]
    const page = Number(window.location.pathname.split('/')[2])

    const [currentPage, setCurrentPage] = useState(0);
    const totalPageNumber = Math.ceil(totalBook / bookPerPage);

    useEffect(() => {
        // set dafault parameter page to 1
        BookService.bookList(genre, page).then(
            (data) => {
                setBookList(data.book);
                setTotalBook(data.total_book);
                setCurrentPage(page);
            },
            (error) => {
                console.log(error)
            }
        )
    }, [genre, page]);

    const handlePageClick = async (event, value) => {
        // set param page to clicked page number
        await BookService.bookList(genre, value).then(
            (data) => {
                setBookList(data.book);
                setTotalBook(data.total_book);
                setCurrentPage(value);
            },
            (error) => {
                console.log(error)
            }
        )
        history.push(`/${genre}/${value}`)
    };

    return (
        <Grid container spacing={2}>
            <Grid item
                lg={2}
                md={2}
                sm={3}
                xs={3}>
            </Grid>
            <Grid
                item
                lg={10}
                md={10}
                sm={12}
                xs={12}>
                <Book
                    currentPage={currentPage}
                    bookList={bookList}
                    classes={classes} />
                <MyPagination
                    currentPage={currentPage}
                    handlePageClick={handlePageClick}
                    totalPageNumber={totalPageNumber} />
            </Grid>
        </Grid>
    );
}

export default BookList;