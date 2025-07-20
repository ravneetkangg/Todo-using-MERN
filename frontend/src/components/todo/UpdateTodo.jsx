import React from 'react';
import './UpdateTodo.css';

const UpdateTodo = ({ currentTodo, closeUpdateTodo }) => {
    return (
        <div className="update-todo-fullwidth-container">
            <h2 className="update-todo-title">Update Todo</h2>
            <div className="update-todo-form-group">
                <label htmlFor="title" className="update-todo-label">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="update-todo-input"
                    defaultValue={currentTodo.title}
                    required
                />
            </div>

            <div className="update-todo-form-group">
                <label htmlFor="body" className="update-todo-label">Body:</label>
                <textarea
                    id="body"
                    name="body"
                    className="update-todo-textarea"
                    defaultValue={currentTodo.body}
                    required
                ></textarea>
            </div>

            <button
                className="update-todo-btn"
                onClick={() => {
                    alert("Update functionality is not implemented yet.");
                }}
            >
                Update
            </button>
            
            <button className="update-todo-btn" onClick={closeUpdateTodo}>
                Close
            </button>
        </div>
    );
};

export default UpdateTodo;
