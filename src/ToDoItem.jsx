import React, { useState } from "react";

function ToDoItem({
  taskItem,
  editTaskId,
  handleEditTaskId,
  markComplete,
  editTask,
  deleteTask,
}) {
  const { taskId, isMarked, task } = taskItem;
  const [newTask, setNewTask] = useState(task);
  return (
    <div className="flex justify-between items-center mt-5 border rounded-lg min-w-96 p-4 ">
      {editTaskId !== taskId ? (
        <>
          <div>
            <input
              className="mr-2 hover:cursor-pointer"
              type="checkbox"
              checked={isMarked}
              onChange={() => markComplete(taskId)}
            />
            <span>{task}</span>
          </div>
          <div>
            <button
              className="ml-5 mr-2 bg-pink-500"
              onClick={() => deleteTask(taskId)}
            >
              Delete
            </button>
            <button
              className="bg-white text-black"
              onClick={() => handleEditTaskId(taskId)}
            >
              Edit
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <div>
            <button
              className="mx-2 bg-blue-500"
              onClick={() => {
                editTask(taskId, newTask);
                handleEditTaskId(null);
              }}
            >
              Save
            </button>
            <button
              className="bg-white text-black"
              onClick={() => handleEditTaskId(null)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ToDoItem;
