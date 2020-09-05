import React, { useState, useEffect, FunctionComponent } from "react";
import "./App.css";
import { Route, Redirect, Switch, RouteComponentProps } from "react-router-dom";
import CurrentUserContext, { UserType } from "./contexts/user/UserContext";
import SignInAndUpPage from "./pages/signInAndUp/signInAndUp";
import HomePage from "./pages/home/home";
import HeaderComponent from "./components/header/header";
import { Wrapper, Inner } from "./components/common-style/common-style";
import { auth, createUserProfileDocument } from "./firebase/firebase";
import PonmodoroPage, { MatchProps } from "./pages/ponmodoro/ponmodoro";
import PonmodoroProvider from "./providers/PonmodoroProvider/Ponmodoro/PonmodoroProvider";

const App: FunctionComponent = () => {
  const currentUserStorage =
    JSON.parse(localStorage.getItem("currentUser") || '{"":""}') || {};
  const [currentUser, setCurrentUser] = useState<UserType>(currentUserStorage);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        if (userRef) {
          userRef.onSnapshot((snapShot) => {
            const snapshotData = snapShot.data();
            if (snapshotData && !snapshotData.todos) {
              snapshotData.todos = {};
            }
            const currentUserData = {
              ...snapshotData,
              id: snapShot.id,
            };
            setCurrentUser(currentUserData);
            localStorage.setItem(
              "currentUser",
              JSON.stringify(currentUserData)
            );
          });
        }
      } else {
        setCurrentUser({});
      }
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, [setCurrentUser]);

  return (
    <Wrapper>
      <CurrentUserContext.Provider value={currentUser}>
        <HeaderComponent />
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              currentUser.id ? <HomePage /> : <Redirect to="/signin" />
            }
          />
          <Route
            path="/ponmodoro/:todoId"
            render={(props: RouteComponentProps<MatchProps>) =>
              currentUser.id ? (
                <PonmodoroProvider>
                  <PonmodoroPage todoId={props.match.params.todoId} />
                </PonmodoroProvider>
              ) : (
                <Redirect to="/signin" />
              )
            }
          />
          <Route path="/signin" component={SignInAndUpPage} />
        </Switch>
      </CurrentUserContext.Provider>
      <footer>
        <Inner>&#169; Hojun Bun</Inner>
      </footer>
    </Wrapper>
  );
};

export default App;
