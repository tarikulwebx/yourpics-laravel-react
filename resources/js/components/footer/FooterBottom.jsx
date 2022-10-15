import React from "react";
import { Link } from "react-router-dom";
import "./FooterBottom.scss";

const FooterBottom = () => {
    return (
        <section className="footer-bottom py-4">
            <div className="container-xl">
                <p className="mb-0 text-center">
                    Copyright &copy;{new Date().getFullYear()} All Rights
                    Reserved by{" "}
                    <Link to="/" className="text-primary text-decoration-none">
                        Yourpics
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default FooterBottom;
