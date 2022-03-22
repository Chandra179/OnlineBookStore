import React from "react";
import { Box, Grid } from "@mui/material";

export default function CartItems({ cartItem }) {
  return (
    <Box sx={{ marginLeft: { lg: 5, md: 5, sm: 5, xs: 2 } }}>
      <Box>
        {Object.keys(cartItem).map(function (key) {
          var title = key;
          var normalPrice = cartItem[key]["normalPrice"];
          var qty = cartItem[key]["qty"];
          var cover = cartItem[key]["cover"];
          var totalPrice = cartItem[key]["totalPrice"];
          var stock = cartItem[key]["stock"];

          return (
            <Box
              key={key}
              mb={3}
              display="flex"
              flexDirection="row"
              alignItems="flex-start"
            >
              <Box pr={1} display="flex" alignItems="center">
                <ItemCheckbox itemKey={key} />
                <BookCover bookCover={cover} />
              </Box>

              <Grid container direction="column">
                <Grid
                  container
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="space-between"
                >
                  <BookTitle bookTitle={title} />
                  <BookPrice totalPrice={totalPrice} />
                </Grid>
                <QtyInput
                  title={title}
                  normalPrice={normalPrice}
                  stock={stock}
                  qty={qty}
                />
              </Grid>
              <RemoveProduct title={title} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
