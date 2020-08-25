import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  Board,
  ICategory,
  Id,
  IColumn,
  ITask,
  Label,
  NanoBoard,
} from "../../types";
import api, { API_BOARDS } from "../../api";
import { RootState } from "../../store";
// import { logout } from "../auth/AuthSlice";
import { createErrorToast, createInfoToast } from "../toast/ToastSlice";

export interface CreateBoardForm {
  name: string;
  short_description: string;
  description: string;
  category: ICategory;
  outcome: string;
  thumbnail: string;
  video_url: string;
  is_published: boolean;
  price: number;
}

interface InitialState {
  detail: Board | null;
  all: NanoBoard[];
  fetchLoading: boolean;
  fetchError: string | null;
  createDialogOpen: boolean;
  createLoading: boolean;
  createError: string | null;
  detailLoading: boolean;
  detailError?: string;
}

export const initialState: InitialState = {
  detail: null,
  all: [],
  fetchLoading: true,
  fetchError: null,
  createDialogOpen: false,
  createLoading: false,
  createError: null,
  detailLoading: false,
  detailError: undefined,
};

interface ColumnsResponse extends IColumn {
  tasks: ITask[];
}

interface BoardDetailResponse extends Board {
  columns: ColumnsResponse[];
  labels: Label[];
}

export const fetchAllBoards = createAsyncThunk<Board[]>(
  "board/fetchAllStatus",
  async () => {
    const response = await api.get(API_BOARDS);
    return response.data;
  }
);

export const fetchBoardById = createAsyncThunk<
  BoardDetailResponse,
  string,
  {
    rejectValue: string;
  }
>("board/fetchByIdStatus", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`${API_BOARDS}${id}/`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const createBoard = createAsyncThunk<Board, Partial<CreateBoardForm>>(
  "board/createBoardStatus",
  async (fields) => {
    const response = await api.post(API_BOARDS, fields);
    return response.data;
  }
);

export const deleteBoard = createAsyncThunk<Id, Id>(
  "board/deleteBoardStatus",
  async (id, { dispatch }) => {
    await api.delete(`${API_BOARDS}${id}/`);
    dispatch(createInfoToast("Board deleted"));
    return id;
  }
);

export const patchBoard = createAsyncThunk<
  Board,
  { id: Id; fields: Partial<CreateBoardForm> }
>("column/patchColumnStatus", async ({ id, fields }) => {
  const response = await api.patch(`${API_BOARDS}${id}/`, fields);
  return response.data;
});

export const slice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setCreateDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.createDialogOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBoards.pending, (state) => {
      state.fetchLoading = true;
      state.fetchError = null;
      state.detailError = undefined;
    });
    builder.addCase(fetchAllBoards.fulfilled, (state, action) => {
      state.all = action.payload;
      state.fetchError = null;
      state.fetchLoading = false;
    });
    builder.addCase(fetchAllBoards.rejected, (state, action) => {
      state.fetchError = action.payload as string;
      state.fetchLoading = false;
    });
    builder.addCase(fetchBoardById.pending, (state) => {
      state.detailLoading = true;
    });
    builder.addCase(fetchBoardById.fulfilled, (state, action) => {
      const {
        id,
        name,
        owner,
        short_description,
        description,
        category,
        outcome,
        thumbnail,
        video_url,
        is_published,
        price,
      } = action.payload;
      state.detail = {
        id,
        name,
        owner,
        short_description,
        description,
        category,
        outcome,
        thumbnail,
        video_url,
        is_published,
        price,
      };
      state.detailError = undefined;
      state.detailLoading = false;
    });

    // builder.addCase(fetchBoardById.fulfilled, (state, action) => {
    //   const { id, name, owner, members } = action.payload;
    //   state.detail = { id, name, owner, members };
    //   state.detailError = undefined;
    //   state.detailLoading = false;
    // });
    builder.addCase(fetchBoardById.rejected, (state, action) => {
      state.detailError = action.payload;
      state.detailLoading = false;
    });
    builder.addCase(createBoard.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.all.push(action.payload);
      state.createError = null;
      state.createLoading = false;
      state.createDialogOpen = false;
    });
    builder.addCase(createBoard.rejected, (state, action) => {
      state.createError = action.payload as string;
      state.createLoading = false;
    });
    // builder.addCase(logout.fulfilled, (state) => {
    //   state.all = [];
    //   state.detail = null;
    // });

    builder.addCase(deleteBoard.pending, (state) => {
      console.log("pending deletion");
    });
    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      console.log("i think it's deleted", action.payload);
    });
    builder.addCase(deleteBoard.rejected, (state, action) => {
      console.log("It rejected deletion", action.payload);
    });
    builder.addCase(patchBoard.fulfilled, (state, action) => {
      state.all[action.payload.id] = action.payload;
    });
  },
});

export const { setCreateDialogOpen } = slice.actions;

export const currentBoardOwner = (state: RootState) => {
  return true;
  // Boolean(state.auth.user) &&
  // state.board.detail?.owner === state.auth.user?.id
};

export default slice.reducer;
