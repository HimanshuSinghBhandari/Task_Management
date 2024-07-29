import { useState } from "react";
import { CiClock2 } from "react-icons/ci";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";

interface TaskCardProps {
  id: string;
  title: string;
  content: string;
  priority: 'urgent' | 'medium' | 'low';
  dueDate: string;
  updatedAgo: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ id, title, content, priority, dueDate, updatedAgo, onEdit, onDelete }: TaskCardProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-orange-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md flex flex-col justify-between h-64 relative mb-4">
      <div className="absolute top-2 right-2">
        <button onClick={(e) => {
          e.stopPropagation();
          setShowMenu(!showMenu);
        }} className="text-gray-500 hover:text-gray-700">
          <FaEllipsisV />
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(id);
                setShowMenu(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FaEdit className="inline mr-2" /> Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
                setShowMenu(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FaTrash className="inline mr-2" /> Delete
            </button>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-xl text-[#606060] font-semibold">{title}</h3>
        <p className="text-[#797979] mt-2">{content}</p>
      </div>
      <div className="flex flex-col items-start">
        <span className={`${getPriorityColor(priority)} text-md font-medium px-3 py-1 rounded-xl`}>
          {priority}
        </span>
        <div className="flex items-center text-gray-500 text-md mt-2">
          <CiClock2 className="mr-2 h-6 w-6" />
          <span>{dueDate}</span>
        </div>
      </div>
      <div className="text-sm text-[#797979]">
        {updatedAgo}
      </div>
    </div>
  );
};

export default TaskCard;