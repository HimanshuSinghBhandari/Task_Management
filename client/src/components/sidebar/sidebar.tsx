"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FaBell,
  FaSun,
  FaHome,
  FaClipboard,
  FaCog,
  FaUsers,
  FaChartBar,
} from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import { IoIosAddCircle } from "react-icons/io";
import { RxDoubleArrowRight, RxDoubleArrowLeft } from "react-icons/rx";


const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState('');
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await axios.post("https://task-management-server-phi-five.vercel.app/user/logout", {} , {
        withCredentials:true
      });
      localStorage.removeItem('token');
      router.push('/');
      toast.success("Logged out Successfully!");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("https://task-management-server-phi-five.vercel.app/user/my-details", {
        withCredentials:true
      });
      setUsername(response.data.user);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUsername('User'); // Fallback username
    }
  };
  
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <motion.div
      initial={{ width: 250 }}
      animate={{ width: isOpen ? 250 : 60 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-full bg-white shadow-lg z-20 overflow-hidden"
    >
      <ToastContainer/>
      <div className="w-full h-full flex flex-col">
        {/* Profile Section */}
        <div className={`flex items-center p-4 ${!isOpen && "justify-center"}`}>
          <Image
            src="/profile-pic.jpg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <motion.span 
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? 'auto' : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-3 font-semibold text-lg whitespace-nowrap"
          >
           {username}
          </motion.span>
        </div>

        {/* Icons Row */}
        <div className={`flex items-center ${isOpen ? "p-4 justify-between" : "justify-center"}`}>
          {isOpen && <FaBell className="text-[#797979] cursor-pointer w-6 h-6" />}
          {isOpen && <FaSun className="text-[#797979] cursor-pointer w-6 h-6" />}
          {isOpen ? (
            <RxDoubleArrowLeft
              className="text-[#797979] cursor-pointer w-6 h-6"
              onClick={toggleSidebar}
            />
          ) : (
            <RxDoubleArrowRight
              className="text-[#797979] cursor-pointer w-6 h-6"
              onClick={toggleSidebar}
            />
          )}
          {isOpen && (
            <button 
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow">
          <NavItem icon={<FaHome className="w-6 h-6" />} text="Home" isOpen={isOpen} />
          <NavItem icon={<FaClipboard className="w-6 h-6" />} text="Boards" isOpen={isOpen} />
          <NavItem icon={<FaCog className="w-6 h-6" />} text="Settings" isOpen={isOpen} />
          <NavItem icon={<FaUsers className="w-6 h-6" />} text="Team" isOpen={isOpen} />
          <NavItem icon={<FaChartBar className="w-6 h-6" />} text="Analytics" isOpen={isOpen} />
          <motion.button 
            initial={false}
            animate={{ 
              width: isOpen ? 'auto' : 0,
              opacity: isOpen ? 1 : 0,
              marginLeft: isOpen ? 16 : 0,
              marginRight: isOpen ? 16 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="my-2 bg-gradient-to-b from-[#9C93D4] via-[#2F2188] to-[#4C38C2] text-white py-2 px-6 rounded-md flex items-center justify-center whitespace-nowrap overflow-hidden"
          >
            Create New Task
            <IoIosAddCircle className="ml-2 w-6 h-6" />
          </motion.button>
        </nav>

        {/* Download App Section */}
        <motion.div 
          initial={false}
          animate={{ 
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="p-4 overflow-hidden"
        >
          <button className="w-full bg-gray-200 text-gray-700 py-2 rounded-md flex items-center justify-center mb-2">
            <TfiDownload className="mr-3 w-6 h-6" />
            <div className="flex flex-col">
              Download the app
              <p className="text-xs text-gray-500 text-center flex flex-col">
                Get the full experience
              </p>
            </div>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; text: string; isOpen: boolean }> = ({
  icon,
  text,
  isOpen,
}) => (
  <Link href="#" className="flex items-center p-4 hover:bg-gray-200">
    <span className="mr-3 text-[#797979]">{icon}</span>
    <motion.span 
      initial={false}
      animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? 'auto' : 0 }}
      transition={{ duration: 0.2 }}
      className="text-lg text-[#797979] whitespace-nowrap"
    >
      {text}
    </motion.span>
  </Link>
);

export default Sidebar;