import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../reducer/Authentication/AuthenticationSlice";
import { toast } from "react-toastify";
import { instance } from "../utils/axios";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const Navigation = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.Auth);
  const [isOpen, setIsOpen] = useState(false);
  console.log(user);

  const logoutApi = async () => {
    try {
      setLoading(true);

      const response = await instance.delete("/auth/logout", {
        withCredentials: true,
      });
      console.log(response);
      dispatch(setUser(null));
      toast.success(response.data.message || "Logout successful!");
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else if (err.message) {
        toast.error(err.message);
      } else {
        toast.error("An error occurred during logout.");
      }
    } finally {
      setLoading(false);
    }
  };

  const clickHandler = () => {
    logoutApi();
  };

  const clickHandlers = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="   ">
      <div className="flex items-center px-10  bg-zinc-400 justify-between p-3 w-full">
        <Link
          to="/"
          className="text-white z-20 md:text-xl leading-none  font-semibold capitalize tracking-tight"
        >
        Quiet Hours Scheduler
        </Link>

        <div className="flex gap-5 items-center">
          <Link
            to="/"
            className="text-white md:block hidden font-semibold capitalize tracking-tight"
          >
            home
          </Link>
          {!user && (
            <div className="md:flex hidden  items-center gap-5">
              <Link
                to="/login"
                className="text-white  bg-blue-700 px-6 rounded leading-none py-3 font-semibold capitalize hover:bg-blue-500 tracking-tight"
              >
              home
              </Link>
              <Link
                to="/signup"
                className="text-white font-semibold bg-blue-700 px-6 rounded leading-none py-3 hover:bg-blue-500 capitalize tracking-tight"
              >
                sign up
              </Link>
            </div>
          )}

          

          {user && (
            <button
              onClick={clickHandler}
              className={`text-white font-semibold md:block hidden bg-red-700 px-6 rounded leading-none py-3 hover:bg-red-300 capitalize tracking-tight ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging out..." : "logout"}
            </button>
          )}
        </div>
        <button
          onClick={clickHandlers}
          className="text-white z-20 md:hidden  text-3xl"
        >
          {isOpen ? <IoMdClose /> : <FiAlignJustify />}
        </button>
      </div>
      {isOpen && (
        <div className="w-[60%] h-screen md:hidden px-3 bg-black rounded-lg flex items-center flex-col  py-15  absolute top-0 left-0">
          <Link
            to="/"
            className="text-white z-20 w-full text-xl border-zinc-300 py-2 font-semibold capitalize tracking-tight"
          >
            home
          </Link>
          {!user && (
            
              <div className="flex flex-col w-full   items-center gap-5">
                <Link
                  to="/login"
                  className="text-white  bg-blue-700 px-6 w-full text-center rounded leading-none py-3 font-semibold capitalize hover:bg-blue-500 tracking-tight"
                >
                  login
                </Link>
                <Link
                  to="/signup"
                  className="text-white font-semibold bg-blue-700 px-6 w-full text-center rounded leading-none py-3 hover:bg-blue-500 capitalize tracking-tight"
                >
                  sign up
                </Link>
              </div>
            
          )}
          {user && (
            <button
              onClick={clickHandler}
              className={`text-white font-semibold w-full mt-3  bg-red-700 px-6 rounded leading-none py-3 hover:bg-red-300 capitalize tracking-tight ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging out..." : "logout"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navigation;
