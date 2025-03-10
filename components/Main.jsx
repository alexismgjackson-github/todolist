import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import DefaultTaskMode from "./DefaultTaskMode";
import EditingTaskMode from "./EditingTaskMode";
import "./Main.css";

export default function Main() {
  // initialize the state variable "tasks" from localStorage or set an empty array if no tasks are found

  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );

  const [newTask, setNewTask] = useState(""); // initialize the state variable "newTask" with an empty string

  const [isEditingTask, setIsEditingTask] = useState(null); // initialize the state variable "isEditingTask" with null

  const [editTaskText, setEditTaskText] = useState(""); // initialize the state variable "editTaskText" with an empty string

  // update "newTask" state with the value entered into an input field whenever the user types something in it

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  // prevent the page from refreshing
  // add a new task with a unique ID and the entered text to the list of tasks
  // clear the input field for the next task

  const addNewTask = (event) => {
    event.preventDefault();
    setTasks([...tasks, { id: uuidv4(), text: newTask }]);
    setNewTask("");
  };

  // remove the task with passed id from the "tasks" array
  // update "tasks" state to reflect the change

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // mark the selected task as the one being edited
  // populate the input field with its text

  const editTask = (task) => {
    setIsEditingTask(task);
    setEditTaskText(task.text);
  };

  // end the editing process by setting "isEditingTask" to null
  // clear the input field

  const updateTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === isEditingTask.id ? { ...task, text: editTaskText } : task
      )
    );
    setIsEditingTask(null);
    setEditTaskText("");
  };

  // save tasks to localStorage every time the "tasks" array changes

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <main>
        <section className="to-do-input-container">
          <form className="add-tasks-form">
            <input
              className="to-do-input"
              type="text"
              id="to-do-input"
              placeholder="e.g. Meal prep for the week"
              aria-label="Type in a new task"
              value={newTask}
              onChange={handleChange}
              required
            />
            <button
              className="add-task-btn"
              onClick={addNewTask}
              disabled={newTask.length < 5}
            >
              Add New Task
            </button>
          </form>
        </section>
        <section className="to-do-list-container">
          <span className="to-do-list-length">
            <p className="length">{tasks.length} task(s) exist</p>
          </span>
          <ul className="to-do-list">
            {tasks.map((task) => (
              <li key={task.id} className="task">
                {isEditingTask?.id === task.id ? (
                  <EditingTaskMode
                    editTaskText={editTaskText}
                    isEditingTask={isEditingTask}
                    updateTask={updateTask}
                    setEditTaskText={setEditTaskText}
                    setIsEditingTask={setIsEditingTask}
                  />
                ) : (
                  <>
                    {task.text}
                    <DefaultTaskMode
                      task={task}
                      deleteTask={deleteTask}
                      editTask={editTask}
                    />
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
