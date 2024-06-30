import axiosClient from "./axiosClient";

export const postApi = {
  getTopPosts: () => axiosClient.get("post/top-post"),
  getNewPosts: () => axiosClient.get("post/new-post"),
};
