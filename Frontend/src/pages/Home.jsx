import React from "react";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const Home = () => {
  return (
    <div className="w-full h-screen bg-zinc-200  ">
      <Navigation />
      <div className="w-[100%] h-[90.5%] bg-zinc-200 flex items-center justify-center">
        <div className="w-[95%] rounded-lg p-6  min-h-[90%] bg-white">
          <Link className="text-xl flex items-center justify-center w-fit gap-1  capitalize font-semibold bg-blue-800 px-3 rounded py-2 text-white">
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

                  <tr>
                    <td className="py-2 px-6 border-b text-zinc-300">Example Block</td>
                    <td className="py-2 px-6 border-b text-zinc-300">10:00 AM</td>
                    <td className="py-2 px-6 border-b text-zinc-300">12:00 PM</td>
                    <td className="py-2 px-6 border-b text-zinc-300">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 text-sm">
                        Edit
                      </button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm">
                        Delete
                      </button>
                    </td>
                  </tr>





                  
                  {/* Add more rows as needed */}
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
