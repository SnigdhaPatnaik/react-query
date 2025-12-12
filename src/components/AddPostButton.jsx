export default function AddPostButton({addPost}){
    return (
        <button
        onClick={()=>
            addPost.mutate({
                title: "New Post",
                body: "Created via UI",
                userId: 1
            })
        }
        style={{
            padding: " 8px 12px",
            background: "green",
            color: "white",
            borderRadius: 5,
        }}
        >
            ➕ Add Post
        </button>
    )
}