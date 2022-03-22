import React from "react";
import { Box, Checkbox } from "@mui/material";

export default function SelectCheckbox({ itemKey, selectCheckBox, items }) {
  return (
    <Box pr={1}>
      <Checkbox
        sx={{ width: 20, height: 20 }}
        value={itemKey}
        onChange={selectCheckBox}
        checked={items}
      />
    </Box>
  );
}
