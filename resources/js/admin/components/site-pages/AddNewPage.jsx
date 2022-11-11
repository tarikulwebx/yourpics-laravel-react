import React, { Component } from "react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";

const AddNewPage = () => {
    const [errors, setErrors] = useState({});
    const [isCreating, setIsCreating] = useState(false);
    const [isCreated, setIsCreated] = useState(false);

    const navigate = useNavigate();

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [bodyContent, setBodyContent] = useState(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setIsCreating(true);

        const formData = new FormData(e.currentTarget);
        formData.append("body", bodyContent);
        axios
            .post("/storeNewPage", formData)
            .then((res) => {
                // console.log(res);
                setErrors({});
                setIsCreating(false);
                setIsCreated(true);
                setTimeout(() => {
                    navigate("/admin/pages", { replace: true });
                }, 700);
            })
            .catch((ex) => {
                const res = ex.response;
                // console.log(res);

                if (res.status == 422) {
                    setErrors(res.data.errors);
                }

                setIsCreating(false);
            });
    };

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
                <h4 className="mb-0">Pages</h4>
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
                    <form onSubmit={handleFormSubmit}>
                        <div className="row gy-3">
                            <div className="col-12">
                                <label htmlFor="title" className="form-label">
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
                                />
                                {errors.title && (
                                    <div className="invalid-feedback">
                                        {errors.title}
                                    </div>
                                )}
                            </div>
                            {/* <div className="col-12">
                                <label htmlFor="title" className="form-label">
                                    Body
                                </label>
                                <textarea
                                    type="text"
                                    name="body"
                                    id="body"
                                    className={`form-control ${
                                        errors.body ? "is-invalid" : ""
                                    }`}
                                    placeholder="Write page body here..."
                                    rows={7}
                                />
                                {errors.body && (
                                    <div className="invalid-feedback">
                                        {errors.body}
                                    </div>
                                )}
                            </div> */}
                            <div className="col-12">
                                <label htmlFor="title" className="form-label">
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
                                        isCreating
                                            ? "btn-primary disabled"
                                            : isCreated
                                            ? "btn-success"
                                            : "btn-primary"
                                    }`}
                                    type="submit"
                                >
                                    {isCreating
                                        ? "Creating"
                                        : isCreated
                                        ? "Created!"
                                        : "Create"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddNewPage;
