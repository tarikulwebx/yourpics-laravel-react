import React, { useEffect, useState } from "react";
import { BsFillTagsFill } from "react-icons/bs";
import { FaHashtag } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import LoadingGrow from "../../components/loader/LoadingGrow";
import PicturePlaceholder from "../../components/loader/PicturePlaceholder";
import PictureCard from "../../components/picture-card/PictureCard";
import "./Tag.scss";

const Tag = () => {
    const { slug } = useParams();
    const [tag, setTag] = useState({});

    const [pictures, setPictures] = useState([]);
    const [totalPicture, setTotalPicture] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getTagBySlug = (slug) => {
        axios
            .get("/getTagBySlug/" + slug)
            .then((res) => {
                setTag(res.data);
            })
            .catch((ex) => {
                const res = ex.response;
                console.log(res);
            });
    };

    const getPicturesByTagSlug = (slug) => {
        axios
            .get("/getPicturesByTagSlug/" + slug)
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
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            });
    };

    // Load More picture
    const loadMorePicture = () => {
        axios
            .get("/getPicturesByTagSlug/" + slug + "?page=" + nextPage)
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

    useEffect(() => {
        getTagBySlug(slug);
        getPicturesByTagSlug(slug);
    }, [slug]);

    return (
        <section className="py-4 my-2 px-sm-2 single-tag-page">
            <div className="container-xl">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                        <h6 className="mb-0 text-secondary fw-semibold">
                            Pictures by Tag
                        </h6>
                        <h2 className="fw-bold text-uppercase mb-0 d-flex align-items-center gap-2 text-primary">
                            {tag.name}{" "}
                            <BsFillTagsFill className="text-secondary" />
                        </h2>
                    </div>
                    <h2 className="fw-bold text-uppercase mb-0 text-secondary align-items-center d-none d-lg-flex">
                        <FaHashtag />
                        {totalPicture}
                    </h2>
                </div>
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
                                            <PictureCard picture={picture} />
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
    );
};

export default Tag;
