import React, { useContext, ChangeEvent, useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as H from "history";
import { ListItem, ItemContent, DeleteButton } from "./styled-item";
import { deleteTodo, changeCompletionStatus } from "../../firebase/firebase";
import CurrentUserContext, { TodoType } from "../../contexts/user/UserContext";

interface ItemComponentProps extends RouteComponentProps {
  task: [string, TodoType];
  history: H.History;
}

const ItemComponent = (props: ItemComponentProps): JSX.Element => {
  const { task, history } = props;
  const currentUser = useContext(CurrentUserContext);
  const { todo } = task[1];
  const [done, setDone] = useState(task[1].done);
  const todoId = task[0];

  useEffect(() => {
    setDone(task[1].done);
  }, [task]);

  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    await changeCompletionStatus(todoId, currentUser);
  };

  const linkHandler = () => {
    history.push(`/ponmodoro/${todoId}`);
  };

  const deleteHandler = async () => {
    if (window.confirm("Do you want to delete this task?")) {
      await deleteTodo(todoId, currentUser);
    }
  };

  return (
    <ListItem>
      <ItemContent>
        <input type="checkbox" checked={done} onChange={changeHandler} />
        <span
          onClick={linkHandler}
          role="button"
          onKeyDown={linkHandler}
          tabIndex={0}
        >
          {todo}
        </span>
      </ItemContent>
      <DeleteButton onClick={deleteHandler}>&#10005;</DeleteButton>
    </ListItem>
  );
};

export default withRouter(ItemComponent);
