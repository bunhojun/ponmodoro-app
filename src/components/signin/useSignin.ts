import { useContext } from "react";
import { auth, signInWithGoogle } from "../../firebase/firebase";
import { ProgressContext } from "../../providers/progress/ProgressProvider";
import { OpenModal } from "../modal/useModal";

const useSignin = (openModal: OpenModal) => {
  const { showProgressBar, closeProgressBar } = useContext(ProgressContext);
  const errorMessageTitle = "Error occurred while logging in";

  const signIn = async (email: string, password: string) => {
    try {
      showProgressBar();
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      closeProgressBar();
      // @ts-ignore
      openModal({ title: errorMessageTitle, message: err.message });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      showProgressBar();
      await signInWithGoogle();
    } catch (err) {
      closeProgressBar();
      // @ts-ignore
      openModal({ title: errorMessageTitle, message: err.message });
    }
  };

  return {
    signIn,
    handleGoogleSignIn,
  };
};

export default useSignin;
