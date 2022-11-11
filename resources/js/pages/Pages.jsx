import DOMPurify from "dompurify";
import { convertFromHTML, convertToHTML } from "draft-convert";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Pages = () => {
    const { pageSlug } = useParams();
    const navigate = useNavigate();

    const [page, setPage] = useState({});

    const getPageBySlug = (slug) => {
        axios
            .get(`/getPageBySlug/${slug}`)
            .then((res) => {
                setPage(res.data);
            })
            .catch((ex) => {
                const res = ex.response;
                console.log(res);
                navigate("/", { replace: false });
            });
    };

    useEffect(() => {
        getPageBySlug(pageSlug);
    }, [pageSlug]);

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html),
        };
    };

    return (
        <section>
            <div className="bg-primary bg-opacity-10 text-primary py-4 mb-4">
                <div className="container py-2">
                    <h2 className="mb-0 text-uppercase fw-bold">
                        {page.title}
                    </h2>
                </div>
            </div>
            <div className="mb-4">
                <div
                    className="container"
                    dangerouslySetInnerHTML={createMarkup(page.body)}
                ></div>
            </div>
        </section>
    );
};

export default Pages;
