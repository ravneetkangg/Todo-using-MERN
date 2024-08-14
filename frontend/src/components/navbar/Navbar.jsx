import React from 'react';
import './Navbar.css'; // Import the CSS file
import { GiOpenBook } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

const Navbar = () => {

    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    const dispatch = useDispatch();


    function logout() {
        sessionStorage.clear("id");
        dispatch(authActions.logout());

    }

    // console.log(isLoggedIn);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-brand-container">
                        <Link to="/">
                            <GiOpenBook className="navbar-icon" />
                        </Link>
                        <Link className="navbar-brand" to="/">TODO</Link>
                    </div>
                    <div className="navbar-links">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/todo">Todo</Link>
                            </li>

                            {!isLoggedIn &&
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link btn-custom" to="/signup">Signup</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link btn-custom" to="/signin">Sign-in</Link>
                                    </li>
                                </>
                            }

                            {isLoggedIn &&
                                <>
                                    <li className="nav-item" onClick={logout}>
                                        <Link className="nav-link btn-custom" to="/">Logout</Link>
                                    </li>
                                </>

                            }
                            <li className="nav-item">
                                <img src='https://cdn-icons-png.flaticon.com/512/1077/1077114.png' className='user-png' alt="user" />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
