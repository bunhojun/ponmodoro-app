import { useState, ChangeEvent, MouseEvent, useContext } from "react";
import { auth, signInWithGoogle } from "../../firebase/firebase";
import { ModalContext } from "../../providers/modal/ModalProvider";
import validateEmail from "../../utils/validateEmail";
import { ProgressContext } from "../../providers/progress/ProgressProvider";

const useSignin = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const { openBasicModal } = useContext(ModalContext);
  const { showProgressBar, closeProgressBar } = useContext(ProgressContext);
  const [emailErrorState, setEmailErrorState] = useState({
    error: false,
    message: "",
  });
  const [passwordErrorState, setPasswordErrorState] = useState(false);
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
      showProgressBar();
      await auth.signInWithEmailAndPassword(email, password);
      setInfo({ email: "", password: "" });
    } catch (err) {
      closeProgressBar();
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
      showProgressBar();
      signInWithGoogle();
    } catch (err) {
      closeProgressBar();
      openBasicModal(errorMessageTitle, err.message);
    }
  };

  return {
    info,
    emailErrorState,
    passwordErrorState,
    handleSubmit,
    handleChange,
    handleGoogleSignIn,
  };
};

export default useSignin;
