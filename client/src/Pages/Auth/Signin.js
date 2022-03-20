import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { getCurrentUser, inputHelperText } from "../../Utils/helpers";
import { signin } from "../../Api";
import Alert from "../../Components/Alert";
import Wrapper from "../../Components/Auth/Wrapper";
import AuthForm from "../../Components/Auth/AuthForm";

const inputSx = {
  "& .MuiInputLabel-root": {
    fontSize: 16,
  },
};
const inputPropsSx = {
  style: {
    height: "20px",
  },
};

export default function Signin() {
  const email = useRef("");
  const password = useRef("");
  const [emailHelper, setEmailHelper] = useState("");
  const [alert, setAlert] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    if (!emailValue) {
      setEmailHelper("Enter email");
      setEmailError(true);
    }
    if (!passwordValue) {
      setPasswordHelper("Enter password");
      setPasswordError(true);
    }
    if (emailValue && passwordValue) {
      signin(emailValue, passwordValue).then(
        (data) => {
          const userEmail = getCurrentUser();
          if (userEmail) window.location.assign("/");
        },
        (error) => {
          setAlert(error.response.data);
        }
      );
    }
  };

  return (
    <Wrapper>
      {alert && <Alert name={alert} severity="error" />}
      <AuthForm name={"Sign in"}>
        <TextField
          fullWidth
          name="email"
          margin="normal"
          label="Email Address"
          autoComplete="email"
          inputRef={email}
          error={emailError ? true : false}
          helperText={inputHelperText(emailHelper)}
          inputProps={inputPropsSx}
          sx={inputSx}
        />
        <TextField
          fullWidth
          name="password"
          margin="normal"
          type="password"
          label="Password"
          autoComplete="current-password"
          inputRef={password}
          error={passwordError ? true : false}
          helperText={inputHelperText(passwordHelper)}
          inputProps={inputPropsSx}
          sx={inputSx}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          sx={{
            marginBottom: 2,
            marginTop: 2,}}
        >
          Sign in
        </Button>
        <Box>
          <Link to={"/signup"}>{"Don't have an account? Sign Up"}</Link>
        </Box>
      </AuthForm>
    </Wrapper>
  );
}
