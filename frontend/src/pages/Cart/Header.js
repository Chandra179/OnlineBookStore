import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";

/**
 * 
 * @param {list} handleSelectedCheckbox 
 * @param {bool} allCheckboxSelected
 */

export default function Header({ selectAllCheckbox, isAllCheckboxSelected }) {
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
        justifyContent: 'space-between'
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: {
              lg: 18,
              md: 18,
              sm: 16,
              xs: 14,
            },
          }}
        >
          Shopping cart
        </Typography>
      </Box>
      <Box
        sx={{
          width: 90,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography sx={{
            fontSize: {
              lg: 16,
              md: 16,
              sm: 16,
              xs: 14,
            },
          }}>Select all</Typography>
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
    </Box>
  );
}
