import React, {
  useState,
  ChangeEvent,
  MouseEvent,
  FunctionComponent,
} from "react";
import {
  TextField,
  Button,
  makeStyles,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { Form } from "../common-style/common-style";
import { auth, signInWithGoogle } from "../../firebase/firebase";

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
    fontSize: 20,
  },
});

const SignInComponent: FunctionComponent = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const [modalState, setModalState] = useState({
    open: false,
    message: "",
  });

  const [emailErrorState, setEmailErrorState] = useState({
    error: false,
    message: "",
  });
  const [passwordErrorState, setPasswordErrorState] = useState(false);

  const classes = useStyles();

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { email, password } = info;

    if (!password || !email) {
      if (!password) {
        setPasswordErrorState(true);
      }
      if (!email) {
        setEmailErrorState({
          error: true,
          message: "Provide your email address",
        });
      }
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setInfo({ email: "", password: "" });
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setEmailErrorState({
          error: true,
          message: "The email address you provided is invalid",
        });
        return;
      }
      setModalState({
        open: true,
        message: err.message,
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value && name === "email") {
      setEmailErrorState({
        error: false,
        message: "",
      });
    } else {
      setPasswordErrorState(false);
    }

    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleClose = () => {
    setModalState({
      open: false,
      message: "",
    });
  };

  const handleGoogleSignIn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      signInWithGoogle();
    } catch (err) {
      setModalState({
        open: true,
        message: err.message,
      });
    }
  };

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
      <Dialog open={modalState.open} onClose={handleClose}>
        <DialogTitle>Error occurred while logging in</DialogTitle>
        <DialogContent>
          <DialogContentText>{modalState.message}</DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignInComponent;
