import { motion } from "framer-motion";
import { FaTimes, FaShare, FaStar, FaPlus, FaSun, FaFlag, FaCalendarAlt, FaAlignLeft } from "react-icons/fa";
import { VscArrowBoth } from "react-icons/vsc";
import { createTask, updateTask } from "@/components/api/task";
import { useState, useEffect } from "react";
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskModal: React.FC<{ 
    onClose: () => void; 
    onAddTask: (task: any) => void; 
    initialStatus: string;
    editingTask: any | null;
  }> = ({ onClose, onAddTask, initialStatus, editingTask }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(initialStatus);
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [customProperties, setCustomProperties] = useState<string[]>([]);
  
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setStatus(editingTask.status);
      setPriority(editingTask.priority);
      setDeadline(editingTask.deadline);
      setDescription(editingTask.description);
      setCustomProperties(editingTask.customProperties || []);
    }
  }, [editingTask]);

 const handleSave = async () => {
    console.log('Editing task:', editingTask); 
    const task = {
      id: editingTask?._id,
      title,
      status,
      priority,
      deadline: deadline ? new Date(deadline).toISOString() : null,
      description,
      customProperties,
    };
    console.log('Sending task data:', task);  // Add this line
    try {
        let response;
        if (editingTask) {
          response = await updateTask(editingTask._id, task);
          toast.success("Task updated successfully!");
        } else {
          response = await createTask(task);
          toast.success("Task created successfully!");
        }
        console.log("response", response.task);
        onAddTask(response.task);
        onClose();
      } catch (error) {
        console.error('Error saving task:', error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string }>;
          console.log("error saving a task");
          toast.error(axiosError.response?.data?.message || 'An error occurred while saving the task');
        } else {
          toast.error('An error occurred while saving the task');
        }
      }
  };

  const addCustomProperty = () => {
    setCustomProperties([...customProperties, ""]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
    >
     <ToastContainer/>
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl h-5/6 shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <VscArrowBoth className="text-gray-600 cursor-pointer mr-2" />
            <FaTimes className="text-gray-600 cursor-pointer" onClick={onClose} />
          </div>
          <div className="flex space-x-2">
            <button className="bg-gray-100 text-gray-600 p-2 rounded-lg flex items-center">
              <FaShare className="mr-1" /> Share
            </button>
            <button className="bg-gray-100 text-gray-600 p-2 rounded-lg flex items-center">
              <FaStar className="mr-1" /> Favourite
            </button>
          </div>
        </div>
        <div className="mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl text-gray-500 w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"
            placeholder="Title"
          />
        </div>
        <div className="space-y-4 mb-4">
          <div className="flex items-center">
            <FaSun className="mr-2 text-gray-500" />
            <span className="mr-2">Status:</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-gray-200 p-2 rounded-md flex-grow"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Under Review</option>
              <option>Finished</option>
            </select>
          </div>
          <div className="flex items-center">
            <FaFlag className="mr-2 text-gray-500" />
            <span className="mr-2">Priority:</span>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-gray-200 p-2 rounded-md flex-grow"
            >
              <option>Urgent</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-500" />
            <span className="mr-2">Deadline:</span>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="bg-gray-200 p-2 rounded-md flex-grow"
            />
          </div>
          <div className="flex items-center">
            <FaAlignLeft className="mr-2 text-gray-500" />
            <span className="mr-2">Description:</span>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-200 p-2 rounded-md flex-grow"
            />
          </div>
        </div>
        {customProperties.map((prop, index) => (
          <div key={index} className="flex items-center mb-2">
            <FaPlus className="mr-2 text-gray-500" />
            <input
              type="text"
              value={prop}
              onChange={(e) => {
                const newProps = [...customProperties];
                newProps[index] = e.target.value;
                setCustomProperties(newProps);
              }}
              className="bg-gray-200 p-2 rounded-md flex-grow"
              placeholder="Custom Property"
            />
          </div>
        ))}
        <button
          onClick={addCustomProperty}
          className="text-gray-600 p-2 rounded-lg flex items-center mb-4"
        >
          <FaPlus className="mr-1" /> Add Custom Property
        </button>
        <button
          onClick={handleSave}
          className="bg-gradient-to-b from-[#3A3A3A] to-[#202020] text-white py-2 px-4 rounded-lg"
        >
          Save
        </button>
      </div>
    </motion.div>
  );
};

export default TaskModal;