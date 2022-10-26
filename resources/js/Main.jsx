import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { PictureModalContext } from "./contexts/PictureModalContext";
import { UserContext } from "./contexts/UserContext";
import AppRoutes from "./routes/AppRoutes";

const Main = () => {
    // Login context states
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [user, setUser] = useState({});

    // Picture modal context states
    const [showModal, setShowModal] = useState(false);
    const [modalPictureId, setModalPictureId] = useState(null);

    useEffect(() => {
        axios
            .get("/getUser")
            .then((res) => {
                // console.log(res);
                if (Object.keys(res.data).length > 0) {
                    setIsLoggedIn(true);
                    setUser(res.data);
                } else {
                    setIsLoggedIn(false);
                    setUser({});
                }
            })
            .catch((ex) => {
                let res = ex.response;
                console.log(res);
            });
    }, []);

    return (
        <BrowserRouter>
            <UserContext.Provider
                value={{ isLoggedIn, setIsLoggedIn, user, setUser }}
            >
                <PictureModalContext.Provider
                    value={{
                        showModal,
                        setShowModal,
                        modalPictureId,
                        setModalPictureId,
                    }}
                >
                    <AppRoutes />
                </PictureModalContext.Provider>
            </UserContext.Provider>
        </BrowserRouter>
    );
};

export default Main;

if (document.getElementById("root")) {
    ReactDOM.render(<Main />, document.getElementById("root"));
}
