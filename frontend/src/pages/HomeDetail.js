import React, { useState } from "react";
import ShowMoreText from "react-show-more-text";

import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import ShoppingCard from "../components/ShoppingCard";

function Cover({ cover }) {
    return (
        <Card sx={{ maxWidth: 240, maxHeight: 350 }}>
            <CardMedia
                component="img"
                image={cover}
            />
        </Card>
    )
}

function Item({ title, author, desc, expand, expandText }) {
    return (
        <ListItemText sx={{ margin: 0, padding: 0 }}>
            <Typography sx={{
                color: "black",
                fontSize: {
                    lg: 28,
                    md: 28,
                    sm: 24,
                    xs: 20
                }
            }}>
                {title}
            </Typography>
            <Typography sx={{
                color: "rgb(0, 113, 133)"
            }}>
                by {author}
            </Typography>
            <ShowMoreText
                lines={5}
                more={"Show More"}
                less={"Show Less"}
                onClick={expandText}
                expanded={expand}
            >
                {desc}
            </ShowMoreText>
        </ListItemText>
    )
}

export default function HomeDetail() {
    const [expand, setExpand] = useState(false);
    const expandText = () => {
        setExpand(!expand);
    };

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            sx={{ marginTop: 5 }}
        >
            <Grid item
                lg={2}
                md={2}
                sm={11}
                xs={11}
                sx={{ marginRight: 5 }}>
                <Cover />
            </Grid>
            <Grid item
                lg={6}
                md={6}
                sm={8}
                xs={8}
                sx={{ marginRight: 3 }}>
                <Item expandText={expandText} />
            </Grid>
            <Grid item
                lg={3}
                md={3}
                sm={3}
                xs={3}>
                <ShoppingCard />
            </Grid>
        </Grid>
    );
}
