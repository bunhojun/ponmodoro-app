import React, { useContext, FunctionComponent } from "react";
import { Redirect } from "react-router-dom";
import CurrentUserContext from "../../contexts/user/UserContext";
import { Inner, Container } from "../../components/common-style/common-style";
import SignInAndUpContainer from "./styled-signInAndUp";
import SignInComponent from "../../components/signin/signin";
import SignUpComponent from "../../components/signup/signup";

const SignInAndUpPage: FunctionComponent = () => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <>
      {currentUser && currentUser.id ? (
        <Redirect to="/" />
      ) : (
        <Inner>
          <Container height="400px">
            <h2>signin or signup</h2>
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
