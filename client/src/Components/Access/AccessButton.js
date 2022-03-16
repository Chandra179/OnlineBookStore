import React from "react";
import { Button } from "@mui/material";

export default function AccessButton({ submit, name }) {
  return (
    <Button
      onClick={submit}
      fullWidth
      type="submit"
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      {name}
    </Button>
  );
}
