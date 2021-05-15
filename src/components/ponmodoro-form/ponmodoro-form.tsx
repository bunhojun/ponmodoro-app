import React, { FunctionComponent } from "react";
import { Checkbox, IconButton, makeStyles, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import usePonmodoroForm from "./usePonmodoroForm";

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
  const classes = useStyles();
  const { todo, isErroneous, handleChange, handleSubmit } = usePonmodoroForm();

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
