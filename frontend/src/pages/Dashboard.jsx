import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import { PlusCircle, LayoutList } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskSubmit = () => {
    fetchTasks();
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteClick = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const handleStatusToggle = async (task) => {
    try {
      const response = await api.put(`/tasks/${task._id}`, { isCompleted: !task.isCompleted });
      setTasks(tasks.map(t => t._id === task._id ? response.data : t));
    } catch (error) {
      console.error('Error updating task status', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <LayoutList className="text-primary" />
            My Tasks
          </h1>
          <p className="text-gray-500 mt-1">Manage your coursework and personal life.</p>
        </div>
        <button 
          onClick={() => { setEditingTask(null); setIsFormOpen(true); }}
          className="bg-primary hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg transition font-medium shadow-md flex items-center gap-2"
        >
          <PlusCircle size={20} />
          <span>New Task</span>
        </button>
      </div>

      {isFormOpen && (
        <TaskForm 
          task={editingTask} 
          onClose={() => { setIsFormOpen(false); setEditingTask(null); }} 
          onSubmit={handleTaskSubmit} 
        />
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <LayoutList size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">No tasks yet</h3>
          <p className="text-gray-500 mt-2">Get started by creating your first task.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onEdit={() => handleEditClick(task)}
              onDelete={() => handleDeleteClick(task._id)}
              onToggleStatus={() => handleStatusToggle(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
