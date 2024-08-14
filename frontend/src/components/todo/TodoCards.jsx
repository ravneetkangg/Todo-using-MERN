import React from 'react';
import './TodoCards.css';
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";

const TodoCards = ({ title, body, deleteTodoHandler, updateTodoHandler, id }) => {
    return (
        <div className="card todo-card">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{body}</p>
            </div>
            <div className="card-footer">
                <div className="icon-container" onClick={() => updateTodoHandler(id)}>
                    <GrDocumentUpdate className="icon-upd" />
                    <p className="action-text">Update</p>
                </div>
                <div className="icon-container" onClick={() => deleteTodoHandler(id)}>
                    <p className="action-text">Delete</p>
                    <MdDelete className="icon-del" />
                </div>
            </div>
        </div>
    );
}

export default TodoCards;
