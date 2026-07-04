import api from "../api/axios";

export const signup = (data) => api.post("/users/signup", data);
export const login = (data) => api.post("/users/login", data);
