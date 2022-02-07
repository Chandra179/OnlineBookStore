import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
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
            setEmailHelper("Enter email")
            setEmailError(true)
        }
        if (password === "") {
            setPasswordHelper("Enter password")
            setPasswordError(true)
        }

        if (email !== "" && password !== "") {
            //HANDLE SIGNUP HERE!!
            AuthService.signup(email, password).then(
                (data) => {
                    const userEmail = AuthService.getCurrentUser();
                    setCartBadge(CartHelper.cartBadge(userEmail));
                    setIsUserLoggedIn(true)
                    history.push("/");
                },
                (error) => {
                    if (error.response.data === "User sudah terdaftar!") {
                        console.log(error.response.data);
                        setSignupAlert(error.response.data);
                    } else if (error.response.data === "validasi error") {
                        console.log(error.response.data);
                        setSignupAlert(error.response.data);
                    }
                    else {
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
                backgroundColor: 'white',
                borderRadius: 4,
                boxShadow: 1
            }}
        >
            <Box
                sx={{
                    paddingTop: 2,
                    paddingBottom: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {signupAlert ? <Alert signupAlert={signupAlert} /> : <div />}

                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSignUpSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
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
                            />
                        </Grid>
                        <Grid item xs={12}>
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
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