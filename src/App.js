import "./App.css";
import { RouterProvider } from "react-router-dom";
import NavBar from "./component/NavBar";
import { AuthProvider } from "./context/authContext";
import router from "./router";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <RouterProvider router={router} />
      {/*<Outlet />*/}
    </AuthProvider>
  );
}

export default App;
