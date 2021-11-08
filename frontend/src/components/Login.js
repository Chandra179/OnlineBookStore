import React, { useState, useRef } from "react";
import AuthService from "../services/auth.service";
import TextField from "@mui/material/TextField";
//import { Button, Paper } from "@material-ui/core";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        //HANDLE LOGIN HERE!!
        AuthService.login(email, password).then(
            () => {
                props.history.push("/");
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        );
    };

    return (
        <div>
            <Paper>
                <h2>Login</h2>
                <TextField
                    onChange={onChangeEmail}
                    value={email}
                    label={"Email"}
                />
                <TextField
                    onChange={onChangePassword}
                    value={password}
                    label={"Password"}
                />
                <Button onClick={handleLogin}>Submit</Button>
            </Paper>
        </div>
    );
};

export default Login;