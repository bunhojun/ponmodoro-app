import { CircularProgress, Fade, makeStyles } from "@material-ui/core";
import React, { createContext, ReactNode, useContext, useState } from "react";

const initialValue = {
  isLoading: false,
  showProgressBar: () => null,
  closeProgressBar: () => null,
};

type ProgressContextType = {
  isLoading: boolean;
  showProgressBar: () => void;
  closeProgressBar: () => void;
};

export const ProgressContext = createContext<ProgressContextType>(initialValue);

const useStyles = makeStyles({
  position: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
});

const ProgressBarComponent = () => {
  const classes = useStyles();
  const { isLoading } = useContext(ProgressContext);
  return (
    <div className={classes.position}>
      <Fade in={isLoading}>
        <CircularProgress size={70} />
      </Fade>
    </div>
  );
};

type ProgressProviderProps = {
  children: ReactNode;
};

const ProgressProvider = ({ children }: ProgressProviderProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const showProgressBar = () => {
    setIsLoading(true);
  };

  const closeProgressBar = () => {
    setIsLoading(false);
  };

  return (
    <ProgressContext.Provider
      value={{
        isLoading,
        showProgressBar,
        closeProgressBar,
      }}
    >
      <ProgressBarComponent />
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressProvider;
