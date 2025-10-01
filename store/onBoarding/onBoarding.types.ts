import { AsyncActionStatus } from "@/shared/types/enums.types";

export interface IOnBoardingUserParams {
  password: string;
  email: string;
}

export interface ICreateAccountParams extends IOnBoardingUserParams {
  nickName: string;
}

export interface ILoginParams extends IOnBoardingUserParams {}

export interface IUser {
  userInfo: IUserInfo | undefined;
  userInfoStatus: AsyncActionStatus;
}

export interface IUserInfo {
  userInformation: IUserInformation;
  token: string;
}

export interface IUserInformation {
  id: string;
  username: string;
  email: string;
}
