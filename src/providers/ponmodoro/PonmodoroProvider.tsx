import React, {
  useContext,
  createContext,
  useCallback,
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import convertMinuteToMillisecond from "../../utils/convertMinuteToMillisecond";

type TimerContextType = {
  progress: number | null;
  duration: number;
  isMainSession: boolean;
  mainSessionDuration: number;
  maxSessionNumber: number;
  sessionNumber: number;
  isActive: boolean;
  startPonmodoro: () => void;
  setOnFinishBreak: Dispatch<SetStateAction<() => void>>;
  setOnFinishLastSession: Dispatch<SetStateAction<() => void>>;
  setOnFinishMainSession: Dispatch<SetStateAction<() => void>>;
  setMainSessionDuration: Dispatch<SetStateAction<number>>;
  setMaxSessionNumber: Dispatch<SetStateAction<number>>;
};

export const TimerContext = createContext<TimerContextType>({
  progress: null,
  duration: 0,
  isMainSession: true,
  mainSessionDuration: convertMinuteToMillisecond(25),
  maxSessionNumber: 3,
  sessionNumber: 1,
  isActive: false,
  startPonmodoro: () => {
    // initial state
  },
  setOnFinishBreak: () => {
    // initial state
  },
  setOnFinishLastSession: () => {
    // initial state
  },
  setOnFinishMainSession: () => {
    // initial state
  },
  setMainSessionDuration: () => {
    // initial state
  },
  setMaxSessionNumber: () => {
    // initial state
  },
});

type PonmodoroProviderProps = {
  children: ReactNode;
};

const maximum = 100000;

const PonmodoroProvider = ({
  children,
}: PonmodoroProviderProps): JSX.Element => {
  const intervalCallback: React.MutableRefObject<
    (() => void) | undefined
  > = useRef();
  const breakSessionDuration = 5;
  const interval = 10;

  const [isActive, setIsActive] = useState<boolean>(false);
  const [maxSessionNumber, setMaxSessionNumber] = useState<number>(3);
  const [mainSessionDuration, setMainSessionDuration] = useState<number>(25);
  const [progress, setProgress] = useState<number | null>(null);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [sessionNumber, setSessionNumber] = useState<number>(1);
  const [isMainSession, setIsMainSession] = useState<boolean>(true);
  const [onFinishMainSession, setOnFinishMainSession] = useState<() => void>(
    () => (): void => {
      // initial state
    }
  );
  const [onFinishBreak, setOnFinishBreak] = useState<() => void>(
    () => (): void => {
      // initial state
    }
  );
  const [onFinishLastSession, setOnFinishLastSession] = useState<() => void>(
    () => (): void => {
      // initial state
    }
  );
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState<number>(
    convertMinuteToMillisecond(mainSessionDuration)
  );

  const startPonmodoro = (): void => {
    setProgress(0);
    setIsActive(true);
  };

  const setOptimizedDuration = (rawDuration: number) => {
    setDuration(convertMinuteToMillisecond(rawDuration));
  };

  const stopTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIntervalId(null);
  }, [intervalId]);

  const addProgress = useCallback(() => {
    const startTimeStamp = startTime
      ? startTime.getTime()
      : new Date().getTime();
    const elapsedTime = new Date().getTime() - startTimeStamp;
    const calculatedRawProgress = Math.round(
      (elapsedTime / duration) * maximum
    );
    const calculatedProgress =
      calculatedRawProgress >= maximum ? maximum : calculatedRawProgress;
    setProgress(calculatedProgress);
    if (calculatedProgress === maximum) {
      stopTimer();
    }
  }, [duration, startTime, stopTimer]);

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
    setSessionNumber(1);
    setIsActive(false);
    onFinishLastSession();
  }, [onFinishLastSession]);

  const onFinishSession = useCallback(() => {
    setProgress(null);
    if (isMainSession) {
      if (sessionNumber === maxSessionNumber) {
        lastSessionHandler();
      } else {
        setIsMainSession(false);
        setOptimizedDuration(breakSessionDuration);
        onFinishMainSession();
        setSessionNumber((num) => num + 1);
      }
    } else {
      onFinishBreak();
      setIsMainSession(true);
      setOptimizedDuration(mainSessionDuration);
    }
  }, [
    isMainSession,
    sessionNumber,
    lastSessionHandler,
    onFinishMainSession,
    onFinishBreak,
    breakSessionDuration,
    mainSessionDuration,
    maxSessionNumber,
  ]);

  useEffect(() => {
    const isStartingNewSession = progress === 0;
    const isSessionDone = progress ? progress === maximum : false;
    if (isStartingNewSession) {
      startSession();
    } else if (isSessionDone) {
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

  useEffect(() => {
    setDuration(convertMinuteToMillisecond(mainSessionDuration));
  }, [mainSessionDuration]);

  return (
    <TimerContext.Provider
      value={{
        startPonmodoro,
        setOnFinishMainSession,
        setOnFinishBreak,
        setOnFinishLastSession,
        setMainSessionDuration,
        setMaxSessionNumber,
        progress,
        duration,
        isMainSession,
        mainSessionDuration,
        maxSessionNumber,
        sessionNumber,
        isActive,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

const TimerRenderer = (): JSX.Element => {
  const { progress, duration, isMainSession, sessionNumber } = useContext(
    TimerContext
  );
  const remainingTime =
    (progress ? ((maximum - progress) / maximum) * duration : duration) / 1000;
  const minute =
    Math.floor(remainingTime / 60) < 10
      ? `0${Math.floor(remainingTime / 60)}`
      : Math.floor(remainingTime / 60);
  const second =
    Math.floor(remainingTime % 60) < 10
      ? `0${Math.floor(remainingTime % 60)}`
      : Math.floor(remainingTime % 60);
  const ponmodoroProgress = progress || 0;

  const stylesForBreak = {
    pathColor: "green",
  };

  return (
    <CircularProgressbarWithChildren
      value={ponmodoroProgress}
      maxValue={maximum}
      strokeWidth={5}
      styles={buildStyles(!isMainSession ? stylesForBreak : {})}
    >
      <div>
        {isMainSession ? (
          `work session No.${sessionNumber}`
        ) : (
          <>
            <div>break time</div>
            <div>
              next work session number: No.
              {sessionNumber}
            </div>
          </>
        )}
      </div>
      <div style={{ fontSize: 40 }}>{`${minute}:${second}`}</div>
    </CircularProgressbarWithChildren>
  );
};

type CircularProps = {
  onFinishMainSession: () => void;
  onFinishBreak: () => void;
  onFinishLastSession: () => void;
};

export const CircleTimer = (props: CircularProps): JSX.Element => {
  const { onFinishMainSession, onFinishBreak, onFinishLastSession } = props;
  const {
    setOnFinishMainSession,
    setOnFinishBreak,
    setOnFinishLastSession,
  } = useContext(TimerContext);
  const [initialized, setInitialized] = useState<boolean>(false);

  const init = useCallback(() => {
    setOnFinishMainSession(() => onFinishMainSession);
    setOnFinishBreak(() => onFinishBreak);
    setOnFinishLastSession(() => onFinishLastSession);
    setInitialized(true);
  }, [
    setOnFinishMainSession,
    setOnFinishBreak,
    setOnFinishLastSession,
    onFinishMainSession,
    onFinishBreak,
    onFinishLastSession,
  ]);

  useEffect(() => {
    if (!initialized) {
      init();
      setInitialized(true);
    }
  }, [initialized, setInitialized, init]);

  return <TimerRenderer />;
};

export default PonmodoroProvider;
