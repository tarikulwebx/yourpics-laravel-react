import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import "./Navbar.scss";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
    const { isLoggedIn, user } = useContext(UserContext);
    return (
        <header className="navbar app-navbar navbar-expand-lg navbar-dark sticky-top px-sm-2 shadow-sm">
            <div className="container-xl">
                <Link className="navbar-brand text-uppercase" to="/">
                    <img
                        src="/assets/images/logo.png"
                        className="me-2"
                        alt="Logo"
                    />
                    Yourpics
                </Link>
                {/* Profile dropdown for small device */}
                <div className="d-flex align-items-center d-lg-none gap-2">
                    {isLoggedIn === false && (
                        <>
                            <Link
                                className="btn btn-sm btn-outline-light"
                                to="signin"
                            >
                                Sign In
                            </Link>
                            <Link
                                className="btn btn-sm btn-primary"
                                to="signup"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}

                    {isLoggedIn === true && (
                        <div className="dropdown profile-dropdown">
                            <ProfileDropdown user={user} />
                        </div>
                    )}

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    {/* Menu Items */}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-1">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="gallery" className="nav-link">
                                Gallery
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="about">
                                About Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="contact">
                                Contact
                            </Link>
                        </li>
                        {isLoggedIn === false && (
                            <>
                                <li className="nav-item d-none d-lg-inline-block px-1">
                                    <Link
                                        className="btn btn-sm btn-outline-light"
                                        to="signin"
                                    >
                                        Sign In
                                    </Link>
                                </li>
                                <li className="nav-item d-none d-lg-inline-block px-1">
                                    <Link
                                        className="btn btn-sm btn-primary"
                                        to="signup"
                                    >
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}

                        {/* Profile dropdown for large device */}
                        {isLoggedIn === true && (
                            <li className="nav-item dropdown profile-dropdown d-none d-lg-block">
                                <ProfileDropdown user={user} />
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
