import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteAccount, signOut } from "../../firebase/firebase";
import { ModalContext } from "../../providers/modal/ModalProvider";
import { TimerContext } from "../../providers/ponmodoro/PonmodoroProvider";

const useHeader = () => {
  const { openConfirmationModal } = useContext(ModalContext);
  const { isActive } = useContext(TimerContext);
  const [isAbleToShowDrawer, setIsAbleToShowDrawer] = useState(false);
  const history = useHistory();

  const onClickSignOut = () => {
    setIsAbleToShowDrawer(false);
    openConfirmationModal("Sign out", "Do you want to sign out?", signOut);
  };

  const onClickDeleteAccount = () => {
    setIsAbleToShowDrawer(false);
    openConfirmationModal(
      "delete account",
      "Do you want to delete this account?",
      deleteAccount
    );
  };

  const onClickMenuIcon = () => {
    setIsAbleToShowDrawer(true);
  };

  const onClickLink = () => {
    history.push("/");
  };

  const closeDrawer = () => {
    setIsAbleToShowDrawer(false);
  };

  return {
    isActive,
    isAbleToShowDrawer,
    onClickSignOut,
    onClickDeleteAccount,
    onClickMenuIcon,
    onClickLink,
    closeDrawer,
  };
};

export default useHeader;
