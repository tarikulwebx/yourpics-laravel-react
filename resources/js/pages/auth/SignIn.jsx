import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
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

                                <form autocomplete="on">
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
                                                className="form-control"
                                                placeholder="Enter email"
                                                autoFocus
                                                required
                                                autoComplete="email"
                                            />
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
                                                className="form-control is-invalid"
                                                placeholder="Enter password"
                                                required
                                            />
                                            <div class="invalid-feedback">
                                                Please enter your name.
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-2 mt-1 fw-normal">
                                                Sign Up
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
                                        <a
                                            href="!#"
                                            className="text-decoration-none small"
                                        >
                                            Forgot password?{" "}
                                            <strong className="fw-semibold">
                                                Reset
                                            </strong>
                                        </a>
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
