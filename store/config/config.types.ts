import { AsyncActionStatus } from "@/shared/types/enums.types";

export interface IUserConfig {
  _id: string;
  userId: string;
  notifications: boolean;
  contactInfoVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IConfigState {
  userConfig: IUserConfig | null;
  configStatus: AsyncActionStatus;
  updateStatus: AsyncActionStatus;
  resetStatus: AsyncActionStatus;
}

// Tipos para las acciones - siguiendo el patrón de posts
export interface IGetConfigRequest {
  shouldStoreOutputState?: boolean;
}

export interface IGetConfigResponse {
  success: boolean;
  data: IUserConfig;
  message: string;
}

export interface IUpdateConfigRequest {
  inputParams: {
    notifications?: boolean;
    contactInfoVisible?: boolean;
  };
  shouldStoreOutputState?: boolean;
}

export interface IUpdateConfigResponse {
  success: boolean;
  data: IUserConfig;
  message: string;
}

// Corregido: sin category, solo setting y value
export interface IUpdateSingleSettingRequest {
  inputParams: {
    setting: 'notifications' | 'contactInfoVisible';
    value: boolean;
  };
  shouldStoreOutputState?: boolean;
}

export interface IResetConfigRequest {
  shouldStoreOutputState?: boolean;
}

export interface IResetConfigResponse {
  success: boolean;
  data: IUserConfig;
  message: string;
}

// Tipo global para actions (si no existe)
declare global {
  interface IActionInputType<T> {
    inputParams: T;
    shouldStoreOutputState?: boolean;
  }
}