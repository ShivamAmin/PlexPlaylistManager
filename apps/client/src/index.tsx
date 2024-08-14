import React, { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import "@/index.css";
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { v4 } from 'uuid';
import { routeTree } from './routeTree.gen';


let clientID = localStorage.getItem('X-Plex-Client-Identifier');
if (!clientID) {
  const uuid = v4();
  localStorage.setItem('X-Plex-Client-Identifier', uuid);
  clientID = uuid;
}

const authToken = localStorage.getItem('authToken');

const ReactQueryDevtools =
  import.meta.env.PROD
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/react-query-devtools').then((res) => ({
          default: res.ReactQueryDevtools,
        })),
      )

// Create a new router instance
const router = createRouter({ routeTree, context: {
  authToken: authToken,
}})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      </QueryClientProvider>
    </StrictMode>,
  )
}