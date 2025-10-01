import { privateAxiosApi } from "@/utils/axios/axiosInstances";
import { createAsyncThunkWithErrorHandling } from "@/utils/middlewares/createAsyncThunkWithErrorHandling";
import { apiUrl } from "@/constants/urls";
import {
  IGetConfigRequest,
  IGetConfigResponse,
  IUpdateConfigRequest,
  IUpdateConfigResponse,
  IUpdateSingleSettingRequest,
  IResetConfigRequest,
  IResetConfigResponse,
} from "./config.types";

// Obtener configuración del usuario autenticado
export const getMyConfig = createAsyncThunkWithErrorHandling(
  "config/getMyConfig",
  async ({
    shouldStoreOutputState = true,
  }: IGetConfigRequest): Promise<IGetConfigResponse> => {
    const { data } = await privateAxiosApi.get(`${apiUrl}/config/me`);
    return data;
  }
);

// Obtener configuración de usuario específico (para admin)
export const getUserConfig = createAsyncThunkWithErrorHandling(
  "config/getUserConfig",
  async ({
    inputParams: { userId },
    shouldStoreOutputState = true,
  }: IActionInputType<{ userId: string }>): Promise<IGetConfigResponse> => {
    const { data } = await privateAxiosApi.get(`${apiUrl}/config/user/${userId}`);
    return data;
  }
);

// Actualizar mi configuración
export const updateMyConfig = createAsyncThunkWithErrorHandling(
  "config/updateMyConfig",
  async ({
    inputParams,
    shouldStoreOutputState = true,
  }: IUpdateConfigRequest): Promise<IUpdateConfigResponse> => {
    const { data } = await privateAxiosApi.patch(
      `${apiUrl}/config/me`,
      inputParams
    );
    return data;
  }
);

// Actualizar configuración de usuario específico (para admin)
export const updateUserConfig = createAsyncThunkWithErrorHandling(
  "config/updateUserConfig",
  async ({
    inputParams,
    userId,
    shouldStoreOutputState = true,
  }: IUpdateConfigRequest & { userId: string }): Promise<IUpdateConfigResponse> => {
    const { data } = await privateAxiosApi.patch(
      `${apiUrl}/config/user/${userId}`,
      inputParams
    );
    return data;
  }
);

// Actualizar una configuración específica
export const updateSingleSetting = createAsyncThunkWithErrorHandling(
  "config/updateSingleSetting",
  async ({
    inputParams,
    userId,
    shouldStoreOutputState = true,
  }: IUpdateSingleSettingRequest & { userId?: string }): Promise<IUpdateConfigResponse> => {
    const endpoint = userId 
      ? `${apiUrl}/config/user/${userId}/setting`
      : `${apiUrl}/config/me/setting`;
      
    const { data } = await privateAxiosApi.patch(endpoint, inputParams);
    return data;
  }
);

// Resetear mi configuración
export const resetMyConfig = createAsyncThunkWithErrorHandling(
  "config/resetMyConfig",
  async ({
    shouldStoreOutputState = true,
  }: IResetConfigRequest): Promise<IResetConfigResponse> => {
    const { data } = await privateAxiosApi.delete(`${apiUrl}/config/me/reset`);
    return data;
  }
);

// Resetear configuración de usuario específico (para admin)
export const resetUserConfig = createAsyncThunkWithErrorHandling(
  "config/resetUserConfig",
  async ({
    inputParams: { userId },
    shouldStoreOutputState = true,
  }: IActionInputType<{ userId: string }>): Promise<IResetConfigResponse> => {
    const { data } = await privateAxiosApi.delete(`${apiUrl}/config/user/${userId}/reset`);
    return data;
  }
);