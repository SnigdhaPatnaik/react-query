

# 🌟 **React Query — (But Interview Ready!)**
![Uploading image.png…]()



## 🟦 **What is React Query?**

React Query is like a **smart helper** that brings data from API for you.

Instead of you writing:

* fetch()
* useEffect()
* loading states
* error states

React Query says:

> *“Relax… I will fetch the data, store it, remember it, update it, refetch it.”*

---

# 🟩 **Why do we use React Query?**

Because **fetching data manually is painful**.

Without React Query →
❌ You write too much code
❌ You manage loading
❌ You manage error
❌ You store data
❌ You refresh data manually

With React Query →
✅ Auto-loading
✅ Auto-error
✅ Auto-caching
✅ Auto-refetch
✅ Background updates
✅ Easy mutations (POST/PUT/DELETE)

---

# 🟧 **How React Query Works? (Like explaining to a 5-year-old)**

Think React Query as:

* **Fridge (Cache)** — keeps data saved
* **Delivery Boy (Query)** — fetches data
* **New Order (Mutation)** — sends new data

You simply say:

> “React Query, please get this data for me.”

And it does everything.

---

# 🔵 **Most Important Concepts (Interview)**

## ✔ 1. **Query** (GET data)

A query fetches & stores data.

```js
const { data, isLoading, isError } = useQuery({
  queryKey: ["posts"],
  queryFn: () => fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json()),
});
```

**queryKey** → unique name
**queryFn** → API function

---

## ✔ 2. **Query Key**

Like giving a name to the data so React Query remembers it.

Example:

* ["posts"]
* ["post", id]
* ["user", 1, "comments"]

Interview line:

> React Query uses queryKey to identify, cache, refetch and update data.

---

## ✔ 3. **Mutation** (POST/PUT/DELETE)

Mutation means **changing data**.

```js
const mutation = useMutation({
  mutationFn: (newPost) =>
    fetch("/posts", {
      method: "POST",
      body: JSON.stringify(newPost)
    }),
});
```

Use:

```js
mutation.mutate({ title: "Hello" });
```

Interview line:

> Queries are for GET, Mutations are for CREATE/UPDATE/DELETE.

---

## ✔ 4. **Cache**

React Query stores data in memory.

Why?
Because next time you switch page →
React Query says *“I already have the data. No need to call API again.”*

---

## ✔ 5. **Stale Time**

How long data is “fresh”.

Example:

```js
staleTime: 5000   // 5 sec fresh
```

Interview line:

> Data is fresh → React Query does not refetch
> Data is stale → It refetches in background.

---

## ✔ 6. **Refetching**

React Query automatically re-fetches when:

* Window focus
* Network reconnect
* Stale time over

You can manually:

```js
refetch();
```

---

## ✔ 7. **Invalidate Query**

When you change data (after mutation), you must refresh the old data.

```js
queryClient.invalidateQueries(["posts"]);
```

Interview line:

> Invalidating tells React Query: “Hey, this data is old. Get new one.”

---

## ✔ 8. **DevTools**

React Query comes with a built-in devtool.

```jsx
<ReactQueryDevtools initialIsOpen={false} />
```

You can see:

* cache
* refetch
* states

---

## ✔ 9. **Error Handling**

React Query automatically catches errors.

Example:

```js
if (isError) return "Something went wrong";
```

---

## ✔ 10. **Query States**

Every query has 4 states:

| State        | Meaning             |
| ------------ | ------------------- |
| `isLoading`  | first time fetching |
| `isError`    | API failed          |
| `isFetching` | background refetch  |
| `isSuccess`  | data is ready       |

---

# 🟣 **React Query Short Example (Full Flow)**

```jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch("/posts").then(res => res.json()),
  });

  const addPost = useMutation({
    mutationFn: (newPost) =>
      fetch("/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postsQuery.isLoading) return "Loading...";
  
  return (
    <>
      <button onClick={() => addPost.mutate({ title: "New Post" })}>
        Add Post
      </button>

      {postsQuery.data.map((p) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </>
  );
}
```

---

# 🟢 **Interview Cheat Sheet (Super Short)**

### **Define React Query**

> A library that handles API calls, caching, refetching and updating data automatically.

### **Why use it?**

> To avoid manually managing loading, error, caching and refetch logic.

### **Difference between Query & Mutation**

> Query = Get data.
> Mutation = Change data.

### **What is Query Key?**

> A unique identifier for caching & refetching.

### **What is Invalidate Query?**

> It refreshes old cached data.

### **What is Stale Time?**

> How long data is considered fresh.

### **What is Cache Time?**

> How long unused data stays in memory.

### **Is React Query a state management tool?**

> No. It is a **server-state management tool**, not client-state.

