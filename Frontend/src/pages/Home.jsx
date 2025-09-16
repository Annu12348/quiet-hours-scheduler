import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { instance } from "../utils/axios";
import { setBlocks } from "../reducer/Authentication/BlockSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { blocks } = useSelector((store) => store.block);
  console.log(blocks);

  const listApi = async () => {
    try {
      const response = await instance.get("/block/list", {
        withCredentials: true,
      });
      dispatch(setBlocks(response.data.blocks));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    listApi();
  }, []);

  return (
    <div className="w-full h-screen bg-zinc-200 p-[0.1px]  ">
      <Navigation />
      <div className="w-[100%] min-h-[90.9%] bg-zinc-700 mt-16 flex items-center justify-center">
        <div className="w-[95%] rounded-lg p-6 mt-7  min-h-[90%] bg-white">
          <Link
            to="/crete-block"
            className="text-xl flex items-center justify-center w-fit gap-1  capitalize font-semibold bg-blue-800 px-3 rounded py-2 text-white"
          >
            <span className="text-2xl mt-0.5 rotate-45 ">
              <IoMdClose />
            </span>
            new block
          </Link>
          <div className="w-full py-3 px-4 text-xl capitalize font-semibold shadow mt-7 rounded-lg ">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white  rounded-lg">
                <thead>
                  <tr>
                    <th className="py-3 px-6  border-b text-left text-gray-700 font-semibold">
                      Block Name
                    </th>
                    <th className="py-3 px-6  border-b text-left text-gray-700 font-semibold">
                      Start Time
                    </th>
                    <th className="py-3 px-6  border-b text-left text-gray-700 font-semibold">
                      End Time
                    </th>
                    <th className="py-3 px-6  border-b text-left text-gray-700 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blocks.length > 0 ?  (
                    blocks.map((block) => (
                      <tr key={block._id}>
                        <td className="py-2 px-6 border-b text-zinc-300">
                          {block.title}
                        </td>
                        <td className="py-2 px-6 border-b text-zinc-300">
                          {new Date(block.startTime).toLocaleString()}
                        </td>
                        <td className="py-2 px-6 border-b text-zinc-300">
                          {new Date(block.endTime).toLocaleString()}
                        </td>
                        <td className="py-2 px-6 border-b text-zinc-300">
                          <Link to='/Update-block' className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 text-sm">
                            Edit
                          </Link>
                          <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-4 px-6 text-center text-zinc-400">
                        No blocks
                      </td>
                    </tr>
                  )
                  
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
