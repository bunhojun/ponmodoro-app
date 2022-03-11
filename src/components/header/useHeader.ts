import { useContext, useState } from "react";
import { deleteAccount, signOut } from "../../firebase/firebase";
import { TimerContext } from "../../providers/ponmodoro/PonmodoroProvider";
import { OpenConfirmationModal } from "../modal/useModal";

const useHeader = (openModal: OpenConfirmationModal) => {
  const { isActive } = useContext(TimerContext);
  const [isAbleToShowDrawer, setIsAbleToShowDrawer] = useState(false);

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

  const closeDrawer = () => {
    setIsAbleToShowDrawer(false);
  };

  return {
    isActive,
    isAbleToShowDrawer,
    onClickSignOut,
    onClickDeleteAccount,
    onClickMenuIcon,
    closeDrawer,
  };
};

export default useHeader;
