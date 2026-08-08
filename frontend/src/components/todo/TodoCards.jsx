import React from 'react';
import './TodoCards.css';
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";

const TodoCards = ({ title, body, deleteTodoHandler, updateTodoHandler, id }) => {
    return (
        <div className="todo-card">
            <div className="todo-card-content">
                <h5 className="todo-card-title">{title}</h5>
                <p className="todo-card-body">{body}</p>
            </div>
            <div className="todo-card-actions">
                <div className="icon update" onClick={() => updateTodoHandler(id)} title="Update">
                    <GrDocumentUpdate size={20} />
                </div>
                <div className="icon delete" onClick={() => deleteTodoHandler(id)} title="Delete">
                    <MdDelete size={22} />
                </div>
            </div>
        </div>
    );
}

export default TodoCards;
