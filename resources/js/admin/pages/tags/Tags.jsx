import React, { useEffect } from "react";
import { useState } from "react";
import {
    FaEdit,
    FaPlus,
    FaSearch,
    FaTachometerAlt,
    FaTrash,
    FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AddTagModal from "../../components/tag/AddTagModal";
import DeleteTagModal from "../../components/tag/DeleteTagModal";
import EditTagModal from "../../components/tag/EditTagModal";

const Tags = () => {
    const [tags, setTags] = useState([]);
    const [pageLinks, setPageLinks] = useState([]);
    const [nextPageLink, setNextPageLink] = useState(null);
    const [prevPageLink, setPrevPageLink] = useState(null);
    const [perPage, setPerPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [searchText, setSearchText] = useState(null);

    // add new states
    const [showAddModal, setShowAddModal] = useState(false);

    // delete tag states
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tagId, setTagId] = useState(null);

    // edit tag states
    const [showEditModal, setShowEditModal] = useState(false);
    const [editTag, setEditTag] = useState({});

    const getTags = () => {
        setIsLoading(true);
        axios
            .get("/getTagsWithPagination")
            .then((res) => {
                // console.log(res);
                setTags(res.data.data);
                setPageLinks(res.data.links);
                setNextPageLink(res.data.next_page_url);
                setPrevPageLink(res.data.prev_page_url);
                setPerPage(res.data.per_page);
                setCurrentPage(res.data.current_page);
                setIsLoading(false);
            })
            .catch((ex) => {
                console.log(ex);
            });
    };

    useEffect(() => {
        getTags();
    }, []);

    // handle pagination
    const handlePagination = (url) => {
        setIsLoading(true);
        axios
            .get(url)
            .then((res) => {
                setTags(res.data.data);
                setPageLinks(res.data.links);
                setNextPageLink(res.data.next_page_url);
                setPrevPageLink(res.data.prev_page_url);
                setPerPage(res.data.per_page);
                setCurrentPage(res.data.current_page);
                setIsLoading(false);
            })
            .catch((ex) => {
                console.log(ex);
            });
    };

    // handle search
    const handleSearch = (e) => {
        e.preventDefault();
        setIsLoading(true);

        axios
            .get(`/getTagsBySearch/${searchText}`)
            .then((res) => {
                setTags(res.data.data);
                setPageLinks(res.data.links);
                setNextPageLink(res.data.next_page_url);
                setPrevPageLink(res.data.prev_page_url);
                setPerPage(res.data.per_page);
                setCurrentPage(res.data.current_page);
                setIsLoading(false);
            })
            .catch((ex) => {
                console.log(ex);
            });
    };

    // delete tag
    const deleteTag = (tagId) => {
        setShowDeleteModal(true);
        setTagId(tagId);
    };

    // handle edit tag

    const handleEditTag = (editTag) => {
        setShowEditModal(true);
        setEditTag(editTag);
    };

    return (
        <>
            {/* Heading */}
            <div className="d-flex align-items-center justify-content-between mb-3 pb-1 text-primary">
                <h4 className="mb-0">Tags</h4>
                <div>
                    <Link to="/">
                        <FaTachometerAlt className="fs-4" />
                    </Link>
                </div>
            </div>

            {/* content */}
            <div className="card shadow">
                <div className="card-header border-bottom-0 p-sm-3">
                    <div className="row align-items-center">
                        <div className="col-5">
                            <button
                                className="btn btn-sm btn-outline-primary text-decoration-none d-flex align-items-center text-nowrap gap-1"
                                onClick={() => setShowAddModal(true)}
                            >
                                <FaPlus />
                                <span className="fw-semibold ">Add new</span>
                            </button>
                        </div>
                        <div className="col-7 col-md-5 col-lg-4 col-xl-3 ms-auto">
                            <form onSubmit={(e) => handleSearch(e)}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="searchText"
                                        className="form-control form-control-sm"
                                        placeholder="Search"
                                        onChange={(e) =>
                                            setSearchText(e.target.value)
                                        }
                                        required
                                    />
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                    >
                                        <FaSearch />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped align-middle text-nowrap">
                            <thead>
                                <tr>
                                    <th scope="col" className="text-center">
                                        #
                                    </th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Pictures</th>
                                    <th scope="col">Slug</th>

                                    <th scope="col">Created on</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tags.map((tag, index) => (
                                    <tr key={tag.id}>
                                        <td className="text-center">
                                            {currentPage * perPage -
                                                (perPage - index) +
                                                1}
                                        </td>
                                        <td>{tag.name}</td>
                                        <td>{tag.pictures_count}</td>
                                        <td>{tag.slug}</td>
                                        <td>{tag.created_at}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <button
                                                    className="btn btn-link btn-primary text-primary  text-hover-white  px-2 d-inline-flex "
                                                    title="edit"
                                                    onClick={() =>
                                                        handleEditTag(tag)
                                                    }
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="btn btn-link btn-danger text-danger px-2 d-inline-flex text-hover-white"
                                                    title="delete"
                                                    onClick={() =>
                                                        deleteTag(tag.id)
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
                </div>
                <div className="card-footer border-0 py-sm-3">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end mb-0">
                            {prevPageLink ? (
                                <li className="page-item">
                                    <button
                                        onClick={() =>
                                            handlePagination(prevPageLink)
                                        }
                                        className="page-link"
                                    >
                                        Previous
                                    </button>
                                </li>
                            ) : (
                                <li className="page-item disabled">
                                    <button className="page-link">
                                        Previous
                                    </button>
                                </li>
                            )}

                            {pageLinks.map((link, index) => {
                                if (
                                    index !== 0 &&
                                    index !== pageLinks.length - 1
                                ) {
                                    return (
                                        <li
                                            className={
                                                link.active
                                                    ? "page-item active"
                                                    : "page-item"
                                            }
                                            key={index}
                                        >
                                            <button
                                                onClick={() =>
                                                    handlePagination(link.url)
                                                }
                                                className="page-link"
                                            >
                                                {link.label}
                                            </button>
                                        </li>
                                    );
                                }
                            })}

                            {nextPageLink ? (
                                <li className="page-item">
                                    <button
                                        onClick={() =>
                                            handlePagination(nextPageLink)
                                        }
                                        className="page-link"
                                    >
                                        Next
                                    </button>
                                </li>
                            ) : (
                                <li className="page-item disabled">
                                    <button className="page-link">Next</button>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>

            <AddTagModal
                showAddModal={showAddModal}
                setShowAddModal={setShowAddModal}
                getTags={getTags}
            />

            <DeleteTagModal
                tagId={tagId}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                getTags={getTags}
            />

            <EditTagModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                editTag={editTag}
                getTags={getTags}
            />
        </>
    );
};

export default Tags;
