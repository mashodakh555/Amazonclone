import React, { useEffect, useRef, useState } from "react";
import "../styles/ProductDetails.css";
import "../styles/Common.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Rating } from "@mui/material";
import { getProductById, getLatestProducts } from "../api/services/products";
import { handleAddProduct, setTokenExpired } from "../redux/slices/userSlice";
import { addToCart } from "../api/services/cart";
import { ProductCarousel } from "../components/ProductCarousel";
import CarouselTest from "../components/CarouselTest";
import CloseIcon from "@mui/icons-material/Close";

const productDefault = {
  data: [],
  isLoading: true,
  isLoaded: false,
  isError: false,
};

const defaultdata = {
  isLoading: true,
  data: [],
};

const ProductDetails = () => {
  const [selectedProduct, setSelectedProduct] = useState(productDefault);
  const [bigImage, setBigImage] = useState("");
  const [modalPicture, setModalPicture] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] =
    useState("Delivery");
  const [productQuantity, setProductQuantity] = useState(1);
  const [latestProducts, setLatestProducts] = useState(defaultdata);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();
  const { id } = useParams();
  const user = useSelector((state) => state.user);

  const isUserLoggedIn = localStorage.getItem("token")?.length > 0;

  const handleOptionClick = (option) => {
    setSelectedDeliveryOption(option);
  };

  useEffect(() => {
    getProductById(id).then((res) => {
      try {
        setSelectedProduct({
          data: res,
          isLoading: false,
          isLoaded: true,
          isError: false,
        });
      } catch (err) {
        setSelectedProduct({
          data: [],
          isLoading: false,
          isLoaded: true,
          isError: true,
        });
      }
    });
    window.scrollTo({
      top: 0,
    });

    const parseQuery = () => {
      if (!Object.keys(selectedProduct.data).length) {
        getProductById(id).then((res) => {
          try {
            setSelectedProduct({
              data: res,
              isLoading: false,
              isLoaded: true,
              isError: false,
            });
          } catch (err) {
            setSelectedProduct({
              data: [],
              isLoading: false,
              isLoaded: true,
              isError: true,
            });
          }
        });
      }
    };
    parseQuery();

    getLatestProducts().then((res) => {
      setLatestProducts({
        isLoading: false,
        data: res,
      });
    });
  }, [id]);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        setModalPicture(false);
      }
    });
    if (
      selectedProduct.data &&
      selectedProduct.data.images &&
      selectedProduct.data.images.length > 0
    ) {
      setBigImage(selectedProduct.data.images[0]);
    }
  }, [ref, modalPicture, selectedProduct]);

  useEffect(() => {
    // Handle token expiration state here and navigate if necessary
    if (user.tokenExpired) {
      navigate("/Signin");
      // Reset the token expiration state after navigation
      dispatch(setTokenExpired(false));
    }
  }, [user.tokenExpired]);

  const handleChangeBigImage = (index) => {
    if (selectedProduct.data && selectedProduct.data.images) {
      setBigImage(selectedProduct.data.images[index]);
    }
  };

  const handleQuantityChange = (event) => {
    setProductQuantity(parseInt(event.target.value, 10));
  };

  const handleAddToCart = async () => {
    if (isUserLoggedIn) {
      dispatch(handleAddProduct(selectedProduct.data));
      addToCart(selectedProduct.data, dispatch);
    } else {
      navigate("/Signin");
    }
  };

  if (selectedProduct.isLoading || latestProducts.isLoading) {
    return (
      <div className="circular-progress-container">
        <CircularProgress />
      </div>
    );
  }

  if (selectedProduct.isError) {
    return (
      <div className="circular-progress-container">
        <p className="circular-progress-text">
          Error loading, try again later.
        </p>
      </div>
    );
  }

  const { name, description, price, images, brand } = selectedProduct.data;

  const latestProductsImages = latestProducts.data
    .map((item) => item.images)
    .flat();

  return (
    <div className="product-details-page">
      <div className="product-details bg-white">
        <div className="product-details-container">
          {/* product images  */}
          <div className="product-images-container">
            <div className="product-images">
              <img
                src={bigImage || images[0]}
                className="product-image-element"
                onClick={() => setModalPicture(true)}
                alt="productimage"
              />
            </div>
            <div className="product-card=container">
              <p className="zoom-in-text">Roll over image to zoom in</p>
              <div className="product-list-images-container">
                {images.slice(0, 3).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="productImage"
                    className="product-image"
                    onMouseEnter={() => handleChangeBigImage(index)}
                  />
                ))}

                {images.length > 4 && (
                  <div className="more-than-four-images-container">
                    <img
                      src={images[images.length - 1]}
                      alt="productImage"
                      className="product-img-box"
                    />
                    <div
                      className="product-modal-container"
                      onClick={() => setModalPicture(true)}
                    >
                      <p className="product-images-length">
                        +{images.length - 4}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PRODUCTS INFO */}
          <div className="products-info-container">
            <div>
              <p className="product-details-name">{name}</p>
              <p className="product-company">
                by{" "}
                <span className="text-blue">
                  <a
                    href="https://www.amazon.com/Ram-Dass/e/B001HCS3GS/ref=dp_byline_cont_book_1"
                    target="_blank"
                    rel="noreferrer"
                    className="product-company-link"
                  >
                    {brand}
                  </a>
                </span>
              </p>
            </div>
            <div className="product-rating-container">
              <p className="text-md">4</p>
              <Rating name="half-rating-read" defaultValue={4} readOnly />
              <p className="text-md product-details-rating-value">
                120 Ratings
              </p>
            </div>
            <div className="product-price-container">
              <p className="product-price-label">Price:</p>
              <p className="product-price-value">${price}</p>
            </div>
            <div className="product-description-container">
              <p className="product-description-text">About this item</p>
              <p>{description}</p>
            </div>
          </div>

          {/* ADD TO CART COLUMN */}
          <div className="add-to-cart-container add-to-cart-container-position">
            <div className="checkbox-container">
              <input type="checkbox" className="checkbox-input" />
              <p className="text-sm">
                Add your 30-day FREE trial of Prime and get{" "}
                <span className="font-semibold">fast, free delivery</span>
              </p>
            </div>
            <div className="gray-border">
              <div className="options">
                <p
                  className={
                    selectedDeliveryOption === "Delivery"
                      ? "active delivery"
                      : "inactive"
                  }
                  onClick={() => handleOptionClick("Delivery")}
                >
                  Delivery
                </p>
                <p
                  className={
                    selectedDeliveryOption === "Pick Up"
                      ? "active pickup"
                      : "inactive"
                  }
                  onClick={() => handleOptionClick("Pick Up")}
                >
                  Pick Up
                </p>
              </div>
              {/* product delivery options */}
              {/* Delivery */}
              {selectedDeliveryOption === "Delivery" && (
                <div className="delivery-container">
                  <div>
                    <p>Save 10% now and up to 15% on repeat deliveries.</p>
                    <p>• No fees</p>
                    <p>• Cancel any time</p>
                    <a
                      href="https://www.amazon.com/Lions-Mane-Brain-Focus-Supplements/dp/B078SZX3ML/ref=pd_ci_mcx_mh_mcx_views_0?pd_rd_w=Zlrij&content-id=amzn1.sym.0250fb24-4363-44d0-b635-ac15f859c3b5%3Aamzn1.symc.40e6a10e-cbc4-4fa5-81e3-4435ff64d03b&pf_rd_p=0250fb24-4363-44d0-b635-ac15f859c3b5&pf_rd_r=XP3VSSHMNXW1MW6MZN2C&pd_rd_wg=SbGl3&pd_rd_r=c1850aba-b8f5-4562-a0b6-d7b80df7eda4&pd_rd_i=B078SZX3ML#"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Learn More
                    </a>
                  </div>
                  <p className="text-md text-green-600 font-semibold">
                    Get it Friday, Aug 28
                  </p>
                  {/* if in stock */}
                  <p className="text-lg text-green-600 font-semibold">
                    In Stock
                  </p>
                  <input
                    type="number"
                    placeholder="Qty: 1"
                    value={productQuantity}
                    onChange={handleQuantityChange}
                    className="product-quantity"
                  />
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart()}
                  >
                    Add to cart
                  </button>
                </div>
              )}
              {/* Pickup */}
              {selectedDeliveryOption === "Pick Up" && (
                <div className="pickup-container">
                  <div className="col-flex">
                    <p className="pickup-price">
                      <span className="pickup-currency-type">$</span>
                      {price}
                    </p>
                    <p className="text-sm">
                      FREE pickup
                      <span className="font-semibold"> Friday, August 28</span>
                    </p>
                  </div>
                  <p>
                    Or fastest pickup
                    <span className="font-semibold"> Tomorrow, April 13.</span>
                    Order within
                    <span className="text-green-600"> 14 hrs 43 mins</span>
                  </p>
                  <div className="text-sm">
                    <a
                      className="text-blue-500"
                      href="https://www.amazon.com/Lions-Mane-Brain-Focus-Supplements/dp/B078SZX3ML/ref=pd_ci_mcx_mh_mcx_views_0?pd_rd_w=Zlrij&content-id=amzn1.sym.0250fb24-4363-44d0-b635-ac15f859c3b5%3Aamzn1.symc.40e6a10e-cbc4-4fa5-81e3-4435ff64d03b&pf_rd_p=0250fb24-4363-44d0-b635-ac15f859c3b5&pf_rd_r=XP3VSSHMNXW1MW6MZN2C&pd_rd_wg=SbGl3&pd_rd_r=c1850aba-b8f5-4562-a0b6-d7b80df7eda4&pd_rd_i=B078SZX3ML#"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Amazon Hub Locker - Belief
                    </a>
                    <p>2.43 mi | New Castle 19720</p>
                  </div>
                  <a
                    href="https://www.amazon.com/Lions-Mane-Brain-Focus-Supplements/dp/B078SZX3ML/ref=pd_ci_mcx_mh_mcx_views_0?pd_rd_w=Zlrij&content-id=amzn1.sym.0250fb24-4363-44d0-b635-ac15f859c3b5%3Aamzn1.symc.40e6a10e-cbc4-4fa5-81e3-4435ff64d03b&pf_rd_p=0250fb24-4363-44d0-b635-ac15f859c3b5&pf_rd_r=XP3VSSHMNXW1MW6MZN2C&pd_rd_wg=SbGl3&pd_rd_r=c1850aba-b8f5-4562-a0b6-d7b80df7eda4&pd_rd_i=B078SZX3ML#"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 text-sm"
                  >
                    How pickup works
                  </a>
                  {/* if in stock */}
                  <p className="text-lg text-green-600 font-semibold">
                    In Stock
                  </p>
                  <input
                    type="number"
                    placeholder="Qty:1"
                    value={productQuantity}
                    onChange={handleQuantityChange}
                    className="stock-quantity"
                  />
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart()}
                  >
                    Add to cart
                  </button>
                </div>
              )}
            </div>
          </div>
          {modalPicture && (
            <div className="modal-picture-container">
              <div className="modal-picture-inner-container">
                <div ref={ref} className="modal-picture-images-wrapper">
                  <p className="modal-picture-images-text">Images</p>
                  <div className="modal-picture-big-image-container">
                    <img
                      src={bigImage.length > 0 ? bigImage : images[0]}
                      alt="productImage"
                      className="modal-picture-prod-img"
                    />
                    <div className="col-flex w-50">
                      <p className="product-image-name">{name}</p>
                      <div className="product-image-big-images-container">
                        {images.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt="productImage"
                            className="product-image-big-image"
                            onClick={() => handleChangeBigImage(index)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <span
                  className="product-image-btn"
                  onClick={() => setModalPicture(false)}
                >
                  <CloseIcon fontSize="large" />
                </span>
              </div>
            </div>
          )}
        </div>
        {/* similar products */}
        {/* <ProductCarousel
          data={latestProducts.data}
          pricetag={false}
          title="Inspired by your browsing history"
        /> */}
        <CarouselTest images={latestProductsImages} />
      </div>
    </div>
  );
};

export default ProductDetails;
