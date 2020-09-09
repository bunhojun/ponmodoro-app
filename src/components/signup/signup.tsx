import React, {
  ChangeEvent,
  MouseEvent,
  useState,
  FunctionComponent,
} from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Form } from "../common-style/common-style";
import { auth, createUserProfileDocument } from "../../firebase/firebase";
import validateEmail from "../../utils/validateEmail";

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
    fontSize: 20,
  },
});

const SignUpComponent: FunctionComponent = () => {
  const [info, setInfo] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { displayName, email, password, confirmPassword } = info;
  const classes = useStyles();
  const [modalState, setModalState] = useState({
    open: false,
    message: "",
  });
  const [displayNameErrorState, setDisplayNameErrorState] = useState(false);
  const [emailErrorState, setEmailErrorState] = useState({
    error: false,
    message: "",
  });
  const [passwordErrorState, setPasswordErrorState] = useState(false);
  const [confirmPasswordErrorState, setConfirmPasswordErrorState] = useState({
    error: false,
    message: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "displayName":
        setDisplayNameErrorState(false);
        break;
      case "email":
        setEmailErrorState({
          error: false,
          message: "",
        });
        break;
      case "password":
        setPasswordErrorState(false);
        break;
      default:
        setConfirmPasswordErrorState({
          error: false,
          message: "",
        });
        break;
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

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const displayNameNotExist = !displayName;
    const emailNotExist = !email;
    const emailInvalid = !validateEmail(email);
    const passNotExist = !password;
    const confirmPassNotExist = !confirmPassword;
    const passNotMatch = password !== confirmPassword;

    if (
      displayNameNotExist ||
      emailNotExist ||
      emailInvalid ||
      passNotExist ||
      confirmPassNotExist ||
      passNotMatch
    ) {
      if (displayNameNotExist) {
        setDisplayNameErrorState(true);
      }
      if (emailNotExist) {
        setEmailErrorState({
          error: true,
          message: "Email address is required",
        });
      }
      if (emailInvalid) {
        setEmailErrorState({
          error: true,
          message: "The email address you provided is invalid",
        });
      }
      if (passNotExist) {
        setPasswordErrorState(true);
      }
      if (confirmPassNotExist) {
        setConfirmPasswordErrorState({
          error: true,
          message: "Confirmation password is required",
        });
      }
      if (passNotMatch) {
        setConfirmPasswordErrorState({
          error: true,
          message:
            "The confirmation password you provided does not match with the password",
        });
      }
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      setInfo({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
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
      <Dialog open={modalState.open} onClose={handleClose}>
        <DialogTitle>Error occurred while logging in</DialogTitle>
        <DialogContent>
          <DialogContentText>{modalState.message}</DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignUpComponent;
