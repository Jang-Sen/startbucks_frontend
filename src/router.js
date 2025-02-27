import { createBrowserRouter } from "react-router-dom";
import Layout from "./component/Layout";
import PublicRoute from "./component/PublicRoute";
import ProtectRoute from "./component/ProtectRoute";
import { ChangePassword, FindPassword, Login, Signup } from "./page/Auth";
import Profile from "./page/Profile";
import ProductList from "./page/ProductList";
import Main from "./page/Main";
import Error from "./page/Error";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/",
            element: <Main />,
          },
          {
            path: "/signup",
            element: <Signup />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/find/password",
            element: <FindPassword />,
          },
          {
            path: "/change/password",
            element: <ChangePassword />,
          },
        ],
      },
      {
        element: <ProtectRoute />,
        errorElement: <Error />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/product",
            element: <ProductList />,
          },
        ],
      },
    ],
  },
]);

export default router;
