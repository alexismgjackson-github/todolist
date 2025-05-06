import "./EditingTaskMode.css"; // Importing the CSS file to style the editing task mode

// Functional component that renders the task editing UI
export default function EditingTaskMode(props) {
  return (
    <>
      {/* Input field to edit the task's text */}
      <input
        type="text"
        value={props.editTaskText} // Binding the value to the state that holds the edited task text
        onChange={(event) => props.setEditTaskText(event.target.value)} // Updates the state with the new text input
      />

      {/* Container for the action buttons (Update and Cancel) */}
      <div className="if-btn-container">
        {/* Button to update the task after editing */}
        <button className="update-task-btn" onClick={() => props.updateTask()}>
          <img
            src="/assets/icons/update.svg"
            alt="Update task" // Alt text for accessibility
            aria-label="Update task" // Provides an accessible label for the button
          />
        </button>

        {/* Button to cancel the editing and revert to the previous state */}
        <button
          className="cancel-btn"
          onClick={() => props.setIsEditingTask(null)} // Clears the task from the editing state
        >
          <img
            src="/assets/icons/cancel.svg"
            alt="Cancel action" // Alt text for accessibility
            aria-label="Cancel action" // Provides an accessible label for the button
          />
        </button>
      </div>
    </>
  );
}
