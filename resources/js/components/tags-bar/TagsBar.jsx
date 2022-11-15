import React, { useEffect } from "react";
import { useState } from "react";

import { FaAngleLeft, FaAngleRight, FaImages } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./TagBar.scss";

const TagsBar = () => {
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function handleScrollLeft() {
        let container = document.querySelector(".tags-wrapper");
        container.scrollLeft -= 100;
    }

    function handleScrollRight() {
        let container = document.querySelector(".tags-wrapper");
        container.scrollLeft += 100;
    }

    const getAllTags = () => {
        setIsLoading(true);
        axios
            .get("/getAllTags")
            .then((res) => {
                setTags(res.data);
                setIsLoading(false);
            })
            .catch((ex) => {
                const res = ex.response;
                // console.log(res);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getAllTags();
    }, []);

    return (
        <section className="tag-section">
            <div className="container-xl">
                <div className="tag-section-inner position-relative">
                    <button className="btn btn-left" onClick={handleScrollLeft}>
                        <FaAngleLeft />
                    </button>
                    <button
                        className="btn btn-right"
                        onClick={handleScrollRight}
                    >
                        <FaAngleRight />
                    </button>
                    <div className="tags-wrapper d-flex align-items-center gap-2 text-nowrap">
                        {isLoading
                            ? [...Array(20)].map((el, index) => (
                                  <p
                                      className="placeholder-glow mb-0"
                                      key={index}
                                  >
                                      <span
                                          className="placeholder rounded-5"
                                          style={{
                                              width: "90px",
                                              height: "25px",
                                          }}
                                      ></span>
                                  </p>
                              ))
                            : tags.map((tag, index) => (
                                  <Link
                                      to={`/tags/${tag.slug}`}
                                      className="badge rounded-pill bg-primary bg-opacity-10 text-primary d-inline-flex align-items-center gap-2"
                                      key={tag.id}
                                  >
                                      {tag.name}{" "}
                                      <small
                                          className="text-secondary"
                                          style={{ opacity: "0.6" }}
                                      >
                                          {tag.pictures_count}
                                      </small>
                                  </Link>
                              ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TagsBar;
