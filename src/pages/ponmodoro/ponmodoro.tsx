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
import classNames from "classnames/bind";
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
  nameWrapper: {
    width: "95%",
    margin: "0 auto",
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
  },
  taskName: {
    fontSize: "2rem",
    wordBreak: "break-all",
    textAlign: "center",
    width: "90%",
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
    backgroundColor: "#FFB6C1",
  },
  buttonDisabled: {
    backgroundColor: "#D3D3D3",
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
  const currentUser = useContext<UserType | null>(CurrentUserContext);
  const {
    startPonmodoro,
    setMainSessionDuration,
    setMaxSessionNumber,
    mainSessionDuration,
    maxSessionNumber,
    isActive,
  } = useContext(TimerContext);
  const { openBasicModal } = useContext(ModalContext);
  const classes = useStyles();
  const { todos } = currentUser || { "": { done: false, todo: "" } };
  const task = todos ? todos[todoId] : { done: false, todo: "" };
  const [done, setDone] = useState(task ? task.done : false);
  const { todo } = task || "";
  const minimum = 10;
  const maximum = 50;
  const marks = [
    {
      value: minimum,
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
    notification.onclose = () => null;
  };

  const onBreakEnd = () => {
    const notification = new Notification("break done. let's get back to work");
    startPonmodoro();
    notification.onclose = () => null;
  };

  const onLastSessionEnd = () => {
    const notification = new Notification("last session done. well done");
    notification.onclose = () => null;
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
        startPonmodoro();
      });
    }
  };

  return (
    <Inner>
      <Container>
        {task ? (
          <>
            <div className={classes.nameWrapper}>
              <Checkbox checked={done} onChange={handleChange} />
              <Typography variant="h2" className={classes.taskName}>
                {todo}
              </Typography>
            </div>
            <div className={classes.inputWrapper}>
              <div className={classes.durationInput}>
                <Typography>duration</Typography>
                <Slider
                  value={mainSessionDuration}
                  disabled={isActive}
                  onChange={onSelectDuration}
                  max={maximum}
                  min={minimum}
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
                  disabled={isActive}
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
                  width: 240,
                  height: 240,
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
              disabled={isActive}
              onClick={start}
              className={classNames(
                classes.startButton,
                isActive && classes.buttonDisabled
              )}
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
