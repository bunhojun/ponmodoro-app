import React, {
  useState,
  useContext,
  ChangeEvent,
  MouseEvent,
  FunctionComponent,
} from "react";
import { addTodo } from "../../firebase/firebase";
import CurrentUserContext from "../../contexts/user/UserContext";

const PonmodoroFormComponent: FunctionComponent = () => {
  const [todo, setTodo] = useState("");
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
    <form>
      <input value={todo} onChange={handleChange} />
      <button type="submit" onClick={handleSubmit}>
        add todo
      </button>
    </form>
  );
};

export default PonmodoroFormComponent;
