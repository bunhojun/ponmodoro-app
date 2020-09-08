import React, {
  useState,
  ChangeEvent,
  MouseEvent,
  FunctionComponent,
} from "react";
import { TextField, Button, makeStyles, Typography } from "@material-ui/core";
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

  const classes = useStyles();

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { email, password } = info;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setInfo({ email: "", password: "" });
    } catch (err) {
      alert(err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

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
      alert(err);
    }
  };

  return (
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
      />
      <TextField
        variant="outlined"
        className={classes.textInput}
        type="password"
        placeholder="password"
        name="password"
        value={info.password}
        onChange={handleChange}
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
  );
};

export default SignInComponent;
