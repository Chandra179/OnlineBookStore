import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "../components/Alert";

import AuthService from "../services/auth.service";
import CartHelper from "../helper/cart.helper";
import { useUser } from "../hooks/useUser";
import { useCart } from "../hooks/useCart";

export default function SignUp() {
  let history = useHistory();
  const { setIsUserLoggedIn } = useUser();
  const { setCartBadge } = useCart();

  const [signupAlert, setSignupAlert] = useState("");
  const [email, setEmail] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

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

    if (email === "") {
      setEmailHelper("Enter email");
      setEmailError(true);
    }
    if (password === "") {
      setPasswordHelper("Enter password");
      setPasswordError(true);
    }

    if (email !== "" && password !== "") {
      //HANDLE SIGNUP HERE!!
      AuthService.signup(email, password).then(
        (data) => {
          const userEmail = AuthService.getCurrentUser();
          if (userEmail) {
            setCartBadge(CartHelper.cartBadge(userEmail));
            setIsUserLoggedIn(true);
            history.push("/");
          }
        },
        (error) => {
          if (error.response.data === "User sudah terdaftar!") {
            console.log(error.response.data);
            setSignupAlert(error.response.data);
          } else if (error.response.data === "validasi error") {
            console.log(error.response.data);
            setSignupAlert(error.response.data);
          } else {
            console.log(error);
          }
          console.log(error);
        }
      );
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: 8,
        width: {
          lg: 550,
          md: 540,
          sm: 520,
          xs: 300,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {signupAlert ? <Alert name={signupAlert} severity="error" /> : <div />}

        <Box
          component="form"
          noValidate
          onSubmit={handleSignUpSubmit}
          sx={{ padding: 2, boxShadow: 1, borderRadius: 2 }}
        >
          <Typography sx={{ fontSize: 26, marginBottom: 2 }}>
            Sign up
          </Typography>
          <TextField
            onChange={onChangeEmail}
            value={email}
            error={emailError ? true : false}
            helperText={emailHelper !== "" ? emailHelper : false}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            margin="normal"
          />
          <TextField
            onChange={onChangePassword}
            value={password}
            error={passwordError ? true : false}
            helperText={passwordHelper !== "" ? passwordHelper : false}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            margin="normal"
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
