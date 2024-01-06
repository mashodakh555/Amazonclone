import React from "react";
import "../styles/ProductCarousel.css";
import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

export const ProductCarousel = ({ data, title }) => {
  const navigate = useNavigate();

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="products-arrow prevArr" onClick={onClick}>
        <ArrowBackIosNewIcon className="color-gray-400" />
      </div>
    );
  };

  const NextArrow = ({ onClick }) => {
    return (
      <div className="products-arrow nextArr" onClick={onClick}>
        <ArrowForwardIosIcon className="color-gray-400" />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: false, // Add this line
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 960,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleNavigateProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="products-carousel-container">
      <div className="products-carousel-card">
        <div className="products-header">
          <h2 className="products-title">{title}</h2>
          <p className="products-see-more">See more</p>
        </div>
        <div>
          <Slider {...settings}>
            {data.map((item, index) => (
              <div key={index}>
                <img
                  className="products-slide-img"
                  src={item.images[0]}
                  alt="ProductSlideImage"
                  onClick={() => handleNavigateProduct(item.id)}
                />
              </div>
            ))}
            {data.map((item, index) => (
              <div key={index}>
                <img
                  className="products-slide-img"
                  src={item.images[0]}
                  alt="ProductSlideImage"
                  onClick={() => handleNavigateProduct(item.id)}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
