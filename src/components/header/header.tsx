import React, { useContext, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/user/UserContext";
import { Header, Navigation } from "./styled-header";
import { deleteAccount, signOut } from "../../firebase/firebase";

const HeaderComponent: FunctionComponent = () => {
  const currentUser = useContext(CurrentUserContext);
  const onClickSignOut = () => {
    signOut();
  };

  const onClickDeleteAccount = () => {
    deleteAccount();
  };

  return (
    <Header>
      {currentUser && currentUser.id ? (
        <>
          <h1>
            <Link to="/">Ponmodoro</Link>
          </h1>
          <Navigation>
            <div
              onClick={onClickSignOut}
              role="button"
              onKeyUp={onClickSignOut}
              tabIndex={0}
            >
              Signout
            </div>
            <div
              onClick={onClickDeleteAccount}
              role="button"
              onKeyUp={onClickDeleteAccount}
              tabIndex={0}
            >
              Delete Account
            </div>
          </Navigation>
        </>
      ) : (
        <h1>Ponmodoro</h1>
      )}
    </Header>
  );
};

export default HeaderComponent;
