import React, {
  useContext,
  useState,
  FunctionComponent,
  ChangeEvent,
  useCallback,
  useEffect,
} from "react";
import {
  FormControlLabel,
  InputBase,
  List,
  makeStyles,
  Switch,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ItemComponent from "../item/item";
import CurrentUserContext from "../../contexts/user/UserContext";
import PonmodoroFormComponent from "../ponmodoro-form/ponmodoro-form";

const useStyles = makeStyles({
  sortWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  searchWrapper: {
    width: "40%",
    display: "flex",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#e2e2e2",
    padding: "2px 5px",
    marginBottom: 5,
    marginRight: 10,
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
    setShowCompleted((currentConditon) => !currentConditon);
  };

  useEffect(() => {
    setSortedArray(returnSortedArray());
  }, [returnSortedArray]);

  return (
    <>
      <div className={classes.sortWrapper}>
        <div className={classes.searchWrapper}>
          <SearchIcon />
          <InputBase
            placeholder="Search todo"
            onChange={onSearch}
            className={classes.searchInput}
          />
        </div>
        <FormControlLabel
          control={<Switch onChange={onChangeSortCondition} />}
          label="show completed tasks"
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
