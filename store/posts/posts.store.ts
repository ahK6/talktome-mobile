import { createSlice } from "@reduxjs/toolkit";
import { AsyncActionStatus } from "@/shared/types/enums.types";
import { IPosts, PostTypes } from "./posts.types";
import { getAllKeywords, getPostsByType, searchPosts } from "./posts.actions";
import { getUpdatedPosts } from "./posts.helpers";

const initialState: IPosts = {
  postsRequestingLists: { data: [], totalPages: 0 },
  postsRequestingListStatus: AsyncActionStatus.idle,
  postsHelpingLists: [],
  postsHelpingListStatus: AsyncActionStatus.idle,
  keywords: [],
  keywordsStatus: AsyncActionStatus.idle,
  searchResults: [],
  searchPagination: null,
  searchFilters: null,
  searchStatus: AsyncActionStatus.idle,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchPagination = null;
      state.searchFilters = null;
      state.searchStatus = AsyncActionStatus.idle;
    },
    appendSearchResults: (state, action) => {
      // Para paginación infinita
      state.searchResults = [...state.searchResults, ...action.payload.data];
      state.searchPagination = action.payload.pagination;
    }
  },
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
              state.postsRequestingLists.data,
              action.payload.data
            );
            state.postsRequestingListStatus = AsyncActionStatus.done;
            state.postsRequestingLists.data = updated;
          } else {
            const updated = getUpdatedPosts(
              state.postsHelpingLists,
              action.payload.data
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
      })
      .addCase(searchPosts.pending, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState) {
          state.searchStatus = AsyncActionStatus.loading;
          
          // Si es página 1, limpiar resultados anteriores
          if (action.meta.arg.inputParams.page === 1) {
            state.searchResults = [];
          }
        }
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState) {
          state.searchStatus = AsyncActionStatus.done;
          
          // Si es página 1, reemplazar. Si es página > 1, agregar
          if (action.meta.arg.inputParams.page === 1) {
            state.searchResults = action.payload.data;
          } else {
            state.searchResults = [...state.searchResults, ...action.payload.data];
          }
          
          state.searchPagination = action.payload.pagination;
          state.searchFilters = action.payload.filters;
        }
      })
      .addCase(searchPosts.rejected, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState) {
          state.searchStatus = AsyncActionStatus.error;
        }
      });
  },
});

export const {clearSearchResults, appendSearchResults} = postsSlice.actions;

const postsReducer = postsSlice.reducer;
export default postsReducer;
