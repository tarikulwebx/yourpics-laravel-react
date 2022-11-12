import React, { useEffect, useState } from "react";
import "./Hero.scss";

const Hero = () => {
    const [slides, setSlides] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllSlides = () => {
        setIsLoading(true);
        axios
            .get("/getAllSlides")
            .then((res) => {
                setSlides(res.data);
                setIsLoading(false);
            })
            .catch((ex) => {
                const res = ex.response;
                // console.log(res);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getAllSlides();
    }, []);

    return (
        <section className="hero-section pt-5 mb-4 px-sm-2">
            <div className="container-xl">
                <div
                    id="carouselExampleCaptions"
                    className="carousel carousel-fade"
                    data-bs-ride="true"
                >
                    <div className="carousel-indicators mb-0">
                        {slides.map((slide, index) => (
                            <button
                                type="button"
                                key={slide.id}
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to={index}
                                className={`${index === 0 ? "active" : ""}`}
                                aria-current={`${index === 0 ? true : ""}`}
                                aria-label={slide.title}
                            ></button>
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {slides.map((slide, index) => (
                            <div
                                className={`carousel-item ${
                                    index === 0 ? "active" : ""
                                }`}
                                key={slide.id}
                            >
                                <div className="row align-items-center gy-4">
                                    <div className="col-lg-5">
                                        <h1 className="text-light fw-bold">
                                            {slide.title}
                                        </h1>
                                        <p className="lead fw-normal text-white-50">
                                            {slide.description}
                                        </p>
                                        {slide.button_1_text && (
                                            <a
                                                href={slide.button_1_link}
                                                className="btn btn-sm btn-secondary me-2 mb-2 shadow-sm"
                                            >
                                                {slide.button_1_text}
                                            </a>
                                        )}
                                        {slide.button_2_text && (
                                            <a
                                                href={slide.button_2_link}
                                                className="btn btn-sm btn-outline-light me-2 mb-2"
                                            >
                                                {slide.button_2_text}
                                            </a>
                                        )}
                                    </div>
                                    <div className="col-lg-7">
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            className="img-fluid w-100"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pb-4 pt-5 mt-5 position-relative">
                    <div className="row align-items-end gy-4">
                        <div className="col-lg-7">
                            <strong className="text-black">
                                Popular Tags:{" "}
                            </strong>

                            <span className="badge rounded-pill text-bg-primary">
                                Primary
                            </span>
                            <span className="badge rounded-pill text-bg-secondary">
                                Secondary
                            </span>
                            <span className="badge rounded-pill text-bg-success">
                                Success
                            </span>
                            <span className="badge rounded-pill text-bg-danger">
                                Danger
                            </span>
                            <span className="badge rounded-pill text-bg-warning">
                                Warning
                            </span>
                            <span className="badge rounded-pill text-bg-info">
                                Info
                            </span>
                            <span className="badge rounded-pill text-bg-light">
                                Light
                            </span>
                            <span className="badge rounded-pill text-bg-dark">
                                Dark
                            </span>
                        </div>
                        <div
                            className="col-lg-5"
                            style={{ marginBottom: "-3.75rem" }}
                        >
                            <div className="search-wrapper p-3 rounded shadow-sm w-100">
                                <form action="" method="GET">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="search"
                                            className="form-control shadow-none"
                                            placeholder="Search content..."
                                            aria-label="search input"
                                            aria-describedby="search"
                                        />
                                        <span
                                            className="input-group-text p-0 m-0 border-0"
                                            id="search"
                                        >
                                            <button
                                                className="btn btn-primary h-100 px-3"
                                                type="submit"
                                            >
                                                <i className="fa-solid fa-magnifying-glass me-1"></i>
                                                Search
                                            </button>
                                        </span>
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

export default Hero;
