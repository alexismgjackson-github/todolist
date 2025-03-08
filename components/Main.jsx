import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Main.css";

export default function Main() {
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState("");

  const [isEditingTask, setIsEditingTask] = useState(null);

  const [editTaskText, setEditTaskText] = useState("");

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const addNewTask = (event) => {
    event.preventDefault();
    setTasks([...tasks, { id: uuidv4(), text: newTask }]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (task) => {
    setIsEditingTask(task);
    setEditTaskText(task.text);
  };

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
                {isEditingTask?.id === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editTaskText}
                      onChange={(e) => setEditTaskText(e.target.value)}
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
