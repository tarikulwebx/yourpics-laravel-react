import React from "react";
import { Navigate } from "react-router-dom";

const UnProtected = ({ isLoggedIn, children }) => {
    if (isLoggedIn === true) {
        return <Navigate to="/profile" replace />;
    }

    return children;
};

export default UnProtected;
