import React, { useEffect, useState } from "react";
import { FaEnvelope, FaMapMarked, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
    const [errors, setErrors] = useState({});
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSending(true);

        let formData = new FormData(e.currentTarget);

        axios
            .post("/sendContactMessage", formData)
            .then((res) => {
                setErrors({});
                setIsSending(false);
                setIsSent(true);
            })
            .catch((ex) => {
                const res = ex.response;

                if (res.status === 422) {
                    setErrors(res.data.errors);
                } else {
                    console.log(res);
                    setErrors({});
                }

                setIsSending(false);
            });
    };
    return (
        <section className="">
            <div className="bg-primary bg-opacity-10 text-primary py-4 mb-4">
                <div className="container-xl py-2">
                    <h2 className="mb-0 text-uppercase fw-bold">Contact Us</h2>
                </div>
            </div>
            <div className="mb-4">
                <div className="container-xl">
                    <div className="row gy-3">
                        <div className="col-md-7 col-lg-8">
                            <div className="card rounded-4">
                                <div className="card-body p-4">
                                    <h4 className="mb-1">Send message</h4>
                                    <p className="fw-light">
                                        Feel free to contact with us. We are
                                        appreciate your opinion and concept.
                                    </p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="name"
                                                className="form-label"
                                            >
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${
                                                    errors.name
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                name="name"
                                                placeholder="Your name"
                                            />
                                            {errors.name && (
                                                <div className="invalid-feedback">
                                                    {errors.name}
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="email"
                                                className="form-label"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${
                                                    errors.email
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                name="email"
                                                placeholder="Your email"
                                            />
                                            {errors.subject && (
                                                <div className="invalid-feedback">
                                                    {errors.subject}
                                                </div>
                                            )}{" "}
                                        </div>

                                        <div className="mb-3">
                                            <label
                                                htmlFor="message"
                                                className="form-label"
                                            >
                                                Message
                                            </label>
                                            <textarea
                                                name="message"
                                                className={`form-control ${
                                                    errors.message
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                rows="7"
                                                placeholder="Write message here..."
                                            ></textarea>
                                            {errors.message && (
                                                <div className="invalid-feedback">
                                                    {errors.message}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className={`btn  ${
                                                    isSending
                                                        ? "btn-primary disabled"
                                                        : isSent
                                                        ? "btn-success disabled"
                                                        : "btn-primary"
                                                }`}
                                            >
                                                {isSending
                                                    ? "Message Sending..."
                                                    : isSent
                                                    ? "Message Sent!"
                                                    : "Send Message"}
                                            </button>
                                            {isSent && (
                                                <p className="text-success mt-2 mb-0">
                                                    Message has been sent.
                                                    Yourpics will contact you
                                                    very soon. Thank you.
                                                </p>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-lg-4">
                            <div className="card rounded-4">
                                <div className="card-body p-4">
                                    <p className="mb-1">
                                        <FaEnvelope className=" me-2" />
                                        <a
                                            href="mailto:support@yourpics.com"
                                            className="text-decoration-none"
                                        >
                                            support@yourpics.com
                                        </a>
                                    </p>
                                    <p className="mb-1">
                                        <FaMapMarked className=" me-2" />
                                        Rangpur, Bangladesh
                                    </p>
                                    <p className="mb-1">
                                        <FaWhatsapp className=" me-2" />
                                        0123456789
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
