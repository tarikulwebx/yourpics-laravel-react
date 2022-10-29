import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import PictureModal from "./components/modals/PictureModal";
import ToastMessage from "./components/toast/ToastMessage";
import { PictureModalContext } from "./contexts/PictureModalContext";
import { ToastContext } from "./contexts/ToastContext";
import { UserContext } from "./contexts/UserContext";
import AppRoutes from "./routes/AppRoutes";

const Main = () => {
    // Login context states
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [user, setUser] = useState({});
    const [favorites, setFavorites] = useState([]);

    // Picture modal context states
    const [showModal, setShowModal] = useState(false);
    const [modalPictureId, setModalPictureId] = useState(null);

    // Toast context states
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [toastType, setToastType] = useState("success");

    // Get user favorites
    const getFavoritesArray = () => {
        axios
            .get("/getFavoritesArray")
            .then((res) => {
                if (res.status === 200) {
                    setFavorites(res.data);
                }
            })
            .cath((ex) => {
                const res = ex.response;
                console.log(res);
            });
    };

    useEffect(() => {
        axios
            .get("/getUser")
            .then((res) => {
                // console.log(res);
                if (Object.keys(res.data).length > 0) {
                    setIsLoggedIn(true);
                    setUser(res.data);
                    getFavoritesArray();
                } else {
                    setIsLoggedIn(false);
                    setUser({});
                }
            })
            .catch((ex) => {
                const res = ex.response;
            });
    }, []);

    return (
        <BrowserRouter>
            {/* User Context */}
            <UserContext.Provider
                value={{
                    isLoggedIn,
                    setIsLoggedIn,
                    user,
                    setUser,
                    favorites,
                    setFavorites,
                }}
            >
                {/* Modal Context */}
                <PictureModalContext.Provider
                    value={{
                        showModal,
                        setShowModal,
                        modalPictureId,
                        setModalPictureId,
                    }}
                >
                    {/* Toast Context */}
                    <ToastContext.Provider
                        value={{
                            showToast,
                            setShowToast,
                            toastType,
                            setToastType,
                            toastMessage,
                            setToastMessage,
                        }}
                    >
                        <AppRoutes />
                        {/* Picture Modal */}
                        <PictureModal />

                        {/* Toast */}
                        <ToastMessage />
                    </ToastContext.Provider>
                </PictureModalContext.Provider>
            </UserContext.Provider>
        </BrowserRouter>
    );
};

export default Main;

if (document.getElementById("root")) {
    ReactDOM.render(<Main />, document.getElementById("root"));
}
