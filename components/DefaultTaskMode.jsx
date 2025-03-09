import "./DefaultTaskMode.css";

export default function DefaultTaskMode(props) {
  return (
    <>
      <div className="else-btn-container">
        <button
          className="delete-task-btn"
          onClick={() => props.deleteTask(props.task.id)}
        >
          <img
            src="/assets/icons/delete.svg"
            alt="Delete task"
            aria-label="Delete task"
          />
        </button>
        <button
          className="edit-task-btn"
          onClick={() => props.editTask(props.task)}
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
  );
}
