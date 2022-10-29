import React, { memo, useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import { ToastContext } from "../../contexts/ToastContext";

const ToastMessage = () => {
    const { showToast, setShowToast, toastMessage, toastType, setToastType } =
        useContext(ToastContext);

    const handleClose = () => {
        setShowToast(false);
    };

    return (
        <ToastContainer
            containerPosition="fixed"
            position="bottom-start"
            className="p-2"
        >
            <Toast
                onClose={handleClose}
                show={showToast}
                bg={toastType}
                delay={2500}
                autohide
            >
                <Toast.Body className="text-white d-flex align-items-center gap-2">
                    {toastType === "success" ? (
                        <FiCheckCircle className="fs-6" />
                    ) : (
                        <FiAlertTriangle className="fs-6" />
                    )}

                    <strong className="fw-semibold">{toastMessage}</strong>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default memo(ToastMessage);
