import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import AdminApp from "../AdminApp";
import { UserContext } from "../contexts/UserContext";
import About from "../pages/About";
import ResetEmail from "../pages/auth/password/ResetEmail";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import Contact from "../pages/Contact";
import Gallery from "../pages/Gallery";
import Home from "../pages/Home";
import Dashboard from "../pages/profile/Dashboard";
import EditProfile from "../pages/profile/EditProfile";
import Favorites from "../pages/profile/Favorites";
import Profile from "../pages/profile/Profile";
import Trash from "../pages/profile/Trash";
import Upload from "../pages/profile/Upload";
import Uploads from "../pages/profile/Uploads";
import PublicApp from "../PublicApp";
import Protected from "./Protected";
import UnProtected from "./UnProtected";

const AppRoutes = () => {
    const { isLoggedIn, user } = useContext(UserContext);
    return (
        <Routes>
            <Route path="/" element={<PublicApp />}>
                <Route index element={<Home />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />

                {/* Auth Routes */}
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
                    path="password-reset-email"
                    element={
                        <UnProtected isLoggedIn={isLoggedIn}>
                            <ResetEmail />
                        </UnProtected>
                    }
                />

                {/* Profile Routes */}
                <Route
                    path="profile"
                    element={
                        <Protected isLoggedIn={isLoggedIn}>
                            <Profile />
                        </Protected>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="edit" element={<EditProfile />} />
                    <Route path="upload" element={<Upload />} />
                    <Route path="uploads" element={<Uploads />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="trash" element={<Trash />} />
                </Route>
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminApp />} />
        </Routes>
    );
};

export default AppRoutes;
