import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createPost,
    updatePostById,
    deletePostById
} from "../services/postService";

export const usePostMutations = () => {
    const queryClient = useQueryClient();

    const addPost = useMutation({
        mutationFn: createPost,
        onSuccess: () => queryClient.invalidateQueries(["posts"]),
    });

    const updatePost = useMutation({
        mutationFn: updatePostById,
        onSuccess: () => queryClient.invalidateQueries(["posts"]),
    });

    const deletePost = useMutation({
        mutationFn: deletePostById,
        onSuccess: () => queryClient.invalidateQueries(["posts"])
    });

    return { addPost, updatePost, deletePost };
};