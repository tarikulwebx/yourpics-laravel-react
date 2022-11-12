import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { ToastContext } from "../../../contexts/ToastContext";

const DeleteSlideModal = ({
    slideId,
    showDeleteModal,
    setShowDeleteModal,
    getAllSlides,
}) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const { setShowToast, setToastMessage, setToastType } =
        useContext(ToastContext);

    const handleClose = () => setShowDeleteModal(false);
    const handleShow = () => setShowAddModal(true);

    const deleteTag = () => {
        setIsDeleting(true);
        axios
            .delete(`/deleteSlide/${slideId}`)
            .then((res) => {
                getAllSlides();
                setIsDeleting(false);
                setShowToast(true);
                setToastMessage(res.data);
                setToastType("success");
                setShowDeleteModal(false);
            })
            .catch((ex) => {
                const res = ex.response;
                console.log(res);
                setIsDeleting(false);
            });
    };

    return (
        <Modal show={showDeleteModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="h5">Delete Slide</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure, you want to delete the slide?</Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    className={
                        isDeleting
                            ? "btn btn-danger disabled"
                            : "btn btn-danger"
                    }
                    onClick={deleteTag}
                >
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteSlideModal;
