import { createSlice } from "@reduxjs/toolkit";
import { AsyncActionStatus } from "@/shared/types/enums.types";
import { IPosts, PostTypes } from "./posts.types";
import { getPostsByType } from "./posts.actions";
import { getUpdatedPosts } from "./posts.helpers";

const initialState: IPosts = {
  postsRequestingLists: [],
  postsRequestingListStatus: AsyncActionStatus.idle,
  postsHelpingLists: [],
  postsHelpingListStatus: AsyncActionStatus.idle,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostsByType.pending, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState) {
          if (action.meta.arg.inputParams.type === PostTypes.requesting) {
            state.postsRequestingListStatus = AsyncActionStatus.loading;
          } else {
            state.postsHelpingListStatus = AsyncActionStatus.loading;
          }
        }
      })
      .addCase(getPostsByType.fulfilled, (state, action) => {
        //console.log("paaaylloodd " + JSON.stringify(action.payload));

        if (action.meta.arg.shouldStoreOutputState) {
          if (action.meta.arg.inputParams.type === PostTypes.requesting) {
            const updated = getUpdatedPosts(
              state.postsRequestingLists,
              action.payload
            );
            state.postsRequestingListStatus = AsyncActionStatus.done;
            state.postsRequestingLists = updated;
          } else {
            const updated = getUpdatedPosts(
              state.postsHelpingLists,
              action.payload
            );
            state.postsHelpingListStatus = AsyncActionStatus.done;
            state.postsHelpingLists = updated;
          }
        }
      })
      .addCase(getPostsByType.rejected, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState) {
          if (action.meta.arg.inputParams.type === PostTypes.requesting) {
            state.postsRequestingListStatus = AsyncActionStatus.error;
          } else {
            state.postsHelpingListStatus = AsyncActionStatus.error;
          }
        }
      });
  },
});

export const {} = postsSlice.actions;

const postsReducer = postsSlice.reducer;
export default postsReducer;
