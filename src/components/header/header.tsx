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

const useStyles = makeStyles(() => ({
  navBar: {
    backgroundColor: "#fff",
  },
}));

const HeaderComponent = () => {
  const classes = useStyles();
  const {
    isActive,
    isAbleToShowDrawer,
    onClickSignOut,
    onClickDeleteAccount,
    onClickMenuIcon,
    onClickLink,
    closeDrawer,
  } = useHeader();

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
