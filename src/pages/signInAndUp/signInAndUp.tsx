import React, { useContext, FunctionComponent } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";
import CurrentUserContext from "../../contexts/user/UserContext";
import { Inner, Container } from "../../components/common-style/common-style";
import SignInAndUpContainer from "./styled-signInAndUp";
import SignInComponent from "../../components/signin/signin";
import SignUpComponent from "../../components/signup/signup";

const useStyles = makeStyles({
  heading: {
    fontSize: 30,
    marginBottom: 25,
  },
});

const SignInAndUpPage: FunctionComponent = () => {
  const currentUser = useContext(CurrentUserContext);
  const classes = useStyles();
  return (
    <>
      {currentUser && currentUser.id ? (
        <Redirect to="/" />
      ) : (
        <Inner>
          <Container height="70vh">
            <Typography variant="h2" className={classes.heading}>
              signin or signup
            </Typography>
            <SignInAndUpContainer>
              <SignInComponent />
              <SignUpComponent />
            </SignInAndUpContainer>
          </Container>
        </Inner>
      )}
    </>
  );
};

export default SignInAndUpPage;
