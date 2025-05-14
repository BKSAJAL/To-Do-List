import { useEffect, useState } from "react";
import Header from "./Header";
import ToDoList from "./ToDoList";
import { v4 as uuidv4 } from "uuid";
import "./style.css";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(sessionStorage.getItem("tasks")) || []
  );
  const [newTask, setNewTask] = useState("");
  const [markedTaskCount, setmarkedTaskCount] = useState({
    completed: 0,
    inComplete: 0,
  });

  //add new task
  const addTask = () => {
    if (!newTask) {
      alert("Task can't be empty.");
      return;
    }
    const obj = { taskId: uuidv4(), task: newTask.trim(), isMarked: false };
    setTasks([obj, ...tasks]);
    setNewTask("");
  };

  // mark task as completed or incomplete
  const markComplete = (taskId) => {
    const arr = [...tasks];
    arr.forEach((ele) => {
      if (taskId == ele.taskId) ele.isMarked = !ele.isMarked;
    });
    setTasks(arr);
  };

  //delete task
  const deleteTask = (taskId) => {
    const arr = tasks.filter((ele) => ele.taskId != taskId);
    setTasks(arr);
  };

  // edit task
  const editTask = (taskId, task) => {
    const arr = [...tasks];
    arr.forEach((ele) => {
      if (ele.taskId == taskId) ele.task = task;
    });
    setTasks(arr);
  };

  //update session storage for every task list update
  useEffect(() => {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
    const obj = { completed: 0, inComplete: 0 };
    tasks.forEach((ele) => {
      if (ele.isMarked) obj.completed++;
      else obj.inComplete++;
    });
    setmarkedTaskCount(obj);
  }, [tasks]);

  return (
    <>
      <Header />
      <div className="flex justify-center gap-3 mt-10">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Please enter a task"
        />
        <button className="bg-violet-500" onClick={addTask}>
          Add
        </button>
      </div>
      <div className="flex justify-center mt-10">
        <ToDoList
          tasks={tasks}
          markComplete={markComplete}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </div>
      {tasks[0] && (
        <div className="text-center my-5">
          Completed: {markedTaskCount.completed} | Incomplete:{" "}
          {markedTaskCount.inComplete}
        </div>
      )}
    </>
  );
}

export default App;
