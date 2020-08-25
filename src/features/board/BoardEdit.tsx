import React from "react";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Input,
  Select,
  MenuItem,
  FormHelperText,
  NativeSelect,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Switch,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Spinner from "../../components/Spinner";
import PageError from "../../components/PageError";

import { useDispatch, useSelector } from "react-redux";
import {
  createBoard,
  CreateBoardForm,
  deleteBoard,
  patchBoard,
} from "./BoardSlice";
import { RootState } from "../../store";
import { Alert } from "@material-ui/lab";
import { css } from "@emotion/core";
import { boardCardBaseStyles } from "../../styles";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { fetchBoardById } from "./BoardSlice";

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

interface Props {}

const BoardEdit = (props: Props) => {
  const { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (id) {
      dispatch(fetchBoardById(id));
    }
  }, [id]);

  const error = useSelector((state: RootState) => state.board.detailError);
  const board = useSelector((state: RootState) => state.board.detail);
  const loading = useSelector((state: RootState) => state.board.detailLoading);

  const { register, handleSubmit, errors, reset } = useForm<CreateBoardForm>();

  const onSubmit = handleSubmit((fields) => {
    console.log("these the dielfs", fields);
    dispatch(patchBoard({ id: id, fields: fields }));
  });

  const handleBoardDelete = () => {
    // @ts-ignore
    dispatch(deleteBoard(id)).then(() => {
      console.log("hmmm no7");
      history.push("/kafka/boards");
    });
  };

  var categories = [
    { id: 75, title: "javascript" },
    { id: 76, title: "java" },
    { id: 77, title: "c++" },
    { id: 78, title: "algorithms" },
    { id: 79, title: "python" },
  ];

  const formStyles = css`
    font-size: 0.7rem;
    margin-top: 10px;

    &:hover {
      background-color: #d0d2d5;
    }
  `;

  if (error) {
    return <PageError>{error}</PageError>;
  }

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
      <p>Something here stops working {id}</p>
      <button onClick={handleBoardDelete}>Delete board</button>
      <form onSubmit={onSubmit}>
        Create a new private board. Only members of the board will be able to
        see and edit it.
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          css={formStyles}
          autoFocus
          margin="dense"
          id="board-name"
          label="Board name"
          fullWidth
          name="name"
          defaultValue={board?.name}
          variant="outlined"
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
        <TextField
          css={css`
            ${formStyles}
            @media (min-width: 820px) {
              width: 50%;
            }
          `}
          fullWidth
          id="short-description-field"
          label="Short Description"
          multiline
          name="short_description"
          defaultValue={board?.short_description}
          variant="outlined"
          inputRef={register({
            maxLength: {
              value: 60,
              message: "This field can't be more than 50 chars long.",
            },
          })}
          helperText={errors.short_description?.message}
          error={Boolean(errors.short_description)}
        />
        <TextField
          css={formStyles}
          id="description-field"
          label="Description"
          multiline
          fullWidth
          name="description"
          defaultValue={board?.description}
          variant="outlined"
          inputRef={register({
            maxLength: {
              value: 500,
              message: "This field can't be more than 50 chars long.",
            },
          })}
          helperText={errors.description?.message}
          error={Boolean(errors.description)}
        />
        {/* <Autocomplete
          css={formStyles}
          id="category-field"
          options={categories}
          getOptionLabel={(option) => option.id.toString()}
          getOptionSelected={(option, value) => option.id == value.id}
          style={{ width: 300 }}
          defaultValue={{ title: "java", id: 76 }} // TODO Add defaultValue to Autocomplete
          renderOption={(option) => <span>{option.title}</span>}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={register}
              name="category"
              label="Category"
              variant="outlined"
            />
          )}
        /> */}
        <FormControl>
          <InputLabel htmlFor="age-native-helper">Category</InputLabel>
          <NativeSelect
            inputRef={register}
            name="category"
            value={board?.category}
            inputProps={{
              name: "age",
              id: "age-native-helper",
            }}
          >
            <option aria-label="None" value="" />
            <option value={75}>javascript</option>
            <option value={76}>java</option>
            <option value={77}>c++</option>
            <option value={78}>algorithms</option>
            <option value={79}>python</option>
          </NativeSelect>
          <FormHelperText>Pick a category</FormHelperText>
        </FormControl>
        <div>
          outcome = models.CharField(max_length=200, null=True, blank=True)
        </div>
        <TextField
          css={css`
            ${formStyles}
            @media (min-width: 820px) {
              width: 50%;
            }
          `}
          id="outcome-field"
          label="outcome"
          name="outcome"
          defaultValue="outcome 1"
          variant="outlined"
          inputRef={register}
          helperText={errors.outcome?.message}
          error={Boolean(errors.outcome)}
        />
        <div>thumbnail = models.URLField(null=True, blank=True) </div>
        <TextField
          css={css`
            ${formStyles}
            @media (min-width: 820px) {
              width: 50%;
            }
          `}
          fullWidth
          id="thumbnail-url-field"
          label="Thumbnail url"
          name="thumbnail"
          defaultValue={board?.thumbnail}
          variant="outlined"
          inputRef={register({
            maxLength: {
              value: 500,
              message: "This field can't be more than 50 chars long.",
            },
          })}
          helperText={errors.thumbnail?.message}
          error={Boolean(errors.thumbnail)}
        />
        <div>
          video_url = models.CharField(max_length=100, null=True, blank=True){" "}
        </div>
        <TextField
          css={css`
            ${formStyles}
            @media (min-width: 820px) {
              width: 50%;
            }
          `}
          fullWidth
          id="trailer-url-field"
          label="Trailer url"
          name="video_url"
          defaultValue={board?.video_url}
          variant="outlined"
          inputRef={register}
          helperText={errors.video_url?.message}
          error={Boolean(errors.video_url)}
        />
        <div>
          price = models.DecimalField(max_digits=5, decimal_places=2,
          default=0.00)
        </div>
        <FormControl variant="outlined" css={formStyles}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            inputRef={register}
            defaultValue={board?.price}
            id="outlined-adornment-amount"
            name="price"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
        <div>is_published = models.BooleanField(default=False) </div>
        <Switch
          inputRef={register}
          defaultValue={board?.is_published.toString()}
          color="primary"
          name="is_published"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <Button
          onClick={onSubmit}
          color="primary"
          css={css`
            ${formStyles}
            background-color: lightblue;
            padding: 10px;
            display: block;
          `}
          data-testid="create-board-btn"
        >
          Create Board
        </Button>
      </form>
    </div>
  );
};

export default BoardEdit;
