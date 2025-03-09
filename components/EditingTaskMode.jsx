import "./EditingTaskMode.css";

export default function EditingTaskMode(props) {
  return (
    <>
      <input
        type="text"
        value={props.editTaskText}
        onChange={(event) => props.setEditTaskText(event.target.value)}
      />
      <div className="if-btn-container">
        <button className="update-task-btn" onClick={() => props.updateTask()}>
          <img
            src="/assets/icons/update.svg"
            alt="Update task"
            aria-label="Update task"
          />
        </button>
        <button
          className="cancel-btn"
          onClick={() => props.setIsEditingTask(null)}
        >
          <img
            src="/assets/icons/cancel.svg"
            alt="Cancel action"
            aria-label="Cancel action"
          />
        </button>
      </div>
    </>
  );
}
