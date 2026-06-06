import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";
import { App } from "./App.tsx";
import { UsersList } from "./components/users/UsersList";
import { ClientsList } from "./components/ClientsList";
import { ErrorPage } from "./components/ErrorPage";
import { DashboardMain } from "./components/DashboardMain";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardMain /> },
      { path: "users", element: <UsersList /> },
      { path: "clients", element: <ClientsList /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
  // </StrictMode>,
);
