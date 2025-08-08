import React from "react";

function Toast({ type, message, onClose }) {
  if (!message) return null;

  const bgClass = type === "success" ? "text-bg-success" : "text-bg-danger";

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
      <div className={`toast show align-items-center ${bgClass} border-0`} role="alert">
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default Toast;
