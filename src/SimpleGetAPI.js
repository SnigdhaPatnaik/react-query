import {
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import api from './api';

function SimpleGetAPI() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],

    queryFn: async () => {
      const res = await api.get("/posts");
      return res.data;
    },
    
    // ⭐ STALE TIME (Data fresh for 10 seconds)
    staleTime: 10000,

    // ⭐ CACHE TIME (Unused data kept in cache for 1 minute)
    cacheTime: 60000,

    // ⭐ Automatically refetch when user comes back
    refetchOnWindowFocus: true,

    // ⭐ Retry API 2 times if fails
    retry: 2,

    // ⭐ Auto refetch every 20 seconds
    refetchInterval: 20000
  })
  // How to explain this:

  // queryKey: ["posts"]

  //     Unique name for this API call
  //     React Query uses it for caching
  //     If another component uses the same key, cache is reused

  // queryFn: async () => { ... }

  //     Function that actually fetches the data
  //     Using Axios: api.get("/posts")
  //     Returning only res.data

  // Destructuring:

  //     React Query automatically gives:
  //     data → API result
  //     isLoading → true while fetching
  //     error → true if API fails

  // 🟩 How to explain this code in interview
  // Answer:
  // I created an Axios instance for API calls.
  // Then I used React Query’s useQuery() to fetch data.
  // React Query automatically handles caching, loading, and errors.
  // So I didn’t need to write useEffect or manage states manually.
  // It improves performance because it caches data and refetches in background.

  const createUser = useMutation({
    mutationFn: async (newUser) => {
      const res = await api.post("/posts", newUser);
      return res.data;
    },
    onSucess: () => {
      // alert("User created successfully!");
      // 🔥 Refetch the GET API after user creation
      queryClient.invalidateQueries(["posts"]);
    },
    onError: () => {
      alert("Something went wrong!");
    }
  });
  // You bring in the useMutation hook which is used for POST, PUT, DELETE.
  // Explanation:
  // mutationFn → The function that runs when.mutate() is called
  // newUser → Data passed from component
  // api.post("/users", newUser) → Axios POST call
  // return res.data → React Query stores this returned value

  // ⭐ Simple Interview Answer

  // In React Query, useMutation is used for POST / PUT / DELETE.
  // I define a mutation with mutationFn, and call it using.mutate().
  // React Query automatically gives me loading, success, and error states.
  // Axios handles the actual API call, and React Query manages the state.

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
export default SimpleGetAPI;