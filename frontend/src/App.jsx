import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import RefreshHandler from "./refreshHandler";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

function App() {
  const [isUserAuthenticated, setisUserAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isUserAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <>
      <div className="App">
        <RefreshHandler setisUserAuthenticated={setisUserAuthenticated} />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
