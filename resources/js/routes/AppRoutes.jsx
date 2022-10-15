import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminApp from "../AdminApp";
import About from "../pages/About";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import Contact from "../pages/Contact";
import Gallery from "../pages/Gallery";
import Home from "../pages/Home";
import Profile from "../pages/profile/Profile";
import PublicApp from "../PublicApp";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PublicApp />}>
                <Route index element={<Home />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="/admin" element={<AdminApp />} />
        </Routes>
    );
};

export default AppRoutes;
