import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import BasicAppbar from "../Layouts/Appbar";

const Routes = () => {
  return (
    <Router>
      <BasicAppbar />
      {/* <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/genres/:genre/:page" component={BooksByGenre} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/genres/:genre/:page/:title" component={BookDetails} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/cart/checkout" component={Checkout} />
      </Switch> */}
    </Router>
  );
}

export default Routes;