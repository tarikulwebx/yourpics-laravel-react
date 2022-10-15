import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import AppRoutes from "./routes/AppRoutes";

const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [user, setUser] = useState({});

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
                <AppRoutes />
            </UserContext.Provider>
        </BrowserRouter>
    );
};

export default Main;

if (document.getElementById("root")) {
    ReactDOM.render(<Main />, document.getElementById("root"));
}
