import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AuthService from "../services/auth.service";
import Alert from "../components/Alert";
import { useUser } from "../hooks/useUser";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link to="#" color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {
    const { setUserState } = useUser();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginAlert, setLoginAlert] = useState("");
    const [emailHelper, setEmailHelper] = useState("");
    const [passwordHelper, setPasswordHelper] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    let history = useHistory();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            history.push("/");
        }
    }, []);

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleSubmit = (e) => {
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
            AuthService.signin(email, password).then(
                (data) => {
                    // Update current user state (context.js)
                    setUserState(data);
                    history.push("/");
                },
                (error) => {
                    if (error.response.data === "User not found") {
                        console.log(error.response.data)
                        setLoginAlert(error.response.data)
                    } else {
                        // Password incorrect
                        console.log(error.response.data)
                        setLoginAlert(error.response.data)
                    }
                    console.log(error.response)
                }
            );
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ pb: 2, width: '100%' }}>
                        {loginAlert ? <Alert loginALert={loginAlert} /> : <div />}
                    </Box>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            onChange={onChangeEmail}
                            value={email}
                            error={emailError ? true : false}
                            helperText={emailHelper !== "" ? emailHelper : false}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            onChange={onChangePassword}
                            value={password}
                            error={passwordError ? true : false}
                            helperText={passwordHelper !== "" ? passwordHelper : false}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
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
                            <Grid item xs>
                                <Link to="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}