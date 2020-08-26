import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { css } from "@emotion/core";
import { useForm } from "react-hook-form";

import {
  createBoard,
  setCreateDialogOpen,
  CreateBoardForm,
} from "./BoardSlice";
import { RootState } from "../../store";

import { boardCardBaseStyles } from "../../styles";

const openBtnStyles = css`
  ${boardCardBaseStyles}
  background-color: #e0e2e5;
  color: #333;
  width: 100%;
  font-size: 0.7rem;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #d0d2d5;
  }
`;

// interface FormData {
//   name: string;
// }

const NewBoardDialog = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.board.createError);
  const open = useSelector((state: RootState) => state.board.createDialogOpen);

  const { register, handleSubmit, errors, reset } = useForm<CreateBoardForm>();

  // let history = useHistory();

  const handleOpen = () => {
    reset();
    dispatch(setCreateDialogOpen(true));
  };

  const handleClose = () => {
    dispatch(setCreateDialogOpen(false));
  };

  const onSubmit = handleSubmit((fields) => {
    dispatch(createBoard(fields));
    // history.push(`/portal/b/${id}/edit`);
  });

  return (
    <div>
      <Button css={openBtnStyles} onClick={handleOpen}>
        Create new course
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="new-board"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="new-board-title">New course</DialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent>
            <DialogContentText>
              Create a new private course. Only members of the course will be
              able to see and edit it.
            </DialogContentText>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              autoFocus
              margin="dense"
              id="board-name"
              label="Course name"
              fullWidth
              name="name"
              inputRef={register({
                required: "This field is required",
                maxLength: {
                  value: 50,
                  message: "This field can't be more than 50 chars long.",
                },
              })}
              helperText={errors.name?.message}
              error={Boolean(errors.name)}
            />
            {/* <TextField
              margin="dense"
              id="board-description"
              label="Course description"
              fullWidth
              name="description"
              inputRef={register({
                required: "This field is required",
                maxLength: {
                  value: 50,
                  message: "This field can't be more than 50 chars long.",
                },
              })}
              helperText={errors.description?.message}
              error={Boolean(errors.description)}
            /> */}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={onSubmit}
              color="primary"
              data-testid="create-board-btn"
            >
              Create Course
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default NewBoardDialog;
