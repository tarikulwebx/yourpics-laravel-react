import React, { useState } from "react";

const ResetEmail = () => {
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Form Handle
    const handleResetEmailForm = (e) => {
        e.preventDefault();

        setIsProcessing(true);

        let formData = new FormData(e.currentTarget);

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("/password/email", formData)
                .then((res) => {
                    console.log(res);
                    setIsProcessing(false);
                    setIsEmailSent(true);
                })
                .catch((ex) => {
                    let res = ex.response;
                    console.log(res);
                    if (res.data.errors) {
                        setErrors(res.data.errors);
                    } else {
                        setErrors({});
                    }
                    if (res.status === 500) {
                        setErrorMessage(res.statusText);
                    }
                    setIsProcessing(false);
                });
        });
    };

    return (
        <section className="px-sm-2 py-4 my-2 my-sm-3">
            <div className="container-xl">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-7">
                        <div className="card shadow rounded-4 p-sm-2 border-0">
                            <div className="card-body p-4">
                                <h3 className="card-title text-center fw-bold mb-4 pb-sm-1">
                                    Reset Password
                                </h3>

                                {isEmailSent && (
                                    <div className="alert alert-success">
                                        We have emailed your password reset link
                                    </div>
                                )}

                                {errorMessage.length > 0 && (
                                    <div className="alert alert-danger">
                                        {errorMessage}
                                    </div>
                                )}

                                <form onSubmit={handleResetEmailForm}>
                                    <div className="row gy-3 gx-3">
                                        <div className="col-12">
                                            <label
                                                htmlFor="email"
                                                className="form-label fw-light mb-1"
                                            >
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className={
                                                    errors.email
                                                        ? "form-control is-invalid"
                                                        : "form-control"
                                                }
                                                placeholder="Enter email"
                                                autoFocus
                                                required
                                                autoComplete="email"
                                            />
                                            {errors.email && (
                                                <div className="invalid-feedback">
                                                    {errors.email}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-12">
                                            <button
                                                type="submit"
                                                className={
                                                    isProcessing || isEmailSent
                                                        ? "btn btn-primary w-100 py-2 mt-1 fw-normal disabled"
                                                        : "btn btn-primary w-100 py-2 mt-1 fw-normal"
                                                }
                                            >
                                                {isProcessing
                                                    ? "Sending Password Reset Link..."
                                                    : isEmailSent
                                                    ? "Sent Password Reset Link!"
                                                    : "Send Password Reset Link"}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetEmail;
