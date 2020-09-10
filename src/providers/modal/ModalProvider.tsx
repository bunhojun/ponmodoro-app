import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { createContext, ReactNode, useCallback, useState } from "react";

interface ModalStateType {
  open: boolean;
  message: string | null;
  title: string | null;
}

interface ConfirmationModalStateType extends ModalStateType {
  callback: (() => void | Promise<void>) | null;
}

type ModalContextType = {
  basicModalState: ModalStateType;
  confirmationModalState: ConfirmationModalStateType;
  openBasicModal: (
    basicModalTitle: string | null,
    basicModalMessage: string | null
  ) => void;
  openConfirmationModal: (
    confirmationModalTitle: string | null,
    confirmationModalMessage: string | null,
    callbackOnApprove: () => void | Promise<void>
  ) => void | null;
};

const defaultBasicModalState = {
  open: false,
  title: "",
  message: "",
};

const defaultConfirmationModalState = {
  open: false,
  title: "",
  message: "",
  callback: null,
};

export const ModalContext = createContext<ModalContextType>({
  basicModalState: defaultBasicModalState,
  confirmationModalState: defaultConfirmationModalState,
  openBasicModal: () => {
    // initial state
  },
  openConfirmationModal: () => {
    // initial state
  },
});

type ModalProviderProps = {
  children: ReactNode;
};

const ModalProvider = ({ children }: ModalProviderProps): JSX.Element => {
  const [basicModalState, setBasicModalState] = useState<ModalStateType>(
    defaultBasicModalState
  );
  const [confirmationModalState, setConfirmationModalState] = useState<
    ConfirmationModalStateType
  >(defaultConfirmationModalState);

  const openBasicModal = (
    basicModalTitle: string | null,
    basicModalMessage: string | null
  ) => {
    setBasicModalState({
      open: true,
      title: basicModalTitle || "",
      message: basicModalMessage || "",
    });
  };

  const openConfirmationModal = (
    confirmationModalTitle: string | null,
    confirmationModalMessage: string | null,
    callbackOnApprove: (() => void | Promise<void>) | null
  ) => {
    setConfirmationModalState({
      open: true,
      title: confirmationModalTitle || "",
      message: confirmationModalMessage || "",
      callback: callbackOnApprove,
    });
  };

  const closeConfirmationModal = () => {
    setConfirmationModalState((currentModalState) => {
      return {
        ...currentModalState,
        open: false,
      };
    });
  };

  const onApprove = useCallback(() => {
    if (confirmationModalState.callback) {
      confirmationModalState.callback();
    }
    closeConfirmationModal();
  }, [confirmationModalState]);

  const closeBasicModal = () => {
    setBasicModalState((currentModalState) => {
      return {
        ...currentModalState,
        open: false,
      };
    });
  };

  return (
    <ModalContext.Provider
      value={{
        basicModalState,
        confirmationModalState,
        openBasicModal,
        openConfirmationModal,
      }}
    >
      {children}
      {/* basic modal */}
      <Dialog open={basicModalState.open} onClose={closeBasicModal}>
        <DialogTitle>{basicModalState.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{basicModalState.message}</DialogContentText>
        </DialogContent>
      </Dialog>
      {/* confirmation modal */}
      <Dialog
        open={confirmationModalState.open}
        onClose={closeConfirmationModal}
      >
        <DialogTitle>{confirmationModalState.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmationModalState.message}
          </DialogContentText>
          <Button onClick={onApprove}>yes</Button>
          <Button onClick={closeConfirmationModal}>no</Button>
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
};

export default ModalProvider;
