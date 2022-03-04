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
import { styled } from "@mui/material/styles";
// COMPONENT
import Alert from "../components/Alert";
import Home from "../pages/Home/Index";
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
  marginTop: 80
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
}))

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


export default function SignIn() {
  let history = useHistory();
  const { setCartBadge } = useCart();
  const { isUserLoggedIn, setIsUserLoggedIn } = useUser();

  const [signInAlert, setSignInAlert] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
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
          if (userEmail) {
            setCartBadge(CartHelper.cartBadge(userEmail));
            setIsUserLoggedIn(true);
            history.push("/");
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
        <RootBox>
          {signInAlert ? <Alert name={signInAlert} severity="error" /> : <div />}
          <FormBox
            component="form"
            onSubmit={handleSignInSubmit}
            noValidate
          >
            <FormName>Sign in</FormName>
            <TextField
              onChange={onChangeEmail}
              value={email}
              error={emailError ? true : false}
              helperText={emailHelper ? emailHelper : false}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              inputProps={{
                style: {
                  height: "20px",
                },
              }}
              autoFocus
            />
            <TextField
              onChange={onChangePassword}
              value={password}
              error={passwordError ? true : false}
              helperText={passwordHelper ? passwordHelper : false}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </FormBox>
        </RootBox>
      </Container>
    );
  }
}
