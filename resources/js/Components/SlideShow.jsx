import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const SlideShow = () => {
    const images = [
        "/img/slide-1.jpg",
        "/img/slide-2.jpg",
        "/img/slide-3.jpg",
        "/img/slide-4.jpg",
        "/img/slide-5.jpg",
        "/img/slide-6.jpg",
    ];

    return (
        <Slide slidesToScroll={2} slidesToShow={2} indicators={false}>
            {images.map((item) => (
                <div className="each-slide-effect">
                    <img src={item} height={100} />
                </div>
            ))}
        </Slide>
    );
};

export default SlideShow;
