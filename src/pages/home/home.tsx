import React, { useContext, FunctionComponent } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import ListComponent from "../../components/list/list";
import { Inner, Container } from "../../components/common-style/common-style";
import CurrentUserContext from "../../contexts/user/UserContext";

const useStyles = makeStyles({
  heading: {
    marginBottom: 10,
  },
});

const HomePage: FunctionComponent = () => {
  const currentUSer = useContext(CurrentUserContext);
  const classes = useStyles();
  return (
    <Inner height="75vh" minHeight="400px">
      <Typography variant="h2" className={classes.heading}>
        {currentUSer
          ? `${currentUSer.displayName}'s todo`
          : "the user does not exist"}
      </Typography>
      <Container height="80%">
        <ListComponent />
      </Container>
    </Inner>
  );
};

export default HomePage;
