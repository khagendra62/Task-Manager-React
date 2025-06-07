import { useState, useEffect, useRef } from "react";
import { FaAnglesUp, FaAnglesDown } from "react-icons/fa6";
import "./ToDoList.css";
const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const firstLoad = useRef(true);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    console.log("Loaded from localStorage:", savedTasks);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));

    console.log("Saved to localStorage:", tasks);
  }, [tasks]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const newTaskUp = [...tasks];
      [newTaskUp[index], newTaskUp[index - 1]] = [
        newTaskUp[index - 1],
        newTaskUp[index],
      ];
      setTasks(newTaskUp);
    }
  }
  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const newTaskDown = [...tasks];
      [newTaskDown[index + 1], newTaskDown[index]] = [
        newTaskDown[index],
        newTaskDown[index + 1],
      ];
      setTasks(newTaskDown);
    }
  }

  return (
    <>
      <div className="to-do-list">
        <h1>To-Do List </h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter a task"
            value={newTask}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                addTask();
              }
            }}
          />
          <button className="add-btn" onClick={addTask}>
            Add
          </button>
        </div>

        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task}</span>
              <button className="delete-btn" onClick={() => deleteTask(index)}>
                Delete
              </button>
              <button
                className="up-btn"
                onClick={() => moveTaskUp(index)}
                disabled={index === 0}
              >
                <FaAnglesUp />
              </button>
              <button
                className="down-btn"
                onClick={() => moveTaskDown(index)}
                disabled={index === tasks.length - 1}
              >
                <FaAnglesDown />
              </button>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default ToDoList;
