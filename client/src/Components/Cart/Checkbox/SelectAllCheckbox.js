import React from "react";
import { Box, Typography, Checkbox } from "@mui/material";

export default function SelectAllCheckbox({ selectAllCheckbox, isAllCheckboxSelected }) {
  return (
    <Box
      sx={{
        width: 90,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: {
              lg: 16,
              md: 16,
              sm: 16,
              xs: 14,
            },
          }}
        >
          Select all
        </Typography>
      </Box>
      <Box sx={{ marginLeft: "auto" }}>
        <Checkbox
          sx={{ width: 0, height: 0 }}
          value="all"
          onChange={selectAllCheckbox}
          checked={isAllCheckboxSelected}
        />
      </Box>
    </Box>
  );
}
