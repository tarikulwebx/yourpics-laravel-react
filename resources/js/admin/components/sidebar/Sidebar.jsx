import React from "react";
import { BsFillMenuButtonFill, BsHouse } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import {
    FaChevronDown,
    FaCog,
    FaHome,
    FaPager,
    FaTachometerAlt,
    FaTags,
    FaUsers,
    FaUsersCog,
} from "react-icons/fa";
import { FiChevronDown, FiSettings } from "react-icons/fi";
import "./Sidebar.scss";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

const menuItems = [
    {
        name: "Dashboard",
        link: "/admin",
        icon: <FaTachometerAlt className="icon" />,
    },
    {
        name: "Tags",
        link: "/admin/tags",
        icon: <FaTags className="icon" />,
    },
    {
        name: "Pages",
        link: "/admin/pages",
        icon: <FaPager className="icon" />,
    },

    {
        name: "Settings",
        link: "/admin/settings",
        icon: <FaCog className="icon" />,
    },
];

const Sidebar = () => {
    const { user, setIsLoggedIn, setIsAdmin, setUser, setFavorites } =
        useContext(UserContext);

    const handleSignOut = (e) => {
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("/logout")
                .then((res) => {
                    setIsLoggedIn(false);
                    setIsAdmin(false);
                    setUser([]);
                    setFavorites([]);
                })
                .catch((ex) => {
                    console.log(ex);
                });
        });
    };

    return (
        <div className="d-flex flex-column align-items-center align-items-sm-start pt-2 text-white min-vh-100 admin-sidebar">
            <a
                href="/"
                className="d-flex align-items-center justify-content-center justify-content-sm-start w-100 pt-2 pb-1 px-2  me-md-auto text-white text-decoration-none gap-2 brand"
            >
                <img src="/assets/images/logo.png" width={30} alt="" />
                <span className="fs-5 d-none d-sm-inline fw-semibold">
                    Yourpics
                </span>
            </a>
            <div className="px-2 w-100">
                <hr className="w-100" />
            </div>

            <ul
                className="nav nav-pills flex-column  mb-0 align-items-center align-items-sm-start w-100 main-nav"
                id="menu"
            >
                {menuItems.map((menu, index) => (
                    <li className="nav-item w-100" key={index}>
                        <NavLink
                            to={menu.link}
                            className="nav-link align-middle px-2 d-flex gap-2 align-items-center justify-content-center justify-content-sm-start"
                            end
                        >
                            {menu.icon}
                            <span className="ms-1 d-none d-sm-inline">
                                {menu.name}
                            </span>
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="px-2 w-100 mt-auto">
                <hr className="w-100" />
            </div>
            <div className="dropdown pb-3  admin-profile-dropdown">
                <a
                    href="#"
                    className="d-flex px-2 align-items-center text-white text-decoration-none dropdown-toggle"
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <img
                        src={
                            user.picture
                                ? user.picture
                                : "/assets/images/profile-placeholder.jpg"
                        }
                        alt="hugenerd"
                        width="30"
                        height="30"
                        className="rounded-circle"
                    />
                    <span
                        className="d-none d-sm-inline-block ms-2 me-1 text-truncate"
                        style={{ maxWidth: "80px" }}
                    >
                        {user.first_name}
                    </span>
                </a>
                <ul
                    className="dropdown-menu dropdown-menu-dark text-small shadow"
                    aria-labelledby="dropdownUser1"
                >
                    <li>
                        <Link to="/profile" className="dropdown-item">
                            Profile
                        </Link>
                    </li>

                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <button
                            onClick={handleSignOut}
                            className="dropdown-item"
                        >
                            Sign out
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
