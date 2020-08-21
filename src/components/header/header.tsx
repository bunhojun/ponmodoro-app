import React, { useContext } from 'react';
import CurrentUserContext from '../../contexts/user/UserContext';
import { Header, Navigation } from './styled-header';
import { deleteAccount, signOut } from '../../firebase/firebase';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
    const currentUser = useContext(CurrentUserContext);
    const onClickSignOut = () => {
        signOut();
    }

    const onClickDeleteAccount = () => {
        deleteAccount();
    }

    return (
        <Header>
            {currentUser && currentUser.id ?
                <React.Fragment>
                    <h1>
                      <Link to='/'>Ponmodoro</Link>
                    </h1>
                    <Navigation>
                      <div onClick={onClickSignOut}>Signout</div>
                      <div onClick={onClickDeleteAccount}>Delete Account</div>
                    </Navigation>
                </React.Fragment>
            :
                <h1>Ponmodoro</h1>
            }
        </Header>
    )
}

export default HeaderComponent;