import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

type BasicProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

export const BasicModal = ({ isOpen, onClose, title, message }: BasicProps) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
  </Dialog>
);

type ConfirmationProps = BasicProps & {
  onApprove: () => void;
  onClickNo?: () => void;
};

export const ConfirmationModal = ({
  isOpen,
  onClose,
  title,
  message,
  onApprove,
  onClickNo = onClose,
}: ConfirmationProps) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
      <Button onClick={onApprove}>yes</Button>
      <Button onClick={onClickNo}>no</Button>
    </DialogContent>
  </Dialog>
);
