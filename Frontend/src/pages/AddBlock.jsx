import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { instance } from "../utils/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setBlock } from "../reducer/Authentication/BlockSlice";
import { useNavigate } from "react-router-dom";

const AddBlock = () => {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });

  const addblockApi = async () => {
    try {
      setLoading(true);

      const response = await instance.post("/block/createblock", input, {
        withCredentials: true,
      });
      console.log(response)
      Navigate("/")
      toast.success(response.data.message);
      dispatch(setBlock(response.data.block))
      setInput({
        title: "",
        startTime: "",
        endTime: "",
      });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else if (err.message) {
        toast.error(err.message);
      } else {
        
        toast.error("Internal server error");
      }
    } finally {
      setLoading(false);
    }
  };

  const clickedHandler = (e) => {
    e.preventDefault();
    addblockApi()
  };
  return (
    <div className="w-full h-screen bg-zinc-200 p-[0.1px]  ">
      <Navigation />
      <div className="w-[100%] h-[90.9%] bg-zinc-200 md:p-10 p-3  mt-16 flex items-center justify-center">
        <div className="p-4 bg-white shadow rounded md:w-[32%] w-full ">
          <h1 className="text-xl text-center font-bold tracking-tight leading-none capitalize">
            add new block
          </h1>
          <form onSubmit={clickedHandler}>
            <div className="mt-5">
              <label className="block text-gray-700 capitalize font-semibold ">
                title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter block name"
                value={input.title}
                onChange={(e) => setInput({ ...input, title: e.target.value })}
              />
            </div>
            <div className="w-full mt-5">
              <label className="block text-gray-700 capitalize font-semibold mb-1">
                start time
              </label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={input.startTime}
                onChange={(e) =>
                  setInput({ ...input, startTime: e.target.value })
                }
              />
            </div>
            <div className="w-full mt-5">
              <label className="block text-gray-700 capitalize font-semibold mb-1">
                end time
              </label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={input.endTime}
                onChange={(e) =>
                  setInput({ ...input, endTime: e.target.value })
                }
              />
            </div>
            <input
              className={`border mt-5 text-white capitalize font-semibold tracking-tight w-full px-2 py-1.5 outline-none rounded ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#36A420]"
              }`}
              type="submit"
              value={loading ? "adding block..." : "add block"}
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlock;