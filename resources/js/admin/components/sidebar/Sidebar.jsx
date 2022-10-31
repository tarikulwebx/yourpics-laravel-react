import React from "react";
import { BsFillMenuButtonFill, BsHouse } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import {
    FaChevronDown,
    FaCog,
    FaHome,
    FaTachometerAlt,
    FaUsers,
    FaUsersCog,
} from "react-icons/fa";
import { FiChevronDown, FiSettings } from "react-icons/fi";
import "./Sidebar.scss";
import { Link, NavLink } from "react-router-dom";

const menuItems = [
    {
        name: "Dashboard",
        link: "/admin",
        icon: <FaTachometerAlt className="icon" />,
    },
    {
        name: "Settings",
        link: "/admin/settings",
        icon: <FaCog className="icon" />,
    },
];

const Sidebar = () => {
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
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100 main-nav"
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
            <div className="dropdown pb-4 mt-auto">
                <a
                    href="#"
                    className="d-flex px-2 align-items-center text-white text-decoration-none dropdown-toggle"
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <img
                        src="https://github.com/mdo.png"
                        alt="hugenerd"
                        width="30"
                        height="30"
                        className="rounded-circle"
                    />
                    <span className="d-none d-sm-inline mx-1">loser</span>
                </a>
                <ul
                    className="dropdown-menu dropdown-menu-dark text-small shadow"
                    aria-labelledby="dropdownUser1"
                >
                    <li>
                        <a className="dropdown-item" href="#">
                            New project...
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Settings
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Profile
                        </a>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Sign out
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
