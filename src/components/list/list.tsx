import React from "react";
import {
  FormControlLabel,
  InputBase,
  List,
  ListItem,
  makeStyles,
  Switch,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ItemComponent from "../item/item";
import PonmodoroFormComponent from "../ponmodoro-form/ponmodoro-form";
import useList from "./useList";

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

const ListComponent = () => {
  const classes = useStyles();
  const { sortedTodoArray, onSearch, onChangeSortCondition } = useList();

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
        <ListItem>
          <PonmodoroFormComponent />
        </ListItem>
        {sortedTodoArray.map((todo, index) => {
          const keyNum = index;
          return <ItemComponent task={todo} key={keyNum} />;
        })}
      </List>
    </>
  );
};

export default ListComponent;
