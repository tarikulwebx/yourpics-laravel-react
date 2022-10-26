import React, { useContext } from "react";
import "./PictureCard.scss";
import { FaRegHeart, FaHeart, FaMedal, FaEdit } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { Link } from "react-router-dom";
import { PictureModalContext } from "../../contexts/PictureModalContext";

const PictureCard = ({ picture, isEditable = false }) => {
    const { setShowModal, setModalPictureId } = useContext(PictureModalContext);

    const handleModal = (e) => {
        e.preventDefault();
        setModalPictureId(picture.id);
        setShowModal(true);
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
                    ) : (
                        <button className="btn fav-btn" title="favorite">
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
