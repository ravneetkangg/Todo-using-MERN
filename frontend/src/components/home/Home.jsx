import React from 'react';
import './Home.css'; // Import a CSS file if needed

const Home = () => {
    return (
        <div className="home d-flex justify-content-center align-items-center">
            <div className="container d-flex justify-content-center align-items-center flex-column">
                <h1 className="text-center">
                    Organize your <br /> work and life, finally.
                </h1>
                <p className="text-center">
                    Become focused, organized, and calm with <br /> todo app. The World's #1 task manager app.
                </p>
                <button className="btn btn-primary">Get Started</button>
            </div>
        </div>
    );
}

export default Home;
