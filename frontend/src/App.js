import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login"

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: '',
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <a href="/login" onClick={this.logOut}>
            LogOut
          </a>
        ) : (
          <p>Login first</p>
        )}
        <Switch>
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;