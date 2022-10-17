import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";

const Upload = () => {
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);

    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const navigate = useNavigate();

    // Picture input handle
    const onPictureChangeHandle = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedPicture(URL.createObjectURL(e.target.files[0]));
        }
    };

    // handle upload form
    const handleUploadFormSubmit = (e) => {
        e.preventDefault();

        setIsProcessing(true);

        let formData = new FormData(e.currentTarget);

        selectedTags.map((tag) => {
            formData.append(`tags[]`, JSON.stringify(tag.id));
        });

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("/pictureStore", formData)
                .then((res) => {
                    if (res.status == 200) {
                        setIsProcessing(false);
                        setIsUploaded(true);

                        setTimeout(() => {
                            navigate("/profile/uploads", { replace: true });
                        }, 1000);
                    }
                })
                .catch((ex) => {
                    let res = ex.response;
                    if (res.status === 422) {
                        setErrors(res.data.errors);
                    } else {
                        console.log(res);
                    }
                    setIsProcessing(false);
                });
        });

        // formData.append("tags", tags_id_array);
        // console.log(formData.getAll("tags[]"));
    };

    // effect on first load
    useEffect(() => {
        axios
            .get("/getAllTags")
            .then((res) => {
                if (res.status === 200) {
                    setTags(res.data);
                }
            })
            .catch((ex) => {
                let res = ex.response;
                console.log(res);
            });
    }, []);

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
                                alt="new-image"
                            />
                            <div className="mt-2">
                                <label
                                    htmlFor="image"
                                    className="form-label mb-1 fw-light text-primary"
                                >
                                    Choose picture
                                </label>
                                <input
                                    className={
                                        errors.image
                                            ? "form-control form-control-sm is-invalid"
                                            : "form-control form-control-sm"
                                    }
                                    id="profile_picture"
                                    name="image"
                                    type="file"
                                    required
                                    onChange={onPictureChangeHandle}
                                />
                                {errors.image && (
                                    <div className="invalid-feedback">
                                        {errors.image}
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
                                        htmlFor="tags"
                                        className="form-label mb-1 fw-light"
                                    >
                                        Tags
                                    </label>
                                    <Multiselect
                                        dataKey="id"
                                        textField="name"
                                        data={tags}
                                        placeholder="Select from list"
                                        containerClassName="form-control p-1"
                                        required
                                        onChange={(value) =>
                                            setSelectedTags(value)
                                        }
                                    />
                                    {errors.tags && (
                                        <div className="invalid-feedback d-block">
                                            {errors.tags}
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
