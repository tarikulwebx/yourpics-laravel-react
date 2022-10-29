import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const SignIn = () => {
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const navigate = useNavigate();

    const { setIsLoggedIn, setUser, setFavorites } = useContext(UserContext);

    // Get user favorites
    const getFavoritesArray = () => {
        axios
            .get("/getFavoritesArray")
            .then((res) => {
                if (res.status === 200) {
                    setFavorites(res.data);
                }
            })
            .cath((ex) => {
                const res = ex.response;
                console.log(res);
            });
    };

    // Get Signed In User info
    const getLoggedInUser = () => {
        axios
            .get("/getUser")
            .then((res) => {
                // console.log(res);
                if (Object.keys(res.data).length > 0) {
                    setIsLoggedIn(true);
                    setUser(res.data);
                    getFavoritesArray();
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

    // Handle SignIn Form Submit
    const signInFormHandler = (e) => {
        e.preventDefault();

        setIsProcessing(true);

        const formData = new FormData(e.currentTarget);
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("/login", formData)
                .then((res) => {
                    setErrors({});

                    // Already logged in
                    if (res.status === 200) {
                        console.log("You are already logged in");
                        setIsCompleted(true);
                        setTimeout(() => {
                            navigate("/profile", { replace: true });
                        }, 700);
                    }

                    // Logged in successfully
                    if (res.status === 204) {
                        setIsCompleted(true);
                        getLoggedInUser();
                    }

                    setIsProcessing(false);
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
                                    Login Account
                                </h3>

                                <form onSubmit={signInFormHandler}>
                                    <div className="row gy-3 gx-3">
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
                                                autoComplete="current-password"
                                            />
                                            {errors.password && (
                                                <div className="invalid-feedback">
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-2 form-check fw-light">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="remember"
                                                    name="remember"
                                                    value={true}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="remember"
                                                >
                                                    Remember me
                                                </label>
                                            </div>

                                            <button
                                                type="submit"
                                                className={
                                                    isProcessing || isCompleted
                                                        ? "btn btn-primary w-100 py-2 mt-1 fw-normal disabled"
                                                        : "btn btn-primary w-100 py-2 mt-1 fw-normal"
                                                }
                                            >
                                                {isProcessing
                                                    ? "Signing In..."
                                                    : isCompleted
                                                    ? "Signed In"
                                                    : "Sign In"}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-3 gap-1 flex-column">
                                        <Link
                                            to="/signup"
                                            className="text-decoration-none small"
                                        >
                                            Don't have an account?{" "}
                                            <strong className="fw-semibold">
                                                Sign Up
                                            </strong>
                                        </Link>
                                        <Link
                                            to="/password-reset-email"
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

export default SignIn;
