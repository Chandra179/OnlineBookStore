import React, { Component } from "react";
import AuthService from "../services/auth.service";
import TextField from "@material-ui/core/TextField";
import { Button, Paper } from "@material-ui/core";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            email: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });
        //HANDLE LOGIN HERE!
        AuthService.login(this.state.email, this.state.password).then(
            () => {
                this.props.history.push("/");
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    loading: false,
                    message: resMessage
                });
            }
        );
    }

    render() {
        return (
            <Paper>
                <h2>Login</h2>
                <TextField
                    onChange={this.onChangeEmail}
                    value={this.state.email}
                    label={"Email"}
                />
                <TextField
                    onChange={this.onChangePassword}
                    value={this.state.password}
                    label={"Password"}
                />
                <Button onClick={this.handleLogin}>Submit</Button>
            </Paper>
        );
    }
}