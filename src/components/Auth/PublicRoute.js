import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PublicRoute(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard/teacher");
    }
  }, []);

  return <>{props.children}</>;
}

export default PublicRoute;
