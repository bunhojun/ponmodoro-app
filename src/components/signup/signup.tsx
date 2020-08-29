import React, {
  ChangeEvent,
  MouseEvent,
  useState,
  FunctionComponent,
} from "react";
import { Form } from "../common-style/common-style";
import SignUpButton from "./styled-signup";
import { auth, createUserProfileDocument } from "../../firebase/firebase";

const SignUpComponent: FunctionComponent = () => {
  const [info, setInfo] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { displayName, email, password, confirmPassword } = info;

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
      <p>Signup</p>
      <input
        type="text"
        placeholder="user name"
        name="displayName"
        value={displayName}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="email"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="confirm password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleChange}
      />
      <SignUpButton type="submit" onClick={handleSubmit}>
        Sign Up
      </SignUpButton>
    </Form>
  );
};

export default SignUpComponent;
