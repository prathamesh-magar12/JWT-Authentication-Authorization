import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setisUserAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      setisUserAuthenticated(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        navigate("/home", { replace: false });
      }
    }
  }, [location, navigate, setisUserAuthenticated]);

  return null;
};

export default RefreshHandler;
