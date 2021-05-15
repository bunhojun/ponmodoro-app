import { useState, useContext, ChangeEvent, MouseEvent } from "react";
import CurrentUserContext from "../../contexts/user/UserContext";
import { addTodo } from "../../firebase/firebase";

const usePonmodoroForm = () => {
  const [todo, setTodo] = useState("");
  const [isErroneous, setIsErroneous] = useState(false);
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

  return {
    todo,
    isErroneous,
    handleChange,
    handleSubmit,
  };
};

export default usePonmodoroForm;
