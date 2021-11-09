import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import ButtonAppBar from "./components/ButtonAppBar"

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  
  return (
    <div>
        <ButtonAppBar isLoggedin={currentUser} />
    </div>
  );
};

export default App;