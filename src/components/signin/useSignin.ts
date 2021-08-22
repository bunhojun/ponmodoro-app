import { useContext } from "react";
import { auth, signInWithGoogle } from "../../firebase/firebase";
import { ModalContext } from "../../providers/modal/ModalProvider";
import { ProgressContext } from "../../providers/progress/ProgressProvider";

const useSignin = () => {
  const { openBasicModal } = useContext(ModalContext);
  const { showProgressBar, closeProgressBar } = useContext(ProgressContext);
  const errorMessageTitle = "Error occurred while logging in";

  const signIn = async (email: string, password: string) => {
    try {
      showProgressBar();
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      closeProgressBar();
      openBasicModal(errorMessageTitle, err.message);
    }
  };

  const handleGoogleSignIn = () => {
    try {
      showProgressBar();
      signInWithGoogle();
    } catch (err) {
      closeProgressBar();
      openBasicModal(errorMessageTitle, err.message);
    }
  };

  return {
    signIn,
    handleGoogleSignIn,
  };
};

export default useSignin;
