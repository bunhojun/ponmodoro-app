import React, {
  useState,
  ChangeEvent,
  MouseEvent,
  FunctionComponent,
  useContext,
} from "react";
import { TextField, Button, makeStyles, Typography } from "@material-ui/core";
import { Form } from "../common-style/common-style";
import { auth, signInWithGoogle } from "../../firebase/firebase";
import { ModalContext } from "../../providers/modal/ModalProvider";
import validateEmail from "../../utils/validateEmail";

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
  const { openBasicModal } = useContext(ModalContext);

  const [emailErrorState, setEmailErrorState] = useState({
    error: false,
    message: "",
  });
  const [passwordErrorState, setPasswordErrorState] = useState(false);

  const classes = useStyles();

  const errorMessageTitle = "Error occurred while logging in";

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { email, password } = info;
    const emailInvalid = email && !validateEmail(email);

    if (!password || !email || emailInvalid) {
      if (!password) {
        setPasswordErrorState(true);
      }
      if (!email) {
        setEmailErrorState({
          error: true,
          message: "Provide your email address",
        });
      }
      if (emailInvalid) {
        setEmailErrorState({
          error: true,
          message: "The email address you provided is invalid",
        });
      }
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setInfo({ email: "", password: "" });
    } catch (err) {
      openBasicModal(errorMessageTitle, err.message);
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

  const handleGoogleSignIn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      signInWithGoogle();
    } catch (err) {
      openBasicModal(errorMessageTitle, err.message);
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
    </>
  );
};

export default SignInComponent;
