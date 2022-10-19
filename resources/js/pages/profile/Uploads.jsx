import React, { useEffect, useState } from "react";
import PicturePlaceholder from "../../components/loader/PicturePlaceholder";
import PictureCard from "../../components/picture-card/PictureCard";

const Uploads = () => {
    const [pictures, setPictures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/getUploadedPictures")
            .then((res) => {
                if (res.status === 200) {
                    setPictures(res.data);
                }
            })
            .catch((ex) => {
                const res = ex.response;
                console.log(res);
            })
            .then((res) => {
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="card shadow rounded-4 border-0">
            <div className="card-header bg-white  rounded-3 py-3 px-4">
                <h5 className="mb-0 text-dark">Your Uploads</h5>
            </div>
            <div className="card-body p-4">
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
                            <div className="row g-4">
                                {pictures.map((picture, index) => (
                                    <div className="col-xl-3" key={picture.id}>
                                        <PictureCard
                                            picture={picture}
                                            isEditable={true}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <h5 className="text-muted user-select-none text-center">
                                No pictures
                            </h5>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Uploads;
