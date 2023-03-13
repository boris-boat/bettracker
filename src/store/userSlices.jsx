import { createSlice } from "@reduxjs/toolkit";
import { betUserApi } from "./betUserApi";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: undefined,
    date: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      betUserApi.endpoints.loginUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    ),
      //   builder.addMatcher(
      //     betUserApi.endpoints.addEvent.matchFulfilled,
      //     (state, action) => {
      //       state.user = action.payload;
      //     }
      //   ),
      builder.addMatcher(
        betUserApi.endpoints.addSlip.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
        }
      ),
      builder.addMatcher(
        betUserApi.endpoints.addToSlip.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
        }
      ),
      //   builder.addMatcher(
      //     betUserApi.endpoints.deleteItem.matchFulfilled,
      //     (state, action) => {
      //       state.user = action.payload;
      //     }
      //   ),
      builder.addMatcher(
        betUserApi.endpoints.editSlip.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
        }
      ),
      //   builder.addMatcher(
      //     betUserApi.endpoints.editEvent.matchFulfilled,
      //     (state, action) => {
      //       state.user = action.payload;
      //     }
      //   ),
      builder.addMatcher(
        betUserApi.endpoints.getFilteredData.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
        }
      );
  },
});
export default userSlice.reducer;
