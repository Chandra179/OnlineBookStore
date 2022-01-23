import React, { useState, useEffect } from "react";
import BookService from "../services/book.service";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';


function BooksPerGenre() {
    const [booksPerGenre, setBooksPerGenre] = useState([]);

    useEffect(() => {
        BookService.booksPerGenre().then(
            (data) => {
                setBooksPerGenre(data);
            },
            (error) => {
                console.log(error)
            }
        )
    }, []);

    const bookPerGenreList = () => {
        var result = [];
        for (const key in booksPerGenre) {
            result.push(
                <Typography key={key}>{key}</Typography>
            )
            booksPerGenre[key].map(x => {
                result.push(
                    <MenuItem key={x.name}>{x.name}</MenuItem>
                )
            })
        }
        return result;
    }

    console.log(booksPerGenre);
    return (
        <Grid container spacing={2}>
            <Grid item
                lg={12}
                md={12}
                sm={12}
                xs={12}>
                {bookPerGenreList()}
            </Grid>
        </Grid>
    );
}

export default BooksPerGenre;