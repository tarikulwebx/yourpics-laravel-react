import React, { useContext, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { UserContext } from "../../contexts/UserContext";

const EditProfile = () => {
    const { user, setUser } = useContext(UserContext);

    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [selectedPicture, setSelectedPicture] = useState(null);

    // Get Updated user details
    const getUpdatedUserDetails = () => {
        axios
            .get("/getUser")
            .then((res) => {
                if (Object.keys(res.data).length > 0) {
                    setUser(res.data);
                }
            })
            .catch((ex) => {
                let res = ex.response;
                console.log(res);
            });
    };

    // Form Handle
    const handleEditFormSubmit = (e) => {
        e.preventDefault();

        setIsProcessing(true);

        let formData = new FormData(e.currentTarget);

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("/profile/update", formData)
                .then((res) => {
                    // console.log(res);
                    getUpdatedUserDetails();

                    setIsProcessing(false);
                    setIsUpdated(true);

                    setTimeout(() => {
                        setIsUpdated(false);
                    }, 3000);
                })
                .catch((ex) => {
                    let res = ex.response;

                    if (res.status === 422) {
                        setErrors(res.data.errors);
                    }
                    setIsProcessing(false);
                });
        });
    };

    // Picture input handle
    const onPictureChangeHandle = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedPicture(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className="card shadow rounded-4 border-0">
            <div className="card-header bg-white  rounded-3 py-3 px-4">
                <h5 className="mb-0 text-dark">Edit Profile</h5>
            </div>
            <div className="card-body p-4">
                <form onSubmit={handleEditFormSubmit}>
                    <div className="row gy-3">
                        <div className="col-sm-4 col-xl-3">
                            <img
                                src={
                                    selectedPicture
                                        ? selectedPicture
                                        : user.picture
                                        ? user.picture
                                        : "/assets/images/profile-placeholder.jpg"
                                }
                                className="img-fluid w-100 rounded-circle shadow-sm"
                                alt={user.first_name}
                            />
                            <div className="mt-2">
                                <label
                                    htmlFor="picture"
                                    className="form-label mb-1 fw-light text-primary"
                                >
                                    Change profile picture
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
                                <div className="col-sm-6">
                                    <label
                                        htmlFor="first_name"
                                        className="form-label mb-1 fw-light"
                                    >
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        className={
                                            errors.first_name
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        placeholder="Enter first name"
                                        autoFocus
                                        autoComplete="first_name"
                                        required
                                        defaultValue={user.first_name}
                                    />
                                    {errors.first_name && (
                                        <div className="invalid-feedback">
                                            {errors.first_name}
                                        </div>
                                    )}
                                </div>
                                <div className="col-sm-6">
                                    <label
                                        htmlFor="last_name"
                                        className="form-label mb-1 fw-light"
                                    >
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        id="last_name"
                                        className={
                                            errors.last_name
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        placeholder="Enter last name"
                                        required
                                        autoComplete="last_name"
                                        defaultValue={user.last_name}
                                    />
                                    {errors.last_name && (
                                        <div className="invalid-feedback">
                                            {errors.last_name}
                                        </div>
                                    )}
                                </div>
                                <div className="col-12">
                                    <label
                                        htmlFor="email"
                                        className="form-label mb-1 fw-light"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="form-control user-select-none text-muted"
                                        placeholder="Enter last name"
                                        required
                                        disabled
                                        defaultValue={user.email}
                                    />
                                </div>
                                <div className="col-12">
                                    <label
                                        htmlFor="bio"
                                        className="form-label mb-1 fw-light"
                                    >
                                        Your bio
                                    </label>
                                    <textarea
                                        name="bio"
                                        id="bio"
                                        className={
                                            errors.bio
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        rows="10"
                                        placeholder="About you..."
                                        defaultValue={user.bio}
                                    ></textarea>
                                    {errors.bio && (
                                        <div className="invalid-feedback">
                                            {errors.bio}
                                        </div>
                                    )}
                                </div>
                                <div className="col-12 text-end">
                                    <button
                                        className={
                                            isProcessing
                                                ? "btn btn-primary disabled"
                                                : isUpdated
                                                ? "btn btn-success disabled"
                                                : "btn btn-primary"
                                        }
                                        type="submit"
                                    >
                                        {isProcessing
                                            ? "Updating..."
                                            : isUpdated
                                            ? "Updated"
                                            : " Update Profile"}

                                        {isUpdated && (
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

export default EditProfile;
