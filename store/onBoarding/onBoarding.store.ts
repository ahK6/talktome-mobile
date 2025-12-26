import { createSlice } from "@reduxjs/toolkit";
import { AsyncActionStatus } from "@/shared/types/enums.types";
import { IUser, IUserInfo } from "./onBoarding.types";
import { login, updateUserInfo, validateUserToken } from "./onBoarding.actions";

const initialState: IUser = {
  userInfo: undefined,
  userInfoStatus: AsyncActionStatus.idle,
};

const onBoardingSlice = createSlice({
  name: "onBoarding",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = undefined;
      state.userInfoStatus = AsyncActionStatus.idle;
    },
  },
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
      })
      .addCase(updateUserInfo.pending, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.userInfoStatus = AsyncActionStatus.loading;
        }
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.userInfoStatus = AsyncActionStatus.done;
          // Actualizar la información del usuario en el estado
          if (state.userInfo?.userInformation) {
            state.userInfo.userInformation.username = action.payload.data.username;
            state.userInfo.userInformation.email = action.payload.data.email;
          }
        }
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.userInfoStatus = AsyncActionStatus.error;
        }
      })
      .addCase(validateUserToken.pending, (state) => {
        state.userInfoStatus = AsyncActionStatus.loading;
      })
      .addCase(validateUserToken.fulfilled, (state, action) => {
        state.userInfoStatus = AsyncActionStatus.done;
        state.userInfo = action.payload;
      })
      .addCase(validateUserToken.rejected, (state) => {
        state.userInfoStatus = AsyncActionStatus.error;
        state.userInfo = undefined;
      });
  },
});

export const { logout } = onBoardingSlice.actions;

const onBoardingReducer = onBoardingSlice.reducer;
export default onBoardingReducer;
