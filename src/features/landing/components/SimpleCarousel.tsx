import React from "react";
import Slider from "react-slick";

export default function SimpleCarousel({items = []}) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        adaptiveHeight: true
    };
    return (
        <div>
            <Slider {...settings}>
                {items.map((child, i) => <div key={i}>{child}</div>)}
            </Slider>
        </div>
    );
}