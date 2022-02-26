import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";

/**
 * 
 * @param {list} handleSelectedCheckbox 
 * @param {bool} allCheckboxSelected
 */

export default function Header({ handleSelectedCheckbox, allCheckboxSelected }) {
  return (
    <Box
      sx={{
        display: "flex",
        marginLeft: {
          lg: 5,
          md: 5,
          sm: 5,
          xs: 2,
        },
        marginTop: 6,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: {
              lg: 20,
              md: 20,
              sm: 18,
              xs: 16,
            },
          }}
        >
          Shopping cart
        </Typography>
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
