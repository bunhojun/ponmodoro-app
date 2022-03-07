import { useContext, useEffect, useState, ChangeEvent } from "react";
import { useBeforeunload } from "react-beforeunload";
import { changeCompletionStatus } from "../../firebase/firebase";
import { TimerContext } from "../../providers/ponmodoro/PonmodoroProvider";
import CurrentUserContext, { UserType } from "../../contexts/user/UserContext";
import { OpenModal } from "../../components/modal/useModal";

const usePonmodoro = (todoId: string, openModal: OpenModal) => {
  const currentUser = useContext<UserType | null>(CurrentUserContext);
  const {
    startPonmodoro,
    setMainSessionDuration,
    setMaxSessionNumber,
    mainSessionDuration,
    maxSessionNumber,
    isActive,
  } = useContext(TimerContext);
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

  useBeforeunload((e) => {
    if (isActive) {
      e.preventDefault();
    }
  });

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
      openModal({
        title: "browser incompatible",
        message: "This browser does not support desktop notification",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(() => {
        startPonmodoro();
      });
    }
  };
  return {
    task,
    isActive,
    mainSessionDuration,
    maxSessionNumber,
    done,
    todo,
    maximum,
    minimum,
    marks,
    onMainSessionEnd,
    onBreakEnd,
    onLastSessionEnd,
    handleChange,
    onSelectDuration,
    onSelectMaxPeriod,
    start,
  };
};

export default usePonmodoro;
