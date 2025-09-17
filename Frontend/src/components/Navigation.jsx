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

  const logoutApi = async () => {
    try {
      setLoading(true);

      const response = await instance.delete("/auth/logout", {
        withCredentials: true,
      });
      
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
    <div className="relative">
      {/* Main Navigation Bar */}
      <nav className="fixed top-0 left-0  right-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-md bg-opacity-95 border-b border-slate-700/50 shadow-2xl">
        <div className="max-w-7xl   mx-auto px-4 sm:px-6 lg:px-6 ">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="flex items-center space-x-3 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-bold text-lg">Q</span>
                </div>
                <span className="text-xl lg:text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Quiet Hours Scheduler
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  to="/"
                  className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-slate-700/50 relative group"
                >
                  <span className="relative z-10">Home</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </Link>

                {!user && (
                  <>
                    <Link
                      to="/login"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:scale-105 transform"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transform"
                    >
                      Sign Up
                    </Link>
                  </>
                )}

                {user && (
                  <button
                    onClick={clickHandler}
                    className={`bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-105 transform ${
                      loading ? "opacity-50 cursor-not-allowed scale-100 hover:scale-100" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Logging out...</span>
                      </span>
                    ) : (
                      "Logout"
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={clickHandlers}
                className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <IoMdClose className="block h-6 w-6" />
                ) : (
                  <FiAlignJustify className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800/95 backdrop-blur-md border-t border-slate-700/50">
              <Link
                to="/"
                className="text-slate-300 hover:text-white block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-slate-700/50"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              {!user && (
                <div className="space-y-2 pt-2">
                  <Link
                    to="/login"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white block w-full text-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white block w-full text-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
              
              {user && (
                <button
                  onClick={() => {
                    clickHandler();
                    setIsOpen(false);
                  }}
                  className={`bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white block w-full text-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Logging out...</span>
                    </span>
                  ) : (
                    "Logout"
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-16 lg:h-20"></div>
    </div>
  );
};

export default Navigation;
