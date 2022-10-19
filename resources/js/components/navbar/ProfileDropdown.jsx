import React, { useContext } from "react";
import "./ProfileDropdown.scss";
import { FaPencilAlt, FaUser, FaUpload, FaSignOutAlt } from "react-icons/fa";
import { BsImages } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const ProfileDropdown = ({ user }) => {
    const { setIsLoggedIn, setUser } = useContext(UserContext);

    const handleLogout = (e) => {
        e.preventDefault();

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("/logout")
                .then((res) => {
                    setIsLoggedIn(false);
                    setUser([]);
                })
                .catch((ex) => {
                    console.log(ex);
                });
        });
    };

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
                    src={
                        user.picture
                            ? user.picture
                            : "/assets/images/profile-placeholder.jpg"
                    }
                    className="rounded-circle"
                    alt=""
                />
            </a>

            <ul className="dropdown-menu dropdown-menu-end shadow border-0">
                <li>
                    <h5 className="dropdown-header text-center">
                        <span
                            className="d-inline-block text-truncate"
                            style={{ width: "100px" }}
                        >
                            {user.first_name} {user.last_name}
                        </span>
                    </h5>
                </li>
                <li>
                    <div className="dropdown-divider"></div>
                </li>
                <li>
                    <NavLink className="dropdown-item" to="/profile" end>
                        <FaUser className="icon" /> Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink className="dropdown-item" to="/profile/edit">
                        <FaPencilAlt className="icon" /> Edit profile
                    </NavLink>
                </li>

                <li>
                    <NavLink className="dropdown-item" to="/profile/uploads">
                        <BsImages className="icon" />
                        Your uploads
                    </NavLink>
                </li>

                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <form onSubmit={handleLogout}>
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
