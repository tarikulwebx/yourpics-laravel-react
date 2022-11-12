import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const EditSlide = () => {
    const { slideId } = useParams();

    const [slide, setSlide] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        getSlideById(slideId);
    }, [slideId]);

    const getSlideById = (id) => {
        setIsLoading(true);
        axios
            .get(`/getSlideById/${id}`)
            .then((res) => {
                setSlide(res.data);
                setIsLoading(false);
            })
            .catch((ex) => {
                const res = ex.response;
                console.log(res);
                setIsLoading(false);
            });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsUpdating(true);

        const formData = new FormData(e.currentTarget);

        axios
            .post(`/updateSlide/${slideId}`, formData)
            .then((res) => {
                console.log(res);
                setIsUpdating(false);
                setErrors({});
                setIsUpdated(true);
                setTimeout(() => {
                    setIsUpdated(false);
                }, 700);
            })
            .catch((ex) => {
                const res = ex.response;
                // console.log(res);
                if (res.status === 422) {
                    setErrors(res.data.errors);
                } else {
                    setErrors({});
                }
                setIsCreating(false);
            });
    };

    return (
        <>
            {/* head */}
            <div className="d-flex align-items-center justify-content-between mb-3 pb-1 text-primary">
                <h4 className="mb-0">Slides (Edit)</h4>
                <div></div>
            </div>

            {/* content */}
            <div className="card shadow">
                <div className="card-header border-bottom-0 p-sm-3">
                    <div className="row align-items-center">
                        <div className="col-5">
                            <Link
                                to={`/admin/slides`}
                                className="btn btn-sm btn-outline-primary text-decoration-none d-inline-flex align-items-center text-nowrap gap-1"
                            >
                                <FaArrowLeft />
                                <span className="fw-semibold ">All slides</span>
                            </Link>
                        </div>
                        <div className="col-7 col-md-5 col-lg-4 col-xl-3 ms-auto"></div>
                    </div>
                </div>
                <div className="card-body">
                    {isLoading ? (
                        ""
                    ) : (
                        <form onSubmit={handleFormSubmit}>
                            <div className="row gy-3">
                                <div className="col-12">
                                    <label
                                        htmlFor="title"
                                        className="form-label"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className={`form-control ${
                                            errors.title ? "is-invalid" : ""
                                        }`}
                                        placeholder="Write slide title"
                                        defaultValue={slide.title}
                                    />
                                    {errors.title && (
                                        <div className="invalid-feedback">
                                            {errors.title}
                                        </div>
                                    )}
                                </div>
                                <div className="col-12">
                                    <label
                                        htmlFor="description"
                                        className="form-label"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        type="text"
                                        name="description"
                                        id="description"
                                        className={`form-control ${
                                            errors.description
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Write slide description here..."
                                        rows={7}
                                        defaultValue={slide.description}
                                    />
                                    {errors.description && (
                                        <div className="invalid-feedback">
                                            {errors.description}
                                        </div>
                                    )}
                                </div>
                                <div className="col-12">
                                    <label
                                        htmlFor="image"
                                        className="form-label"
                                    >
                                        Image
                                    </label>
                                    <input
                                        className={`form-control ${
                                            errors.image ? "is-invalid" : ""
                                        }`}
                                        type="file"
                                        id="image"
                                        name="image"
                                    />
                                    {errors.image && (
                                        <div className="invalid-feedback">
                                            {errors.image}
                                        </div>
                                    )}
                                    <img
                                        src={slide.image}
                                        alt=""
                                        className="img-fluid mt-2"
                                        width={200}
                                    />
                                </div>
                                <div className="col-12">
                                    <label
                                        htmlFor="button-1-text"
                                        className="form-label"
                                    >
                                        Button 1
                                    </label>
                                    <div className="row gx-2">
                                        <div className="col-6">
                                            <input
                                                type="text"
                                                name="button_1_text"
                                                id="button_1_text"
                                                className={`form-control ${
                                                    errors.button_1_text
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                placeholder="Button text"
                                                defaultValue={
                                                    slide.button_1_text
                                                }
                                            />
                                            {errors.button_1_text && (
                                                <div className="invalid-feedback">
                                                    {errors.button_1_text}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-6">
                                            <input
                                                type="text"
                                                name="button_1_link"
                                                id="button_1_link"
                                                className={`form-control ${
                                                    errors.button_1_link
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                placeholder="Button Link"
                                                defaultValue={
                                                    slide.button_1_link
                                                }
                                            />
                                            {errors.button_1_link && (
                                                <div className="invalid-feedback">
                                                    {errors.button_1_link}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label
                                        htmlFor="button-2-text"
                                        className="form-label"
                                    >
                                        Button 2
                                    </label>
                                    <div className="row gx-2">
                                        <div className="col-6">
                                            <input
                                                type="text"
                                                name="button_2_text"
                                                id="button_2_text"
                                                className={`form-control ${
                                                    errors.button_2_text
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                placeholder="Button text"
                                                defaultValue={
                                                    slide.button_2_text
                                                }
                                            />
                                            {errors.button_2_text && (
                                                <div className="invalid-feedback">
                                                    {errors.button_2_text}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-6">
                                            <input
                                                type="text"
                                                name="button_2_link"
                                                id="button_2_link"
                                                className={`form-control ${
                                                    errors.button_2_link
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                placeholder="Button Link"
                                                defaultValue={
                                                    slide.button_2_link
                                                }
                                            />
                                            {errors.button_2_link && (
                                                <div className="invalid-feedback">
                                                    {errors.button_2_link}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 text-end">
                                    <button
                                        className={`btn  px-3 ${
                                            isUpdating
                                                ? "btn-primary disabled"
                                                : isUpdated
                                                ? "btn-success"
                                                : "btn-primary"
                                        }`}
                                        type="submit"
                                    >
                                        {isUpdating
                                            ? "Updating"
                                            : isUpdated
                                            ? "Updated!"
                                            : "Update"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default EditSlide;
