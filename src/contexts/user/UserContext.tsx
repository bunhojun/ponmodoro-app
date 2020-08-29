import { createContext } from "react";

export type TodoType = {
  done: boolean;
  todo: string;
};

export type UserType = {
  id?: string | null;
  displayName?: string | null;
  todos?: {
    [key: string]: TodoType;
  };
};

const CurrentUserContext = createContext<UserType | null>(null);

export default CurrentUserContext;
