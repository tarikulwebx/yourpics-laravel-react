import React, { useState } from "react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingGrow from "../loader/LoadingGrow";
import PicturePlaceholder from "../loader/PicturePlaceholder";
import PictureCard from "../picture-card/PictureCard";
import "./HomePicture.scss";

const HomePictures = () => {
    const [pictures, setPictures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPicture, setTotalPicture] = useState(0);
    const [nextPage, setNextPage] = useState(null);

    useEffect(() => {
        loadAllPictures();
    }, []);

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
            <section className="">
                <div className="container-xl">
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

export default HomePictures;
