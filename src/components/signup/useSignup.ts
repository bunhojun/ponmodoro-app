import { useContext } from "react";
import { auth, createUserProfileDocument } from "../../firebase/firebase";
import { ProgressContext } from "../../providers/progress/ProgressProvider";
import { OpenModal } from "../modal/useModal";

const useSignup = (openModal: OpenModal) => {
  const { showProgressBar, closeProgressBar } = useContext(ProgressContext);

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      showProgressBar();
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });
    } catch (err) {
      closeProgressBar();
      openModal({
        title: "error occurred while signing up",
        // @ts-ignore
        message: err.message,
      });
    }
  };

  return {
    signUp,
  };
};

export default useSignup;
