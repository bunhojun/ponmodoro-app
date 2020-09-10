import { Button, Checkbox, TextField, Typography } from "@material-ui/core";
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

const PonmodoroPage = (props: PonmodoroPageProps): JSX.Element => {
  const { todoId } = props;
  const initialButtonState = {
    isDisabled: false,
    startButtonColor: "violet",
  };
  const [buttonState, setButtonState] = useState(initialButtonState);
  const currentUser = useContext<UserType | null>(CurrentUserContext);
  const { startPonmodoro } = useContext(TimerContext);
  const { openBasicModal } = useContext(ModalContext);
  const { todos } = currentUser || { "": { done: false, todo: "" } };
  const task = todos ? todos[todoId] : { done: false, todo: "" };
  const [done, setDone] = useState(task ? task.done : false);
  const { todo } = task || "";

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
    setButtonState(initialButtonState);
    notification.onclose = () => {
      // close handler
    };
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    await changeCompletionStatus(todoId, currentUser);
  };

  const start = () => {
    if (!("Notification" in window)) {
      openBasicModal(
        "browser incompatible",
        "This browser does not support desktop notification"
      );
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(() => {
        setButtonState((prevButtonState) => {
          return {
            ...prevButtonState,
            isDisabled: true,
            startButtonColor: "gray",
          };
        });
        startPonmodoro();
      });
    }
  };

  return (
    <Inner height="90vh" minHeight="400px">
      <Container height="80%">
        {task ? (
          <>
            <Typography variant="h2">
              <Checkbox checked={done} onChange={handleChange} />
              {todo}
            </Typography>
            <div>
              <TextField label="memo" variant="outlined" />
            </div>
            <Centering>
              <div
                style={{
                  width: 200,
                  height: 200,
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
            <Button
              type="button"
              disabled={buttonState.isDisabled}
              style={{ backgroundColor: buttonState.startButtonColor }}
              onClick={start}
            >
              start ponmodoro
            </Button>
          </>
        ) : (
          <div>todo does not exist</div>
        )}
      </Container>
    </Inner>
  );
};

export default PonmodoroPage;
