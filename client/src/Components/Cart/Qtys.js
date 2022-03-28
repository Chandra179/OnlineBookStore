import React from "react";
import { Box, Grid, FormControl, TextField, IconButton } from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
//
import Styles from "./Styles";
import { numberOnly } from "../../Utils/helpers";

export default function Qtys({ qty, inputQty, decrementQty, incrementQty }) {
  return (
    <Grid>
      <Box sx={Styles.quantityBox}>
        {/* DECREMENT */}
        <Box mb={1}>
          <IconButton size="small" onClick={decrementQty}>
            <RemoveCircleOutlineOutlinedIcon sx={Styles.iconStyles} />
          </IconButton>
        </Box>
        {/* INPUT */}
        <Box sx={{ width: 60 }}>
          <FormControl fullWidth>
            <TextField
              variant="standard"
              type="tel"
              size="small"
              value={qty}
              onKeyPress={(e) => numberOnly(e)}
              onChange={inputQty}
              inputProps={{
                style: Styles.quantityInputProps,
              }}
            />
          </FormControl>
        </Box>
        {/* INCREMENT */}
        <Box mb={1}>
          <IconButton size="small" onClick={incrementQty}>
            <AddCircleOutlineOutlinedIcon sx={Styles.iconStyles} />
          </IconButton>
        </Box>
      </Box>
    </Grid>
  );
}
