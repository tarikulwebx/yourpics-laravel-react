import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import AdminApp from "../AdminApp";
import { UserContext } from "../contexts/UserContext";
import About from "../pages/About";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import Contact from "../pages/Contact";
import Gallery from "../pages/Gallery";
import Home from "../pages/Home";
import Profile from "../pages/profile/Profile";
import PublicApp from "../PublicApp";
import Protected from "./Protected";
import UnProtected from "./UnProtected";

const AppRoutes = () => {
    const { isLoggedIn, user } = useContext(UserContext);
    console.log(isLoggedIn);
    return (
        <Routes>
            <Route path="/" element={<PublicApp />}>
                <Route index element={<Home />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route
                    path="signin"
                    element={
                        <UnProtected isLoggedIn={isLoggedIn}>
                            <SignIn />
                        </UnProtected>
                    }
                />
                <Route
                    path="signup"
                    element={
                        <UnProtected isLoggedIn={isLoggedIn}>
                            <SignUp />
                        </UnProtected>
                    }
                />
                <Route
                    path="profile"
                    element={
                        <Protected isLoggedIn={isLoggedIn}>
                            <Profile />
                        </Protected>
                    }
                />
            </Route>
            <Route path="/admin" element={<AdminApp />} />
        </Routes>
    );
};

export default AppRoutes;
