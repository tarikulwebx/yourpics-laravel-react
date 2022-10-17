import React from "react";
import { Navigate } from "react-router-dom";

const UnProtected = ({ isLoggedIn, children }) => {
    if (isLoggedIn === true) {
        return <Navigate to="/profile" replace />;
    } else if (isLoggedIn === false) {
        return children;
    }

    return null;
};

export default UnProtected;
