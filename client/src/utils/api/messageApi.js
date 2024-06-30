import axiosClient from "./axiosClient";

export const messageApi = {
  ask: ({ message }) => axiosClient.post(`/messages/ask-ai`, { message }),
  getText: (message) => axiosClient.post("/messages/get-text", { message }),
  aiGene: (title, category) =>
    axiosClient.post("/messages/ai-gene", { title, category }),
};
