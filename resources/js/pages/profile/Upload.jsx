import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

const Upload = () => {
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);

    // Picture input handle
    const onPictureChangeHandle = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedPicture(URL.createObjectURL(e.target.files[0]));
        }
    };

    // handle upload form
    const handleUploadFormSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="card shadow rounded-4 border-0">
            <div className="card-header bg-white  rounded-3 py-3 px-4">
                <h5 className="mb-0 text-dark">New Upload</h5>
            </div>
            <div className="card-body p-4">
                <form onSubmit={handleUploadFormSubmit}>
                    <div className="row gy-3">
                        <div className="col-sm-4 col-xl-3">
                            <img
                                src={
                                    selectedPicture
                                        ? selectedPicture
                                        : "/assets/images/placeholder.jpg"
                                }
                                className="img-fluid w-100 shadow-sm"
                                alt="new-picture"
                            />
                            <div className="mt-2">
                                <label
                                    htmlFor="picture"
                                    className="form-label mb-1 fw-light text-primary"
                                >
                                    Choose picture
                                </label>
                                <input
                                    className={
                                        errors.picture
                                            ? "form-control form-control-sm is-invalid"
                                            : "form-control form-control-sm"
                                    }
                                    id="profile_picture"
                                    name="picture"
                                    type="file"
                                    onChange={onPictureChangeHandle}
                                />
                                {errors.picture && (
                                    <div className="invalid-feedback">
                                        {errors.picture}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-sm-8 col-xl-9">
                            <div className="row g-3">
                                <div className="col-12">
                                    <label
                                        htmlFor="first_name"
                                        className="form-label mb-1 fw-light"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className={
                                            errors.title
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        placeholder="Enter picture title"
                                        autoFocus
                                        autoComplete="title"
                                        required
                                    />
                                    {errors.title && (
                                        <div className="invalid-feedback">
                                            {errors.title}
                                        </div>
                                    )}
                                </div>

                                <div className="col-12">
                                    <label
                                        htmlFor="bio"
                                        className="form-label mb-1 fw-light"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        className={
                                            errors.description
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        rows="10"
                                        placeholder="Write about picture..."
                                    ></textarea>
                                    {errors.description && (
                                        <div className="invalid-feedback">
                                            {errors.description}
                                        </div>
                                    )}
                                </div>
                                <div className="col-12 text-end">
                                    <button
                                        className={
                                            isProcessing
                                                ? "btn btn-primary d-inline-flex align-items-center disabled"
                                                : isUploaded
                                                ? "btn btn-success d-inline-flex align-items-center disabled"
                                                : "btn btn-primary d-inline-flex align-items-center"
                                        }
                                        type="submit"
                                    >
                                        <FiUpload className="me-1" />
                                        {isProcessing
                                            ? "Uploading..."
                                            : isUploaded
                                            ? "Uploaded"
                                            : "Upload"}

                                        {isUploaded && (
                                            <FaCheck className="ms-2" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Upload;
