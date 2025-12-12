import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../services/postService";

export const usePosts = () => {
    return useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
        staleTime: 10000,
    });
};