const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, status, priority, deadline, description, customProperties } = req.body;

  try {
    console.log('Attempting to create task with data:', req.body);
    
    const task = await Task.create({
      title,
      status,
      priority,
      deadline,
      description,
      customProperties,
    });

    console.log('Task created successfully:', task);
    return res.status(201).json({ task });
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({ message: "Error creating task", error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving tasks", error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  console.log('Updating task with ID:', id);
  if (!id) {
    return res.status(400).json({ message: "Task ID is required" });
  }
  const { title, status, priority, deadline, description, customProperties } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      {
        title,
        status,
        priority,
        deadline,
        description,
        customProperties,
      },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ message: "Error updating task", error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting task", error: error.message });
  }
};