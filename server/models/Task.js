const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    customProperties: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;