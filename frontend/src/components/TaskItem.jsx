import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, Circle, Clock, Edit2, Trash2, AlertCircle } from 'lucide-react';

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Work': return 'bg-blue-100 text-blue-700';
      case 'Study': return 'bg-purple-100 text-purple-700';
      case 'Personal': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-500';
      case 'Medium': return 'text-yellow-500';
      case 'Low': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-5 transition hover:shadow-md ${task.isCompleted ? 'border-gray-200 opacity-70' : 'border-gray-100'} flex flex-col h-full`}>
      <div className="flex justify-between items-start mb-3">
        <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getCategoryColor(task.category)}`}>
          {task.category}
        </div>
        <div className="flex space-x-1">
          <button onClick={onEdit} className="p-1.5 text-gray-400 hover:text-primary hover:bg-indigo-50 rounded-md transition">
            <Edit2 size={16} />
          </button>
          <button onClick={onDelete} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <h3 className={`text-lg font-bold mb-2 ${task.isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
        {task.title}
      </h3>
      
      {task.description && (
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
          {task.description}
        </p>
      )}

      <div className="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-xs font-medium text-gray-500">
          <div className="flex items-center space-x-1" title={`Priority: ${task.priority}`}>
            <AlertCircle size={14} className={getPriorityColor(task.priority)} />
            <span>{task.priority}</span>
          </div>
          {task.dueDate && (
            <div className="flex items-center space-x-1">
              <Clock size={14} className="text-gray-400" />
              <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
            </div>
          )}
        </div>
        
        <button 
          onClick={onToggleStatus}
          className={`flex items-center justify-center rounded-full transition ${task.isCompleted ? 'text-green-500 hover:text-green-600' : 'text-gray-300 hover:text-gray-400'}`}
        >
          {task.isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
