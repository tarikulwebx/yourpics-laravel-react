import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Multiselect } from "react-widgets";
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";

const UploadEdit = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const [picture, setPicture] = useState({});
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const selectedTagIds = [];

    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isUploadComplete, setIsUploadComplete] = useState(false);

    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    // Get Picture
    const getPictureBySlug = () => {
        axios
            .get("/getPictureBySlug/" + slug)
            .then((res) => {
                if (res.status === 200) {
                    setPicture(res.data);
                    setSelectedTags(res.data.tags);

                    res.data.tags.map((tag) => {
                        selectedTagIds.push(tag.id);
                    });
                }
            })
            .catch((ex) => {
                let res = ex.response;
                if (res.status === 404) {
                    navigate("/profile/uploads", { replace: true });
                }
                console.log(res);
            });
    };

    // Get all tags
    const getAllTags = () => {
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
    };

    // effect on first load
    useEffect(() => {
        getPictureBySlug();
        getAllTags();

        setIsLoading(false);
    }, []);

    // update form submit
    const handleUpdateFormSubmit = (e) => {
        e.preventDefault();

        setIsProcessing(true);

        const formData = new FormData(e.currentTarget);
        selectedTags.map((tag) => {
            formData.append(`tags[]`, JSON.stringify(tag.id));
        });

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("/pictureUpdate/" + picture.id, formData)
                .then((res) => {
                    setErrors([]);
                    setIsProcessing(false);
                    setIsUploadComplete(true);

                    setTimeout(() => {
                        setIsUploadComplete(false);
                    }, 1500);
                })
                .catch((ex) => {
                    let res = ex.response;
                    if (res.status === 422) {
                        setErrors(res.data.errors);
                    }
                    console.log(res);
                });
        });
    };

    // delete picture
    const deletePicture = () => {
        setIsDeleting(true);
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .delete("/moveToTrash/" + picture.id)
                .then((res) => {
                    console.log(res);
                    setIsDeleting(false);
                    setIsDeleted(true);
                    setTimeout(() => {
                        setIsDeleted(false);
                        navigate("/profile/uploads", { replace: true });
                    }, 700);
                })
                .catch((ex) => {
                    let res = ex.response;
                    console.log(res);
                });
        });
    };

    return (
        <div className="card shadow rounded-4 border-0">
            <div className="card-header bg-white  rounded-3 py-3 px-4">
                <h5 className="mb-0 text-dark">Edit Picture</h5>
            </div>
            <div className="card-body p-4">
                {isLoading ? (
                    <div className="row gy-3">
                        <div className="col-sm-4 col-xl-3">
                            <p className="placeholder-glow rounded mb-0 ">
                                <span
                                    className="placeholder col-12"
                                    style={{ height: "200px" }}
                                ></span>
                            </p>
                        </div>
                        <div className="col-sm-8 col-xl-9">
                            <p className="placeholder-glow">
                                <span
                                    className="placeholder placeholder-lg col-12 rounded"
                                    style={{ height: "42px" }}
                                ></span>
                            </p>
                            <div className="row gx-2">
                                <div className="col-3 col-lg-2">
                                    <p className="placeholder-glow">
                                        <span
                                            className="placeholder placeholder-lg col-12 rounded"
                                            style={{ height: "42px" }}
                                        ></span>
                                    </p>
                                </div>
                                <div className="col-3 col-lg-2">
                                    <p className="placeholder-glow">
                                        <span
                                            className="placeholder placeholder-lg col-12 rounded"
                                            style={{ height: "42px" }}
                                        ></span>
                                    </p>
                                </div>
                                <div className="col-3 col-lg-2">
                                    <p className="placeholder-glow">
                                        <span
                                            className="placeholder placeholder-lg col-12 rounded"
                                            style={{ height: "42px" }}
                                        ></span>
                                    </p>
                                </div>
                            </div>
                            <p className="placeholder-glow">
                                <span
                                    className="placeholder placeholder-lg col-12 rounded"
                                    style={{ height: "250px" }}
                                ></span>
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleUpdateFormSubmit}>
                            <div className="row gy-3">
                                <div className="col-sm-4 col-xl-3">
                                    <img
                                        src={
                                            picture.image
                                                ? picture.image
                                                : "/assets/images/placeholder.jpg"
                                        }
                                        className="img-fluid w-100 shadow-sm"
                                        alt="new-image"
                                    />
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
                                                defaultValue={picture.title}
                                                autoFocus
                                                autoComplete="title"
                                                required
                                            />
                                            {errors.title && (
                                                <div className="invalid-feedback">
                                                    {errors.title[0]}
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
                                                defaultValue={selectedTagIds}
                                                placeholder="Select from list"
                                                containerClassName="form-control p-1"
                                                required
                                                onChange={(value) =>
                                                    setSelectedTags(value)
                                                }
                                            />
                                            {errors.tags && (
                                                <div className="invalid-feedback d-block">
                                                    {errors.tags[0]}
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
                                                defaultValue={
                                                    picture.description
                                                }
                                            ></textarea>
                                            {errors.description && (
                                                <div className="invalid-feedback">
                                                    {errors.description[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-12 text-end">
                                            <button
                                                className={
                                                    isProcessing
                                                        ? "btn btn-primary d-inline-flex align-items-center disabled"
                                                        : isUploadComplete
                                                        ? "btn btn-success d-inline-flex align-items-center disabled"
                                                        : "btn btn-primary d-inline-flex align-items-center"
                                                }
                                                type="submit"
                                            >
                                                {isProcessing
                                                    ? "Uploading..."
                                                    : isUploadComplete
                                                    ? "Updated"
                                                    : "Update"}

                                                {isUploadComplete && (
                                                    <FaCheck className="ms-2" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <hr />
                        <h5 className="mb-1">Delete Picture</h5>
                        <p className="text-warning">
                            After deletion, picture will be moved to trash and
                            some information can be erased! But You will be able
                            to restore.
                        </p>
                        <button
                            onClick={deletePicture}
                            className={
                                isDeleting
                                    ? "btn btn-danger d-inline-flex align-items-center gap-2 disabled"
                                    : isDeleted
                                    ? "btn btn-success d-inline-flex align-items-center gap-2 disabled"
                                    : "btn btn-danger d-inline-flex align-items-center gap-2"
                            }
                        >
                            <FaRegTrashAlt />{" "}
                            {isDeleting
                                ? "Moving to Trash..."
                                : isDeleted
                                ? "Moved to Trash!"
                                : "Move to Trash"}
                            {isDeleted && <FaCheck className="ms-1" />}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default UploadEdit;
