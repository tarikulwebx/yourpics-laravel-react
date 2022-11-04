import React, { memo, useState } from "react";
import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { ToastContext } from "../../../contexts/ToastContext";

const AddTagModal = ({ showAddModal, setShowAddModal, getTags }) => {
    const [errors, setErrors] = useState({});
    const [isCreating, setIsCreating] = useState(false);

    const { setShowToast, setToastMessage, setToastType } =
        useContext(ToastContext);

    const handleClose = () => setShowAddModal(false);
    const handleShow = () => setShowAddModal(true);

    const handleForm = (e) => {
        e.preventDefault();
        setIsCreating(true);

        const formData = new FormData(e.currentTarget);
        axios
            .post("/store-tag", formData)
            .then((res) => {
                // console.log(res);
                setErrors({});
                getTags();
                setIsCreating(false);
                setShowAddModal(false);
                setShowToast(true);
                setToastMessage("New tag created successfully.");
                setToastType("success");
            })
            .catch((ex) => {
                const res = ex.response;
                // console.log(res);
                if (res.status === 422) {
                    setErrors(res.data.errors);
                }
                setIsCreating(false);
            });
    };

    return (
        <Modal show={showAddModal} onHide={handleClose}>
            <form onSubmit={handleForm}>
                <Modal.Header closeButton>
                    <Modal.Title className="h5">Add Tag</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="name" className="form-label fw-light">
                        New tag name
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
                    />
                    <div className="invalid-feedback">
                        {errors.name ? errors.name : ""}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="submit"
                        className={
                            isCreating
                                ? "btn btn-primary disabled"
                                : "btn btn-primary"
                        }
                    >
                        {isCreating ? "Creating..." : "Create"}
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default AddTagModal;
