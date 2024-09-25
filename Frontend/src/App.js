import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for API requests
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingID, setEditingID] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Fetch tasks from backend when the component mounts
  const fetchTasks = () => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((response) => {
        setTasks(response.data); // Update the state with the fetched tasks
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks(); // Call fetchTasks to load the initial task list
  }, []);

  const handleChange = (event) => {
    setNewTask(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() !== "") {
      axios
        .post("http://localhost:5000/api/tasks", { name: newTask })
        .then((response) => {
          fetchTasks();
          setNewTask("");
        })
        .catch((error) => {
          console.error("Error adding task:", error);
        });
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id)); // Use _id to filter
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const handleEditChange = (event) => {
    setEditingText(event.target.value);
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task._id === id);
    setEditingID(id);
    setEditingText(taskToEdit.name); // Ensure you're editing the correct field, i.e., "name"
  };

  const handleSave = (id) => {
    axios
      .put(`http://localhost:5000/api/tasks/${id}`, { name: editingText }) // Update with name
      .then((response) => {
        fetchTasks();
        setEditingID(null);
        setEditingText("");
      })
      .catch((error) => {
        console.error("Error saving task:", error);
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>TO-DO List</h1>
        <input
          type="text"
          name="newTask"
          placeholder="Add Task Here"
          value={newTask}
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          Add
        </button>
      </form>
      <div className="Task">
        {tasks.map((task) => (
          <div key={task._id} className="NewTask">
            {" "}
            {/* Ensure key is unique here */}
            {editingID === task._id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={handleEditChange}
                />
                <button className="btn" onClick={() => handleSave(task._id)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{task.name}</span>
                <button className="btn" onClick={() => handleEdit(task._id)}>
                  Edit
                </button>
              </>
            )}
            <button className="btn" onClick={() => handleDelete(task._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
