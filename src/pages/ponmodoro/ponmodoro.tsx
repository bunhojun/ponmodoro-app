import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import classNames from "classnames/bind";
import {
  Inner,
  Container,
  Centering,
} from "../../components/common-style/common-style";
import { CircleTimer } from "../../providers/ponmodoro/PonmodoroProvider";
import HeaderComponent from "../../components/header/header";
import usePonmodoro from "./usePonmodoro";
import { useModal } from "../../components/modal/useModal";
import { BasicModal } from "../../components/modal/modal";

export type MatchProps = {
  todoId: string;
};

type PonmodoroPageProps = MatchProps;

const useStyles = makeStyles({
  nameWrapper: {
    width: "95%",
    margin: "0 auto",
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
  },
  taskName: {
    fontSize: "2rem",
    wordBreak: "break-all",
    textAlign: "center",
    width: "90%",
  },
  inputWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "70%",
    margin: "5px auto 10px auto",
  },
  durationInput: {
    width: 250,
    marginRight: 20,
  },
  sessionNumInput: {
    width: 100,
  },
  startButton: {
    marginTop: 10,
    backgroundColor: "#FFB6C1",
  },
  buttonDisabled: {
    backgroundColor: "#D3D3D3",
  },
  memoFieldWrapper: {
    marginTop: 10,
  },
  memoField: {
    width: "50%",
  },
});

const PonmodoroPage = (props: PonmodoroPageProps): JSX.Element => {
  const { todoId } = props;
  const classes = useStyles();
  const { isModalOpen, openModal, closeModal, modalTitle, modalMessage } =
    useModal();
  const {
    task,
    isActive,
    mainSessionDuration,
    maxSessionNumber,
    done,
    todo,
    maximum,
    minimum,
    marks,
    onMainSessionEnd,
    onBreakEnd,
    onLastSessionEnd,
    handleChange,
    onSelectDuration,
    onSelectMaxPeriod,
    start,
  } = usePonmodoro(todoId, openModal);

  return (
    <>
      <HeaderComponent />
      <Inner>
        <Container>
          {task ? (
            <>
              <div className={classes.nameWrapper}>
                <Checkbox checked={done} onChange={handleChange} />
                <Typography variant="h2" className={classes.taskName}>
                  {todo}
                </Typography>
              </div>
              <div className={classes.inputWrapper}>
                <div className={classes.durationInput}>
                  <Typography>duration</Typography>
                  <Slider
                    value={mainSessionDuration}
                    disabled={isActive}
                    onChange={onSelectDuration}
                    max={maximum}
                    min={minimum}
                    valueLabelDisplay="auto"
                    marks={marks}
                  />
                </div>
                <FormControl
                  variant="outlined"
                  className={classes.sessionNumInput}
                >
                  <InputLabel id="session-label">session</InputLabel>
                  <Select
                    labelId="session-label"
                    disabled={isActive}
                    onChange={onSelectMaxPeriod}
                    value={maxSessionNumber}
                    label="session"
                  >
                    <MenuItem value={0}>x1</MenuItem>
                    <MenuItem value={1}>x2</MenuItem>
                    <MenuItem value={2}>x3</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <Centering>
                <div
                  style={{
                    width: 240,
                    height: 240,
                  }}
                >
                  <CircleTimer
                    onFinishMainSession={onMainSessionEnd}
                    onFinishBreak={onBreakEnd}
                    onFinishLastSession={onLastSessionEnd}
                  />
                </div>
              </Centering>
              <Button
                type="button"
                disabled={isActive}
                onClick={start}
                className={classNames(
                  classes.startButton,
                  isActive && classes.buttonDisabled
                )}
              >
                start ponmodoro
              </Button>
              <div className={classes.memoFieldWrapper}>
                <TextField
                  className={classes.memoField}
                  label="memo"
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </div>
            </>
          ) : (
            <div>todo does not exist</div>
          )}
        </Container>
      </Inner>
      <BasicModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        message={modalMessage}
      />
    </>
  );
};

export default PonmodoroPage;
