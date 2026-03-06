import axios from "./axios";

export const sendMessage = (data) =>
  axios.post("/messages", data).then(res => res.data);

export const getMessages = (userId) =>
  axios.get(`/messages/${userId}`).then(res => res.data);