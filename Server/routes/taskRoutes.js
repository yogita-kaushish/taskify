const express = require("express");
const router = express.Router();
const Task = require("./models/Tasks");


// GET all tasks
router.get("/", async (req, resp) => {
  const tasks = await Task.find()
    .then((tasks) => resp.status(200).json(tasks))
    .catch((err) => resp.status(500).send("Error fetching tasks:", err));
});

// POST a new task
router.post("/", async(req, resp) => {
  const newTask = new Task({
    name: req.body.name,
    completed: req.body.completed || false,
  });

  const newtask = await newTask.save()
    .then((newtask) => resp.status(201).send(`${newtask}`))
    .catch((err) => resp.status(401).send(`Error in creating task:${err}`));
});


// PUT (update) a task
router.put("/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, { name: req.body.name }, { new: true });
    if (updatedTask) {
      return resp.status(200).send(`Task updated successfully: ${updatedTask}`);
    } else {
      return resp.status(404).send('Task not found');
    }
  } catch (err) {
    return resp.status(500).send(`Error in updating task: ${err.message}`);
  }
});


// DELETE a task
router.delete("/:id", (req, resp) => {
  Task.findByIdAndDelete(req.params.id)
    .then((task) => {
      if (!task) {
        return resp.status(404).send("Task with this ID does not exist!!");
      }
      resp.send("Task deleted successfully!");
    })
    .catch((err) => {
      console.error(err);
      resp.status(500).send("Error occurred while deleting the task");
    });
});

module.exports = router;
