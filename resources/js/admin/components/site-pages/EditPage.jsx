import { ContentState, convertFromHTML, EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";

const EditPage = () => {
    const { pageId } = useParams();

    const [page, setPage] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [bodyContent, setBodyContent] = useState(null);

    useEffect(() => {
        getPageId(pageId);
    }, [pageId]);

    const getPageId = (id) => {
        setIsLoading(true);
        axios
            .get(`/getPageById/${id}`)
            .then((res) => {
                setPage(res.data);
                setEditorState(
                    EditorState.createWithContent(
                        ContentState.createFromBlockArray(
                            convertFromHTML(res.data.body)
                        )
                    )
                );
                setIsLoading(false);
            })
            .catch((ex) => {
                const res = ex.response;
                console.log(res);
                setIsLoading(false);
            });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setIsUpdating(true);

        const formData = new FormData(e.currentTarget);
        formData.append("body", bodyContent);
        axios
            .post(`/updatePage/${pageId}`, formData)
            .then((res) => {
                // console.log(res);
                setErrors({});
                setIsUpdating(false);
                setIsUpdated(true);
                setTimeout(() => {
                    setIsUpdated(false);
                }, 700);
            })
            .catch((ex) => {
                const res = ex.response;
                // console.log(res);

                if (res.status == 422) {
                    setErrors(res.data.errors);
                }

                setIsUpdating(false);
            });
    };

    // editor process
    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    };

    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(
            editorState.getCurrentContent()
        );
        setBodyContent(currentContentAsHTML);
    };

    return (
        <>
            {/* head */}
            <div className="d-flex align-items-center justify-content-between mb-3 pb-1 text-primary">
                <h4 className="mb-0">Edit page</h4>
                <div></div>
            </div>

            {/* content */}
            <div className="card shadow">
                <div className="card-header border-bottom-0 p-sm-3">
                    <div className="row align-items-center">
                        <div className="col-5">
                            <Link
                                to={`/admin/pages`}
                                className="btn btn-sm btn-outline-primary text-decoration-none d-inline-flex align-items-center text-nowrap gap-1"
                            >
                                <FaArrowLeft />
                                <span className="fw-semibold ">All pages</span>
                            </Link>
                        </div>
                        <div className="col-7 col-md-5 col-lg-4 col-xl-3 ms-auto"></div>
                    </div>
                </div>
                <div className="card-body">
                    {isLoading ? (
                        ""
                    ) : (
                        <form onSubmit={handleFormSubmit}>
                            <div className="row gy-3">
                                <div className="col-12">
                                    <label
                                        htmlFor="title"
                                        className="form-label"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className={`form-control ${
                                            errors.title ? "is-invalid" : ""
                                        }`}
                                        placeholder="Write page title"
                                        defaultValue={page.title}
                                    />
                                    {errors.title && (
                                        <div className="invalid-feedback">
                                            {errors.title}
                                        </div>
                                    )}
                                </div>

                                <div className="col-12">
                                    <label
                                        htmlFor="title"
                                        className="form-label"
                                    >
                                        Body
                                    </label>
                                    <Editor
                                        editorState={editorState}
                                        onEditorStateChange={handleEditorChange}
                                        toolbarClassName="bg-white"
                                        wrapperClassName={`form-control p-0 ${
                                            errors.body ? "is-invalid" : ""
                                        }`}
                                        editorClassName="px-2"
                                        editorStyle={{
                                            minHeight: "300px",
                                        }}
                                    />
                                    {errors.body && (
                                        <div className="invalid-feedback">
                                            {errors.body}
                                        </div>
                                    )}
                                </div>
                                <div className="col-12 text-end">
                                    <button
                                        className={`btn  px-3 ${
                                            isUpdating
                                                ? "btn-primary disabled"
                                                : isUpdated
                                                ? "btn-success"
                                                : "btn-primary"
                                        }`}
                                        type="submit"
                                    >
                                        {isUpdating
                                            ? "Updating"
                                            : isUpdated
                                            ? "Updated!"
                                            : "Update"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default EditPage;
