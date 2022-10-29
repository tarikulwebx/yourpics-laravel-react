import React, { useEffect, useState } from "react";
import { BsImages } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import LoadingGrow from "../components/loader/LoadingGrow";
import PicturePlaceholder from "../components/loader/PicturePlaceholder";
import PictureModal from "../components/modals/PictureModal";
import PictureCard from "../components/picture-card/PictureCard";
import ToastMessage from "../components/toast/ToastMessage";
import "./Gallery.scss";

const Gallery = () => {
    const [pictures, setPictures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();

    const [totalPicture, setTotalPicture] = useState(0);
    const [nextPage, setNextPage] = useState(null);

    // Load pictures
    const loadAllPictures = () => {
        axios
            .get("/allPictures")
            .then((res) => {
                // console.log(res);
                setPictures(res.data.data);

                setTotalPicture(res.data.total);
                setNextPage(res.data.current_page + 1);

                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            })
            .catch((ex) => {
                const res = ex.response;
                console.log(res);
            });
    };

    // Load searched pictures
    const loadSearchedPictures = (searchText) => {
        axios
            .get("/picturesBySearch/" + searchText)
            .then((res) => {
                setPictures(res.data.data);
                setTotalPicture(res.data.total);
                setNextPage(res.data.current_page + 1);
                setIsLoading(false);
            })
            .catch((ex) => {
                const res = ex.response;
                console.log(res);
                setIsLoading(false);
            });
    };

    // Effect on Load
    useEffect(() => {
        if (
            searchParams.get("search") &&
            searchParams.get("search").trim().length > 0
        ) {
            loadSearchedPictures(searchParams.get("search").trim());
        } else {
            loadAllPictures();
        }
    }, []);

    // Search form submit
    const searchSubmitHandle = (e) => {
        e.preventDefault();

        setIsLoading(true);

        let searchText = searchParams.get("search");
        if (searchText.trim().length > 0) {
            loadSearchedPictures(searchParams.get("search").trim());
        } else {
            setIsLoading(false);
            setSearchParams({});
            alert("Please fill the search field");
        }
    };

    // Load More picture
    const loadMorePicture = () => {
        axios
            .get("/allPictures?page=" + nextPage)
            .then((res) => {
                setNextPage(nextPage + 1);
                var newItems = res.data.data;
                setPictures((current) => [...current, ...newItems]);
            })
            .catch((ex) => {
                const res = ex.response;
                console.log(res);
            });
    };

    return (
        <>
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
                        <>
                            {pictures.length > 0 ? (
                                <InfiniteScroll
                                    dataLength={pictures.length}
                                    next={loadMorePicture}
                                    hasMore={
                                        pictures.length < totalPicture
                                            ? true
                                            : false
                                    }
                                    loader={
                                        <div className="mt-3">
                                            <LoadingGrow />
                                        </div>
                                    }
                                    endMessage={
                                        <p className="text-center text-muted mb-0 mt-3 user-select-none">
                                            <strong>
                                                Yay! You have seen it all
                                            </strong>
                                        </p>
                                    }
                                >
                                    <div className="row gy-4">
                                        {pictures.map((picture, index) => (
                                            <div
                                                className="col-sm-6 col-md-4 col-xl-3"
                                                key={picture.id}
                                            >
                                                <PictureCard
                                                    picture={picture}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </InfiniteScroll>
                            ) : (
                                <h5 className="text-center text-muted user-select-none mt-4">
                                    No Picture Found
                                </h5>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default Gallery;
