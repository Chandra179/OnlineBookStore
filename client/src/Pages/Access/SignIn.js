import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useAccount } from "../../Hooks/index";
import { signin } from "../../Api";
import AccessName from "../../Components/Access/AccessName";
import EmailHolder from "../../Components/Access/EmailHolder";
import PasswordHolder from "../../Components/Access/PasswordHolder";
import AccessButton from "../../Components/Access/AccessButton";
import HaveAnAccount from "../../Components/Access/HaveAnAccount";
import Alert from "../../Components/Alert";
import styles from "./styles";

export default function SignIn() {
  // ===========================================================================
  // Context
  // ===========================================================================

  const { isUserLoggedIn, setIsUserLoggedIn } = useAccount();

  // ===========================================================================
  // State
  // ===========================================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [alert, setAlert] = useState("");

  // ===========================================================================
  // Handlers
  // ===========================================================================

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

    if (!email) {
      setEmailHelper("Enter email");
      setEmailError(true);
    }
    if (!password) {
      setPasswordHelper("Enter password");
      setPasswordError(true);
    }
    if (email && password) {
      signin(email, password).then(
        (data) => {
          const userEmail = getCurrentUser();
          // if user is authenticated
          if (userEmail) {
            setIsUserLoggedIn(true);
            window.location.assign("/");
          }
        },
        (error) => {
          setAlert(error.response.data);
        }
      );
    }
  };

  if (isUserLoggedIn) {
    return <Home />;
  } else {
    return (
      <Container>
        <Box sx={styles.boxWrap}>
          {alert && <Alert name={alert} severity="error" />}
          <Box component="form" noValidate sx={styles.form}>
            <AccessName name={"Signin"} />
            <EmailHolder
              email={email}
              isEmailError={emailError ? true : false}
              changeEmail={onChangeEmail}
              emailHelperText={emailHelper ? emailHelper : false}
            />
            <PasswordHolder
              password={password}
              isPasswordError={passwordError ? true : false}
              changePassword={onChangePassword}
              passwordHelperText={passwordHelper ? passwordHelper : false}
            />
            <AccessButton name={"Sign In"} submit={handleSubmit} />
            <HaveAnAccount
              linkTo={"/signup"}
              linkToText={"Don't have an account? Sign Up"}
            />
          </Box>
        </Box>
      </Container>
    );
  }
}
