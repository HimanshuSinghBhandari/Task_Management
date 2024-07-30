"use client"

import { motion } from 'framer-motion';
import { HiQuestionMarkCircle } from "react-icons/hi2";
import SearchAndActionsBar from './search';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useState, useEffect } from 'react';
const Board = dynamic(() => import('./Board/board'), { ssr: false });

const DashHomePage = () => {

  const [username, setUsername] = useState('');
  
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

  const cards = [
    {
      title: 'Introducing tags',
      description: 'Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.',
      color: 'bg-blue-200',
    },
    {
      title: 'Share not instantly',
      description: 'Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.',
      color: 'bg-green-200',
    },
    {
      title: 'Access anywhere',
      description: 'Sync your notes across all devices. Stay productive whether you are on your phone, tablet, or computer.',
      color: 'bg-yellow-200',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-2">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[40px] font-semibold"
        >
          Good morning, {username}!
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <span className="text-[18px] mr-2">Help and feedback</span>
          <HiQuestionMarkCircle className='h-6 w-6 text-gray-600'/>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="flex p-2">
              <div className="w-[30%]">
                <div className={`w-24 h-24 ${card.color} rounded-lg flex items-center justify-center text-2xl font-bold`}>
                  {card.title[0]}
                </div>
              </div>
              <div className="w-[70%] ml-1">
                <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <SearchAndActionsBar/>
      <Board/>
    </div>
  );
};

export default DashHomePage;