import React, { useEffect } from "react";
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
import Button from '@mui/material/Button';

import BookService from "../services/book.service"
import { useBook } from "../hooks/useBook";
import { ListItemButton } from "@mui/material";

function BookList({ data }) {
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
                                    <Card sx={{ maxWidth: 250, maxHeight: 250 }}>
                                        <CardMedia
                                            component="img"
                                            width="200"
                                            image={item.cover}
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
                                            pathname: `/home-detail/${item.title.replace(/\s+/g, '-').toLowerCase()}`
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
                                                {item.title}
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
                                            by {item.author}
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
    const { bookItem, setBookItem } = useBook();
    // const bookList = bookItem.map((item, index) =>
    //     <ul key={index}>
    //         <li>{item.title}</li>
    //         <li>{item.cover}</li>
    //         <li>{item.author}</li>
    //     </ul>
    // );

    useEffect(() => {
        BookService.bookList().then(
            (data) => {
                setBookItem(data.data);
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
                <BookList data={bookItem} />
            </Grid>
        </Grid>
    );
}
