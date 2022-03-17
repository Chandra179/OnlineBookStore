import React from "react";
import { FormControl, TextField } from "@mui/material";
import { numberOnly } from "../../Utils/helpers";

export default function Quantity({ qty, qtyChange }) {
  return (
    <FormControl fullWidth>
      <TextField
        label="Qty"
        type="tel"
        variant="standard"
        size="small"
        value={qty}
        onKeyPress={(e) => numberOnly(e)}
        onChange={qtyChange}
        inputProps={{
          inputProps: {
            max: stock,
            min: 1,
          },
          style: {
            height: 52,
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
