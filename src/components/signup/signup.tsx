import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Form } from "../common-style/common-style";
import useSignup from "./useSignup";
import EMAIL_PATTERN from "../../constants/email-pattern";
import StatefulTextInput from "../stateful-text-input/stateful-text-input";
import { BasicModal } from "../modal/modal";
import { useModal } from "../modal/useModal";

const useStyles = makeStyles({
  signUp: {
    backgroundColor: "#000",
  },
  heading: {
    fontSize: "1.5rem",
  },
});

const SignUpComponent = () => {
  const classes = useStyles();
  const { isModalOpen, openModal, closeModal, modalTitle, modalMessage } =
    useModal();
  const { signUp } = useSignup(openModal);
  const { control, handleSubmit, watch } = useForm();

  const onValid = () => {
    const email = watch("signupEmail");
    const password = watch("signupPassword");
    const displayName = watch("displayName");
    signUp(email, password, displayName);
  };

  const onSubmit = () => {
    handleSubmit(onValid)();
  };

  return (
    <Form>
      <Typography variant="h3" className={classes.heading}>
        Signup
      </Typography>
      <StatefulTextInput
        type="text"
        rules={{ required: "User name is required" }}
        name="displayName"
        control={control}
        placeholder="user name"
      />
      <StatefulTextInput
        type="email"
        rules={{
          required: "Email address is required",
          pattern: {
            value: EMAIL_PATTERN,
            message: "Email address is invalid",
          },
        }}
        name="signupEmail"
        control={control}
        placeholder="email"
      />
      <StatefulTextInput
        type="password"
        rules={{ required: "Password is required" }}
        name="signupPassword"
        control={control}
        placeholder="password"
      />
      <StatefulTextInput
        type="password"
        rules={{
          validate: (confirmPassword: string) =>
            confirmPassword === watch("signupPassword") ||
            "The confirmation password you provided does not match with the password",
        }}
        name="confirmPassword"
        control={control}
        placeholder="confirm password"
      />
      <Button
        onClick={onSubmit}
        color="primary"
        variant="contained"
        className={classes.signUp}
      >
        Sign Up
      </Button>
      <BasicModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        message={modalMessage}
      />
    </Form>
  );
};

export default SignUpComponent;
