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
  console.log("GET /get HIT!");
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((error) => console.log(error));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((todos) => {
      res.json(todos);
    })
    .catch((error) => res.json(error));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;

  TodoModel.findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      // Toggle done value
      return TodoModel.findByIdAndUpdate(
        id,
        { done: !todo.done },
        { new: true } // returning the updated doc!!
      );
    })
    .then((updatedTodo) => {
      res.json(updatedTodo);
      console.log("PUT API - toggled done:", updatedTodo.done);
    })
    .catch((error) => console.log(error));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndUpdate({ _id: id }, { done: false })
    .then((result) => {
      console.log(result);
      console.log(res.json(result));
      console.log(result.data);
      console.log(result.data.done);
      console.log("PUT API");
    })
    .catch((error) => console.log(error));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => {
      console.log("this is delete api");
      console.log(res.json(result));
    })

    .then((todos) => {
      res.json(todos);
    })
    .catch((error) => console.log(error));
});

app.post("addlist", (req, res) => {});

app.post("/addlist", (req, res) => {
  const list = req.body.task;
  TodoListModel.create({
    list: list,
  })
    .then((list) => {
      res.json(list);
    })
    .catch((error) => res.json(error));
});
