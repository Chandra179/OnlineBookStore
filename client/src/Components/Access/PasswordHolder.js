import React from "react";
import { TextField } from "@mui/material";

export default function PasswordHolder({
  password,
  isPasswordError,
  changePassword,
  passwordHelperText,
}) {
  return (
    <TextField
      required
      fullWidth
      margin="normal"
      type="password"
      label="Password"
      autoComplete="current-password"
      value={password}
      error={isPasswordError}
      onChange={changePassword}
      helperText={passwordHelperText}
      inputProps={{
        style: {
          height: "20px",
        },
      }}
    />
  );
}
