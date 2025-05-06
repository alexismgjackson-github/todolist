import "./DefaultTaskMode.css"; // Importing the CSS file to style the default task mode

// Functional component that renders the default task UI (when not in editing mode)
export default function DefaultTaskMode(props) {
  return (
    <>
      {/* Container for the action buttons (Delete and Edit) */}
      <div className="else-btn-container">
        {/* Button to delete the task */}
        <button
          className="delete-task-btn"
          onClick={() => props.deleteTask(props.task.id)} // Calls the deleteTask function passed from parent, passing the task's ID
        >
          <img
            src="/assets/icons/delete.svg"
            alt="Delete task" // Alt text for accessibility
            aria-label="Delete task" // Provides an accessible label for the button
          />
        </button>

        {/* Button to edit the task */}
        <button
          className="edit-task-btn"
          onClick={() => props.editTask(props.task)} // Calls the editTask function passed from parent, passing the task object
        >
          <img
            src="/assets/icons/edit.svg"
            alt="Edit task" // Alt text for accessibility
            aria-label="Edit task" // Provides an accessible label for the button
          />
        </button>
      </div>
    </>
  );
}
