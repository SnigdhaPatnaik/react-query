import api from "../api/axiosClient";

export const fetchPosts = () =>
    api.get("/posts").then((res)=> res.data);

export const createPost = (data) =>
    api.post("/posts",data);

export const updatePostById = (data) => 
    api.put(`/posts/${data.id}`, data);

export const deletePostById = (id) =>
    api.delete(`/posts/${id}`);