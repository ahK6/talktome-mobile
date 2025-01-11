import { anonAxiosApi } from "@/utils/axios/axiosInstances";
import { createAsyncThunkWithErrorHandling } from "@/utils/middlewares/createAsyncThunkWithErrorHandling";
import { apiUrl } from "@/constants/urls";
import { ICreateAccountParams, ILoginParams } from "./onBoarding.types";

export const createAccount = createAsyncThunkWithErrorHandling(
  "onBoarding/createAccount",
  async ({
    inputParams: { password, nickName, email },
  }: IActionInputType<ICreateAccountParams>) => {
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("nickName", nickName);
    params.append("password", password);

    console.log("ergjkerlgjerg " + password);

    const { data } = await anonAxiosApi.post(
      `${apiUrl}/users/sign-up`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data;
  }
);

export const login = createAsyncThunkWithErrorHandling(
  "onBoarding/login",
  async ({
    inputParams: { password, email },
  }: IActionInputType<ILoginParams>) => {
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);

    const { data } = await anonAxiosApi.post(`${apiUrl}/users/login`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return data;
  }
);
