import { CircularProgress, Fade, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  position: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
});

export const ProgressBar = ({ isLoading }: { isLoading: boolean }) => {
  const classes = useStyles();
  return (
    <div className={classes.position}>
      <Fade in={isLoading}>
        <CircularProgress size={70} />
      </Fade>
    </div>
  );
};
