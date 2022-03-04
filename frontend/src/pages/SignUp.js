import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "../components/Alert";
import { styled } from "@mui/material/styles";
// SERVICE
import AuthService from "../services/auth.service";
// HELPER
import CartHelper from "../helper/cart.helper";
// CONTEXT
import { useUser } from "../hooks/useUser";
import { useCart } from "../hooks/useCart";

const RootBox = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: 80,
});

const FormBox = styled(Box)(({ theme }) => ({
  padding: 30,
  boxShadow: 1,
  borderRadius: 2,
  [theme.breakpoints.up("xs")]: {
    width: 280,
  },
  [theme.breakpoints.up("sm")]: {
    minWidth: 400,
  },
  [theme.breakpoints.up("md")]: {
    minWidth: 400,
  },
  [theme.breakpoints.up("lg")]: {
    minWidth: 420,
  },
}));

const FormName = styled(Typography)(({ theme }) => ({
  marginBottom: 12,
  [theme.breakpoints.up("xs")]: {
    fontSize: 22,
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: 24,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: 26,
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: 26,
  },
}));

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
        (data) => {
          const userEmail = AuthService.getCurrentUser();
          if (userEmail) {
            setCartBadge(CartHelper.cartBadge(userEmail));
            setIsUserLoggedIn(true);
            history.push("/");
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
      <RootBox>
        {signupAlert ? <Alert name={signupAlert} severity="error" /> : <div />}
        <FormBox 
          component="form" 
          noValidate 
          onSubmit={handleSignUpSubmit}
        >
          <FormName>Sign up</FormName>
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
        </FormBox>
      </RootBox>
    </Container>
  );
}
