const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    task: {
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

const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = TodoModel;
