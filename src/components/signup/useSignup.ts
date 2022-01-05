import { useContext } from "react";
import { auth, createUserProfileDocument } from "../../firebase/firebase";
import { ModalContext } from "../../providers/modal/ModalProvider";
import { ProgressContext } from "../../providers/progress/ProgressProvider";

const useSignup = () => {
  const { openBasicModal } = useContext(ModalContext);
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
      // @ts-ignore
      openBasicModal("error occurred while signing up", err.message);
    }
  };

  return {
    signUp,
  };
};

export default useSignup;
