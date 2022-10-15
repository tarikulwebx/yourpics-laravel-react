import React from "react";
import "./FooterTop.scss";
import { FaMapMarked, FaEnvelope } from "react-icons/fa";

const FooterTop = () => {
    return (
        <section className="footer-top px-sm-2 text-white py-5">
            <div className="container-xl">
                <div className="row gy-4">
                    {/* Column 1 */}
                    <div className="col-md-6 col-lg-3">
                        <div className="site-info">
                            <div className="d-flex align-items-center gap-2 mb-2 pb-1">
                                <img
                                    className="site-info__logo"
                                    src="assets/images/logo.png"
                                    alt="logo"
                                />
                                <h3 className="site-info__name mb-0">
                                    Yourpics
                                </h3>
                            </div>
                            <p className="site-info__description mb-3">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Magni necessitatibus officiis
                                minima, ipsam expedita voluptatem
                            </p>
                            <p className="mb-1 fw-normal small location site-info__location">
                                <FaMapMarked className="icon me-2" />
                                Rangpur, Bangladesh
                            </p>
                            <p className="fw-normal small mb-2 mb-lg-0 email site-info__email">
                                <FaEnvelope className="icon me-2" />
                                <a
                                    href="mailto:support@yourpics.com"
                                    className="text-decoration-none"
                                >
                                    support@yourpics.com
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="col-md-6 col-lg-3">
                        <div className="list-widget">
                            <h5 className="mb-3 list-widget__title">
                                Quick Links
                            </h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a
                                        href="!#"
                                        className="text-decoration-none"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="!#"
                                        className="text-decoration-none"
                                    >
                                        About Us
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="!#"
                                        className="text-decoration-none"
                                    >
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="!#"
                                        className="text-decoration-none"
                                    >
                                        FAQs
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="!#"
                                        className="text-decoration-none"
                                    >
                                        Privecy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Column 3 */}
                    <div className="col-md-6 col-lg-3">
                        <div className="list-widget">
                            <h5 className="mb-3 list-widget__title">
                                Help Links
                            </h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a
                                        href="!#"
                                        className="text-decoration-none"
                                    >
                                        Login
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="!#"
                                        className="text-decoration-none"
                                    >
                                        Register
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="!#"
                                        className="text-decoration-none"
                                    >
                                        Gallery
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="!#"
                                        className="text-decoration-none"
                                    >
                                        Your Gallery
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="!#"
                                        className="text-decoration-none"
                                    >
                                        Edit Profile
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Column 4 */}
                    <div className="col-md-6 col-lg-3">
                        <div className="list-widget">
                            <h5 className="mb-3 list-widget__title">
                                Social Links
                            </h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a
                                        href="!#"
                                        className="text-decoration-none"
                                    >
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="!#"
                                        className="text-decoration-none"
                                    >
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="!#"
                                        className="text-decoration-none"
                                    >
                                        Github
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="!#"
                                        className="text-decoration-none"
                                    >
                                        Youtube
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="!#"
                                        className="text-decoration-none"
                                    >
                                        Instagram
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FooterTop;
