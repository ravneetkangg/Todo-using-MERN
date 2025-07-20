import React, { useEffect, useState } from 'react';
import './Todo.css';
import TodoCards from './TodoCards';
import UpdateTodo from './UpdateTodo';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Todo = () => {
    const [inputs, setInputs] = useState({ title: "", body: "" });
    const [todos, setTodos] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);
    const id = sessionStorage.getItem("id");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        if (!id) return;

        try {
            const response = await axios.post(`${BASE_URL}/api/v2/addTask`, {
                title: inputs.title,
                body: inputs.body,
                id: id
            });

            const newTask = response?.data?.task;
            if (newTask && newTask._id) {
                setTodos(prevTodos => [...prevTodos, newTask]);
            } else {
                console.warn("Task added but not returned from server.");
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }

        setInputs({ title: "", body: "" });
    };

    const deleteTodoHandler = async (taskId) => {
        try {
            await axios.delete(`${BASE_URL}/api/v2/deleteTask/${taskId}`);
            setTodos(prevTodos => prevTodos.filter(todo => todo._id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const updateTodoHandler = (index) => {
        if (!todos[index]) return;
        setCurrentTodo({ ...todos[index], id: index });
        setIsUpdating(true);
    };

    const closeUpdateTodo = () => {
        setIsUpdating(false);
    };

    useEffect(() => {
        async function fetchTodos() {
            if (!id) return;

            try {
                const response = await axios.get(`${BASE_URL}/api/v2/getTasks/${id}`);
                const taskList = response?.data?.tasks;
                if (Array.isArray(taskList)) {
                    setTodos(taskList);
                } else {
                    setTodos([]);
                }
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
                setTodos([]);
            }
        }

        fetchTodos();
    }, [id]);

    return (
        <>
            {!isUpdating && (
                <div className="todo-container">
                    <h2>Create Todo</h2>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter the title"
                            required
                            onChange={handleChange}
                            value={inputs.title}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Body:</label>
                        <textarea
                            id="body"
                            name="body"
                            placeholder="Enter the body"
                            required
                            onChange={handleChange}
                            value={inputs.body}
                        ></textarea>
                    </div>
                    <button className="btn" onClick={handleSubmit}>Submit</button>
                </div>
            )}

            {!isUpdating && (
                <div className='todo-body'>
                    {Array.isArray(todos) && todos.length > 0 ? (
                        todos
                            .filter(item => item && item._id)
                            .map((item, index) => (
                                <TodoCards
                                    key={item._id}
                                    id={item._id}
                                    title={item.title}
                                    body={item.body}
                                    deleteTodoHandler={() => deleteTodoHandler(item._id)}
                                    updateTodoHandler={() => updateTodoHandler(index)}
                                />
                            ))
                    ) : (
                        <p style={{ textAlign: "center", marginTop: "2rem" }}>No tasks to show</p>
                    )}
                </div>
            )}

            {isUpdating && (
                <div className='update-holder'>
                    <UpdateTodo currentTodo={currentTodo} closeUpdateTodo={closeUpdateTodo} />
                </div>
            )}
        </>
    );
};

export default Todo;
