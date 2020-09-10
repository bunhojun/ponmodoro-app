import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useContext, FunctionComponent, useState } from "react";
import { useHistory } from "react-router-dom";
import CurrentUserContext from "../../contexts/user/UserContext";
import { deleteAccount, signOut } from "../../firebase/firebase";
import { ModalContext } from "../../providers/modal/ModalProvider";

const useStyles = makeStyles(() => ({
  navBar: {
    backgroundColor: "#fff",
  },
  heading: {
    display: "flex",
    justifyContent: "center",
  },
}));

const HeaderComponent: FunctionComponent = () => {
  const currentUser = useContext(CurrentUserContext);
  const { openConfirmationModal } = useContext(ModalContext);
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
    <>
      {currentUser && currentUser.id ? (
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
        </AppBar>
      ) : (
        <div className={classes.heading}>
          <Typography variant="h1">PONMODORO</Typography>
        </div>
      )}
    </>
  );
};

export default HeaderComponent;
