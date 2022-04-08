import * as React from "react";
import {
  Box,
  Typography,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useOrder } from "../../Hooks";

function sumPrice(items) {
  var summed = 0;
  for (var key in items) {
    summed += parseFloat(items[key]["price"]);
  }
  return summed.toFixed(2);
}

export default function OrderSummary() {
  const { order } = useOrder();
  const totalPrice = sumPrice(order);

  return (
    <Box sx={{ marginRight: { lg: 5, md: 5, sm: 0, xs: 0 } }}>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <Divider />
      {Object.keys(order).map(function (key) {
        var qty = order[key]["qty"];
        var price = order[key]["price"];
        return (
          <ListItem key={key} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ paddingRight: 3 }}
              primary={key}
              primaryTypographyProps={{ fontSize: 13 }}
              secondary={
                <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                  x{qty}
                </Typography>
              }
            />
            <Typography variant="body2">${price}</Typography>
          </ListItem>
        );
      })}
      <Divider />
      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary="Subtotal" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          ${totalPrice}
        </Typography>
      </ListItem>
    </Box>
  );
}
