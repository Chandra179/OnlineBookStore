import React from "react";
import { TextField } from "@mui/material";

export default function SignIn({ email, isEmailError, onChangeEmail, emailHelperText}) {
  return (
    <TextField
      required
      fullWidth
      margin="normal"
      label="Email Address"
      autoComplete="email"
      value={email}
      error={isEmailError}
      onChange={onChangeEmail}
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
