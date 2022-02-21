import React, { useContext } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import ListComponent from "../../components/list/list";
import { Inner, Container } from "../../components/common-style/common-style";
import CurrentUserContext from "../../contexts/user/UserContext";
import HeaderComponent from "../../components/header/header";

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
      <Inner height="75vh" minHeight="400px">
        <Typography variant="h2" className={classes.heading}>
          {currentUser
            ? `${currentUser.displayName}'s todo`
            : "the user does not exist"}
        </Typography>
        <Container height="80%">
          <ListComponent />
        </Container>
      </Inner>
    </>
  );
};

export default HomePage;
