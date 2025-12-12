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
