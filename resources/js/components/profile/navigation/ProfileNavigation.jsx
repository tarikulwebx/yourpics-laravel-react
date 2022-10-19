import React, { useContext } from "react";

import "./ProfileNavigation.scss";

import {
    FaEdit,
    FaUserAlt,
    FaHeart,
    FaSignOutAlt,
    FaTrashAlt,
} from "react-icons/fa";

import { FiUpload } from "react-icons/fi";

import { BsImages } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

const ProfileNavigation = () => {
    const { setIsLoggedIn, setUser } = useContext(UserContext);

    const logoutHandle = () => {
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
        <div className="profile-navigation d-flex flex-wrap gap-2 gap-md-3">
            <NavLink
                to="/profile"
                className="btn btn-sm shadow border-0 btn-light"
                end
            >
                <FaUserAlt className="icon" /> Dashboard
            </NavLink>
            <NavLink
                to="/profile/edit"
                className="btn btn-sm shadow border-0 btn-light"
            >
                <FaEdit className="icon" /> Edit Profile
            </NavLink>
            <NavLink
                to="/profile/upload"
                className="btn btn-sm shadow border-0 btn-light"
            >
                <FiUpload className="icon" /> New Upload
            </NavLink>
            <NavLink
                to="/profile/uploads"
                className="btn btn-sm shadow border-0 btn-light"
            >
                <BsImages className="icon" /> Your Uploads
            </NavLink>
            <NavLink
                to="/profile/favorites"
                className="btn btn-sm shadow border-0 btn-light"
            >
                <FaHeart className="icon" /> Your Favorites
            </NavLink>
            <NavLink
                to="/profile/trash"
                className="btn btn-sm shadow border-0 btn-light"
            >
                <FaTrashAlt className="icon" /> Trash
            </NavLink>
            <button
                onClick={logoutHandle}
                className="btn btn-sm shadow border-0 btn-light"
            >
                <FaSignOutAlt className="icon" /> Logout
            </button>
        </div>
    );
};

export default ProfileNavigation;
