import { auth, signInWithGoogle } from "../../firebase/firebase";
import { OpenModal } from "../modal/useModal";
import {
  CloseProgressBar,
  ShowProgressBar,
} from "../progress-bar/use-progress-bar";

const useSignin = (
  openModal: OpenModal,
  showProgressBar: ShowProgressBar,
  closeProgressBar: CloseProgressBar
) => {
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
