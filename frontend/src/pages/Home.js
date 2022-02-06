import React from "react";
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";
import Categories from "../components/Categories";

function Home() {
    return (
        <Grid container
            spacing={2}
            sx={{ marginTop: 5 }}
        >
            <Grid item
                lg={3}
                md={3}
                sm={3}
                xs={3}
                sx={{ boxShadow: 1, backgroundColor: 'white' }}
            >
                <Categories />
            </Grid>
            <Grid item
                lg={9}
                md={9}
                sm={9}
                xs={9}
                sx={{ boxShadow: 1, backgroundColor: 'white' }}
            >
                <Typography>Item</Typography>
            </Grid>
        </Grid>
    );
}

export default Home;