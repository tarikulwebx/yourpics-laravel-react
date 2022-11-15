import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Hero.scss";

const Hero = () => {
    const [slides, setSlides] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [popularTags, setPopularTags] = useState([]);
    const [isLoadingPopularTags, setIsLoadingPopularTags] = useState(true);

    const [searchInput, setSearchInput] = useState(null);
    const navigate = useNavigate();

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
        getPopularTags();
    }, []);

    // get popular tags
    const getPopularTags = () => {
        setIsLoadingPopularTags(true);
        axios
            .get("/getPopularTags")
            .then((res) => {
                setPopularTags(res.data);
                setIsLoadingPopularTags(false);
            })
            .catch((ex) => {
                const res = ex.response;
                // console.log(res);
                setIsLoadingPopularTags(false);
            });
    };

    // handle search form
    const handleSearchForm = (e) => {
        e.preventDefault();
        navigate(`/gallery?search=${searchInput}`);
    };

    return (
        <section className="hero-section pt-4 pt-md-5 mb-4 px-sm-2">
            <div className="container-xl pt-2 pt-md-0">
                {isLoading ? (
                    <div className="row align-items-center gy-3 gx-3">
                        <div className="col-md-5">
                            <h1 className="text-light fw-bold placeholder-grow mb-3">
                                <span className="w-100 placeholder rounded"></span>
                            </h1>
                            {[...Array(4)].map((el, index) => (
                                <p
                                    className="lead fw-normal text-white-50 placeholder-grow mb-0"
                                    key={index}
                                >
                                    <span className="w-100 placeholder rounded"></span>
                                </p>
                            ))}
                        </div>
                        <div className="col-md-7">
                            <div
                                className="text-center position-relative"
                                style={{ width: "100%", height: "350px" }}
                            >
                                <div
                                    className="spinner-border text-white"
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                    }}
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        id="carouselExampleCaptions"
                        className="carousel carousel-fade"
                        data-bs-ride="false"
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
                                    <div className="row align-items-center gy-3 gx-2">
                                        <div className="col-md-5">
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
                                        <div className="col-md-7">
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
                )}

                <div className="pb-4 pt-4 pt-md-5 mt-5 position-relative">
                    <div className="row align-items-end gy-4">
                        <div className="col-lg-7">
                            <strong className="text-black mb-1 me-2">
                                Popular Tags:{" "}
                            </strong>
                            {isLoadingPopularTags ? (
                                <p className="placeholder-grow mb-0 d-inline">
                                    {[...Array(10)].map((el, index) => (
                                        <span
                                            className="placeholder text-light me-1 mb-1 rounded"
                                            style={{ width: "80px" }}
                                            key={index}
                                        ></span>
                                    ))}
                                </p>
                            ) : (
                                popularTags.map((tag, index) => (
                                    <Link
                                        to={`/tags/${tag.slug}`}
                                        className="badge rounded-pill text-bg-light text-decoration-none me-1 mb-1"
                                        key={tag.id}
                                    >
                                        {tag.name}
                                    </Link>
                                ))
                            )}
                        </div>
                        <div
                            className="col-lg-5"
                            style={{ marginBottom: "-1.75rem" }}
                        >
                            <div className="search-wrapper p-2 p-md-4 rounded shadow-sm w-100">
                                <form onSubmit={handleSearchForm}>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="search"
                                            className="form-control shadow-none"
                                            placeholder="Search content..."
                                            aria-label="search input"
                                            aria-describedby="search"
                                            onChange={(e) =>
                                                setSearchInput(e.target.value)
                                            }
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
