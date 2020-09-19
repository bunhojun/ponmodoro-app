import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState, ChangeEvent } from "react";
import {
  Inner,
  Container,
  Centering,
} from "../../components/common-style/common-style";
import CurrentUserContext, { UserType } from "../../contexts/user/UserContext";
import { changeCompletionStatus } from "../../firebase/firebase";
import { ModalContext } from "../../providers/modal/ModalProvider";
import {
  TimerContext,
  CircleTimer,
} from "../../providers/ponmodoro/PonmodoroProvider";

export type MatchProps = {
  todoId: string;
};

type PonmodoroPageProps = MatchProps;

const useStyles = makeStyles({
  taskName: {
    fontSize: "2rem",
    marginBottom: 10,
    wordBreak: "break-all",
  },
  inputWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "70%",
    margin: "5px auto 10px auto",
  },
  durationInput: {
    width: 250,
    marginRight: 20,
  },
  sessionNumInput: {
    width: 100,
  },
  startButton: {
    marginTop: 10,
    backgroundColor: "violet",
  },
  buttonDisabled: {
    backgroundColor: "gray",
  },
  memoFieldWrapper: {
    marginTop: 10,
  },
  memoField: {
    width: "50%",
  },
});

const PonmodoroPage = (props: PonmodoroPageProps): JSX.Element => {
  const { todoId } = props;
  const initialInputState = {
    isDisabled: false,
    startButtonColor: "violet",
  };
  const [inputState, setInputState] = useState(initialInputState);
  const currentUser = useContext<UserType | null>(CurrentUserContext);
  const {
    startPonmodoro,
    setMainSessionDuration,
    setMaxSessionNumber,
    mainSessionDuration,
    maxSessionNumber,
  } = useContext(TimerContext);
  const { openBasicModal } = useContext(ModalContext);
  const classes = useStyles();
  const { todos } = currentUser || { "": { done: false, todo: "" } };
  const task = todos ? todos[todoId] : { done: false, todo: "" };
  const [done, setDone] = useState(task ? task.done : false);
  const { todo } = task || "";
  const marks = [
    {
      value: 0,
      label: "min",
    },
  ];

  useEffect(() => {
    if (task) {
      setDone(task.done);
    }
  }, [task]);

  const onMainSessionEnd = () => {
    const notification = new Notification(
      "main session done. take a 5min break"
    );
    startPonmodoro();
    notification.onclose = () => {
      // close handler
    };
  };

  const onBreakEnd = () => {
    const notification = new Notification("break done. let's get back to work");
    startPonmodoro();
    notification.onclose = () => {
      // close handler
    };
  };

  const onLastSessionEnd = () => {
    const notification = new Notification("last session done. well done");
    setInputState(initialInputState);
    notification.onclose = () => {
      // close handler
    };
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    await changeCompletionStatus(todoId, currentUser);
  };

  const onSelectDuration = (
    e: ChangeEvent<Record<string, unknown>>,
    value: number | number[]
  ) => {
    if (typeof value === "number") {
      setMainSessionDuration(value);
    }
  };

  const onSelectMaxPeriod = (
    e: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setMaxSessionNumber(Number(e.target.value));
  };

  const start = () => {
    if (!("Notification" in window)) {
      openBasicModal(
        "browser incompatible",
        "This browser does not support desktop notification"
      );
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(() => {
        setInputState((prevInputState) => {
          return {
            ...prevInputState,
            isDisabled: true,
            startButtonColor: "gray",
          };
        });
        startPonmodoro();
      });
    }
  };

  return (
    <Inner>
      <Container>
        {task ? (
          <>
            <Typography variant="h2" className={classes.taskName}>
              <Checkbox checked={done} onChange={handleChange} />
              {todo}
            </Typography>
            <div className={classes.inputWrapper}>
              <div className={classes.durationInput}>
                <Typography>duration</Typography>
                <Slider
                  value={mainSessionDuration}
                  disabled={inputState.isDisabled}
                  onChange={onSelectDuration}
                  max={50}
                  min={1}
                  valueLabelDisplay="auto"
                  marks={marks}
                />
              </div>
              <FormControl
                variant="outlined"
                className={classes.sessionNumInput}
              >
                <InputLabel id="session-label">session</InputLabel>
                <Select
                  labelId="session-label"
                  disabled={inputState.isDisabled}
                  onChange={onSelectMaxPeriod}
                  value={maxSessionNumber}
                  label="session"
                >
                  <MenuItem value={0}>x1</MenuItem>
                  <MenuItem value={1}>x2</MenuItem>
                  <MenuItem value={2}>x3</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Centering>
              <div
                style={{
                  width: 200,
                  height: 200,
                }}
              >
                <CircleTimer
                  onFinishMainSession={onMainSessionEnd}
                  onFinishBreak={onBreakEnd}
                  onFinishLastSession={onLastSessionEnd}
                />
              </div>
            </Centering>
            <Button
              type="button"
              disabled={inputState.isDisabled}
              onClick={start}
              className={classes.startButton}
            >
              start ponmodoro
            </Button>
            <div className={classes.memoFieldWrapper}>
              <TextField
                className={classes.memoField}
                label="memo"
                variant="outlined"
                multiline
                rows={4}
              />
            </div>
          </>
        ) : (
          <div>todo does not exist</div>
        )}
      </Container>
    </Inner>
  );
};

export default PonmodoroPage;
