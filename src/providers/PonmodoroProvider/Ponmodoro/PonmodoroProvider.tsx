import React, { useContext, createContext, useCallback, useState, useEffect, useRef, Dispatch, SetStateAction, ReactNode } from 'react';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

type TimerContextType = {
    progress: number | null,
    duration: number,
    startPonmodoro: Function,
    setOnFinishBreak: Dispatch<SetStateAction<() => void>>,
    setOnFinishLastSession: Dispatch<SetStateAction<() => void>>,
    setOnFinishMainSession: Dispatch<SetStateAction<() => void>>
}

export const TimerContext = createContext<TimerContextType>({
    progress: null,
    duration: 0,
    startPonmodoro: () => {},
    setOnFinishBreak: () => {},
    setOnFinishLastSession: () => {},
    setOnFinishMainSession: () => {}
});

type PonmodoroProviderProps = {
    children: ReactNode;
}

const PonmodoroProvider = ({children}: PonmodoroProviderProps) => {
    const intervalCallback: React.MutableRefObject<Function | undefined> = useRef();
    const mainSessionDuration = 1000 * 60 * 25;
    const breakSessionDuration = 1000 * 60 * 5;
    const maxSessionNumber = 2;
    const interval = 10;

    const [progress, setProgress] = useState<number | null>(null);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const [sessionNumber, setSessionNumber] = useState<number>(0);
    const [isMainSession, setIsMainSession] = useState<boolean>(true);
    const [onFinishMainSession, setOnFinishMainSession] = useState<() => void>(() => (): void => {});
    const [onFinishBreak, setOnFinishBreak] = useState<() => void>(() => (): void => {});
    const [onFinishLastSession, setOnFinishLastSession] = useState<() => void>(() => (): void => {});
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [duration, setDuration] = useState<number>(mainSessionDuration);

    const startPonmodoro = (): void => {
        setProgress(0);
    }

    const stopTimer = useCallback(() => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        setIntervalId(null);
    }, [intervalId]);

    const addProgress = useCallback(() => {
        const startTimeStamp = startTime ? startTime.getTime(): new Date().getTime(); 
        const elapsedTime = new Date().getTime() - startTimeStamp;
        setProgress(elapsedTime / duration);
    }, [duration, startTime]);

    const startSession = useCallback(() => {
        setStartTime(new Date());
        if (!intervalId) {
            const id = setInterval(() => {
                if (intervalCallback.current) {
                    intervalCallback.current();
                }
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
                setDuration(breakSessionDuration);
                onFinishMainSession();
                setSessionNumber(num => num + 1);
            }
        }else {
            onFinishBreak();
            setIsMainSession(true);
            setDuration(mainSessionDuration);
        }
    }, [stopTimer, isMainSession, sessionNumber, lastSessionHandler, onFinishMainSession, onFinishBreak, breakSessionDuration, mainSessionDuration]);

    useEffect(() => {
        const isStartingNewSession = progress === 0;
        const isSessionDone = progress? progress >= 1: false;
        if (isStartingNewSession) {
            startSession();
        }else if (isSessionDone) {
            onFinishSession();
        }
    }, [progress, startSession, onFinishSession]);

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
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

type TimerRenderProps = {
    strokeWidth: number
}

const TimerRenderer = (props: TimerRenderProps) => {
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

type CircularProps = {
    strokeWidth?: number,
    onFinishMainSession: Function,
    onFinishBreak: Function,
    onFinishLastSession: Function
}

export const CircleTimer = (props: CircularProps) => {
    const { strokeWidth = 5, onFinishMainSession, onFinishBreak, onFinishLastSession } = props;
    const { setOnFinishMainSession, setOnFinishBreak, setOnFinishLastSession } = useContext(TimerContext);
    const [initialized, setInitialized] = useState<boolean>(false);

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