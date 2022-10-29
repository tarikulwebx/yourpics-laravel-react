import React, { memo, useContext, useEffect, useState } from "react";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
    FaCheckCircle,
    FaDownload,
    FaHeart,
    FaLongArrowAltRight,
    FaMedal,
    FaRegCalendarAlt,
    FaRegHeart,
    FaShare,
    FaShieldAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { PictureModalContext } from "../../contexts/PictureModalContext";
import { ToastContext } from "../../contexts/ToastContext";
import { UserContext } from "../../contexts/UserContext";
import "./PictureModal.scss";

const PictureModal = () => {
    const { showModal, setShowModal, modalPictureId } =
        useContext(PictureModalContext);

    const { setShowToast, setToastMessage, setToastType } =
        useContext(ToastContext);
    const { favorites, setFavorites } = useContext(UserContext);
    const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
    const [favoritesCount, setFavoritesCount] = useState(null);
    const [isFavoritesCountLoaded, setIsFavoritesCountLoaded] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [picture, setPicture] = useState({});
    const [tags, setTags] = useState([]);
    const [user, setUser] = useState({});
    const [tooltipText, setTooltipText] = useState("  Copy  ");

    const handleClose = () => {
        setShowModal(false);
    };
    const handleShow = () => {};

    // Get Modal Picture
    const getModalPicture = (id) => {
        axios
            .get("/getPictureById/" + id)
            .then((res) => {
                if (res.status === 200) {
                    setPicture(res.data);
                    setTags(res.data.tags);
                    setUser(res.data.user);
                    setIsLoading(false);
                }
            })
            .catch((ex) => {
                let res = ex.response;
                console.log(res);
            });
    };

    useEffect(() => {
        if (modalPictureId) {
            setIsLoading(true);
            getModalPicture(modalPictureId);
            setIsFavoritesCountLoaded(false);
            getFavoritesCount(modalPictureId);
        }
    }, [modalPictureId]);

    // Copy to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setTooltipText("Copied!");
        setTimeout(() => {
            setTooltipText("Copy");
        }, 1500);
    };

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
    const getFavoritesCount = (id) => {
        axios
            .get("/getFavoritesCount/" + id)
            .then((res) => {
                setFavoritesCount(res.data);
                setIsFavoritesCountLoaded(true);
            })
            .catch((ex) => {
                console.log(ex);
            });
    };

    return (
        <Modal
            show={showModal}
            onHide={handleClose}
            onShow={handleShow}
            backdrop="static"
            keyboard={false}
            size="xl"
            className="picture-modal"
        >
            <Modal.Header>
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
                            <a href="#" className="rounded-circle">
                                <img
                                    src={
                                        user.picture
                                            ? user.picture
                                            : "/assets/images/profile-placeholder.jpg"
                                    }
                                    alt="profile picture"
                                    className="rounded-circle user-picture"
                                    width={40}
                                />
                            </a>
                            <div>
                                <h6 className="mb-0">
                                    <a
                                        href="#"
                                        className="text-decoration-none"
                                    >
                                        {user.first_name + " " + user.last_name}
                                    </a>
                                </h6>
                                <small className="mb-0 d-flex align-items-center gap-1 text-muted text-capitalize">
                                    <FaMedal className="text-secondary" />{" "}
                                    {user.rank}
                                </small>
                            </div>
                        </>
                    )}
                </div>
                <div className="d-flex align-items-center flex-row gap-2">
                    <button
                        className="btn btn-sm text-muted"
                        type="button"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                    {isLoading ? (
                        <>
                            <p
                                className="placeholder-glow rounded-1 mb-0"
                                style={{ width: "60px" }}
                            >
                                <span
                                    className="placeholder col-12 rounded-1"
                                    style={{ height: "25px" }}
                                ></span>
                            </p>
                            <p
                                className="placeholder-glow rounded-1 mb-0"
                                style={{ width: "60px" }}
                            >
                                <span
                                    className="placeholder col-12 rounded-1"
                                    style={{ height: "25px" }}
                                ></span>
                            </p>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? (
                    <div className="row gy-4">
                        <div className="col-12 col-xl-8">
                            <p className="placeholder-glow rounded mb-0 picturePlaceholder">
                                <span
                                    className="placeholder col-12 rounded"
                                    style={{
                                        height: "450px",
                                    }}
                                ></span>
                            </p>
                        </div>
                        <div className="col-12 col-xl-4">
                            <p className="placeholder-glow rounded-1">
                                <span
                                    className="placeholder rounded-1 col-12"
                                    style={{ height: "30px" }}
                                ></span>
                            </p>
                            <div className="row gy-4">
                                <div className="col-lg-6 col-xl-12">
                                    <div className="d-flex align-items-center gap-2">
                                        <p className="placeholder-glow rounded-1 mb-0 w-100">
                                            <span
                                                className="placeholder rounded-1 col-12"
                                                style={{ height: "30px" }}
                                            ></span>
                                        </p>
                                        <div className="vr"></div>
                                        <p className="placeholder-glow rounded-1 mb-0 w-100">
                                            <span
                                                className="placeholder rounded-1 col-12"
                                                style={{ height: "30px" }}
                                            ></span>
                                        </p>
                                        <div className="vr"></div>
                                        <p className="placeholder-glow rounded-1 mb-0 w-100">
                                            <span
                                                className="placeholder rounded-1 col-12"
                                                style={{ height: "30px" }}
                                            ></span>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <p className="placeholder-glow rounded-1 mb-0 w-100">
                                        <span
                                            className="placeholder rounded-1 col-12"
                                            style={{ height: "30px" }}
                                        ></span>
                                    </p>
                                </div>
                                <div className="col-8">
                                    <p className="placeholder-glow rounded-1 mb-0 w-100">
                                        <span
                                            className="placeholder rounded-1 col-12"
                                            style={{
                                                height: "30px",
                                            }}
                                        ></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <p className="placeholder-glow rounded-1 mb-0">
                                <span
                                    className="placeholder rounded-1 col-12"
                                    style={{ height: "40px" }}
                                ></span>
                            </p>
                        </div>
                        <div className="col-12">
                            <div className="d-flex flex-wrap gap-2">
                                {[...Array(8)].map((e, index) => (
                                    <p
                                        className="placeholder-glow rounded-1"
                                        style={{ width: "100px" }}
                                        key={index}
                                    >
                                        <span
                                            className="placeholder rounded-1 col-12"
                                            style={{ height: "35px" }}
                                        ></span>
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="row gy-4">
                        <div className="col-12 col-xl-8">
                            <img
                                src={picture.image}
                                alt={picture.title}
                                className="img-fluid rounded-2"
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
                                        Dimension: {picture.dimension} pixels
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
                                                    "www.google.com"
                                                )
                                            }
                                        >
                                            <FaShare className="me-1" />
                                            Share
                                        </button>
                                    </OverlayTrigger>

                                    {/* <button
                                        className="copyToClipboard btn btn-sm btn-outline-secondary me-2"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Copy Link"
                                        data-link="www.google.com"
                                    >
                                        <FaShare className="me-1" />
                                        Share
                                    </button> */}
                                    <a
                                        href="single.html"
                                        className="btn btn-sm btn-primary"
                                    >
                                        View in Page
                                        <FaLongArrowAltRight className="ms-1" />
                                    </a>
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
                )}
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                <p className="fw-light text-muted d-flex align-items-center mb-0">
                    <FaShieldAlt className="me-1 text-muted" />
                    Under the license of Yourpics
                </p>
                <button
                    type="button"
                    className="btn btn-sm px-4 btn-secondary"
                    onClick={handleClose}
                >
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default memo(PictureModal);
