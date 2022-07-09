import React, { useContext, useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import CurrentUserContext from "../../contexts/user/UserContext";
import { Inner, Container } from "../../components/common-style/common-style";
import SignInAndUpContainer from "./styled-signInAndUp";
import SignInComponent from "../../components/signin/signin";
import SignUpComponent from "../../components/signup/signup";
import { useRouter } from "next/router";
import styles from "./signInAndUp.module.css";

const useStyles = makeStyles({
  heading: {
    display: "flex",
    justifyContent: "center",
  },
  containerHeading: {
    fontSize: "2.5rem",
    marginBottom: 25,
  },
});

const SignInAndUpPage = () => {
  const currentUser = useContext(CurrentUserContext);
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (currentUser?.id) {
      router.replace("/");
    }
  }, [currentUser]);

  return (
    <>
      <div className={classes.heading}>
        <Typography variant="h1">PONMODORO</Typography>
      </div>
      <Inner>
        <Container className={styles.container}>
          <Typography variant="h2" className={classes.containerHeading}>
            signin or signup
          </Typography>
          <SignInAndUpContainer>
            <SignInComponent />
            <SignUpComponent />
          </SignInAndUpContainer>
        </Container>
      </Inner>
    </>
  );
};

export default SignInAndUpPage;
