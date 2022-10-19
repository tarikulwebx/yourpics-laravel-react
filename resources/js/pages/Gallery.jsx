import React, { useEffect, useState } from "react";
import { BsImages } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import PicturePlaceholder from "../components/loader/PicturePlaceholder";
import PictureCard from "../components/picture-card/PictureCard";
import "./Gallery.scss";

const Gallery = () => {
    const [pictures, setPictures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();

    const loadAllPictures = () => {
        axios
            .get("/allPictures")
            .then((res) => {
                setPictures(res.data);
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            })
            .catch((ex) => {
                const res = ex.response;
                console.log(res);
            });
    };

    useEffect(() => {
        loadAllPictures();
    }, []);

    // Search form submit
    const searchSubmitHandle = (e) => {
        e.preventDefault();

        setIsLoading(true);

        let searchText = searchParams.get("search");
        if (searchText.trim().length > 0) {
            axios
                .get("/picturesBySearch/" + searchText)
                .then((res) => {
                    setPictures(res.data);
                    setIsLoading(false);
                })
                .catch((ex) => {
                    const res = ex.response;
                    console.log(res);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
            setSearchParams({});
            alert("Please fill the search field");
        }
    };

    return (
        <section className="py-4 my-2 px-sm-2 gallery-page">
            <div className="container-xl">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <h2 className="fw-bold text-uppercase mb-0 d-flex align-items-center gap-2 text-primary">
                        Gallery <BsImages className="text-secondary" />
                    </h2>
                </div>
                <form onSubmit={searchSubmitHandle}>
                    <div className="input-group rounded mb-3">
                        <input
                            type="text"
                            name="search"
                            className="form-control"
                            placeholder="Search content..."
                            aria-label="Search"
                            aria-describedby="searchButton"
                            value={searchParams.get("search") || ""}
                            onChange={(e) => {
                                let search = e.target.value;
                                if (search) {
                                    setSearchParams({ search });
                                } else {
                                    setSearchParams({});
                                    loadAllPictures();
                                }
                            }}
                            required
                        />
                        <button
                            className="btn btn-primary d-inline-flex align-items-center gap-2 "
                            type="submit"
                            id="searchButton"
                        >
                            <FaSearch /> Search
                        </button>
                    </div>
                </form>

                {isLoading ? (
                    <div className="row gy-4">
                        {[...Array(8)].map((e, i) => (
                            <div className="col-xl-3" key={i}>
                                <PicturePlaceholder />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="row gy-4">
                        {pictures.map((picture, index) => (
                            <div
                                className="col-sm-6 col-md-4 col-xl-3"
                                key={picture.id}
                            >
                                <PictureCard picture={picture} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Gallery;
