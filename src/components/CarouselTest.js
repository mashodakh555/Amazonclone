import React from "react";
import Carousel from "react-responsive-carousel/lib/js/components/Carousel/index.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/Carousel.css";

const CarouselTest = ({ images }) => {
  return (
    <div className="Carousel">
      <Carousel
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {images.map((img, index) => {
          <div>
            <img
              key={index}
              src="https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg"
              alt=""
            ></img>
          </div>;
        })}
      </Carousel>
    </div>
  );
};

export default CarouselTest;
