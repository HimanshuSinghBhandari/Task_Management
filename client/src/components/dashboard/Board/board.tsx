"use client";
import { useState, useEffect } from "react";
import { FaTasks, FaPlus } from 'react-icons/fa';
import TaskCard from "../card/task-card-component";
import TaskModal from "./Taskmodel";
import { fetchTasks, updateTask, deleteTask, createTask } from "@/components/api/task";
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Board: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [editingTask, setEditingTask] = useState<any | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks.tasks);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string }>;
          toast.error(axiosError.response?.data?.message || 'Failed to load tasks');
        } else {
          toast.error('Failed to load tasks');
        }
      }
    };
    loadTasks();
  }, []);

  const handleAddNewTask = (status: string) => {
    setIsModalOpen(true);
    setCurrentStatus(status);
    setEditingTask(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const addOrUpdateTask = async (newTask: any) => {
    try {
        let response: { task: any; };
        if (editingTask) {
          response = await updateTask(editingTask._id, newTask);
          setTasks(tasks.map(task => task._id === editingTask._id ? response.task : task));
          toast.success("Task updated successfully!");
        } else {
          response = await createTask(newTask);
          setTasks([...tasks, response.task]);
          toast.success("Task created successfully!");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string }>;
          toast.error(axiosError.response?.data?.message || 'Failed to add or update task');
        } else {
          toast.error('Failed to add or update task');
        }
      }
  };

  const handleEditTask = (id: string) => {
    const taskToEdit = tasks.find(task => task._id === id);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
      setCurrentStatus(taskToEdit.status);
      setIsModalOpen(true);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
        await deleteTask(id);
        setTasks(tasks.filter(task => task._id !== id));
        toast.success("Task deleted successfully!");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string }>;
          toast.error(axiosError.response?.data?.message || 'Failed to delete task');
        } else {
          toast.error('Failed to delete task');
        }
      }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, status: string) => {
    const taskId = e.dataTransfer.getData("taskId");
    const draggedTask = tasks.find(task => task._id === taskId);
    if (!draggedTask) return;

    try {
        const updatedTask = await updateTask(draggedTask._id, { ...draggedTask, status });
        setTasks(tasks.map(task => task._id === draggedTask._id ? updatedTask.task : task));
        toast.success("Task status updated successfully!");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string }>;
          toast.error(axiosError.response?.data?.message || 'Failed to update task status');
        } else {
          toast.error('Failed to update task status');
        }
      }
  };

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const renderTaskCards = (status: string) => {
    return tasks
      .filter(task => task.status === status)
      .map((task, index) => (
        <div
          key={task._id}
          draggable
          onDragStart={(e) => handleDragStart(e, task._id)}
          className="mb-2"
        >
          <TaskCard
            id={task._id}
            title={task.title}
            content={task.description}
            priority={task.priority}
            dueDate={task.deadline}
            updatedAgo="Just now"
            onEdit={() => handleEditTask(task._id)}
            onDelete={() => handleDeleteTask(task._id)}
          />
        </div>
      ));
  };

  return (
    <>
      <ToastContainer />
      <div className="relative">
        {isModalOpen && <TaskModal onClose={closeModal} onAddTask={addOrUpdateTask} initialStatus={currentStatus} editingTask={editingTask} />}
        <div className="bg-white rounded-lg p-4 shadow-md mt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["To Do", "In Progress", "Under Review", "Finished"].map((status) => (
            <div
              key={status}
              onDrop={(e) => handleDrop(e, status)}
              onDragOver={allowDrop}
              className="flex flex-col"
            >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">{status}</span>
                  <FaTasks className="text-gray-500" />
                </div>
                {renderTaskCards(status)}
                <button
                  onClick={() => handleAddNewTask(status)}
                  className="flex items-center justify-between bg-gradient-to-b from-[#3A3A3A] to-[#202020] text-white py-2 px-4 rounded-lg mt-4"
                >
                  <span>Add New</span>
                  <FaPlus className="ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
