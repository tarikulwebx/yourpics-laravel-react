import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import LoadingGrow from "../../components/loader/LoadingGrow";
import "./Trash.scss";

const Trash = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [pictures, setPictures] = useState([]);

    // load pictures
    const loadTrashedIPictures = () => {
        setIsLoading(true);
        axios
            .get("/getTrashedPictures")
            .then((res) => {
                setPictures(res.data);
            })
            .catch((ex) => {
                let res = ex.response;
                console.log(res);
            })
            .then((res) => {
                setIsLoading(false);
            });
    };

    // Effects on load
    useEffect(() => {
        loadTrashedIPictures();
    }, []);

    // Restore picture
    const restorePictureHandle = (id) => {
        axios
            .get("/restoreTrashedPicture/" + id)
            .then((res) => {
                const newPictures = pictures.filter(
                    (picture) => picture.id !== id
                );
                setPictures(newPictures);
            })
            .catch((ex) => {
                const res = ex.response;
                console.log(res);
            });
    };

    return (
        <div className="card shadow rounded-4 border-0 profile-trash-page">
            <div className="card-header bg-white  rounded-3 py-3 px-4">
                <h5 className="mb-0 text-dark d-flex align-items-center gap-2">
                    <FaTrashAlt className="text-danger" /> Trash
                </h5>
            </div>
            <div className="card-body p-4">
                {isLoading ? (
                    <LoadingGrow />
                ) : (
                    <>
                        {pictures.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-striped table-hover align-middle">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Deleted on</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pictures.map((picture, index) => (
                                            <tr key={picture.id}>
                                                <th>{index + 1}</th>
                                                <td>
                                                    <img
                                                        src={picture.image}
                                                        alt={picture.title}
                                                        className="shadow-sm"
                                                    />
                                                </td>
                                                <td>{picture.title}</td>
                                                <td>{picture.deleted_at}</td>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <button
                                                            className="btn btn-sm btn-info"
                                                            onClick={() =>
                                                                restorePictureHandle(
                                                                    picture.id
                                                                )
                                                            }
                                                        >
                                                            Restore
                                                        </button>
                                                        <button className="btn btn-sm btn-danger">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <h5 className="text-muted user-select-none text-center">
                                Empty Trash
                            </h5>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Trash;
