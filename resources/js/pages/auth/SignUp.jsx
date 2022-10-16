import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const SignUp = () => {
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const { setIsLoggedIn, setUser } = useContext(UserContext);

    // Get LoggedIn User info
    const getLoggedInUser = () => {
        axios
            .get("/getUser")
            .then((res) => {
                // console.log(res);
                if (Object.keys(res.data).length > 0) {
                    setIsLoggedIn(true);
                    setUser(res.data);
                } else {
                    setIsLoggedIn(false);
                    setUser({});
                }
            })
            .catch((ex) => {
                let res = ex.response;
                console.log(res);
            });
    };

    // Form Handle
    const handleFormSubmit = (e) => {
        e.preventDefault();

        setIsProcessing(true);

        let formData = new FormData(e.currentTarget);

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("/register", formData)
                .then((res) => {
                    setIsCompleted(true);
                    getLoggedInUser();
                })
                .catch((ex) => {
                    let res = ex.response;
                    setErrors(res.data.errors);
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
                                    Create Account
                                </h3>

                                <form onSubmit={handleFormSubmit}>
                                    <div className="row gy-3 gx-3">
                                        <div className="col-sm-6">
                                            <label
                                                htmlFor="first_name"
                                                className="form-label fw-light mb-1"
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
                                                className="form-label fw-light mb-1"
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
                                                autoComplete="last_name"
                                                required
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
                                                className="form-label fw-light mb-1"
                                            >
                                                Email
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
                                                autoComplete="email"
                                                required
                                            />
                                            {errors.email && (
                                                <div className="invalid-feedback">
                                                    {errors.email}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-12">
                                            <label
                                                htmlFor="password"
                                                className="form-label fw-light mb-1"
                                            >
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className={
                                                    errors.password
                                                        ? "form-control is-invalid"
                                                        : "form-control"
                                                }
                                                placeholder="Enter password"
                                                required
                                                autoComplete="new-password"
                                            />
                                            {errors.password && (
                                                <div className="invalid-feedback">
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-12">
                                            <label
                                                htmlFor="password_confirm"
                                                className="form-label fw-light mb-1"
                                            >
                                                Confirm password
                                            </label>
                                            <input
                                                type="password"
                                                name="password_confirmation"
                                                id="password_confirmation"
                                                className="form-control"
                                                placeholder="Rewrite password"
                                                required
                                                autoComplete="new-password"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <button
                                                className={
                                                    isProcessing || isCompleted
                                                        ? "btn btn-primary w-100 py-2 mt-1 fw-normal disabled"
                                                        : "btn btn-primary w-100 py-2 mt-1 fw-normal"
                                                }
                                            >
                                                {isProcessing
                                                    ? "Signing Up..."
                                                    : isCompleted
                                                    ? "Signed Up"
                                                    : "Sign Up"}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-3 gap-1 flex-column">
                                        <Link
                                            to="/signin"
                                            className="text-decoration-none small"
                                        >
                                            Already have an account?{" "}
                                            <strong className="fw-semibold">
                                                Sign In
                                            </strong>
                                        </Link>
                                        <Link
                                            to="/password-reset"
                                            className="text-decoration-none small"
                                        >
                                            Forgot password?{" "}
                                            <strong className="fw-semibold">
                                                Reset
                                            </strong>
                                        </Link>
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

export default SignUp;
