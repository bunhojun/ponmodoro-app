import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { Prompt } from "react-router-dom";
import useHeader from "./useHeader";
import { useModal } from "../modal/useModal";
import { ConfirmationModal } from "../modal/modal";
import Link from "next/link";

const useStyles = makeStyles(() => ({
  navBar: {
    backgroundColor: "#fff",
  },
}));

const HeaderComponent = () => {
  const classes = useStyles();
  const {
    isModalOpen,
    openConfirmationModal,
    closeModal,
    modalTitle,
    modalMessage,
    onApprove,
  } = useModal();
  const {
    isActive,
    isAbleToShowDrawer,
    onClickSignOut,
    onClickDeleteAccount,
    onClickMenuIcon,
    closeDrawer,
  } = useHeader(openConfirmationModal);

  return (
    <AppBar position="static" className={classes.navBar}>
      <Toolbar>
        <IconButton onClick={onClickMenuIcon}>
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <a>Ponmodoro</a>
        </Link>
        <Drawer open={isAbleToShowDrawer} onClose={closeDrawer}>
          <Button onClick={onClickSignOut}>Signout</Button>
          <Button onClick={onClickDeleteAccount}>Delete Account</Button>
        </Drawer>
      </Toolbar>
      <Prompt
        when={isActive}
        message="If you leave this page now, this ponmodoro session will be lost. Are you sure?"
      />
      <ConfirmationModal
        isOpen={isModalOpen}
        title={modalTitle}
        message={modalMessage}
        onClose={closeModal}
        onApprove={onApprove}
      />
    </AppBar>
  );
};

export default HeaderComponent;
