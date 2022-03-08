import React, { useState } from "react";
import { Link } from "react-router-dom";
// MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "../components/Alert";
// SERVICE
import AuthService from "../services/auth.service";
// CONTEXT
import { useUser } from "../hooks/useUser";

export default function SignUp() {
  const [signupAlert, setSignupAlert] = useState("");
  const [email, setEmail] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { setIsUserLoggedIn } = useUser();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSignUpSubmit = (e) => {
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
      //HANDLE SIGNUP HERE!!
      AuthService.signup(email, password).then(
        () => {
          const userEmail = AuthService.getCurrentUser();
          // if user is authenticated
          if (userEmail) {
            setIsUserLoggedIn(true);
            window.location.assign("/");
          }
        },
        (error) => {
          setSignupAlert(error.response.data);
        }
      );
    }
  };

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
        {signupAlert ? <Alert name={signupAlert} severity="error" /> : <div />}
        <Box
          component="form"
          noValidate
          onSubmit={handleSignUpSubmit}
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
            Sign up
          </Typography>
          <TextField
            onChange={onChangeEmail}
            value={email}
            error={emailError ? true : false}
            helperText={emailHelper ? emailHelper : false}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            margin="normal"
            inputProps={{
              style: {
                height: "20px",
              },
            }}
          />
          <TextField
            onChange={onChangePassword}
            value={password}
            error={passwordError ? true : false}
            helperText={passwordHelper ? passwordHelper : false}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            margin="normal"
            inputProps={{
              style: {
                height: "20px",
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signin" variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
