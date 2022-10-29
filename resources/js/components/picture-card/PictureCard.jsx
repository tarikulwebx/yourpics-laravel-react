import React, { useContext, useState } from "react";
import "./PictureCard.scss";
import { FaRegHeart, FaHeart, FaMedal, FaEdit } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import { Link } from "react-router-dom";
import { PictureModalContext } from "../../contexts/PictureModalContext";
import { ToastContext } from "../../contexts/ToastContext";
import { UserContext } from "../../contexts/UserContext";

const PictureCard = ({ picture, isEditable = false }) => {
    const { setShowModal, setModalPictureId } = useContext(PictureModalContext);
    const { setShowToast, setToastMessage, setToastType } =
        useContext(ToastContext);

    const { favorites, setFavorites } = useContext(UserContext);

    const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

    // handle Modal
    const handleModal = (e) => {
        e.preventDefault();
        setModalPictureId(picture.id);
        setShowModal(true);
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

    return (
        <div className="picture-card shadow-sm">
            <a
                onClick={(e) => handleModal(e)}
                href="#"
                className="image-wrapper-link"
            >
                <img className="img-fluid w-100" src={picture.image} alt="" />
            </a>
            <div className="card-hover-content p-2 d-flex flex-column text-white">
                <div className="card-hover-content__header d-flex align-items-center justify-content-between">
                    <div
                        className="caption fw-semibold text-truncate"
                        style={{ width: "130px" }}
                    >
                        {picture.title}
                    </div>
                    {isEditable ? (
                        <Link
                            to={`/profile/upload-edit/${picture.slug}`}
                            className="btn edit-btn"
                            title="edit"
                        >
                            <FaEdit />
                        </Link>
                    ) : isFavoriteLoading ? (
                        <button
                            className="btn fav-btn disabled border-transparent"
                            title="favorite"
                        >
                            <BsThreeDots />
                        </button>
                    ) : favorites.includes(picture.id) ? (
                        <button
                            onClick={() => removeFromFavorite(picture.id)}
                            className="btn fav-btn"
                            title="favorite"
                        >
                            <FaHeart />
                        </button>
                    ) : (
                        <button
                            onClick={() => addToFavorite(picture.id)}
                            className="btn fav-btn"
                            title="favorite"
                        >
                            <FaRegHeart />
                        </button>
                    )}
                </div>
                <div className="card-hover-content__footer d-flex align-items-center justify-content-between">
                    <div className="author d-flex align-items-center gap-2">
                        <a href="#">
                            <img
                                src={
                                    picture.user.picture
                                        ? picture.user.picture
                                        : "/assets/images/profile-placeholder.jpg"
                                }
                                className="author__picture rounded-circle d-block"
                                alt=""
                                width={40}
                            />
                        </a>
                        <div>
                            <h6 className="author__name mb-0 fw-semibold">
                                <a
                                    href="#"
                                    className="text-decoration-none d-block text-truncate"
                                    style={{ width: "120px" }}
                                >
                                    {picture.user.first_name}{" "}
                                    {picture.user.last_name}
                                </a>
                            </h6>
                            <small className="author__rank d-block text-capitalize d-flex align-items-center">
                                <FaMedal className="icon" />
                                {picture.user.rank}
                            </small>
                        </div>
                    </div>
                    <a
                        href={`/download/${picture.slug}`}
                        className="btn download-btn btn-sm rounded-3"
                        title="download"
                    >
                        <MdDownload />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PictureCard;
