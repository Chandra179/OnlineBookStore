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
        for (const item in booksPerGenre) {
            result.push(<h1>{item}</h1>)
            booksPerGenre[item].map((e, i) => {
                result.push(
                    <p key={e.name}>
                        {e.name}
                    </p>
                )
            })
        }
        return result;
    }

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