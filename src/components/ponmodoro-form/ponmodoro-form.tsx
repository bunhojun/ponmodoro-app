import React, {
  useState,
  useContext,
  ChangeEvent,
  MouseEvent,
  FunctionComponent,
} from "react";
import { Checkbox, IconButton, makeStyles, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CurrentUserContext from "../../contexts/user/UserContext";
import { addTodo } from "../../firebase/firebase";

const useStyles = makeStyles({
  form: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
  },
  textInput: {
    width: "88%",
    marginLeft: 5,
    marginTop: 5,
  },
});

const PonmodoroFormComponent: FunctionComponent = () => {
  const [todo, setTodo] = useState("");
  const [isErroneous, setIsErroneous] = useState(false);
  const classes = useStyles();
  const currentUser = useContext(CurrentUserContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsErroneous(false);
    setTodo(e.target.value);
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!todo) {
      setIsErroneous(true);
      return;
    }
    await addTodo(todo, currentUser);
    setTodo("");
  };

  return (
    <form className={classes.form}>
      <Checkbox disabled />
      <TextField
        error={isErroneous}
        value={todo}
        onChange={handleChange}
        className={classes.textInput}
        placeholder="add todo"
        helperText={isErroneous && "fill out the form"}
      />
      <IconButton type="submit" onClick={handleSubmit}>
        <AddIcon />
      </IconButton>
    </form>
  );
};

export default PonmodoroFormComponent;
