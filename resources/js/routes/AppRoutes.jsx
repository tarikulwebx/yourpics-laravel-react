import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminApp from "../AdminApp";
import PublicApp from "../PublicApp";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PublicApp />} />
            <Route path="/admin" element={<AdminApp />} />
        </Routes>
    );
};

export default AppRoutes;
