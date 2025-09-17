import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { instance } from "../utils/axios";
import { setBlock } from "../reducer/Authentication/BlockSlice";
import { toast } from "react-toastify";

const UpdateBlock = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { block } = useSelector((store) => store.block);

  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchBlock = async () => {
    try {
      const response = await instance.get(`/block/list`, {
        withCredentials: true,
      });
      const blocks = response.data.blocks;
      const currentBlock = blocks.find((block) => block._id === id);
      if (currentBlock) {
        dispatch(setBlock(currentBlock));
        setFormData({
          title: currentBlock.title,
          startTime: new Date(currentBlock.startTime)
            .toISOString()
            .slice(0, 16),
          endTime: new Date(currentBlock.endTime).toISOString().slice(0, 16),
        });
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else if (err.message) {
        toast.error(err.message);
      } else {
        toast.error("Error fetching block. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchBlock();
  }, [id]);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await instance.put(`/block/update/${id}`, formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Block updated successfully!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else if (err.message) {
        toast.error(err.message);
      } else {
        toast.error("Error updating block. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-100">
      <Navigation />
      <div className="w-full min-h-[90vh] md:p-10 p-4 mt-16 flex items-center justify-center">
        <div className="w-full md:max-w-2xl bg-white rounded-lg shadow-lg ring-1 ring-gray-200">
          <div className="px-5 pt-5 pb-3 border-b border-gray-100">
            <h1 className="text-2xl font-bold tracking-tight leading-tight capitalize text-gray-900 text-center">
              update block
            </h1>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Modify the title and schedule. Your changes will be saved securely.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-5 pb-6 pt-5">
            <div className="mt-1">
              <label className="block text-gray-800 capitalize font-semibold mb-1">
                title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="Enter block name"
                autoComplete="off"
                required
                disabled={loading}
                aria-invalid={false}
              />
              <p className="mt-1.5 text-xs text-gray-500">Use a clear, descriptive name.</p>
            </div>

            <div className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 capitalize font-semibold mb-1">
                  start time
                </label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  required
                  disabled={loading}
                />
                <p className="mt-1.5 text-xs text-gray-500">Set when the quiet period begins.</p>
              </div>
              <div>
                <label className="block text-gray-800 capitalize font-semibold mb-1">
                  end time
                </label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  required
                  disabled={loading}
                />
                <p className="mt-1.5 text-xs text-gray-500">Set when the quiet period ends.</p>
              </div>
            </div>

            <button
              className={`mt-6 inline-flex items-center justify-center gap-2 text-white capitalize font-semibold tracking-tight w-full px-4 py-2.5 outline-none rounded-md transition-colors ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-950 hover:bg-blue-800"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              )}
              {loading ? "Updating block..." : "Update block"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlock;
