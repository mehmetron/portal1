import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { Board, IColumn, ITask, Label, NanoBoard } from "../../types";
import api, { API_LESSONS } from "../../api";
import {Id, ITask, PriorityValue} from "../../types";

interface InitialState {
  detail: ITask | null;
  all: ITask[];
  fetchLoading: boolean;
  fetchError: string | null;
  createDialogOpen: boolean;
  detailLoading: boolean;
  detailError?: string;
}

export const initialState: InitialState = {
  detail: null,
  all: [],
  fetchLoading: true,
  fetchError: null,
  createDialogOpen: false,
  detailLoading: false,
  detailError: undefined,
};

// interface ColumnsResponse extends IColumn {
//   tasks: ITask[];
// }

// interface BoardDetailResponse extends Board {
//   columns: ColumnsResponse[];
//   labels: Label[];
// }

interface TASK {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const fetchAllLessons = createAsyncThunk<TASK[]>(
  "lesson/fetchAllStatus",
  async () => {
    const response = await api.get(
      "https://jsonplaceholder.typicode.com/todos/"
    );
    console.log("lessons ", response.data);
    return response.data;
  }
);

export const fetchLessonById = createAsyncThunk<
    ITask,
    string,
    {
      rejectValue: string;
    }
    >("lesson/fetchByIdStatus", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`${API_LESSONS}${id}/`);
    console.log("lesson by id: ", response);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});



export const slice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setCreateDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.createDialogOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllLessons.pending, (state) => {
      state.fetchLoading = true;
      state.fetchError = null;
      //   state.detailError = undefined;
    });
    builder.addCase(fetchAllLessons.fulfilled, (state, action) => {
      // @ts-ignore
      state.all = action.payload;
      state.fetchError = null;
      state.fetchLoading = false;
    });
    builder.addCase(fetchAllLessons.rejected, (state, action) => {
      state.fetchError = action.payload as string;
      state.fetchLoading = false;
    });
    builder.addCase(fetchLessonById.pending, (state) => {
      state.detailLoading = true;
    });
    builder.addCase(fetchLessonById.fulfilled, (state, action) => {
      const { id, created, modified, title, description, labels, video_url, recording, priority } = action.payload;
      state.detail = { id, created, modified, title, description, labels, video_url, recording, priority };
      state.detailError = undefined;
      state.detailLoading = false;
    });
    builder.addCase(fetchLessonById.rejected, (state, action) => {
      // @ts-ignore
      state.detailError = action.payload;
      state.detailLoading = false;
    });
  },
});

export const { setCreateDialogOpen } = slice.actions;

export default slice.reducer;
