import React from "react";
import "./PictureCard.scss";
import { FaRegHeart, FaHeart, FaMedal, FaEdit } from "react-icons/fa";
import { MdDownload } from "react-icons/md";

const PictureCard = ({ picture, isEditable = false }) => {
    return (
        <div className="picture-card shadow-sm">
            <a href="#" className="image-wrapper-link">
                <img className="img-fluid w-100" src={picture.image} alt="" />
            </a>
            <div className="card-hover-content p-2 d-flex flex-column text-white">
                <div className="card-hover-content__header d-flex align-items-center justify-content-between">
                    <div
                        className="caption fw-semibold text-truncate"
                        style={{ width: "120px" }}
                    >
                        Caption Title
                    </div>
                    {isEditable ? (
                        <a href="#" className="btn edit-btn" title="edit">
                            <FaEdit />
                        </a>
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
                                src="/assets/images/profile-picture.jpg"
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
                                    Tarikul Islam
                                </a>
                            </h6>
                            <small className="author__rank d-block">
                                <FaMedal className="icon" />
                                popular
                            </small>
                        </div>
                    </div>
                    <button
                        className="btn download-btn btn-sm rounded-3"
                        title="download"
                    >
                        <MdDownload />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PictureCard;
