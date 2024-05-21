import {
    createBrowserRouter
} from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import Register from "../Register/Register";


const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        }
      ],
    },
]);

export default router;