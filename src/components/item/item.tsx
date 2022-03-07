import {
  Checkbox,
  IconButton,
  ListItem,
  makeStyles,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { TodoType } from "../../contexts/user/UserContext";
import useItem from "./useItem";
import { useModal } from "../modal/useModal";
import { ConfirmationModal } from "../modal/modal";

const useStyles = makeStyles({
  listItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  linkBox: {
    width: "80%",
    height: "100%",
  },
  link: {
    display: "inline-block",
    position: "relative",
    width: "100%",
    zIndex: 1,
    padding: "2em 0",
    margin: "-2em 0",
    textAlign: "left",
    color: "#000",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  iconZone: {
    display: "flex",
  },
  textInput: {
    width: "100%",
  },
});

interface ItemComponentProps extends RouteComponentProps {
  task: [string, TodoType];
}

const ItemComponent = (props: ItemComponentProps): JSX.Element => {
  const classes = useStyles();
  const { task } = props;
  const {
    isModalOpen,
    openConfirmationModal,
    closeModal,
    modalTitle,
    modalMessage,
    onApprove,
  } = useModal();
  const {
    isEditing,
    todo,
    done,
    todoId,
    changeHandler,
    deleteHandler,
    onChangeTextInput,
    onClickEditButton,
    onClickSaveButton,
    onClickCancelButton,
  } = useItem(task, openConfirmationModal);

  return (
    <li>
      <ListItem button className={classes.listItem}>
        <Checkbox checked={done} onChange={changeHandler} />
        <div className={classes.linkBox}>
          {isEditing ? (
            <TextField
              className={classes.textInput}
              value={todo}
              onChange={onChangeTextInput}
            />
          ) : (
            <Link to={`/ponmodoro/${todoId}`} className={classes.link}>
              {todo}
            </Link>
          )}
        </div>
        <div className={classes.iconZone}>
          {isEditing ? (
            <>
              <IconButton onClick={onClickSaveButton}>
                <SaveIcon />
              </IconButton>
              <IconButton onClick={onClickCancelButton}>
                <CancelIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={onClickEditButton}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={deleteHandler}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </div>
      </ListItem>
      <ConfirmationModal
        isOpen={isModalOpen}
        title={modalTitle}
        message={modalMessage}
        onApprove={onApprove}
        onClose={closeModal}
      />
    </li>
  );
};

export default withRouter(ItemComponent);
