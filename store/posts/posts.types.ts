import { AsyncActionStatus } from "@/shared/types/enums.types";

export interface IPosts {
  postsRequestingLists: IPostElements;
  postsRequestingListStatus: AsyncActionStatus;
  postsHelpingLists: IPost[];
  postsHelpingListStatus: AsyncActionStatus;
  keywords: IKeywords[];
  keywordsStatus: AsyncActionStatus;
  searchResults: IPost[];
  searchPagination: ISearchPostsResponse['pagination'] | null;
  searchFilters: ISearchPostsResponse['filters'] | null;
  searchStatus: AsyncActionStatus;
  selectedKeyword: ISearchByKeywordParams | null;
  activeTab: number;
}

export interface IKeywords {
  _id: string;
  value: string;
}

export interface IPostElements {
  data: IPost[];
  totalPages: number;
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

export interface IPostRequestingParams {
  title: string;
  content: string;
  keywords: string[];
  type?: PostTypes;
}

export interface IPostDetail {
  _id: string;
  title: string;
  content: string;
  type: string;
  keywords: string[];
  status: string;
  idUserCreator: string;
  createdAt: Date;
  updatedAt: Date;
  comments: any[];
  id: string;
}

export type IComments = {
  data: IComment[];
};

export type IComment = {
  _id: string;
  idPost: string;
  content: string;
  status: string;
  likes: number;
  idUserCreator: null;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export interface ISearchPostsParams {
  query?: string;
  keywords?: string[];
  page?: number;
  limit?: number;
  type?: 'requesting' | 'helping';
}

export interface ISearchPostsResponse {
  data: IPost[];
  pagination: {
    currentPage: number;
    totalPages: number;
    total: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    query: string;
    keywords: string[];
    type: string;
  };
}

export interface ISearchByKeywordParams {
  keyword: string;
  type: PostTypes;
}