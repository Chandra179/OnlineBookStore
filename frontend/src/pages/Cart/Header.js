import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";

export default function Header({
  handleSelectedCheckbox,
  allCheckboxSelected,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        marginLeft: 6,
        marginTop: 6,
      }}
    >
      <Box>
        <Typography variant="h6">Your cart</Typography>
      </Box>
      <Box
        sx={{
          marginLeft: "auto",
          width: 90,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="p">Select all</Typography>
        </Box>
        <Box sx={{ marginLeft: "auto" }}>
          <Checkbox
            sx={{ width: 0, height: 0 }}
            value="all"
            onChange={handleSelectedCheckbox}
            checked={allCheckboxSelected}
          />
        </Box>
      </Box>
    </Box>
  );
}