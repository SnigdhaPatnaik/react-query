import React from "react";
import { usePosts } from "../hooks/usePosts";
import { usePostMutations } from "../hooks/usePostMutations";
import PostCard from "../components/PostCard";
import AddPostButton from "../components/AddPostButton";

export default function PostsPage() {
  const { data: posts, isLoading } = usePosts();
  const { addPost, updatePost, deletePost } = usePostMutations();

  if(isLoading) return <p>Loading....</p>;

  return (
    <div style={{ padding: 20}}>
        <h2>React QUery CRUD (Clean Structure)</h2>

        <AddPostButton addPost={addPost}/>

        {
            posts?.slice(0,5).map((post) => (
                <PostCard
                key={post.id}
                post={post}
                updatePost={updatePost}
                deletePost={deletePost}
                />
            ))
        }

    </div>
  );
}
