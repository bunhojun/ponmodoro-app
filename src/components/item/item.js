import React, { useContext } from 'react'
import { ListItem, ItemContent, DeleteButton } from '../item/styled-item';
import { withRouter } from 'react-router-dom';
import { deleteTodo, changeCompletionStatus } from '../../firebase/firebase';
import CurrentUserContext from '../../contexts/user/UserContext';
import { useState } from 'react';
import { useEffect } from 'react';

const ItemComponent = ({task, history}) => {
    const currentUser = useContext(CurrentUserContext);
    const {todo} = task[1];
    const [done, setDone] = useState(task[1].done);
    const todoId = task[0];

    useEffect(() => {
        setDone(task[1].done);
    }, [task]);

    const changeHandler = async (e) => {
        e.preventDefault();
        await changeCompletionStatus(todoId, currentUser);
    };

    const linkHandler = () => {
        history.push(`/ponmodoro/${todoId}`);
    };

    const deleteHandler = async () => {
       if(window.confirm('Do you want to delete this task?')) {
           await deleteTodo(todoId, currentUser);
       }
    };

    return (
        <ListItem>
            <ItemContent>
                <input type='checkbox' checked={done} onChange={changeHandler}/>
                <span onClick={linkHandler}>{todo}</span>
            </ItemContent>
            <DeleteButton onClick={deleteHandler}>&#10005;</DeleteButton>
        </ListItem>
    )
}

export default withRouter(ItemComponent);