import React from "react";
import {
    FaDownload,
    FaEye,
    FaHome,
    FaUpload,
    FaUserPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <>
            {/* Heading */}
            <div className="d-flex align-items-center justify-content-between mb-3 pb-1 text-primary">
                <h4 className="mb-0">Dashboard</h4>
                <div>
                    <Link to="/">
                        <FaHome className="fs-4" />
                    </Link>
                </div>
            </div>

            {/* Cards */}
            <div className="row g-4">
                <div className="col-md-6 col-lg-4">
                    <div className="card border-0 shadow rounded-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <h6 className="card-title text-gray-500 mb-2">
                                        Sign Up
                                    </h6>
                                    <h3 className="text-gray-600 mb-0">
                                        12345
                                    </h3>
                                </div>
                                <div className="bg-primary text-primary bg-opacity-10 p-3 rounded d-flex align-items-center">
                                    <FaUserPlus className="fs-4" />
                                </div>
                            </div>
                            <p className="mb-0 small">Since last month</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="card border-0 shadow rounded-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <h6 className="card-title text-gray-500 mb-2">
                                        Avg Download
                                    </h6>
                                    <h3 className="text-gray-600 mb-0">
                                        12345
                                    </h3>
                                </div>
                                <div className="bg-primary text-primary bg-opacity-10 p-3 rounded d-flex align-items-center">
                                    <FaDownload className="fs-5" />
                                </div>
                            </div>
                            <p className="mb-0 small">Daily on average</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="card border-0 shadow rounded-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <h6 className="card-title text-gray-500 mb-2">
                                        Avg View
                                    </h6>
                                    <h3 className="text-gray-600 mb-0">
                                        12345
                                    </h3>
                                </div>
                                <div className="bg-primary text-primary bg-opacity-10 p-3 rounded d-flex align-items-center">
                                    <FaEye className="fs-4" />
                                </div>
                            </div>
                            <p className="mb-0 small">Daily on average</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="card border-0 shadow rounded-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <h6 className="card-title text-gray-500 mb-2">
                                        Today's downloads
                                    </h6>
                                    <h3 className="text-gray-600 mb-0">
                                        12345
                                    </h3>
                                </div>
                                <div className="bg-primary text-primary bg-opacity-10 p-3 rounded d-flex align-items-center">
                                    <FaDownload className="fs-5" />
                                </div>
                            </div>
                            <p className="mb-0 small">Based on current date</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="card border-0 shadow rounded-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <h6 className="card-title text-gray-500 mb-2">
                                        Today's Views
                                    </h6>
                                    <h3 className="text-gray-600 mb-0">
                                        12345
                                    </h3>
                                </div>
                                <div className="bg-primary text-primary bg-opacity-10 p-3 rounded d-flex align-items-center">
                                    <FaEye className="fs-4" />
                                </div>
                            </div>
                            <p className="mb-0 small">Based on current date</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="card border-0 shadow rounded-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <h6 className="card-title text-gray-500 mb-2">
                                        Today's Uploads
                                    </h6>
                                    <h3 className="text-gray-600 mb-0">
                                        12345
                                    </h3>
                                </div>
                                <div className="bg-primary text-primary bg-opacity-10 p-3 rounded d-flex align-items-center">
                                    <FaUpload className="fs-5" />
                                </div>
                            </div>
                            <p className="mb-0 small">Based on current date</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
