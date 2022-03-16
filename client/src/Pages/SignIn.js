import React, { useState } from "react";
import { Link } from "react-router-dom";
// MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// COMPONENT
import Alert from "../components/Alert";
import Home from "../pages/Home/Index";
// SERVICE
import AuthService from "../services/auth.service";
// CONTEXT
import { useUser } from "../hooks/useUser";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [signInAlert, setSignInAlert] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const { isUserLoggedIn, setIsUserLoggedIn } = useUser();

  const isEmailError = emailError ? true : false;
  const emailHelperText = emailHelper ? emailHelper : false;
  const isPasswordError = passwordError ? true : false;
  const passwordHelperText = passwordHelper ? passwordHelper : false;

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSignInSubmit = (e) => {
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
      AuthService.signin(email, password).then(
        (data) => {
          const userEmail = AuthService.getCurrentUser();
          // if user is authenticated
          if (userEmail) {
            setIsUserLoggedIn(true);
            window.location.assign("/");
          }
        },
        (error) => {
          setSignInAlert(error.response.data);
        }
      );
    }
  };

  if (isUserLoggedIn) {
    return <Home />;
  } else {
    return (
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          {signInAlert ? (
            <Alert name={signInAlert} severity="error" />
          ) : (
            <div />
          )}
          <Box
            component="form"
            onSubmit={handleSignInSubmit}
            noValidate
            sx={{
              padding: 3,
              boxShadow: 1,
              borderRadius: 2,
              width: 280,
              minWidth: { lg: 420, md: 420, sm: 400, xs: 280 },
            }}
          >
            <Typography
              sx={{
                marginBottom: 2,
                fontSize: { lg: 26, md: 26, sm: 24, xs: 22 },
              }}
            >
              Sign in
            </Typography>
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
            <TextField
              required
              fullWidth
              margin="normal"
              type="password"
              label="Password"
              autoComplete="current-password"
              value={password}
              error={isPasswordError}
              onChange={onChangePassword}
              helperText={passwordHelperText}
              inputProps={{
                style: {
                  height: "20px",
                },
              }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }
}
