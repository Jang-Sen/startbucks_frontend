import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProductList from "./page/ProductList";
import Main from "./page/Main";
import Error from "./page/Error";

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
    ],
  },
]);

export default router;
