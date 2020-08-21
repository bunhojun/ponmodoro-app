import React, { useContext, ChangeEvent, useState, FunctionComponent } from 'react'
import { ListItem, ItemContent, DeleteButton } from './styled-item';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { deleteTodo, changeCompletionStatus } from '../../firebase/firebase';
import CurrentUserContext, { TodoType } from '../../contexts/user/UserContext';
import { useEffect } from 'react';
import * as H from 'history'

interface ItemComponentProps extends RouteComponentProps {
    task: [
        string,
        TodoType
    ],
    history: H.History
}

const ItemComponent: FunctionComponent<ItemComponentProps> = (props) => {
    const {task, history} = props;
    const currentUser = useContext(CurrentUserContext);
    const {todo} = task[1];
    const [done, setDone] = useState(task[1].done);
    const todoId = task[0];

    useEffect(() => {
        setDone(task[1].done);
    }, [task]);

    const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        await changeCompletionStatus(todoId, currentUser);
    };

    const linkHandler = () => {
        history.push(`/ponmodoro/${todoId}`);
    };

    const deleteHandler = async () => {
       if (window.confirm('Do you want to delete this task?')) {
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