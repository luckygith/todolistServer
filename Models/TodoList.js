const mongoose = require("mongoose");

const TodoListSchema = new mongoose.Schema(
  {
    list: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    done: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    category: {
      type: String,
      default: "General",
    },
  },
  { timestamps: true }
);

const TodoListModel = mongoose.model("TodoList", TodoListSchema);
module.exports = TodoListModel;
