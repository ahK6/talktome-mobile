import { anonAxiosApi, privateAxiosApi } from "@/utils/axios/axiosInstances";
import { createAsyncThunkWithErrorHandling } from "@/utils/middlewares/createAsyncThunkWithErrorHandling";
import { apiUrl } from "@/constants/urls";
import {
  IPostDetail,
  IPostParams,
  IPostRequestingParams,
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
    console.log("wekfjwlkefjkwelfj");
    const { data } = await anonAxiosApi.get(
      `${apiUrl}/posts/get-post?idPost=${idPost}`
    );

    return data;
  }
);
