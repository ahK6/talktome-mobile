import { createSlice } from "@reduxjs/toolkit";
import { AsyncActionStatus } from "@/shared/types/enums.types";
import { IUser, IUserInfo } from "./onBoarding.types";
import { login } from "./onBoarding.actions";

const initialState: IUser = {
  userInfo: undefined,
  userInfoStatus: AsyncActionStatus.idle,
};

const onBoardingSlice = createSlice({
  name: "onBoarding",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState) {
          state.userInfoStatus = AsyncActionStatus.loading;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState) {
          state.userInfoStatus = AsyncActionStatus.done;
          state.userInfo = action.payload;
        }
      })
      .addCase(login.rejected, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState) {
          state.userInfoStatus = AsyncActionStatus.error;
        }
      });
  },
});

export const {} = onBoardingSlice.actions;

const onBoardingReducer = onBoardingSlice.reducer;
export default onBoardingReducer;
