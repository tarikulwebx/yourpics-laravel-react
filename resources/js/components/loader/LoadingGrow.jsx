import React from "react";

const LoadingGrow = () => {
    return (
        <div className="d-flex justify-content-center">
            <h5 className="mb-0 d-flex align-items-center text-primary">
                <div
                    className="spinner-grow spinner-grow-sm text-primary me-1"
                    role="status"
                ></div>
                <div
                    className="spinner-grow spinner-grow-sm text-secondary me-1"
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
                Loading...
            </h5>
        </div>
    );
};

export default LoadingGrow;
