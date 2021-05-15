import {
  useContext,
  useState,
  ChangeEvent,
  useCallback,
  useEffect,
} from "react";
import CurrentUserContext from "../../contexts/user/UserContext";

const useList = () => {
  const currentUser = useContext(CurrentUserContext);
  const todos = (currentUser && currentUser.todos) || {
    "": { done: false, todo: "" },
  };
  const [sortKeyword, setSortKeyword] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const returnSortedArray = useCallback(() => {
    const sortedArray =
      todos && typeof todos === "object"
        ? Object.entries(todos)
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .filter((item) => {
              const completedMatch = showCompleted ? true : !item[1].done;
              const wordMatch = sortKeyword
                ? item[1].todo.includes(sortKeyword)
                : true;
              return completedMatch && wordMatch;
            })
        : [];
    return sortedArray;
  }, [sortKeyword, showCompleted, todos]);
  const [sortedTodoArray, setSortedArray] = useState(returnSortedArray());

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchedWord = e.target.value;
    if (searchedWord) {
      setSortKeyword(searchedWord);
    } else {
      setSortKeyword("");
    }
  };

  const onChangeSortCondition = () => {
    setShowCompleted((currentCondition) => !currentCondition);
  };

  useEffect(() => {
    setSortedArray(returnSortedArray());
  }, [returnSortedArray]);

  return {
    sortedTodoArray,
    onSearch,
    onChangeSortCondition,
  };
};

export default useList;
