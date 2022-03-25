import React from "react";
import { Stack, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ActionBtn({ addToCart }) {
  return (
    <Stack>
      <Button
        onClick={addToCart}
        variant="contained"
        sx={{
          margin: "10px 10px 0px 10px",
          fontSize: 12,
        }}
        startIcon={<AddIcon />}
      >
        Add to cart
      </Button>
      <Button
        variant="outlined"
        sx={{ margin: "10px 10px 10px 10px", fontSize: 12 }}
      >
        Buy now
      </Button>
    </Stack>
  );
}
