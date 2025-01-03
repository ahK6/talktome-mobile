import { AsyncActionStatus } from "@/shared/types/enums.types";

export interface IPosts {
  postsRequestingLists: IPost[];
  postsRequestingListStatus: AsyncActionStatus;
  postsHelpingLists: IPost[];
  postsHelpingListStatus: AsyncActionStatus;
  keywords: IKeywords[];
  keywordsStatus: AsyncActionStatus;
}

export interface IKeywords {
  _id: string;
  value: string;
}

export interface IPost {
  _id: string;
  title: string;
  content: string;
  keywords: string[];
  status: string;
  idUserCreator: {
    id: string;
    nickName: String;
  };
  createdAt: Date;
  updatedAt: Date;
  comments?: any[];
  id: string;
  type?: string;
}

export interface IPostParams {
  page: number;
  pageSize?: number;
  type: PostTypes;
}

export enum PostTypes {
  requesting = "requesting",
  helping = "helping",
}
