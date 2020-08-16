import React, { useContext, useEffect, useState } from 'react';
import { Inner, Container, Centering } from '../../components/common-style/common-style';
import CurrentUserContext from '../../contexts/user/UserContext';
import { changeCompletionStatus } from './../../firebase/firebase';
import { TimerContext, CircleTimer } from '../../providers/PonmodoroProvider/Ponmodoro/PonmodoroProvider';

const PonmodoroPage = ({match}) => {
    const initialButtonState = {
        isDisabled: false,
        startButtonColor: 'violet'
    }
    const [buttonState, setButtonState] = useState(initialButtonState);
    const currentUser = useContext(CurrentUserContext);
    const {startPonmodoro} = useContext(TimerContext);
    const {todos} = currentUser;
    const todoId = match.params.todoId;
    const task = todos[todoId];
    const [done, setDone] = useState(task ? task.done: false);
    const {todo} = task || '';

    useEffect(() => {
        if(task) {
            setDone(task.done);
        }
    }, [task]);

    const onMainSessionEnd = () => {
        const notification = new Notification("main session done. take a 5min break");
        startPonmodoro();
        notification.onclose = () => {
            // close handler
        };
    }

    const onBreakEnd = () => {
        const notification = new Notification("break done. let's get back to work");
        startPonmodoro();
        notification.onclose = () => {
            // close handler
        };
    }

    const onLastSessionEnd = () => {
        const notification = new Notification("last session done. well done");
        setButtonState(initialButtonState);
        notification.onclose = () => {
            // close handler
        };
    }

    const handleChange = async (e) => {
        e.preventDefault();
        await changeCompletionStatus(todoId, currentUser);
    }

    const start = () => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(() => {
                setButtonState(prevButtonState => {
                    return {
                        ...prevButtonState,
                        isDisabled: true,
                        startButtonColor: 'gray'
                    }
                });
                startPonmodoro();
            });
        }
    }

    return (
        <Inner height='90vh' minHeight='400px'>
            <Container height='80%'>
                {
                    task ?
                    <React.Fragment>
                        <h2>{todo}</h2>
                        <input type="checkbox" checked={done} onChange={handleChange}/>
                        <div>
                            <textarea type='text' placeholder='memo'/>
                        </div>
                        <Centering>                            
                            <div
                                style={{
                                    width: 200,
                                    height: 200
                                }}
                            >
                                <CircleTimer
                                    strokeWidth={5}
                                    onFinishMainSession={onMainSessionEnd}
                                    onFinishBreak={onBreakEnd}
                                    onFinishLastSession={onLastSessionEnd}
                                />
                            </div>
                        </Centering>
                        <button
                            disabled={buttonState.isDisabled}
                            style={{backgroundColor: buttonState.startButtonColor}}
                            onClick={start}>start ponmodoro</button>
                    </React.Fragment>
                    :
                    <div>todo doesn't exist</div>
                }
            </Container>
        </Inner>
    );
}

export default PonmodoroPage;