import React from "react";
import { TextField, Button, makeStyles, Typography } from "@material-ui/core";
import { Form } from "../common-style/common-style";
import useSignin from "./useSignin";

const useStyles = makeStyles({
  textInput: {
    margin: "5px 0",
    "& input": {
      padding: "10px 8px",
    },
  },
  thirdPartySignInButton: {
    marginTop: 5,
  },
  heading: {
    fontSize: "1.5rem",
  },
});

const SignInComponent = () => {
  const classes = useStyles();
  const {
    info,
    emailErrorState,
    passwordErrorState,
    handleSubmit,
    handleChange,
    handleGoogleSignIn,
  } = useSignin();

  return (
    <>
      <Form>
        <Typography variant="h3" className={classes.heading}>
          Signin
        </Typography>
        <TextField
          variant="outlined"
          className={classes.textInput}
          type="email"
          placeholder="email"
          name="email"
          value={info.email}
          onChange={handleChange}
          error={emailErrorState.error}
          helperText={emailErrorState.message}
        />
        <TextField
          variant="outlined"
          className={classes.textInput}
          type="password"
          placeholder="password"
          name="password"
          value={info.password}
          onChange={handleChange}
          error={passwordErrorState}
          helperText={passwordErrorState && "provide your password"}
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          color="primary"
          variant="contained"
        >
          Sign In
        </Button>
        <Button
          type="submit"
          onClick={handleGoogleSignIn}
          className={classes.thirdPartySignInButton}
          color="secondary"
          variant="contained"
        >
          Sign In With A Google Account
        </Button>
      </Form>
    </>
  );
};

export default SignInComponent;
