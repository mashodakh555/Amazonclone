import React from "react";
import "../styles/ProductFeed.css";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ProductFeed = ({ products, title }) => {
  const navigate = useNavigate();

  const goToProduct = (id) => {      
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-feed">
      <h2 className="product-feed-title">{title}</h2>
      <Slider centerMode={true} swipe={false} slidesToShow={5}>
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img
              src={product.image || product.images}
              alt={product.name}
              className="product-img"
              onClick={() => goToProduct(product.id)}
            />
            <p className="product-price">
              {product.price != null ? `$${product.price}` : ""}
              {product.oldPrice != null ? (
                <p className="old-price">${product.oldPrice}</p>
              ) : (
                ""
              )}
              {product.newPrice != null ? (
                <p className="new_price">${product.newPrice}</p>
              ) : null}
            </p>
            <p className="product-name">{product.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default ProductFeed;
