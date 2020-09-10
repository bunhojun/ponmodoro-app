import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { createContext, ReactNode, useState } from "react";

type ModalStateType = {
  open: boolean;
  message: string;
  title: string;
};

type ModalContextType = {
  basicModalState: ModalStateType;
  openBasicModal: (
    basicModalTitle?: string,
    basicModalMessage?: string
  ) => void;
};

const defaultBasicModalState = {
  open: false,
  message: "",
  title: "",
};

export const ModalContext = createContext<ModalContextType>({
  basicModalState: defaultBasicModalState,
  openBasicModal: () => {
    // initial state
  },
});

type ModalProviderProps = {
  children: ReactNode;
};

const ModalProvider = ({ children }: ModalProviderProps): JSX.Element => {
  const [basicModalState, setBasicModalState] = useState(
    defaultBasicModalState
  );

  const openBasicModal = (
    basicModalTitle?: string,
    basicModalMessage?: string
  ) => {
    setBasicModalState({
      open: true,
      message: basicModalMessage || "",
      title: basicModalTitle || "",
    });
  };

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
        openBasicModal,
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
    </ModalContext.Provider>
  );
};

export default ModalProvider;
