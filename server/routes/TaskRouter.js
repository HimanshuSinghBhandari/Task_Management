const express = require("express");
const { createTask, getTasks, deleteTask, updateTask } = require("../controllers/TaskController");

const TaskRouter = express.Router();

TaskRouter.post("/tasks", createTask);
TaskRouter.get("/tasks", getTasks);
TaskRouter.delete("/tasks/:id", deleteTask);
TaskRouter.put("/tasks/:id", updateTask);

module.exports = TaskRouter;