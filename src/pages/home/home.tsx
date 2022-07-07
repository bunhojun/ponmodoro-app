import React, { useContext } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import ListComponent from "../../components/list/list";
import { Inner, Container } from "../../components/common-style/common-style";
import CurrentUserContext from "../../contexts/user/UserContext";
import HeaderComponent from "../../components/header/header";
import styles from "./home.module.css";

const useStyles = makeStyles({
  heading: {
    marginBottom: 10,
  },
});

const HomePage = () => {
  const currentUser = useContext(CurrentUserContext);
  const classes = useStyles();
  return (
    <>
      <HeaderComponent />
      <Inner className={styles.inner}>
        <Typography variant="h2" className={classes.heading}>
          {currentUser
            ? `${currentUser.displayName}'s todo`
            : "the user does not exist"}
        </Typography>
        <Container className={styles.container}>
          <ListComponent />
        </Container>
      </Inner>
    </>
  );
};

export default HomePage;
