import React from "react";
import { Dashboard, Login, PrivateRoute, Error } from "./pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute></PrivateRoute>,
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>,
      },
    ],
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
