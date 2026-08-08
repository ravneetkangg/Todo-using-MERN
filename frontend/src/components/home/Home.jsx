import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <div className="hero-content">
                <h1 className="hero-title">
                    Organize your <span>work</span><br /> and <span>life</span>, finally.
                </h1>
                <p className="hero-subtitle">
                    Become focused, organized, and calm with our modern todo app. <br />
                    The World's #1 task manager app with a premium experience.
                </p>
                <Link to="/todo" className="btn-hero">Get Started</Link>
            </div>
        </div>
    );
}

export default Home;
