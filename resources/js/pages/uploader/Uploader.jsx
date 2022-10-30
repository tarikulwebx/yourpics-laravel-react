import React, { useEffect, useState } from "react";
import { BsImages } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import LoadingGrow from "../../components/loader/LoadingGrow";
import PicturePlaceholder from "../../components/loader/PicturePlaceholder";
import PictureCard from "../../components/picture-card/PictureCard";
import "./Uploader.scss";

const Uploader = () => {
    const { slug } = useParams();
    const [uploader, setUploader] = useState({});
    const [isLoadingUploader, setIsLoadingUploader] = useState(true);

    const [isPicturesLoading, setIsPicturesLoading] = useState(true);
    const [pictures, setPictures] = useState([]);
    const [totalPicture, setTotalPicture] = useState(0);
    const [nextPage, setNextPage] = useState(null);

    // get uploader by slug
    const getUserBySlug = (slug) => {
        axios
            .get("/getUploaderBySlug/" + slug)
            .then((res) => {
                setUploader(res.data);
                setTimeout(() => {
                    setIsLoadingUploader(false);
                }, 1500);
            })
            .catch((ex) => {
                console.log(ex);
                setIsLoadingUploader(false);
            });
    };

    // get pictures by user slug
    const getPicturesByUploaderSlug = (slug) => {
        setIsPicturesLoading(true);
        axios
            .get("/getPicturesByUploaderSlug/" + slug)
            .then((res) => {
                setPictures(res.data.data);
                setTotalPicture(res.data.total);
                setNextPage(res.data.current_page + 1);
                setIsPicturesLoading(false);
            })
            .catch((ex) => {
                console.log(ex);
                setIsPicturesLoading(false);
            });
    };

    // Load More picture
    const loadMorePicture = () => {
        axios
            .get("/getPicturesByUploaderSlug/" + slug + "?page=" + nextPage)
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

    // effect
    useEffect(() => {
        getUserBySlug(slug);
        getPicturesByUploaderSlug(slug);
    }, [slug]);

    return (
        <section className="mb-4 pb-2 px-sm-2 uploader-page">
            <div className="container-xl">
                {/* Head */}
                <div className="card mt-3 mb-4  shadow-sm border-0 rounded-5">
                    <div className="card-body">
                        {/* loader */}
                        {isLoadingUploader ? (
                            <div className="row align-items-center gy-4">
                                <div className="col-sm-4 col-xl-3">
                                    <div className="placeholder-glow">
                                        <img
                                            src="/assets/images/profile-placeholder.jpg"
                                            className="img-fluid rounded-circle placeholder w-100"
                                            alt="profile picture"
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-8 col-xl-9">
                                    <div className="placeholder-glow">
                                        <h2
                                            className="placeholder w-100"
                                            style={{ maxWidth: "400px" }}
                                        ></h2>
                                    </div>
                                    <div className="placeholder-glow mb-2">
                                        <p
                                            className="placeholder w-100 "
                                            style={{ maxWidth: "200px" }}
                                        ></p>
                                    </div>
                                    <div className="placeholder-glow">
                                        <p className="placeholder w-100"></p>
                                        <p className="placeholder w-100"></p>
                                        <h5
                                            className="text-secondary d-inline-block mt-2 placeholder w-100 fw-semibold"
                                            style={{ maxWidth: "100px" }}
                                        ></h5>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="row align-items-center gy-4">
                                <div className="col-sm-4 col-xl-3">
                                    <img
                                        src={
                                            uploader.picture
                                                ? uploader.picture
                                                : "/assets/images/profile-placeholder.jpg"
                                        }
                                        className="img-fluid w-100 rounded-circle bg-dark bg-opacity-10"
                                        alt={uploader.first_name}
                                    />
                                </div>
                                <div className="col-sm-8 col-xl-9">
                                    <h2 className="fw-bold mb-0">
                                        {uploader.first_name +
                                            " " +
                                            uploader.last_name}
                                    </h2>
                                    <p className="fw-semibold">
                                        <a
                                            href={`mailto:${uploader.email}`}
                                            className="text-decoration-none"
                                        >
                                            {uploader.email}
                                        </a>
                                    </p>
                                    {uploader.description ? (
                                        <p className="lead fw-normal text-muted">
                                            {uploader.description}
                                        </p>
                                    ) : (
                                        <p className="lead fw-normal text-muted user-select-none">
                                            [No description written]
                                        </p>
                                    )}
                                    <h5 className="text-secondary fw-semibold d-flex align-items-center gap-1">
                                        <BsImages /> {totalPicture}
                                    </h5>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pictures */}
                {isPicturesLoading ? (
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

export default Uploader;
