import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingGrow from "../../../components/loader/LoadingGrow";
import DeletePageModal from "../../components/site-pages/DeletePageModal";

const Pages = () => {
    const [pages, setPages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // delete process
    const [pageId, setPageId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const getAllPages = () => {
        setIsLoading(true);
        axios
            .get("/getAllPages")
            .then((res) => {
                setPages(res.data);
                setIsLoading(false);
            })
            .catch((ex) => {
                const res = ex.response;
                console.log(res);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getAllPages();
    }, []);

    // delete page
    const deletePage = (tagId) => {
        setPageId(tagId);
        setShowDeleteModal(true);
    };

    return (
        <>
            {/* head */}
            <div className="d-flex align-items-center justify-content-between mb-3 pb-1 text-primary">
                <h4 className="mb-0">Pages</h4>
                <div></div>
            </div>

            {/* content */}
            <div className="card shadow">
                <div className="card-header border-bottom-0 p-sm-3">
                    <div className="row align-items-center">
                        <div className="col-5">
                            <Link
                                to={`/admin/pages/create`}
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
                                        <th scope="col">page</th>
                                        <th scope="col">Slug</th>
                                        <th scope="col">Created on</th>
                                        <th scope="col">Last updated</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pages.map((page, index) => (
                                        <tr key={page.id}>
                                            <td>{index + 1}</td>
                                            <td>{page.title}</td>
                                            <td>{page.slug}</td>
                                            <td>{page.created_at}</td>
                                            <td>{page.updated_at}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        to={`/admin/pages/edit/${page.id}`}
                                                        className="btn btn-link btn-primary text-primary  text-hover-white  px-2 d-inline-flex "
                                                        title="edit"
                                                    >
                                                        <FaEdit />
                                                    </Link>
                                                    <button
                                                        className={`btn btn-link btn-danger text-danger px-2 d-inline-flex text-hover-white ${
                                                            page.deletable === 0
                                                                ? "disabled opacity-0 d-none"
                                                                : ""
                                                        }`}
                                                        title="delete"
                                                        onClick={() =>
                                                            deletePage(page.id)
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

            <DeletePageModal
                pageId={pageId}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                getAllPages={getAllPages}
            />
        </>
    );
};

export default Pages;
