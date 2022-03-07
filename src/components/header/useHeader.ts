import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteAccount, signOut } from "../../firebase/firebase";
import { TimerContext } from "../../providers/ponmodoro/PonmodoroProvider";
import { OpenConfirmationModal } from "../modal/useModal";

const useHeader = (openModal: OpenConfirmationModal) => {
  const { isActive } = useContext(TimerContext);
  const [isAbleToShowDrawer, setIsAbleToShowDrawer] = useState(false);
  const history = useHistory();

  const onClickSignOut = () => {
    setIsAbleToShowDrawer(false);
    openModal({
      title: "Sign out",
      message: "Do you want to sign out?",
      onApprove: signOut,
    });
  };

  const onClickDeleteAccount = () => {
    setIsAbleToShowDrawer(false);
    openModal({
      title: "Delete Account",
      message: "Do you want to delete this account?",
      onApprove: deleteAccount,
    });
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
