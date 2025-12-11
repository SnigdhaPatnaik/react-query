Below is a **clean, industry-level, interview-friendly folder structure** for FULL CRUD using React Query.

Everything is separated properly:
✔ `api/` → axios instance
✔ `services/` → API functions
✔ `hooks/` → React Query GET, POST, PUT, DELETE hooks
✔ `components/` → UI components
✔ `pages/` → Page that uses CRUD
✔ `App.js` → main entry

This is the **best practice** and extremely easy to understand.

---

# 📁 **FINAL CLEAN FOLDER STRUCTURE (React Query CRUD)**

```
src/
│
├── api/
│   └── axiosClient.js
│
├── services/
│   └── postService.js
│
├── hooks/
│   ├── usePosts.js
│   └── usePostMutations.js
│
├── components/
│   ├── PostCard.jsx
│   └── AddPostButton.jsx
│
├── pages/
│   └── PostsPage.jsx
│
└── App.js
```

---

# 🟦 **1. api/axiosClient.js**

```jsx
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default api;
```

---

# 🟩 **2. services/postService.js**

(All API calls in one file – clean & reusable)

```jsx
import api from "../api/axiosClient";

export const fetchPosts = () =>
  api.get("/posts").then((res) => res.data);

export const createPost = (data) =>
  api.post("/posts", data);

export const updatePostById = (data) =>
  api.put(`/posts/${data.id}`, data);

export const deletePostById = (id) =>
  api.delete(`/posts/${id}`);
```

---

# 🟨 **3. hooks/usePosts.js**

(GET API using React Query)

```jsx
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../services/postService";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 10000,
  });
};
```

---

# 🟧 **4. hooks/usePostMutations.js**

(POST, PUT, DELETE)

```jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  updatePostById,
  deletePostById,
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
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });

  return { addPost, updatePost, deletePost };
};
```

---

# 🟫 **5. components/PostCard.jsx**

(User-friendly Update + Delete UI)

```jsx
import React, { useState } from "react";

export default function PostCard({ post, updatePost, deletePost }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginTop: 10 }}>
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: 6, width: "80%" }}
          />

          <button
            onClick={() => {
              updatePost.mutate({ ...post, title });
              setIsEditing(false);
            }}
          >
            Save
          </button>

          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </>
      )}

      {!isEditing && (
        <div style={{ marginTop: 10 }}>
          <button onClick={() => setIsEditing(true)}>Edit</button>

          {!confirmDelete ? (
            <button
              style={{ marginLeft: 10 }}
              onClick={() => setConfirmDelete(true)}
            >
              Delete
            </button>
          ) : (
            <>
              <span style={{ marginLeft: 10 }}>Confirm?</span>
              <button
                onClick={() => deletePost.mutate(post.id)}
                style={{ marginLeft: 10 }}
              >
                Yes
              </button>
              <button onClick={() => setConfirmDelete(false)}>No</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
```

---

# 🟦 **6. components/AddPostButton.jsx**

```jsx
export default function AddPostButton({ addPost }) {
  return (
    <button
      onClick={() =>
        addPost.mutate({
          title: "New Post",
          body: "Created via UI",
          userId: 1,
        })
      }
      style={{
        padding: "8px 12px",
        background: "green",
        color: "white",
        borderRadius: 5,
      }}
    >
      ➕ Add Post
    </button>
  );
}
```

---

# 🟩 **7. pages/PostsPage.jsx**

```jsx
import React from "react";
import { usePosts } from "../hooks/usePosts";
import { usePostMutations } from "../hooks/usePostMutations";
import PostCard from "../components/PostCard";
import AddPostButton from "../components/AddPostButton";

export default function PostsPage() {
  const { data: posts, isLoading } = usePosts();
  const { addPost, updatePost, deletePost } = usePostMutations();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>React Query CRUD (Clean Structure)</h2>

      <AddPostButton addPost={addPost} />

      {posts.slice(0, 5).map((post) => (
        <PostCard
          key={post.id}
          post={post}
          updatePost={updatePost}
          deletePost={deletePost}
        />
      ))}
    </div>
  );
}
```

---

# 🟧 **8. App.js**

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostsPage from "./pages/PostsPage";

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <PostsPage />
    </QueryClientProvider>
  );
}
```

---

