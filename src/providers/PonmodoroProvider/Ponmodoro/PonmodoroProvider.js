import React, { useContext, createContext, useCallback, useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export const TimerContext = createContext({
    progress: null,
    duration: 0,
    startPonmodoro: () => {},
    startBreak: () => {},
    stopTimer: () => {},
    setOnFinishMainSession: () => {}
});

const PonmodoroProvider = ({children}) => {
    const intervalCallback = useRef();
    const mainSession = 1000 * 60 * 25;
    const breakSession = 1000 * 60 * 5;
    const maxSessionNumber = 2;
    const interval = 10;

    const [progress, setProgress] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const [sessionNumber, setSessionNumber] = useState(0);
    const [isMainSession, setIsMainSession] = useState(true);
    const [onFinishMainSession, setOnFinishMainSession] = useState(() => {});
    const [onFinishBreak, setOnFinishBreak] = useState(() => {});
    const [onFinishLastSession, setOnFinishLastSession] = useState(() => {});
    const [startTime, setStartTime] = useState(null);
    const [duration, setDuration] = useState(mainSession);

    const stopTimer = useCallback(() => {
        clearInterval(intervalId);
        setIntervalId(null);
    }, [intervalId]);

    const addProgress = useCallback(() => {
        const elapsedTime = new Date() - startTime;
        setProgress(elapsedTime / duration);
    }, [duration, startTime]);

    const startPonmodoro = () => {
        setProgress(0);
    }

    const startSession = useCallback(() => {
        setStartTime(new Date());
        if (!intervalId) {
            const id = setInterval(() => {
                intervalCallback.current();
            }, interval);
            setIntervalId(id);
        }
    }, [intervalId]);

    const lastSessionHandler = useCallback(() => {
        setSessionNumber(0);
        onFinishLastSession();
    }, [onFinishLastSession]);

    const onFinishSession = useCallback(() => {
        stopTimer();
        setProgress(null);
        if (isMainSession) {
            if (sessionNumber === maxSessionNumber) {
                lastSessionHandler();
            }else {
                setIsMainSession(false);
                setDuration(breakSession);
                onFinishMainSession();
                setSessionNumber(num => num + 1);
            }
        }else {
            onFinishBreak();
            setIsMainSession(true);
            setDuration(mainSession);
        }
    }, [stopTimer, isMainSession, sessionNumber, lastSessionHandler, onFinishMainSession, onFinishBreak, breakSession, mainSession]);

    useEffect(() => {
        const isStartingNewSession = progress === 0;
        const isSessionDone = progress >= 1;
        if (isStartingNewSession) {
            startSession();
        }else if (isSessionDone) {
            onFinishSession();
        }
    }, [progress, startSession, onFinishSession]);

    useEffect(() => {
        return () => {
            clearInterval(intervalId)
        };
    }, [intervalId]);

    useEffect(() => {
      intervalCallback.current = addProgress;
    }, [addProgress]);

    return (
        <TimerContext.Provider value={{
            startPonmodoro,
            setOnFinishMainSession,
            setOnFinishBreak,
            setOnFinishLastSession,
            progress,
            duration
        }}>
            {children}
        </TimerContext.Provider>
    )
}

const TimerRenderer = (props) => {
    const { strokeWidth } = props;
    const { progress, duration } = useContext(TimerContext);
    const remainingTime = (progress ? ((1 - progress) * duration): duration) / 1000;
    const minute = (Math.floor(remainingTime / 60) < 10) ? '0' + Math.floor(remainingTime / 60) : Math.floor(remainingTime / 60);
    const second = (Math.floor(remainingTime % 60) < 10) ? '0' + Math.floor(remainingTime % 60) : Math.floor(remainingTime % 60);
    const ponmodoroProgress = progress || 0;

    return (
        <CircularProgressbar
            value={ponmodoroProgress}
            maxValue={1}
            text={minute + ':' + second}
            strokeWidth={strokeWidth}
            styles={buildStyles({
                textColor: "red",
                pathColor: "red",
                trailColor: "black",
                strokeLinecap: "butt"
            })}
        />
    )
}

export const CircleTimer = (props) => {
    const { strokeWidth, onFinishMainSession, onFinishBreak, onFinishLastSession } = props;
    const { setOnFinishMainSession, setOnFinishBreak, setOnFinishLastSession } = useContext(TimerContext);
    const [initialized, setInitialized] = useState(false);

    const init = useCallback(() => {
        setOnFinishMainSession(() => onFinishMainSession);
        setOnFinishBreak(() => onFinishBreak);
        setOnFinishLastSession(() => onFinishLastSession);
        setInitialized(true);
    }, [setOnFinishMainSession, 
        setOnFinishBreak, 
        setOnFinishLastSession, 
        onFinishMainSession, 
        onFinishBreak, 
        onFinishLastSession]);

    useEffect(() => {
        if (!initialized) {
            init();
            setInitialized(true);
        }
    }, [initialized, setInitialized, init]);

    return (
        <TimerRenderer
            strokeWidth={strokeWidth}
        />
    )
}

export default PonmodoroProvider;