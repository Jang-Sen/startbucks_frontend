import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProductList from "./page/ProductList";
import Main from "./page/Main";
import Error from "./page/Error";
import Signup from "./page/Auth/Signup";
import Login from "./page/Auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: "/",
        element: <Main />,
      },
      {
        path: "/product",
        element: <ProductList />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
