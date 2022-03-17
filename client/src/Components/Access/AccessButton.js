import React from "react";
import { Button } from "@mui/material";

export default function AccessButton({ name }) {
  return (
    <Button
      fullWidth
      type="submit"
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      {name}
    </Button>
  );
}
