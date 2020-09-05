import React, {
  useContext,
  useState,
  FunctionComponent,
  ChangeEvent,
  useCallback,
  useEffect,
} from "react";
import { InputBase, List, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ItemComponent from "../item/item";
import CurrentUserContext from "../../contexts/user/UserContext";
import PonmodoroFormComponent from "../ponmodoro-form/ponmodoro-form";

const useStyles = makeStyles({
  searchWrapper: {
    width: "40%",
    display: "flex",
    alignItems: "center",
    borderRadius: 5,
    margin: "0 auto",
    backgroundColor: "#e2e2e2",
    padding: "2px 5px",
    marginBottom: 5,
  },
  searchInput: {
    width: "100%",
  },
  list: {
    height: "90%",
    overflowY: "scroll",
  },
});

const ListComponent: FunctionComponent = () => {
  const currentUser = useContext(CurrentUserContext);
  const classes = useStyles();
  const todos = (currentUser && currentUser.todos) || {
    "": { done: false, todo: "" },
  };
  const [sortKeyword, setSortKeyword] = useState("");
  const returnSortedArray = useCallback(() => {
    let sortedArray =
      todos && typeof todos === "object"
        ? Object.entries(todos).sort((a, b) => Number(b[0]) - Number(a[0]))
        : [];
    if (sortKeyword) {
      sortedArray = sortedArray.filter((item) =>
        item[1].todo.includes(sortKeyword)
      );
    }
    return sortedArray;
  }, [sortKeyword, todos]);
  const [sortedTodoArray, setSortedArray] = useState(returnSortedArray());

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchedWord = e.target.value;
    if (searchedWord) {
      setSortKeyword(searchedWord);
    } else {
      setSortKeyword("");
    }
  };

  useEffect(() => {
    setSortedArray(returnSortedArray());
  }, [returnSortedArray, sortKeyword]);

  return (
    <>
      <div className={classes.searchWrapper}>
        <SearchIcon />
        <InputBase
          placeholder="Search todo"
          onChange={onSearch}
          className={classes.searchInput}
        />
      </div>
      <List className={classes.list}>
        <li>
          <PonmodoroFormComponent />
        </li>
        {sortedTodoArray.map((todo, index) => {
          const keyNum = index;
          return <ItemComponent task={todo} key={keyNum} />;
        })}
      </List>
    </>
  );
};

export default ListComponent;
