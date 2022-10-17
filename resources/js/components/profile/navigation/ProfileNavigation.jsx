import React from "react";

import "./ProfileNavigation.scss";

import {
    FaEdit,
    FaUserAlt,
    FaHeart,
    FaSignOutAlt,
    FaTrashAlt,
} from "react-icons/fa";
import { BsImages } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const ProfileNavigation = () => {
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
            <button className="btn btn-sm shadow border-0 btn-light">
                <FaSignOutAlt className="icon" /> Logout
            </button>
        </div>
    );
};

export default ProfileNavigation;
