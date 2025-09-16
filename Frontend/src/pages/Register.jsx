import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../utils/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../reducer/Authentication/AuthenticationSlice";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const RegisterApi = async () => {
    try {
      setError("");
      setLoading(true);

      const response = await instance.post("/auth/register", value, {
        withCredentials: true,
      });
      console.log(response.data.user);
      dispatch(setUser(response.data.user));
      toast.success(response.data.message || "Registration successful!");
      navigate("/login");
      setValue({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Internal server error");
      }
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(value);
    RegisterApi();
  };

  return (
    <div className="bg-zinc-200 w-full h-screen flex items-center justify-center px-2 md:p-4">
      <div className="p-4 bg-white rounded md:w-[35%] w-full">
        <h1 className="text-center capitalize font-semibold tracking-tight leading-none">
          quiet hours scheduler
        </h1>
        {error && (
          <div className="border mt-4 px-2 py-3 rounded border-zinc-200 flex items-center justify-center">
          <p className="text-red-500   text-center">
            {error} please try again later
          </p>
          </div>
        )}
        <form className="mt-6" onSubmit={submitHandler}>
          <div className="flex flex-col">
            <label className="text-md capitalize font-semibold tracking-tight leading-none">
              name
            </label>
            <input
              className="border border-zinc-300 capitalize font-semibold tracking-tight w-full px-2 py-1.5 mt-1.5  outline-none rounded"
              type="text"
              placeholder="ynter your name"
              value={value.name}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col mt-5">
            <label className="text-md capitalize font-semibold tracking-tight leading-none">
              email
            </label>
            <input
              className="border border-zinc-300 font-semibold tracking-tight w-full px-2 py-1.5 mt-1.5  outline-none rounded"
              type="email"
              placeholder="Enter Your Email"
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col mt-5">
            <label className="text-md capitalize font-semibold tracking-tight leading-none">
              password
            </label>
            <input
              className="border border-zinc-300 capitalize font-semibold tracking-tight w-full px-2 py-1.5 mt-1.5  outline-none rounded"
              type="password"
              placeholder="ynter your password"
              value={value.password}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              required
            />
          </div>

          <input
            className={`border mt-5 text-white capitalize font-semibold tracking-tight w-full px-2 py-1.5 outline-none rounded ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#36A420]"
            }`}
            type="submit"
            value={loading ? "sibn up in..." : "sign up"}
            disabled={loading}
          />
        </form>
        <h1 className="mt-4 text-md text-center tracking-tight leading-none font-semibold">
          Already have an account?{" "}
          <Link
            className="text-blue-500 capitalize hover:underline"
            to="/login"
          >
            login
          </Link>{" "}
        </h1>
      </div>
    </div>
  );
};

export default Register;
