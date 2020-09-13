import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
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
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import convertMinuteToMillisecond from "../../utils/convertMinuteToMillisecond";

type TimerContextType = {
  progress: number | null;
  duration: number;
  mainSessionDuration: number;
  startPonmodoro: () => void;
  setOnFinishBreak: Dispatch<SetStateAction<() => void>>;
  setOnFinishLastSession: Dispatch<SetStateAction<() => void>>;
  setOnFinishMainSession: Dispatch<SetStateAction<() => void>>;
  setMainSessionDuration: Dispatch<SetStateAction<number>>;
};

export const TimerContext = createContext<TimerContextType>({
  progress: null,
  duration: 0,
  mainSessionDuration: convertMinuteToMillisecond(25),
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
});

type PonmodoroProviderProps = {
  children: ReactNode;
};

const PonmodoroProvider = ({
  children,
}: PonmodoroProviderProps): JSX.Element => {
  const intervalCallback: React.MutableRefObject<
    (() => void) | undefined
  > = useRef();
  const breakSessionDuration = convertMinuteToMillisecond(5);
  const maxSessionNumber = 2;
  const interval = 10;

  const [mainSessionDuration, setMainSessionDuration] = useState<number>(
    convertMinuteToMillisecond(25)
  );
  const [progress, setProgress] = useState<number | null>(null);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [sessionNumber, setSessionNumber] = useState<number>(0);
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
  const [duration, setDuration] = useState<number>(mainSessionDuration);

  const startPonmodoro = (): void => {
    setProgress(0);
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
      } else {
        setIsMainSession(false);
        setDuration(breakSessionDuration);
        onFinishMainSession();
        setSessionNumber((num) => num + 1);
      }
    } else {
      onFinishBreak();
      setIsMainSession(true);
      setDuration(mainSessionDuration);
    }
  }, [
    stopTimer,
    isMainSession,
    sessionNumber,
    lastSessionHandler,
    onFinishMainSession,
    onFinishBreak,
    breakSessionDuration,
    mainSessionDuration,
  ]);

  useEffect(() => {
    const isStartingNewSession = progress === 0;
    const isSessionDone = progress ? progress >= 1 : false;
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
    setDuration(mainSessionDuration);
  }, [mainSessionDuration]);

  return (
    <TimerContext.Provider
      value={{
        startPonmodoro,
        setOnFinishMainSession,
        setOnFinishBreak,
        setOnFinishLastSession,
        setMainSessionDuration,
        progress,
        duration,
        mainSessionDuration,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

const TimerRenderer = (): JSX.Element => {
  const useStlyes = makeStyles({
    circularProgressbarContainer: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    circularProgressBarBass: {
      color: "#e2e2e2",
    },
    circularProgressBar: {
      position: "absolute",
    },
    time: {
      position: "absolute",
    },
  });
  const classes = useStlyes();
  const { progress, duration } = useContext(TimerContext);
  const remainingTime =
    (progress ? (1 - progress) * duration : duration) / 1000;
  const minute =
    Math.floor(remainingTime / 60) < 10
      ? `0${Math.floor(remainingTime / 60)}`
      : Math.floor(remainingTime / 60);
  const second =
    Math.floor(remainingTime % 60) < 10
      ? `0${Math.floor(remainingTime % 60)}`
      : Math.floor(remainingTime % 60);
  const ponmodoroProgress = progress || 0;
  const size = 200;
  const thickness = 2;

  return (
    // <CircularProgressbar
    //   value={ponmodoroProgress}
    //   maxValue={1}
    //   text={`${minute}:${second}`}
    //   strokeWidth={strokeWidth}
    //   styles={buildStyles({
    //     textColor: "red",
    //     pathColor: "red",
    //     trailColor: "black",
    //     strokeLinecap: "butt",
    //   })}
    // />
    <div className={classes.circularProgressbarContainer}>
      <CircularProgress
        value={100}
        variant="static"
        size={size}
        thickness={thickness}
        className={classes.circularProgressBarBass}
      />
      <CircularProgress
        value={ponmodoroProgress * 100}
        variant="static"
        size={size}
        thickness={thickness}
        className={classes.circularProgressBar}
      />
      <Typography className={classes.time}>{`${minute}:${second}`}</Typography>
    </div>
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
