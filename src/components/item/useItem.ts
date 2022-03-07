import { useContext, ChangeEvent, useState, useEffect } from "react";
import {
  updateTodo,
  deleteTodo,
  changeCompletionStatus,
} from "../../firebase/firebase";
import CurrentUserContext, { TodoType } from "../../contexts/user/UserContext";
import { OpenConfirmationModal } from "../modal/useModal";

const useItem = (
  task: [string, TodoType],
  openConfirmationModal: OpenConfirmationModal
) => {
  const currentUser = useContext(CurrentUserContext);
  const defaultTodo = task[1].todo;
  const [todo, setTodo] = useState(task[1].todo);
  const [done, setDone] = useState(task[1].done);
  const todoId = task[0];
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setDone(task[1].done);
    setTodo(task[1].todo);
  }, [task]);

  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    await changeCompletionStatus(todoId, currentUser);
  };

  const deleteHandler = () => {
    openConfirmationModal({
      title: "deleting a task",
      message: "Do you want to delete this task?",
      onApprove: () => {
        deleteTodo(todoId, currentUser);
      },
    });
  };

  const onChangeTextInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const onClickEditButton = () => {
    setIsEditing(true);
  };

  const onClickSaveButton = () => {
    if (currentUser) {
      updateTodo(
        todoId,
        {
          done,
          todo,
        },
        currentUser
      );
    }
    setIsEditing(false);
  };

  const onClickCancelButton = () => {
    setTodo(defaultTodo);
    setIsEditing(false);
  };

  return {
    isEditing,
    todo,
    done,
    todoId,
    changeHandler,
    deleteHandler,
    onChangeTextInput,
    onClickEditButton,
    onClickSaveButton,
    onClickCancelButton,
  };
};

export default useItem;
