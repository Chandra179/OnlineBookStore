import React from "react";
import { Box, TextField, FormControl } from "@mui/material";
import { numberOnly } from "../../Utils/helpers";

export default function QuantityInput({ qtyChange, stock, qty }) {
  return (
    <Box
      sx={{
        maxWidth: 80,
        minWidth: 30,
        margin: 1.3,
      }}
    >
      <FormControl fullWidth>
        <TextField
          id="outlined-number"
          label="Qty"
          type="tel"
          onChange={qtyChange}
          InputProps={{
            inputProps: {
              max: stock,
              min: 1,
            },
            style: {
              height: 52,
            },
          }}
          onKeyPress={(event) => numberOnly(event)}
          value={qty}
          sx={{
            // override mui style
            "& #outlined-number-label": {
              fontSize: 14,
            },
          }}
        />
      </FormControl>
    </Box>
  );
}
