import React, { useContext } from 'react';
import { UnorderedList, ListContainer } from './styled-list';
import ItemComponent from '../item/item';
import CurrentUserContext from '../../contexts/user/UserContext';

const ListComponent = () => {
    const {todos} = useContext(CurrentUserContext);
    const sortedTodosArray = Object.entries(todos).sort((a, b) => b[0] - a[0]);

    return (
        <ListContainer>
            <UnorderedList>
                {
                    sortedTodosArray.map((todo, index) => (
                        <ItemComponent task={todo} key={index} />
                    ))
                }
            </UnorderedList>
        </ListContainer>
    )
}

export default ListComponent;