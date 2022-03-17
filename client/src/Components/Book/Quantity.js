import React from "react";
import { FormControl, TextField } from "@mui/material";
import { numberOnly } from "../../Utils/helpers";

export default function Quantity({ qty, stock, qtyChange }) {
  return (
    <FormControl fullWidth>
      <TextField
        label="Qty"
        type="tel"
        size="small"
        value={qty}
        onKeyPress={(e) => numberOnly(e)}
        onChange={qtyChange}
        inputProps={{
          style: {
            height: 25,
            fontSize: 14,
            borderRadius: 0,
            textAlign: "center",
          },
        }}
        sx={{
          // override mui style
          "& #outlined-number-label": {
            fontSize: 14,
          },
        }}
      />
    </FormControl>
  );
}
