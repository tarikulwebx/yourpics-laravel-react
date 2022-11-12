import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import AdminApp from "../AdminApp";
import { UserContext } from "../contexts/UserContext";
import ResetEmail from "../pages/auth/password/ResetEmail";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import Contact from "../pages/Contact";
import Gallery from "../pages/Gallery";
import Home from "../pages/Home";
import Picture from "../pages/picture/Picture";
import Dashboard from "../pages/profile/Dashboard";
import EditProfile from "../pages/profile/EditProfile";
import Favorites from "../pages/profile/Favorites";
import Profile from "../pages/profile/Profile";
import Trash from "../pages/profile/Trash";
import Upload from "../pages/profile/Upload";
import UploadEdit from "../pages/profile/UploadEdit";
import Uploads from "../pages/profile/Uploads";
import Tag from "../pages/tag/Tag";
import Tags from "../pages/tags/Tags";
import Uploader from "../pages/uploader/Uploader";
import PublicApp from "../PublicApp";
import Protected from "./Protected";
import UnProtected from "./UnProtected";

// Admin components
import AdminDashboard from "../admin/pages/dashboard/Dashboard";
import AdminTags from "../admin/pages/tags/Tags";
import Settings from "../admin/pages/settings/Settings";
import ProtectedAdmin from "./ProtectedAdmin";
import Pages from "../admin/pages/site-pages/Pages";
import AddNewPage from "../admin/components/site-pages/AddNewPage";
import EditPage from "../admin/components/site-pages/EditPage";
import PublicPages from "../pages/Pages";
import Slides from "../admin/pages/slide/Slides";
import AddNewSlide from "../admin/pages/slide/AddNewSlide";
import EditSlide from "../admin/pages/slide/EditSlide";

const AppRoutes = () => {
    const { isLoggedIn, isAdmin, user } = useContext(UserContext);
    return (
        <Routes>
            <Route path="/" element={<PublicApp />}>
                <Route index element={<Home />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="contact" element={<Contact />} />
                <Route path="pages/:pageSlug" element={<PublicPages />} />
                <Route path="tags" element={<Tags />} />
                <Route path="tags/:slug" element={<Tag />} />
                <Route path="uploader/:slug" element={<Uploader />} />
                <Route path="picture/:slug" element={<Picture />} />

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
                    <Route path="upload-edit/:slug" element={<UploadEdit />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="trash" element={<Trash />} />
                </Route>
            </Route>

            {/* Admin Routes */}
            <Route
                path="/admin"
                element={
                    <ProtectedAdmin isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
                        <AdminApp />
                    </ProtectedAdmin>
                }
            >
                <Route index element={<AdminDashboard />} />
                <Route path="tags" element={<AdminTags />} />
                <Route path="pages" element={<Pages />} />
                <Route path="pages/create" element={<AddNewPage />} />
                <Route path="pages/edit/:pageId" element={<EditPage />} />
                <Route path="settings" element={<Settings />} />
                <Route path="slides" element={<Slides />} />
                <Route path="slides/create" element={<AddNewSlide />} />
                <Route path="slides/edit/:slideId" element={<EditSlide />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
