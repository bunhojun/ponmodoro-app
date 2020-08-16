import React, { useState, useContext } from 'react';
import { addTodo } from '../../firebase/firebase';
import CurrentUserContext from '../../contexts/user/UserContext';

const PonmodoroFormComponent = () => {

    const [todo, setTodo] = useState('');
    const currentUser = useContext(CurrentUserContext);

    const handleChange = (e) => {
        setTodo(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!todo) {
            alert('fill out the form');
            return;
        }
        await addTodo(todo, currentUser);
        setTodo('');
    }

    return (
        <form>
            <input value={todo} onChange={handleChange}></input>
            <button type='submit' onClick={handleSubmit}>add todo</button>
        </form>
    )
}

export default PonmodoroFormComponent;