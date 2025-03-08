import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Main.css";

export default function Main() {
  // initialize the state variable "tasks" with an empty array

  const [tasks, setTasks] = useState([]);

  // initialize the state variable "newTask" with an empty string

  const [newTask, setNewTask] = useState("");

  // initialize the state variable "isEditingTask" with null

  const [isEditingTask, setIsEditingTask] = useState(null);

  // initialize the state variable "editTaskText" with an empty string

  const [editTaskText, setEditTaskText] = useState("");

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

  // remove the task with passed id from the tasks array
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
                {/* TASK IN EDIT MODE */}
                {isEditingTask?.id === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editTaskText}
                      onChange={(event) => setEditTaskText(event.target.value)}
                    />
                    <div className="if-btn-container">
                      <button onClick={updateTask} className="update-task-btn">
                        <img
                          src="/assets/icons/update.svg"
                          alt="Update task"
                          aria-label="Update task"
                        />
                      </button>
                      <button
                        onClick={() => setIsEditingTask(null)}
                        className="cancel-btn"
                      >
                        <img
                          src="/assets/icons/cancel.svg"
                          alt="Cancel action"
                          aria-label="Cancel action"
                        />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* TASK IN DEFAULT MODE */}
                    {task.text}
                    <div className="else-btn-container">
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="delete-task-btn"
                      >
                        <img
                          src="/assets/icons/delete.svg"
                          alt="Delete task"
                          aria-label="Delete task"
                        />
                      </button>
                      <button
                        onClick={() => editTask(task)}
                        className="edit-task-btn"
                      >
                        {" "}
                        <img
                          src="/assets/icons/edit.svg"
                          alt="Edit task"
                          aria-label="Edit task"
                        />
                      </button>
                    </div>
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
