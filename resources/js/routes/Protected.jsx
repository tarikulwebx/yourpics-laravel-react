import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ isLoggedIn, children }) => {
    if (isLoggedIn === false) {
        return <Navigate to="/signin" replace />;
    }

    if (isLoggedIn === true) {
        return children;
    }

    return null;
};

export default Protected;
