import { createSlice } from "@reduxjs/toolkit";
import { AsyncActionStatus } from "@/shared/types/enums.types";
import { IPosts, PostTypes } from "./posts.types";
import { getAllKeywords, getPostsByType } from "./posts.actions";
import { getUpdatedPosts } from "./posts.helpers";

const initialState: IPosts = {
  postsRequestingLists: [],
  postsRequestingListStatus: AsyncActionStatus.idle,
  postsHelpingLists: [],
  postsHelpingListStatus: AsyncActionStatus.idle,
  keywords: [],
  keywordsStatus: AsyncActionStatus.idle,
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
      })

      .addCase(getAllKeywords.pending, (state, action) => {
        state.keywordsStatus = AsyncActionStatus.loading;
      })
      .addCase(getAllKeywords.fulfilled, (state, action) => {
        state.keywordsStatus = AsyncActionStatus.done;
        state.keywords = action.payload;
      })

      .addCase(getAllKeywords.rejected, (state, action) => {
        state.keywordsStatus = AsyncActionStatus.error;
      });
  },
});

export const {} = postsSlice.actions;

const postsReducer = postsSlice.reducer;
export default postsReducer;
