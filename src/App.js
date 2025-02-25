import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./component/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
