import axiosClient from "./axiosClient";

export const postApi = {
  updateView: (id) => axiosClient.put(`/post/view/${id}`),
  likePost: (id, userId) => axiosClient.post(`/post/like/${id}`, { userId }),
};
