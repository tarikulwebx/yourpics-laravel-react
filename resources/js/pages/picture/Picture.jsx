import React, { useContext, useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
    FaCheckCircle,
    FaDownload,
    FaHeart,
    FaLongArrowAltRight,
    FaMedal,
    FaRegHeart,
    FaShare,
    FaShieldAlt,
} from "react-icons/fa";

import { BsImages } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import "./Picture.scss";
import { ToastContext } from "../../contexts/ToastContext";
import { UserContext } from "../../contexts/UserContext";

const Picture = () => {
    const { slug } = useParams();

    // states
    const [isLoading, setIsLoading] = useState(false);
    const [picture, setPicture] = useState({});
    const [tags, setTags] = useState([]);
    const [user, setUser] = useState({});
    const [tooltipText, setTooltipText] = useState("  Copy  ");

    const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
    const [favoritesCount, setFavoritesCount] = useState(null);
    const [isFavoritesCountLoaded, setIsFavoritesCountLoaded] = useState(false);

    // contexts
    const { setShowToast, setToastMessage, setToastType } =
        useContext(ToastContext);
    const { favorites, setFavorites } = useContext(UserContext);

    // get picture by slug
    const getPictureBySlug = (slug) => {
        setIsLoading(true);

        axios
            .get(`/getPictureBySlug/${slug}`)
            .then((res) => {
                setPicture(res.data);
                setTags(res.data.tags);
                setUser(res.data.user);
                setIsLoading(false);
            })
            .catch((ex) => {
                console.log(ex);
                setIsLoading(false);
            });
    };

    // effect
    useEffect(() => {
        setIsLoading(true);
        getPictureBySlug(slug);
        getFavoritesCount(slug);
    }, [slug]);

    // add to favorite
    const addToFavorite = (id) => {
        setIsFavoriteLoading(true);
        axios
            .get("/addToFavorite/" + id)
            .then((res) => {
                if (res.status === 200) {
                    setToastMessage(res.data.message);
                    setToastType("success");
                    setShowToast(true);
                    setFavorites([...favorites, id]);
                }
                setIsFavoriteLoading(false);
            })
            .catch((ex) => {
                const res = ex.response;
                if (res.status === 401) {
                    setToastMessage("Login required!");
                    setToastType("warning");
                    setShowToast(true);
                }
                setIsFavoriteLoading(false);
            });
    };

    // remove from favorite
    const removeFromFavorite = (id) => {
        setIsFavoriteLoading(true);
        axios
            .get("/removeFromFavorite/" + id)
            .then((res) => {
                setFavorites((prevState) =>
                    prevState.filter((prevItem) => prevItem !== id)
                );
                setToastMessage(res.data.message);
                setToastType("success");
                setShowToast(true);
                setIsFavoriteLoading(false);
            })
            .catch((ex) => {
                const res = ex.response;
                setToastMessage("Error occurred!");
                setToastType("danger");
                setShowToast(true);
                setIsFavoriteLoading(false);
            });
    };

    // Get favorites count
    const getFavoritesCount = (slug) => {
        axios
            .get("/getFavoritesCountByPictureSlug/" + slug)
            .then((res) => {
                setFavoritesCount(res.data);
                setIsFavoritesCountLoaded(true);
            })
            .catch((ex) => {
                console.log(ex);
            });
    };

    // Copy to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setTooltipText("Copied!");
        setTimeout(() => {
            setTooltipText("Copy");
        }, 1500);
    };

    return (
        <section className="my-4 py-2 px-sm-2 single-picture-page">
            <div className="container-xl">
                <div className="card shadow border-0 rounded-4">
                    <div className="card-header d-flex justify-content-between align-items-center bg-transparent py-3">
                        {/* user details */}
                        <div className="d-flex align-items-center gap-2">
                            {isLoading ? (
                                <>
                                    <p
                                        className="placeholder-glow rounded-circle mb-0 userPicturePlaceholder"
                                        style={{ width: "40px" }}
                                    >
                                        <span
                                            className="placeholder col-12 rounded-circle"
                                            style={{ height: "40px" }}
                                        ></span>
                                    </p>
                                    <div>
                                        <h6
                                            className="placeholder-glow mb-0"
                                            style={{ width: "100px" }}
                                        >
                                            <span className="placeholder col-12 rounded-1"></span>
                                        </h6>
                                        <p
                                            className="placeholder-glow mb-0"
                                            style={{ width: "50px" }}
                                        >
                                            <span className="placeholder col-12 rounded-1"></span>
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to={`/uploader/${user.slug}`}
                                        className="rounded-circle"
                                    >
                                        <img
                                            src={
                                                user.picture
                                                    ? user.picture
                                                    : "/assets/images/profile-placeholder.jpg"
                                            }
                                            alt="profile picture"
                                            className="rounded-circle user-picture bg-dark bg-opacity-10"
                                            width={40}
                                        />
                                    </Link>
                                    <div>
                                        <h6 className="mb-0">
                                            <Link
                                                to={`/uploader/${user.slug}`}
                                                className="text-decoration-none"
                                            >
                                                {user.first_name +
                                                    " " +
                                                    user.last_name}
                                            </Link>
                                        </h6>
                                        <small className="mb-0 d-flex align-items-center gap-1 text-muted text-capitalize">
                                            <FaMedal className="text-secondary" />{" "}
                                            {user.rank}
                                        </small>
                                    </div>
                                </>
                            )}
                        </div>
                        {/* Actions */}
                        <div className="d-flex align-items-center flex-row gap-2">
                            {favorites.includes(picture.id) ? (
                                <button
                                    onClick={() =>
                                        removeFromFavorite(picture.id)
                                    }
                                    className="btn btn-sm btn-outline-secondary"
                                >
                                    <FaHeart className="fs-6" />
                                </button>
                            ) : (
                                <button
                                    onClick={() => addToFavorite(picture.id)}
                                    className="btn btn-sm btn-outline-secondary"
                                >
                                    <FaRegHeart className="fs-6" />
                                </button>
                            )}
                            <a
                                href={"/download/" + picture.slug}
                                className="btn btn-sm btn-primary d-sm-flex align-items-md-center gap-sm-2"
                            >
                                <FaDownload />
                                <span className="d-none d-sm-inline">
                                    Download
                                </span>
                            </a>
                        </div>
                    </div>
                    {/* card body */}
                    <div className="card-body">
                        <div className="row gy-4">
                            <div className="col-12 col-xl-8">
                                <img
                                    src={
                                        picture.image
                                            ? picture.image
                                            : "/assets/images/placeholder.jpg"
                                    }
                                    alt={picture.title}
                                    className="img-fluid rounded-2 bg-dark bg-opacity-10"
                                />
                            </div>
                            <div className="col-12 col-xl-4">
                                <h4 className="mb-3">{picture.title}</h4>
                                <div className="row gy-4">
                                    <div className="col-lg-6 col-xl-12">
                                        <div className="d-flex align-items-center gap-3 gap-md-4 gap-xl-3">
                                            <div>
                                                <p className="mb-1 fw-semibold">
                                                    Views
                                                </p>
                                                <p className="mb-0 small text-muted">
                                                    {picture.views}
                                                </p>
                                            </div>
                                            <div className="vr"></div>
                                            <div>
                                                <p className="mb-1 fw-semibold">
                                                    Downloads
                                                </p>
                                                <p className="mb-0 small text-muted">
                                                    {picture.downloads}
                                                </p>
                                            </div>
                                            <div className="vr"></div>
                                            <div>
                                                <p className="mb-1 fw-semibold">
                                                    Favorite
                                                </p>
                                                <p className="mb-0 small text-muted">
                                                    {isFavoritesCountLoaded
                                                        ? favoritesCount
                                                        : "..."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-xl-12">
                                        <p className="mb-2 small d-flex align-items-center gap-2">
                                            <FaCheckCircle className="text-success text-opacity-75" />
                                            Published {picture.created_at}
                                        </p>
                                        <p className="mb-2 small d-flex align-items-center gap-2">
                                            <FaCheckCircle className="text-success text-opacity-75" />
                                            Dimension: {picture.dimension}{" "}
                                            pixels
                                        </p>
                                        <p className="mb-0 small d-flex align-items-center gap-2">
                                            <FaCheckCircle className="text-success text-opacity-75" />
                                            Size: {picture.size} MB
                                        </p>
                                    </div>
                                    <div className="col-12">
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip id="copyToClipboardToolTipId">
                                                    {tooltipText}
                                                </Tooltip>
                                            }
                                        >
                                            <button
                                                className=" btn btn-sm btn-outline-secondary me-2"
                                                onClick={() =>
                                                    copyToClipboard(
                                                        `${window.location.origin}/picture/${picture.slug}`
                                                    )
                                                }
                                            >
                                                <FaShare className="me-1" />
                                                Share link
                                            </button>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </div>
                            {picture.description && (
                                <div className="col-12">
                                    <h6 className="mb-1 fw-bold text-black text-uppercase">
                                        Description:
                                    </h6>
                                    <p className="mb-0 description">
                                        {picture.description}
                                    </p>
                                </div>
                            )}
                            <div className="col-12">
                                <div className="picture-tags d-flex flex-wrap gap-2">
                                    {tags.map((tag, index) => (
                                        <Link
                                            className="badge rounded-pill text-bg-primary bg-opacity-10 text-primary"
                                            to={"/tags/" + tag.slug}
                                            role="button"
                                            key={tag.id}
                                        >
                                            {tag.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* card footer */}
                    <div className="card-footer bg-transparent d-flex align-items-center justify-content-between py-3">
                        <p className="fw-light text-muted d-flex align-items-center mb-0 ">
                            <FaShieldAlt className="me-1 text-muted" />
                            Under the license of Yourpics
                        </p>
                        <Link
                            to={`/gallery`}
                            className="btn btn-sm px-3 btn-secondary d-flex align-items-center gap-2"
                        >
                            <BsImages /> Gallery
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Picture;
