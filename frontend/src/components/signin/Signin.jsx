import React, { useState } from 'react';
import './Signin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

const Signin = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const [inputs, setInputs] = useState({ email: "", password: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  }

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4700/api/v1/login", inputs);
      if (response.data.message !== "Password is not correct" && response.data.message !== "Please sign up first") {
        setInputs({ email: "", password: "" });
        // console.log(response.data._id);
        sessionStorage.setItem("id",response.data._id)
        dispatch(authActions.login());
        navigate('/todo');
      } else {
        alert(response.data.message);
      }

    } catch (error) {
      console.error("There was an error signing in:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" onClick={submit}>Sign In</button>
      </div>
    </div>
  );
}

export default Signin;
