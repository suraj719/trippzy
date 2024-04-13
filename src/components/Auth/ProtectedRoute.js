import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import { Setuser } from "../../redux/user";

function ProtectedRoute(props) {
  const navigate = useNavigate();
  const [readyToRednder, setReadyToRednder] = React.useState(false);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      dispatch(ShowLoading());
      const token = localStorage.getItem("token");
      dispatch(HideLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/get-user-by-id`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(Setuser(response.data.data));
        setReadyToRednder(true);
      }
    } catch (error) {
      localStorage.removeItem("token");
      dispatch(HideLoading());
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return readyToRednder && <>{props.children}</>;
}

export default ProtectedRoute;
