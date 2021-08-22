import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import TextInput from "../text-input/text-input";

type Props = {
  type: string;
  control: Control<FieldValues> | undefined;
  name: string;
  rules: UseControllerProps["rules"];
  placeholder: string;
};

const StatefulTextInput = ({
  type,
  control,
  name,
  rules,
  placeholder,
}: Props) => (
  <Controller
    defaultValue=""
    control={control}
    name={name}
    rules={rules}
    render={({ field: { onChange, value }, fieldState: { error } }) => {
      return (
        <TextInput
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          error={error}
        />
      );
    }}
  />
);

export default StatefulTextInput;
