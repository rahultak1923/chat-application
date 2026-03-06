import axios from "./axios";

export const registerUser = (data) =>
  axios.post("/users/register", data).then(res => res.data);

export const loginUser = (data) =>
  axios.post("/users/login", data).then(res => res.data);

export const getUsers = () =>
  axios.get("/users").then(res => res.data);