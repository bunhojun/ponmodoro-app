import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useContext, FunctionComponent, useState } from "react";
import { Prompt, useHistory } from "react-router-dom";
import { deleteAccount, signOut } from "../../firebase/firebase";
import { ModalContext } from "../../providers/modal/ModalProvider";
import { TimerContext } from "../../providers/ponmodoro/PonmodoroProvider";

const useStyles = makeStyles(() => ({
  navBar: {
    backgroundColor: "#fff",
  },
}));

const HeaderComponent: FunctionComponent = () => {
  const { openConfirmationModal } = useContext(ModalContext);
  const { isActive } = useContext(TimerContext);
  const [isAbleToShowDrawer, setIsAbleToShowDrawer] = useState(false);
  const history = useHistory();
  const classes = useStyles();

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

  return (
    <AppBar position="static" className={classes.navBar}>
      <Toolbar>
        <IconButton onClick={onClickMenuIcon}>
          <MenuIcon />
        </IconButton>
        <Button onClick={onClickLink}>Ponmodoro</Button>
        <Drawer open={isAbleToShowDrawer} onClose={closeDrawer}>
          <Button onClick={onClickSignOut}>Signout</Button>
          <Button onClick={onClickDeleteAccount}>Delete Account</Button>
        </Drawer>
      </Toolbar>
      <Prompt
        when={isActive}
        message="If you leave this page now, this ponmodoro session will be lost. Are you sure?"
      />
    </AppBar>
  );
};

export default HeaderComponent;
