import React from "react";

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

function Item({ title, author, desc }) {
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
            <Typography>
                {desc}
            </Typography>
            
        </ListItemText>
    )
}

export default function HomeDetail(props) {
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
                sm={2}
                xs={2}
                sx={{ marginRight: 5 }}>
                <Cover cover={props.location.item['cover']} />
            </Grid>
            <Grid item
                lg={6}
                md={6}
                sm={6}
                xs={6}
                sx={{ marginRight: 3 }}>
                <Item
                    title={props.location.item['title']}
                    author={props.location.item['author']}
                    desc={props.location.item['desc']} />
            </Grid>
            <Grid item
                lg={3}
                md={3}
                sm={3}
                xs={3}>
                    <p>Order detail</p>
            </Grid>
        </Grid>
    );
}
