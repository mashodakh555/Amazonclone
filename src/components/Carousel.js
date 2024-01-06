import React from "react";
import Carousel from "react-responsive-carousel/lib/js/components/Carousel/index.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/Carousel.css";

function Banner() {
  return (
    <div className="Carousel">
      <Carousel
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img
            src="https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg"
            alt=""
          ></img>
        </div>
        <div>
          <img
            src="https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg"
            alt=""
          ></img>
        </div>
        <div>
          <img
            src="https://m.media-amazon.com/images/I/71U-Q+N7PXL._SX3000_.jpg"
            alt=""
          ></img>
        </div>

        <div>
          <img
            src="https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg"
            alt=""
          ></img>
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
