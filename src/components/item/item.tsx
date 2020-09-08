import {
  Checkbox,
  IconButton,
  ListItem,
  makeStyles,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import React, { useContext, ChangeEvent, useState, useEffect } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import {
  updateTodo,
  deleteTodo,
  changeCompletionStatus,
} from "../../firebase/firebase";
import CurrentUserContext, { TodoType } from "../../contexts/user/UserContext";

const useStyles = makeStyles({
  listItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  linkBox: {
    width: "80%",
    height: "100%",
  },
  link: {
    display: "inline-block",
    position: "relative",
    width: "100%",
    zIndex: 1,
    padding: "2em 0",
    margin: "-2em 0",
    textAlign: "left",
    color: "#000",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  iconZone: {
    display: "flex",
  },
  textInput: {
    width: "100%",
  },
});

interface ItemComponentProps extends RouteComponentProps {
  task: [string, TodoType];
}

const ItemComponent = (props: ItemComponentProps): JSX.Element => {
  const currentUser = useContext(CurrentUserContext);
  const { task } = props;
  const defaultTodo = task[1].todo;
  const [todo, setTodo] = useState(task[1].todo);
  const [done, setDone] = useState(task[1].done);
  const todoId = task[0];
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setDone(task[1].done);
    setTodo(task[1].todo);
  }, [task]);

  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    await changeCompletionStatus(todoId, currentUser);
  };

  const deleteHandler = async () => {
    if (window.confirm("Do you want to delete this task?")) {
      await deleteTodo(todoId, currentUser);
    }
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

  return (
    <li>
      <ListItem button className={classes.listItem}>
        <Checkbox checked={done} onChange={changeHandler} />
        <div className={classes.linkBox}>
          {isEditing ? (
            <TextField
              className={classes.textInput}
              value={todo}
              onChange={onChangeTextInput}
            />
          ) : (
            <Link to={`/ponmodoro/${todoId}`} className={classes.link}>
              {todo}
            </Link>
          )}
        </div>
        <div className={classes.iconZone}>
          {isEditing ? (
            <>
              <IconButton onClick={onClickSaveButton}>
                <SaveIcon />
              </IconButton>
              <IconButton onClick={onClickCancelButton}>
                <CancelIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={onClickEditButton}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={deleteHandler}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </div>
      </ListItem>
    </li>
  );
};

export default withRouter(ItemComponent);
