import React, { useState } from "react";
import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { ToastContext } from "../../../contexts/ToastContext";

const EditTagModal = ({
    showEditModal,
    setShowEditModal,
    editTag,
    getTags,
}) => {
    const [errors, setErrors] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);

    const { setShowToast, setToastMessage, setToastType } =
        useContext(ToastContext);

    const handleClose = () => setShowEditModal(false);
    const handleShow = () => setShowEditModal(true);

    const handleForm = (e) => {
        e.preventDefault();
        setIsUpdating(true);

        const formData = new FormData(e.currentTarget);
        axios
            .post(`/update-tag/${editTag.id}`, formData)
            .then((res) => {
                // console.log(res);
                getTags();
                setErrors({});
                setIsUpdating(false);
                setShowEditModal(false);
                setShowToast(true);
                setToastMessage("Tag updated successfully.");
                setToastType("success");
            })
            .catch((ex) => {
                const res = ex.response;
                // console.log(res);
                if (res.status === 422) {
                    setErrors(res.data.errors);
                } else {
                    setErrors({});
                }
                setIsUpdating(false);
            });
    };

    return (
        <Modal show={showEditModal} onHide={handleClose}>
            <form onSubmit={handleForm}>
                <Modal.Header closeButton>
                    <Modal.Title className="h5">Edit Tag</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="name" className="form-label fw-light">
                        Tag name
                    </label>
                    <input
                        type="text"
                        name="name"
                        className={
                            errors.name
                                ? "form-control is-invalid"
                                : "form-control"
                        }
                        placeholder="New tag name"
                        defaultValue={editTag.name}
                    />
                    <div className="invalid-feedback">
                        {errors.name ? errors.name : ""}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="submit"
                        className={
                            isUpdating
                                ? "btn btn-primary disabled"
                                : "btn btn-primary"
                        }
                    >
                        {isUpdating ? "Updating..." : "Update"}
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default EditTagModal;
