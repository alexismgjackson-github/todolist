import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import DefaultTaskMode from "./DefaultTaskMode";
import EditingTaskMode from "./EditingTaskMode";
import "./Main.css";

export default function Main() {
  // State to store tasks, loaded from localStorage if available
  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks")) // Load tasks from localStorage if available
      : [] // Default to an empty array if no tasks in localStorage
  );

  // State to store the text of a new task being added
  const [newTask, setNewTask] = useState("");

  // State to track which task is currently being edited
  const [isEditingTask, setIsEditingTask] = useState(null);

  // State to hold the updated text for a task while it's being edited
  const [editTaskText, setEditTaskText] = useState("");

  // Handle changes in the input field for new tasks
  const handleChange = (event) => {
    setNewTask(event.target.value); // Update the newTask state as the user types
  };

  // Add a new task to the tasks list when the user submits the form
  const addNewTask = (event) => {
    event.preventDefault(); // Prevent default form submission
    setTasks([...tasks, { id: uuidv4(), text: newTask }]); // Add new task with unique id
    setNewTask(""); // Clear the input field after adding the task
  };

  // Delete a task from the tasks list by filtering out the task with the given id
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id)); // Remove task by id
  };

  // Set the task for editing and initialize the editTaskText state
  const editTask = (task) => {
    setIsEditingTask(task); // Set the task to be edited
    setEditTaskText(task.text); // Pre-fill the input field with the current task text
  };

  // Update the task with the new edited text and reset editing state
  const updateTask = () => {
    setTasks(
      tasks.map(
        (task) =>
          task.id === isEditingTask.id ? { ...task, text: editTaskText } : task // Update the task text
      )
    );
    setIsEditingTask(null); // Reset editing state after update
    setEditTaskText(""); // Clear the edit input field
  };

  // Store tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks to localStorage
  }, [tasks]); // Only run this effect when the tasks array changes

  return (
    <>
      <main>
        {/* Input form for adding new tasks */}
        <section className="to-do-input-container">
          <form className="add-tasks-form">
            <input
              className="to-do-input"
              type="text"
              id="to-do-input"
              placeholder="e.g. Meal prep for the week"
              aria-label="Type in a new task" // Accessible label for screen readers
              value={newTask}
              onChange={handleChange} // Update newTask state on input change
              required
            />
            <button
              className="add-task-btn"
              onClick={addNewTask} // Call addNewTask function on form submission
              disabled={newTask.length < 5} // Disable button if task text is too short
            >
              Add New Task
            </button>
          </form>
        </section>

        {/* Section for displaying the list of tasks */}
        <section className="to-do-list-container">
          <span className="to-do-list-length">
            <p className="length">{tasks.length} task(s) exist</p>{" "}
            {/* Display number of tasks */}
          </span>

          <ul className="to-do-list">
            {tasks.map((task) => (
              <li key={task.id} className="task">
                {/* If the task is being edited, show the editing mode */}
                {isEditingTask?.id === task.id ? (
                  <EditingTaskMode
                    editTaskText={editTaskText} // Pass the current edit text
                    isEditingTask={isEditingTask} // Pass the task being edited
                    updateTask={updateTask} // Pass the function to update the task
                    setEditTaskText={setEditTaskText} // Pass the function to update edit text
                    setIsEditingTask={setIsEditingTask} // Pass the function to reset editing mode
                  />
                ) : (
                  <>
                    {/* If the task is not being edited, show the default view */}
                    {task.text}
                    <DefaultTaskMode
                      task={task} // Pass the task object
                      deleteTask={deleteTask} // Pass the deleteTask function
                      editTask={editTask} // Pass the editTask function
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
