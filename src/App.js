import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostPage from "./pages/PostsPage";

const client = new QueryClient();
export default function App(){
    return (
        <QueryClientProvider client={client}> 
            <PostPage/>
        </QueryClientProvider>
    )
}