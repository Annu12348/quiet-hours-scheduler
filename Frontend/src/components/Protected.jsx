import { useNavigate } from "react-router-dom";
import { instance } from "../utils/axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../reducer/Authentication/AuthenticationSlice";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  
  const meRoutesget = () => {
    instance.get("/auth/me", { withCredentials: true })
      .then(response => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("An error occurred while authenticating.");
        }
        navigate("/login");
        dispatch(setUser(null))
      });
  };

  useEffect(() => {
    meRoutesget();
  }, []);
  return children;
};

export default Protected;