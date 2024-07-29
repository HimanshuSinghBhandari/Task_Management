"use client"

import { motion } from 'framer-motion';
import { HiMagnifyingGlass, HiCalendar, HiAdjustmentsHorizontal, HiShare } from "react-icons/hi2";
import { BsStars } from "react-icons/bs";
import { IoIosAddCircle } from "react-icons/io";

const SearchAndActionsBar = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center bg-gray-100 mt-4"
    >
      {/* Search bar */}
      <div className="relative w-1/4">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full pl-3 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <HiMagnifyingGlass className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Right side actions */}
      <div className="flex items-center space-x-3">
        {/* Calendar */}
        <div className="flex items-center bg-gray-200 px-4 py-2 rounded-md">
          <span className="mr-2 text-sm font-medium">Calendar view</span>
          <HiCalendar className="text-gray-600 w-5 h-5" />
        </div>

        {/* Automation */}
        <div className="flex items-center bg-gray-200 px-4 py-2 rounded-md">
          <span className="mr-2 text-sm font-medium">Automation</span>
          <BsStars className='text-gray-600 w-5 h-5'/>
        </div>

        {/* Filter */}
        <div className="flex items-center bg-gray-200 px-4 py-2 rounded-md">
          <span className="mr-2 text-sm font-medium">Filter</span>
          <HiAdjustmentsHorizontal className="text-gray-600 w-5 h-5" />
        </div>

        {/* Share */}
        <div className="flex items-center bg-gray-200 px-4 py-2 rounded-md">
          <span className="mr-2 text-sm font-medium">Share</span>
          <HiShare className="text-gray-600 w-5 h-5" />
        </div>

        {/* Create New */}
        <button className="bg-gradient-to-b from-[#9C93D4] via-[#2F2188] to-[#4C38C2] text-white py-2 px-4 rounded-md flex items-center justify-center">
          <span className="text-sm font-medium">Create New Task</span>
          <IoIosAddCircle className="ml-2 w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default SearchAndActionsBar;