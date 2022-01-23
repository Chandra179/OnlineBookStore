import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import BooksPerGenre from "../components/BooksPerGenre";


function Home() {
    return (
        <Grid container spacing={2}>
            <Grid item
                lg={12}
                md={12}
                sm={12}
                xs={12}>
                <BooksPerGenre />
            </Grid>
        </Grid>
    );
}

export default Home;