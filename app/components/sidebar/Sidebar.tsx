import React from 'react';
import { FiPlus, FiSearch, FiBookmark, FiSettings } from 'react-icons/fi';
import { FaRegLightbulb } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-20 bg-white rounded-2xl shadow-lg flex flex-col items-center py-8 justify-between">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-2xl">
          <CgMenuGridR />
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer">
          <FiPlus size={24} />
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer">
          <FiSearch size={24} />
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer">
          <FaRegLightbulb size={24} />
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer">
          <FiBookmark size={24} />
        </div>
      </div>
      <div className="flex flex-col items-center space-y-6">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer">
          <FiSettings size={24} />
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <img src="/image.png" alt="User Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
