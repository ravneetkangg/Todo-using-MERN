import React, { useEffect } from 'react'
import "./App.css"
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import About from './components/about/About'
import Footer from './components/footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import Todo from './components/todo/Todo'
import { useDispatch } from 'react-redux'
import { authActions } from './store'

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const id = (sessionStorage.getItem("id"));
    if (id) {
      dispatch(authActions.login());
    }
  }, [])



  return (
    <>
      <Router>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>

        <Footer />

      </Router>
    </>
  )
}

export default App