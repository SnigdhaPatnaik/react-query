import { useMutation, useQuery } from "@tanstack/react-query";
import api from './api';

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await api.get("/posts");
      return res.data;
    }
  })
  const createUser = useMutation({
    mutationFn: async (newUser) => {
      const res = await api.post("/users", newUser);
      return res.data;
    },
    onSucess: () => {
      alert("User created successfully!");
    },
    onError: () => {
      alert("Something went wrong!");
    }
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <div>
      <h2>Posts</h2>
      {
        data.slice(0, 5).map((item) => (
          <p key={item.id}>{item.id}: {item.title}</p>
        ))
      }
      <button
        onClick={() =>
          createUser.mutate({
            name: "Snigdha",
            email: "snigdha@example.com"
          })
        }
      >
        Create User
      </button>

      {
        createUser.isPending && <p>Creating user...</p>
      }
    </div>
  )
}
export default App;