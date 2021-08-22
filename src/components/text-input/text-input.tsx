import React, { ChangeEventHandler } from "react";
import { FieldError } from "react-hook-form";
import { BaseTextFieldProps, makeStyles, TextField } from "@material-ui/core";

type Props = {
  type: BaseTextFieldProps["type"];
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error: FieldError | undefined;
};

const useStyles = makeStyles({
  textInput: {
    margin: "5px 0",
    "& input": {
      padding: "10px 8px",
    },
  },
});

const TextInput = ({ type, placeholder, value, onChange, error }: Props) => {
  const classes = useStyles();
  return (
    <TextField
      variant="outlined"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={classes.textInput}
      error={!!error}
      helperText={error && error?.message}
    />
  );
};

export default TextInput;
