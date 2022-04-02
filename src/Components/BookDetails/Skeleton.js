import React from "react";
import { Skeleton, Box, Grid } from "@mui/material";

export default function CustomSkeleton() {
  return (
    <Grid
      container
      direction="row"
      display="flex"
      alignItems="flex-start"
      p={4}
    >
      <Grid
        item
        lg={2}
        md={2}
        sm={3}
        xs={12}
        display="flex"
        justifyContent="center"
      >
        <Skeleton variant="rectangular" height={160} width={120} />
      </Grid>
      <Grid item lg={7} md={7} sm={9} xs={12}>
        <Box
          sx={{
            marginTop: { lg: 0, md: 0, sm: 0, xs: 2 },
            paddingRight: { lg: 4, md: 4, sm: 4, xs: 0 },
          }}
        >
            <Skeleton variant="rectangular" height={30} width={280} sx={{ marginBottom: 1 }} />
            <Skeleton variant="rectangular" height={15} width={140} sx={{ marginBottom: 1 }} />
            <Skeleton variant="rectangular" height={80} width={280} sx={{ marginBottom: 1 }} />
        </Box>
      </Grid>
    </Grid>
  );
}
