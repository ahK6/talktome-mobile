import { anonAxiosApi, privateAxiosApi } from "@/utils/axios/axiosInstances";
import { createAsyncThunkWithErrorHandling } from "@/utils/middlewares/createAsyncThunkWithErrorHandling";
import { apiUrl } from "@/constants/urls";
import {
  IComments,
  IPostDetail,
  IPostParams,
  IPostRequestingParams,
  ISearchPostsParams,
  ISearchPostsResponse,
  PostTypes,
} from "./posts.types";

export const getPostsByType = createAsyncThunkWithErrorHandling(
  "posts/getPostsByType",
  async ({
    inputParams: { page = 1, pageSize = 10, type = PostTypes.requesting },
    shouldStoreOutputState = false,
  }: IActionInputType<IPostParams>) => {
    const { data } = await anonAxiosApi.get(
      `${apiUrl}/posts/get-all?page=${page}&pageSize=${pageSize}&type=${type}`
    );

    return { data: data.data, totalPages: data.totalPages };
  }
);

export const getAllKeywords = createAsyncThunkWithErrorHandling(
  "posts/getAllKeywords",
  async ({
    shouldStoreOutputState = true,
  }: {
    shouldStoreOutputState?: boolean;
  }) => {
    const { data } = await anonAxiosApi.get(`${apiUrl}/posts/get-keywords`);

    return data.data;
  }
);

export const postRequest = createAsyncThunkWithErrorHandling(
  "posts/postRequest",
  async ({
    inputParams: { title, content, keywords, type = PostTypes.requesting },
  }: {
    inputParams: IPostRequestingParams;
  }) => {
    const params = new URLSearchParams();
    params.append("title", title);
    params.append("content", content);
    params.append("type", type);
    keywords.forEach((keyword) => params.append("keywords", keyword));

    const { data } = await privateAxiosApi.post(
      `${apiUrl}/posts/create-post`,
      params
    );

    return data;
  }
);

export const postDetail = createAsyncThunkWithErrorHandling(
  "posts/postDetail",
  async ({
    inputParams: { idPost },
  }: {
    inputParams: { idPost: string };
  }): Promise<IPostDetail> => {
    const { data } = await anonAxiosApi.get(
      `${apiUrl}/posts/get-post?idPost=${idPost}`
    );

    return data;
  }
);

export const getcommentsByPostId = createAsyncThunkWithErrorHandling(
  "posts/getcommentsByPostId",
  async ({
    inputParams: { idPost },
  }: {
    inputParams: { idPost: string };
  }): Promise<IComments> => {
    const { data } = await anonAxiosApi.get(
      `${apiUrl}/comments/get-comments?idPost=${idPost}`
    );

    return data;
  }
);

export const postComment = createAsyncThunkWithErrorHandling(
  "posts/postComment",
  async ({
    inputParams: { idPost, commentContent },
  }: {
    inputParams: { idPost: string; commentContent: string };
  }): Promise<any> => {
    const params = new URLSearchParams();
    params.append("idPost", idPost);
    params.append("content", commentContent);

    const { data } = await privateAxiosApi.post(
      `${apiUrl}/comments/create-comment`,
      params
    );

    return data;
  }
);

export const searchPosts = createAsyncThunkWithErrorHandling(
  "posts/searchPosts",
  async ({
    inputParams: { query, keywords, page = 1, limit = 10, type = 'requesting' },
  }: IActionInputType<ISearchPostsParams>) => {
    const params = new URLSearchParams();
    
    if (query) params.append("q", query);
    if (keywords && keywords.length > 0) {
      params.append("keywords", keywords.join(','));
    }
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    params.append("type", type);

    const { data } = await anonAxiosApi.get(
      `${apiUrl}/posts/search?${params.toString()}`
    );

    return data as ISearchPostsResponse;
  }
);