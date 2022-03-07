import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { Form } from "../common-style/common-style";
import useSignin from "./useSignin";
import StatefulTextInput from "../stateful-text-input/stateful-text-input";
import { useForm } from "react-hook-form";
import { BasicModal } from "../modal/modal";
import { useModal } from "../modal/useModal";
import { useProgressBar } from "../progress-bar/use-progress-bar";
import { ProgressBar } from "../progress-bar/progress-bar";

const useStyles = makeStyles({
  thirdPartySignInButton: {
    marginTop: 5,
  },
  heading: {
    fontSize: "1.5rem",
  },
});

const SignInComponent = () => {
  const classes = useStyles();
  const { isModalOpen, openModal, closeModal, modalTitle, modalMessage } =
    useModal();
  const { isLoading, showProgressBar, closeProgressBar } = useProgressBar();
  const { signIn, handleGoogleSignIn } = useSignin(
    openModal,
    showProgressBar,
    closeProgressBar
  );
  const { control, watch, handleSubmit } = useForm();

  const onValid = () => {
    const email = watch("signinEmail");
    const password = watch("signinPassword");
    signIn(email, password);
  };

  const onSubmit = () => {
    handleSubmit(onValid)();
  };

  return (
    <>
      <Form>
        <Typography variant="h3" className={classes.heading}>
          Signin
        </Typography>
        <StatefulTextInput
          type="email"
          rules={{ required: "Email is required" }}
          name="signinEmail"
          control={control}
          placeholder="email"
        />
        <StatefulTextInput
          type="password"
          rules={{ required: "Password is required" }}
          name="signinPassword"
          control={control}
          placeholder="password"
        />
        <Button onClick={onSubmit} color="primary" variant="contained">
          Sign In
        </Button>
        <Button
          onClick={handleGoogleSignIn}
          className={classes.thirdPartySignInButton}
          color="secondary"
          variant="contained"
        >
          Sign In With A Google Account
        </Button>
      </Form>
      <BasicModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        message={modalMessage}
      />
      <ProgressBar isLoading={isLoading} />
    </>
  );
};

export default SignInComponent;
