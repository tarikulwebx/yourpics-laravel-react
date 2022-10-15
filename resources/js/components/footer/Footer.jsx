import React from "react";
import "./Footer.scss";
import FooterBottom from "./FooterBottom";
import FooterTop from "./FooterTop";

const Footer = () => {
    return (
        <footer>
            <FooterTop />
            <FooterBottom />
        </footer>
    );
};

export default Footer;
