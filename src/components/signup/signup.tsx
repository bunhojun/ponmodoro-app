import React, {
  ChangeEvent,
  MouseEvent,
  useState,
  FunctionComponent,
} from "react";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { Form } from "../common-style/common-style";
import { auth, createUserProfileDocument } from "../../firebase/firebase";

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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    if (!displayName) {
      alert("user name is empty");
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
      alert(err);
    }
  };

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
      />
      <TextField
        variant="outlined"
        type="email"
        placeholder="email"
        name="email"
        value={email}
        onChange={handleChange}
        className={classes.textInput}
      />
      <TextField
        variant="outlined"
        type="password"
        placeholder="password"
        name="password"
        value={password}
        onChange={handleChange}
        className={classes.textInput}
      />
      <TextField
        variant="outlined"
        type="password"
        placeholder="confirm password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleChange}
        className={classes.textInput}
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
