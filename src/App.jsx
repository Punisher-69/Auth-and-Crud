import { useEffect, useState } from "react";
import Data from "./Components/Data";
import LoginPage from "./Components/LoginPage";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <LoginPage />
        </>
      ),
    },
    {
      path: "/products",
      element: (
        <>
          <Data />
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
