import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./admin/components/sidebar/Sidebar";
import "./AdminApp.scss";

const AdminApp = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <Sidebar />
                    </div>
                    <div className="col py-3 px-md-3 overflow-hidden">
                        <main>
                            <Outlet />
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminApp;
