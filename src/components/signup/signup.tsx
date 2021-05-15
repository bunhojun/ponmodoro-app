import React from "react";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { Form } from "../common-style/common-style";
import useSignup from "./useSignup";

const useStyles = makeStyles({
  textInput: {
    margin: "5px 0",
    "& input": {
      padding: "10px 8px",
    },
  },
  signUp: {
    backgroundColor: "#000",
  },
  heading: {
    fontSize: "1.5rem",
  },
});

const SignUpComponent = () => {
  const classes = useStyles();
  const {
    email,
    displayName,
    password,
    confirmPassword,
    displayNameErrorState,
    emailErrorState,
    passwordErrorState,
    confirmPasswordErrorState,
    handleChange,
    handleSubmit,
  } = useSignup();

  return (
    <Form>
      <Typography variant="h3" className={classes.heading}>
        Signup
      </Typography>
      <TextField
        variant="outlined"
        type="text"
        placeholder="user name"
        name="displayName"
        value={displayName}
        onChange={handleChange}
        className={classes.textInput}
        error={displayNameErrorState}
        helperText={displayNameErrorState && "User name is required"}
      />
      <TextField
        variant="outlined"
        type="email"
        placeholder="email"
        name="email"
        value={email}
        onChange={handleChange}
        className={classes.textInput}
        error={emailErrorState.error}
        helperText={emailErrorState.message}
      />
      <TextField
        variant="outlined"
        type="password"
        placeholder="password"
        name="password"
        value={password}
        onChange={handleChange}
        className={classes.textInput}
        error={passwordErrorState}
        helperText={passwordErrorState && "Password is required"}
      />
      <TextField
        variant="outlined"
        type="password"
        placeholder="confirm password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleChange}
        className={classes.textInput}
        error={confirmPasswordErrorState.error}
        helperText={confirmPasswordErrorState.message}
      />
      <Button
        type="submit"
        onClick={handleSubmit}
        color="primary"
        variant="contained"
        className={classes.signUp}
      >
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUpComponent;
