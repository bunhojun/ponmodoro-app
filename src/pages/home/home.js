import React, { useContext } from 'react';
import ListComponent from '../../components/list/list';
import { Inner, Container } from '../../components/common-style/common-style';
import CurrentUserContext from '../../contexts/user/UserContext';
import PonmodoroFormComponent from '../../components/ponmodoro-form/ponmodoro-form';

const HomePage = () => {
    const currentUSer = useContext(CurrentUserContext);
    return (
        <Inner height='80vh' minHeight='400px'>
            <h2>{currentUSer.displayName}'s todos</h2>
            <Container height='80%'>
                <PonmodoroFormComponent />
                <ListComponent />
            </Container>
        </Inner>
    )
};

export default HomePage;