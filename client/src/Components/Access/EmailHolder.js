import React from "react";
import { TextField } from "@mui/material";

export default function EmailHolder({
  email,
  isEmailError,
  changeEmail,
  emailHelperText,
}) {
  return (
    <TextField
      required
      fullWidth
      margin="normal"
      label="Email Address"
      autoComplete="email"
      value={email}
      error={isEmailError}
      onChange={changeEmail}
      helperText={emailHelperText}
      inputProps={{
        style: {
          height: "20px",
        },
      }}
      autoFocus
    />
  );
}
