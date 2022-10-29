import React, { useEffect, useState } from "react";
import { BsFillTagsFill } from "react-icons/bs";
import { FaHashtag } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Tags.scss";

const Tags = () => {
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getTags = () => {
        axios
            .get("/getAllTags")
            .then((res) => {
                setTags(res.data);
                setIsLoading(false);
            })
            .catch((ex) => {
                const res = ex.response;
                console.log(res);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getTags();
    }, []);

    return (
        <section className="py-4 my-2 px-sm-2 tags-page">
            <div className="container-xl">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h2 className="fw-bold text-uppercase mb-0 d-flex align-items-center gap-2 text-primary">
                        Tags <BsFillTagsFill className="text-secondary" />
                    </h2>
                    <h2 className="fw-bold text-uppercase mb-0 text-secondary d-flex align-items-center">
                        <FaHashtag />
                        {tags.length}
                    </h2>
                </div>
                <div className="row gy-3">
                    {tags.map((tag, index) => (
                        <div className="col-6 col-sm-4 col-lg-3" key={tag.id}>
                            <Link
                                to={"/tags/" + tag.slug}
                                className="card shadow-sm text-center text-decoration-none tag-card h-100"
                            >
                                <div className="card-body">
                                    <h5 className="card-title text-capitalize fw-bold text-primary">
                                        {tag.name}
                                    </h5>
                                    <p className="mb-0 text-secondary mt-auto">
                                        Pictures: {tag.pictures_count}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tags;
