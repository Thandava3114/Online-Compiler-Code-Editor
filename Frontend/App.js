import { Toaster } from "react-hot-toast";
import "./App.css";
import Create from "./components/Create";
import EditorPage from "./components/EditorPage";
import Home from "./components/Home";
import Join from "./components/Join";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/create",
      element: <Create />,
    },
    {
      path: "/join",
      element: <Join />,
    },
    {
      path: "/editor/:roomId",
      element: <EditorPage />,
    },
  ]);
  return (
    <>
      <div>
        <Toaster position="top-right"></Toaster>
      </div>
      <div className="App">
        <RouterProvider router={route}></RouterProvider>
      </div>
    </>
  );
}

export default App;
