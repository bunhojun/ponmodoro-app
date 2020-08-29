import React, { useContext, FunctionComponent } from "react";
import ListComponent from "../../components/list/list";
import { Inner, Container } from "../../components/common-style/common-style";
import CurrentUserContext from "../../contexts/user/UserContext";
import PonmodoroFormComponent from "../../components/ponmodoro-form/ponmodoro-form";

const HomePage: FunctionComponent = () => {
  const currentUSer = useContext(CurrentUserContext);
  return (
    <Inner height="80vh" minHeight="400px">
      <h2>
        {currentUSer
          ? `${currentUSer.displayName}'s todos`
          : "the user does not exist"}
      </h2>
      <Container height="80%">
        <PonmodoroFormComponent />
        <ListComponent />
      </Container>
    </Inner>
  );
};

export default HomePage;
