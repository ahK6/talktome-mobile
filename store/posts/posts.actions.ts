import { anonAxiosApi } from "@/utils/axios/axiosInstances";
import { createAsyncThunkWithErrorHandling } from "@/utils/middlewares/createAsyncThunkWithErrorHandling";
import { apiUrl } from "@/constants/urls";
import { IPostParams, PostTypes } from "./posts.types";

export const getPostsByType = createAsyncThunkWithErrorHandling(
  "posts/getPostsByType",
  async ({
    inputParams: { page = 1, pageSize = 10, type = PostTypes.requesting },
    shouldStoreOutputState = false,
  }: IActionInputType<IPostParams>) => {
    const { data } = await anonAxiosApi.get(
      `${apiUrl}/posts/get-all?page=${page}&pageSize=${pageSize}&type=${type}`
    );

    return data.data;
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
