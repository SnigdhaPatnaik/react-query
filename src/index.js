// 1. import All tools
import React from "react";
import { createRoot } from "react-dom/client";
import App from './App';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// QueryClient- Stores all cached API data
// QueryClientProvider- Gives React Query powers to the entire app

// 2. Create a Query Client

const client = new QueryClient();

// This creates a central storage for React Query.
// All your fetched data,cache,background refetching , etc, lives inside the client.
// Without this, React Query cannnot work.

// 3.Wrap App with QueryClientProvider
const root = createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={client}>
    <App />
    {/* our actual app, inside App,we can now safely use useQuery, useMutation etc. */}
  </QueryClientProvider>
);

// Explanation:
// document.getElementById("root")
// Tells React to mount the app into the <div id="root"></div> inside index.html

// {/* <QueryClientProvider client={client}></QueryClientProvider> */}
// .Think of this like a context provider for React Query
// it gives the whole React app access to:
// . useQuery
// . useMutation
// . caching
// . refetching
// . background updates

// Interview Answer:
// Here I created a QueryClient which stores all cached API data for React Query. 

// Then I wrapped my whole App inside QueryClientProvider so every
// component gets access to React Query features like caching,refetching, and useQuery.

// Finally , I render the App to the root element in the browser.


