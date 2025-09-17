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
    <div className="w-full h-screen bg-zinc-200 p-[0.1px]  ">
      <Navigation />
      <div className="w-[100%] h-[90.9%] bg-zinc-200 md:p-10 p-3  mt-16 flex items-center justify-center">
        <div className="p-4 bg-white shadow rounded md:w-[32%] w-full ">
          <h1 className="text-xl text-center font-bold tracking-tight leading-none capitalize">
            update block
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <label className="block text-gray-700 capitalize font-semibold ">
                title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter block name"
                required
              />
            </div>
            <div className="w-full mt-5">
              <label className="block text-gray-700 capitalize font-semibold mb-1">
                start time
              </label>
              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="w-full mt-5">
              <label className="block text-gray-700 capitalize font-semibold mb-1">
                end time
              </label>
              <input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              className={`border mt-5 text-white capitalize font-semibold tracking-tight w-full px-2 py-1.5 outline-none rounded ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-950 hover:bg-blue-800"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Updating block..." : "Update block"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlock;
