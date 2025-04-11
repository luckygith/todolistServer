const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");
const TodoModel = require("./Models/Todo.js");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("Server is running on 3001");
});

// mongoose.connect("mongodb://192.168.2.15:27017/test");

mongoose.connect("mongodb://localhost:27017/todolist");

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((error) => console.log(error));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => res.json(error));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
});
