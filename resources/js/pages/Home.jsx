import React, { memo } from "react";
import Hero from "../components/hero/Hero";
import HomePictures from "../components/home-pictures/HomePictures";
import TagsBar from "../components/tags-bar/TagsBar";

const Home = () => {
    return (
        <>
            <Hero />
            <TagsBar />
            <HomePictures />
            <div className="mb-5"></div>
        </>
    );
};

export default memo(Home);
