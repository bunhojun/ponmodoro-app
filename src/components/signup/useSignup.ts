import { auth, createUserProfileDocument } from "../../firebase/firebase";
import { OpenModal } from "../modal/useModal";
import {
  CloseProgressBar,
  ShowProgressBar,
} from "../progress-bar/use-progress-bar";

const useSignup = (
  openModal: OpenModal,
  showProgressBar: ShowProgressBar,
  closeProgressBar: CloseProgressBar
) => {
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
