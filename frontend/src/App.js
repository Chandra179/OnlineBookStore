import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
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
    //   <Router>
    //   <div>
    //     <ul>
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //     </ul>

    //     <Switch>
    //       <Route path="/">
    //         <App />
    //       </Route>
    //       <Route path="/login">
    //         <Login />
    //       </Route>
    //     </Switch>
    //   </div>
    // </Router>
      <div>
        {currentUser ? (
          <a href="/login" onClick={this.logOut}>
            LogOut
          </a>
        ) : (
          <Link to={"/login"}>
            Login
          </Link>
        )}
        <Routes>
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </div>
    );
  }
}

export default App;