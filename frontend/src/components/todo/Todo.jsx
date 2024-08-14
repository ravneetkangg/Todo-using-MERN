import React, { useEffect, useState } from 'react';
import './Todo.css';
import TodoCards from './TodoCards';
import UpdateTodo from './UpdateTodo';
import axios from 'axios';

const Todo = () => {
    const [inputs, setInputs] = useState({ title: "", body: "" });
    const [todos, setTodos] = useState([]);
    const [array, setArray] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);
    let id = sessionStorage.getItem("id");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        if (id) {
            await axios.post("http://localhost:4700/api/v2/addTask", { title: inputs.title, body: inputs.body, id: id })
                .then((response) => console.log(response.data.list));
        }
        setTodos(prevTodos => [...prevTodos, inputs]);
        setInputs({ title: "", body: "" });
    };

    const deleteTodoHandler = async (taskId) => {
        try {
            await axios.delete(`http://localhost:4700/api/v2/deleteTask/${taskId}`);
            setArray(prevTodos => prevTodos.filter(todo => todo._id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const updateTodoHandler = (id) => {
        setCurrentTodo({ ...todos[id], id });
        setIsUpdating(true);
    };

    const closeUpdateTodo = () => {
        setIsUpdating(false);
    };

    useEffect(() => {
        async function fetch() {
            await axios.get(`http://localhost:4700/api/v2/getTasks/${id}`).then((response) => {
                console.log(response.data.tasks);
                setArray(response.data.tasks);
            });
        }
        fetch();
    }, [handleSubmit]);

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
                    {array.map((item, index) => (
                        <TodoCards
                            key={item._id}
                            id={item._id}
                            title={item.title}
                            body={item.body}
                            deleteTodoHandler={() => deleteTodoHandler(item._id)}
                            updateTodoHandler={updateTodoHandler}
                        />
                    ))}
                </div>
            )}

            {isUpdating && (
                <div className='update-holder'>
                    <UpdateTodo currentTodo={currentTodo} closeUpdateTodo={closeUpdateTodo} />
                </div>
            )}
        </>
    );
}

export default Todo;
