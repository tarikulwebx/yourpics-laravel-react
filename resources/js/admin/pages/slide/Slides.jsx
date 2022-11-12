import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingGrow from "../../../components/loader/LoadingGrow";
import DeleteSlideModal from "../../components/modals/DeleteSlideModal";

const Slides = () => {
    const [slides, setSlides] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [slideId, setSlideId] = useState(null);

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
                console.log(res);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getAllSlides();
    }, []);

    const deleteSlide = (slideId) => {
        setSlideId(slideId);
        setShowDeleteModal(true);
    };

    return (
        <>
            {/* head */}
            <div className="d-flex align-items-center justify-content-between mb-3 pb-1 text-primary">
                <h4 className="mb-0">Slides</h4>
                <div></div>
            </div>

            {/* content */}
            <div className="card shadow">
                <div className="card-header border-bottom-0 p-sm-3">
                    <div className="row align-items-center">
                        <div className="col-5">
                            <Link
                                to={`/admin/slides/create`}
                                className="btn btn-sm btn-outline-primary text-decoration-none d-inline-flex align-items-center text-nowrap gap-1"
                            >
                                <FaPlus />
                                <span className="fw-semibold ">Add new</span>
                            </Link>
                        </div>
                        <div className="col-7 col-md-5 col-lg-4 col-xl-3 ms-auto"></div>
                    </div>
                </div>
                <div className="card-body p-0">
                    {isLoading ? (
                        <div className="py-5">
                            <LoadingGrow />
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped align-middle text-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="col" className="text-center">
                                            #
                                        </th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Button 1</th>
                                        <th scope="col">Button 2</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {slides.map((slide, index) => (
                                        <tr key={slide.id}>
                                            <td>{++index}</td>
                                            <td>
                                                <img
                                                    src={slide.image}
                                                    alt={slide.title}
                                                    className="img-fluid"
                                                    width={80}
                                                    height={"auto"}
                                                />
                                            </td>
                                            <td>{slide.title}</td>
                                            <td>
                                                <div
                                                    className="d-block text-truncate"
                                                    style={{ width: "200px" }}
                                                >
                                                    {slide.description}
                                                </div>
                                            </td>
                                            <td>
                                                <div>{slide.button_1_text}</div>
                                                <a
                                                    href={slide.button_1_link}
                                                    className="text-decoration-none small"
                                                >
                                                    {slide.button_1_link}
                                                </a>
                                            </td>
                                            <td>
                                                <div>{slide.button_2_text}</div>
                                                <a
                                                    href={slide.button_2_link}
                                                    className="text-decoration-none small"
                                                >
                                                    {slide.button_2_link}
                                                </a>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        to={`/admin/slides/edit/${slide.id}`}
                                                        className="btn btn-link btn-primary text-primary  text-hover-white  px-2 d-inline-flex "
                                                        title="edit"
                                                    >
                                                        <FaEdit />
                                                    </Link>
                                                    <button
                                                        className={`btn btn-link btn-danger text-danger px-2 d-inline-flex text-hover-white`}
                                                        title="delete"
                                                        onClick={() =>
                                                            deleteSlide(
                                                                slide.id
                                                            )
                                                        }
                                                    >
                                                        <FaTrashAlt />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <DeleteSlideModal
                slideId={slideId}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                getAllSlides={getAllSlides}
            />
        </>
    );
};

export default Slides;
