import { IPost } from "./posts.types";

export const getUpdatedPosts = (
  currentPosts: IPost[] = [],
  newPosts: IPost[] = []
): IPost[] => {
  const updateStateList = currentPosts.filter(
    (b: IPost) => !newPosts.some((newB: IPost) => newB._id === b._id)
  );

  return [...updateStateList, ...newPosts];
};
