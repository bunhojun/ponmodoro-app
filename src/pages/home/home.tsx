import React, { useContext, FunctionComponent } from "react";
import { Typography } from "@material-ui/core";
import ListComponent from "../../components/list/list";
import { Inner, Container } from "../../components/common-style/common-style";
import CurrentUserContext from "../../contexts/user/UserContext";

const HomePage: FunctionComponent = () => {
  const currentUSer = useContext(CurrentUserContext);
  return (
    <Inner height="80vh" minHeight="400px">
      <Typography variant="h2">
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
