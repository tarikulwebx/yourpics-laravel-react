import React from "react";
import "./ProfileDropdown.scss";
import { FaPencilAlt, FaUser, FaUpload, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
    return (
        <>
            <a
                className="nav-link dropdown-toggle"
                href="!#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img
                    src="assets/images/profile-picture.jpg"
                    className="rounded-circle"
                    alt=""
                    width={40}
                />
            </a>

            <ul className="dropdown-menu dropdown-menu-end shadow border-0">
                <li>
                    <h5 className="dropdown-header text-center">
                        Tarikul Islam
                    </h5>
                </li>
                <li>
                    <div className="dropdown-divider"></div>
                </li>
                <li>
                    <Link className="dropdown-item active" to="/profile">
                        <FaUser className="icon" /> Profile
                    </Link>
                </li>
                <li>
                    <a className="dropdown-item" href="profile-edit.html">
                        <FaPencilAlt className="icon" /> Edit profile
                    </a>
                </li>

                <li>
                    <a className="dropdown-item" href="profile-upload.html">
                        <FaUpload className="icon" />
                        Your uploads
                    </a>
                </li>

                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <form>
                        <button
                            id="signoutBtn"
                            className="dropdown-item"
                            type="submit"
                        >
                            <FaSignOutAlt className="icon" />
                            Sign Out
                        </button>
                    </form>
                </li>
            </ul>
        </>
    );
};

export default ProfileDropdown;
