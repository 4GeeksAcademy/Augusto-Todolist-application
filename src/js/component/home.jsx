import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskLabel, setNewTaskLabel] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  const handleAddTask = () => {
    const newTask = { label: newTaskLabel, done: false };

    fetch("https://playground.4geeks.com/apis/fake/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then(() => {
        fetchTasks(); 
        setNewTaskLabel(""); 
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleDeleteTask = (taskId) => {
    fetch(`https://playground.4geeks.com/apis/fake/todos/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedTasks = tasks.filter((task) => task.id !== taskId);
          setTasks(updatedTasks);
        } else {
          console.error("Error deleting task:", response.statusText);
        }
      })
      .catch((error) => console.error("Error deleting task:", error));
  };
  

  const handleResetList = () => {
    setTasks([]);
  };
  

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.label}
            <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTaskLabel}
          onChange={(e) => setNewTaskLabel(e.target.value)}
        />
        <button onClick={handleAddTask}>Agregar Tarea</button>
      </div>
      <button onClick={handleResetList}>Limpiar Lista</button>
    </div>
  );
};

export default TodoList;
