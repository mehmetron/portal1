import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Label, Id } from "../../types";
import { fetchBoardById } from "../board/BoardSlice";
import { RootState } from "../../store";
import api, { API_LABELS } from "../../api";
import { createInfoToast, createErrorToast } from "../toast/ToastSlice";
import { AxiosError } from "axios";

export const fetchAllLabels = createAsyncThunk<Label[]>(
  "label/fetchAllStatus",
  async () => {
    const response = await api.get(API_LABELS);
    console.log("coming bruh", response);
    return response.data;
  }
);

export const createLabel = createAsyncThunk<Label, Omit<Label, "id">>(
  "label/createLabelStatus",
  async (label, { dispatch }) => {
    const response = await api.post(`${API_LABELS}`, label);
    dispatch(createInfoToast("Label created"));
    return response.data;
  }
);

export const patchLabel = createAsyncThunk<
  Label,
  { id: Id; fields: Partial<Label> }
>(
  "label/patchLabelStatus",
  async ({ id, fields }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_LABELS}${id}/`, fields);
      dispatch(createInfoToast("Label updated"));
      return response.data;
    } catch (err) {
      const error: AxiosError = err;
      if (!error.response) {
        throw err;
      }
      dispatch(createErrorToast(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteLabel = createAsyncThunk<Id, Id>(
  "label/deleteLabelStatus",
  async (id, { dispatch }) => {
    await api.delete(`${API_LABELS}${id}/`);
    dispatch(createInfoToast("Label deleted"));
    return id;
  }
);

const labelAdapter = createEntityAdapter<Label>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

interface ExtraInitialState {
  dialogOpen: boolean;
}

export const initialState = labelAdapter.getInitialState<ExtraInitialState>({
  dialogOpen: false,
});

export const slice = createSlice({
  name: "label",
  initialState,
  reducers: {
    setDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.dialogOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllLabels.fulfilled, (state, action) => {
      console.log("poooooo ww9", action.payload);
      labelAdapter.setAll(state, action.payload);
    });
    // builder.addCase(fetchBoardById.fulfilled, (state, action) => {
    //   console.log("peniiiis www", action.payload.labels);
    //   labelAdapter.setAll(state, action.payload.labels);
    // });
    builder.addCase(createLabel.fulfilled, (state, action) => {
      labelAdapter.addOne(state, action.payload);
    });
    builder.addCase(patchLabel.fulfilled, (state, action) => {
      const { id, name, color } = action.payload;
      labelAdapter.updateOne(state, { id, changes: { name, color } });
    });
    builder.addCase(deleteLabel.fulfilled, (state, action) => {
      labelAdapter.removeOne(state, action.payload);
    });
  },
});

export const { setDialogOpen } = slice.actions;

export const labelSelectors = labelAdapter.getSelectors(
  (state: RootState) => state.label
);

export const {
  selectAll: selectAllLabels,
  selectEntities: selectLabelEntities,
} = labelSelectors;

export default slice.reducer;
