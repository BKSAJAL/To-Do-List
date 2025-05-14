import React from "react";
import { useState } from "react";
import ToDoItem from "./ToDoItem";

function ToDoList({ tasks, markComplete, editTask, deleteTask }) {
  const [editTaskId, setEditTaskId] = useState(null);

  const handleEditTaskId = (taskId) => {
    setEditTaskId(taskId);
  };

  return (
    <div>
      {tasks[0] && <h2 className="text-2xl text-center">Task List</h2>}
      {tasks?.map((ele) => {
        return (
          <ToDoItem
            key={ele.taskId}
            taskItem={ele}
            editTaskId={editTaskId}
            handleEditTaskId={handleEditTaskId}
            markComplete={markComplete}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        );
      })}
    </div>
  );
}

export default ToDoList;
