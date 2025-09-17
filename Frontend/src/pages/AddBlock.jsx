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

      
      const payload = {
        title: input.title,
        startTime: input.startTime ? new Date(input.startTime).toISOString() : "",
        endTime: input.endTime ? new Date(input.endTime).toISOString() : "",
      };

      const response = await instance.post("/block/createblock", payload, {
        withCredentials: true,
      });
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
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Navigation />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden max-w-2xl w-full mx-auto">
          <div className="px-5 sm:px-8 py-5 sm:py-6 border-b border-gray-100 bg-gradient-to-b from-white to-gray-50">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight capitalize">add new block</h1>
            <p className="mt-1 text-sm text-gray-500">Define a quiet-hours block with a clear title and time range.</p>
          </div>
          <form onSubmit={clickedHandler} className="px-5 sm:px-8 py-5 sm:py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  id="title"
                  type="text"
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                  placeholder="Enter block name (e.g., Team Focus Time)"
                  value={input.title}
                  onChange={(e) => setInput({ ...input, title: e.target.value })}
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start time</label>
                <input
                  id="startTime"
                  type="datetime-local"
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                  value={input.startTime}
                  onChange={(e) => setInput({ ...input, startTime: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End time</label>
                <input
                  id="endTime"
                  type="datetime-local"
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                  value={input.endTime}
                  onChange={(e) => setInput({ ...input, endTime: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => Navigate(-1)}
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400/30"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 transition ${
                  loading ? "bg-green-400 cursor-not-allowed" : "bg-[#36A420] hover:bg-green-700"
                }`}
              >
                {loading && (
                  <svg className="-ml-0.5 mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                )}
                {loading ? "Adding block..." : "Add block"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlock;