import React from "react";
import { Box } from "@mui/material";
import Styles from "./Styles";
import ItemCheckbox from "./ItemCheckbox";
import BookCover from "./BookCover";
import BookTitle from "./BookTitle";
import BookTotalPrice from "./BookTotalPrice";
import QtyInput from "./QtyInput";

export default function Items({
  cartItem,
  handleSelectCheckbox,
  selectedCheckbox,
}) {
  return (
    <Box sx={Styles.contentBox}>
      <Box>
        {Object.keys(cartItem).map(function (key) {
          var title = key;
          var normalPrice = cartItem[key]["normalPrice"];
          var qty = cartItem[key]["qty"];
          var cover = cartItem[key]["cover"];
          var totalPrice = cartItem[key]["totalPrice"];
          var stock = cartItem[key]["stock"];

          return (
            <Box key={key} mb={3} sx={Styles.itemBox}>
              <Box pr={1} sx={Styles.checkBoxAndCoverBox}>
                <ItemCheckbox
                  itemKey={key}
                  selectCheckbox={handleSelectCheckbox}
                  items={selectedCheckbox.includes(title)}
                />
                <BookCover cover={cover} />
              </Box>

              <Grid container direction="column">
                <Grid
                  container
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="space-between"
                >
                  <BookTitle title={title} />
                  <BookTotalPrice price={totalPrice} />
                </Grid>
                <QtyInput
                  title={title}
                  qty={qty}
                  normalPrice={normalPrice}
                  stock={stock}
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
