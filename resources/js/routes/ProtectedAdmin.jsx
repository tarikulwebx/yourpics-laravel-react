import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ isLoggedIn, isAdmin, children }) => {
    if (isLoggedIn === false) {
        return <Navigate to="/signin" replace />;
    }

    if (isLoggedIn === true && isAdmin === false) {
        return <Navigate to="/" replace />;
    }

    if (isLoggedIn === true && isAdmin === true) {
        return children;
    }

    return null;
};

export default ProtectedAdmin;
