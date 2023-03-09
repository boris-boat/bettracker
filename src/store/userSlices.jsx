import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useLoginUserMutation, betUserApi } from "./betUserApi";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      betUserApi.endpoints.loginUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    ),
      builder.addMatcher(
        betUserApi.endpoints.addEvent.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
        }
      );
  },
});
export default userSlice.reducer;
