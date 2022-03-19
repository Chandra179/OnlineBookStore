import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, TextField, Container } from "@mui/material";
import { getCurrentUser } from "../Utils/helpers";
import { signin } from "../Api";
import Alert from "../Components/Alert";
import Wrapper from "../Components/Auth/Wrapper";
import Form from "../Components/Auth/Form";

const inputPropsSx = {
  style: {
    height: "20px",
  },
};

const submitBtnSx = {
  marginBottom: 2,
  marginTop: 2,
};

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [signInAlert, setSignInAlert] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailHelper("Enter email");
      setEmailError(true);
    }
    if (!password) {
      setPasswordHelper("Enter password");
      setPasswordError(true);
    }
    if (email && password) {
      await signin(email, password).then(
        (data) => {
          const userEmail = getCurrentUser();
          if (userEmail) window.location.assign("/");
        },
        (error) => {
          setSignInAlert(error.response.data);
        }
      );
    }
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  return (
    <Wrapper>
      {signInAlert && <Alert name={signInAlert} severity="error" />}
      <Form name={"Sign in"}>
        <TextField
          fullWidth
          margin="normal"
          label="Email Address"
          autoComplete="email"
          value={email}
          error={emailError ? true : false}
          onChange={onChangeEmail}
          helperText={emailHelper ? emailHelper : false}
          inputProps={inputPropsSx}
          autoFocus
        />
        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Password"
          autoComplete="current-password"
          value={password}
          error={passwordError ? true : false}
          onChange={onChangePassword}
          helperText={passwordHelper ? passwordHelper : false}
          inputProps={inputPropsSx}
          autoFocus
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          sx={submitBtnSx}
        >
          Sign in
        </Button>
        <Box>
          <Link to={"/signup"}>{"Don't have an account? Sign Up"}</Link>
        </Box>
      </Form>
    </Wrapper>
  );
}
