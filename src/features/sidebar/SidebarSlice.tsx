import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CurrentUser } from "../../types";
import api, { API_CURRENT_USER, API_USERS } from "../../api";
import { RootState, AppDispatch } from "../../store";

export const fetchCurrentUser = createAsyncThunk<CurrentUser>(
  "sidebar/fetchCurrentUserStatus",
  async () => {
    const response = await api.get(API_CURRENT_USER);
    console.log("rep user", response);
    console.log("document cookie: ", document.cookie);
    return response.data;
  }
);

export const initialUser: CurrentUser = {
  id: 0,
  name: "",
  username: "",
  email: "",
};

interface InitialState {
  user: CurrentUser;
  fetchLoading: boolean;
}

export const initialState: InitialState = {
  user: initialUser,
  fetchLoading: true,
};

export const slice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

// export const updateAvatar = (avatarId: number) => async (
//   dispatch: AppDispatch,
//   getState: () => RootState
// ) => {
//   dispatch(updateAvatarPending(avatarId));
//   try {
//     const id = getState().auth.user?.id;
//     const response = await api.post(`${API_USERS}${id}/update_avatar/`, {
//       id: avatarId,
//     });
//     dispatch(updateAvatarFulfilled(response.data));
//     dispatch(createSuccessToast("Avatar saved"));
//   } catch (err) {
//     dispatch(updateAvatarRejected());
//   }
// };

export default slice.reducer;
