import React, { useContext, FunctionComponent } from "react";
import { UnorderedList, ListContainer } from "./styled-list";
import ItemComponent from "../item/item";
import CurrentUserContext from "../../contexts/user/UserContext";

const ListComponent: FunctionComponent = () => {
  const currentUser = useContext(CurrentUserContext);
  const { todos } = currentUser || { "": { done: false, todo: "" } };
  const sortedTodosArray =
    todos && typeof todos === "object"
      ? Object.entries(todos).sort((a, b) => Number(b[0]) - Number(a[0]))
      : [];

  return (
    <ListContainer>
      <UnorderedList>
        {sortedTodosArray.map((todo, index) => {
          const keyNum = index;
          return <ItemComponent task={todo} key={keyNum} />;
        })}
      </UnorderedList>
    </ListContainer>
  );
};

export default ListComponent;
