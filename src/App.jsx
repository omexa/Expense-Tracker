import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Nav from "./Componets/Nav";
import Expense from "./Componets/Expense";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [{ path: "", element: <Expense /> }],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

function Layout() {
  return (
    <div className="h-screen w-full grid grid-rows-[auto_1fr]">
      <Nav />
      <div className="flex w-full p-2 border border-red-500">
        <Outlet />
      </div>
    </div>
  );
}
