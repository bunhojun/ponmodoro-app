import React, {
  useState,
  useContext,
  ChangeEvent,
  MouseEvent,
  FunctionComponent,
} from "react";
import {
  Checkbox,
  IconButton,
  ListItem,
  makeStyles,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CurrentUserContext from "../../contexts/user/UserContext";
import { addTodo } from "../../firebase/firebase";

const useStyles = makeStyles({
  form: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    width: "88%",
    marginLeft: 5,
  },
});

const PonmodoroFormComponent: FunctionComponent = () => {
  const [todo, setTodo] = useState("");
  const classes = useStyles();
  const currentUser = useContext(CurrentUserContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!todo) {
      alert("fill out the form");
      return;
    }
    await addTodo(todo, currentUser);
    setTodo("");
  };

  return (
    <ListItem>
      <form className={classes.form}>
        <Checkbox disabled />
        <TextField
          value={todo}
          onChange={handleChange}
          className={classes.textInput}
          placeholder="add todo"
        />
        <IconButton type="submit" onClick={handleSubmit}>
          <AddIcon />
        </IconButton>
      </form>
    </ListItem>
  );
};

export default PonmodoroFormComponent;
