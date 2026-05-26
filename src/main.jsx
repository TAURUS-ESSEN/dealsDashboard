import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";
import { App } from "./App.tsx";
import { UsersList } from "./components/UsersList";
import { ClientsList } from "./components/ClientsList";
import { ErrorPage } from "./components/ErrorPage";
import { DashboardMain } from "./components/DashboardMain";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardMain /> },
      { path: "/users", element: <UsersList /> },
      { path: "/clients", element: <ClientsList /> },
 
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={router} />,
  // </StrictMode>,
);
