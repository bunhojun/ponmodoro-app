import { ChangeEvent, MouseEvent, useState, useContext } from "react";
import { auth, createUserProfileDocument } from "../../firebase/firebase";
import validateEmail from "../../utils/validateEmail";
import { ModalContext } from "../../providers/modal/ModalProvider";
import { ProgressContext } from "../../providers/progress/ProgressProvider";

const useSignup = () => {
  const [info, setInfo] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { displayName, email, password, confirmPassword } = info;
  const { openBasicModal } = useContext(ModalContext);
  const { showProgressBar, closeProgressBar } = useContext(ProgressContext);
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
      showProgressBar();
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
      closeProgressBar();
      openBasicModal("error occurred while signing up", err.message);
    }
  };
  return {
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
  };
};

export default useSignup;
