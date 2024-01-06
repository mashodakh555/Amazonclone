import React, { useState, useEffect, useRef } from "react";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedCategoryFilter } from "../redux/slices/amazonSlice";
import "../styles/HeaderNav.css";
import "../styles/Products.css";
import { useNavigate } from "react-router-dom";
const CategoriesApiUrl =
  "https://digitalinstitute-amazon.azurewebsites.net/api/product/categories";
function Products() {
  const dispatch = useDispatch();
  const windowWidth = useRef(window.innerWidth);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const navigate = useNavigate();
  const selectedCategory = useSelector(
    (state) => state.amazon.selectedCategory
  );
  const [categories, setCategories] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]); // Store the original product data
  const [products, setProducts] = useState([]);
  const [toggled, setToggled] = useState(false);
  const sortProductsByPriceAsc = () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
  };
  const sortProductsByPriceDesc = () => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price);
    setProducts(sortedProducts);
  };
  const goToProduct = (id) => {
    navigate(`/product/${id}`);
  };
  const filterProductsByPriceRange = (minPrice, maxPrice) => {
    // Filter the original product data and set the filtered products to the state
    const filteredProducts = originalProducts.filter((product) => {
      const price = product.price || 0; // Ensure price is not null
      return price >= minPrice && price <= maxPrice;
    });
    setProducts(filteredProducts);
  };
  const resetProductList = () => {
    // Reset the product list to the original data
    setProducts(originalProducts);
  };
  const fetchProducts = async () => {
    let ProductsApiUrl =
      "https://digitalinstitute-amazon.azurewebsites.net/api/product/products";
    if (selectedCategory !== "All") {
      ProductsApiUrl += `?CategoryId=${selectedCategory}`;
    }
    try {
      const response = await fetch(ProductsApiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setOriginalProducts(data); // Store the original product data
      setProducts(data); // Set the initial products data
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation for latest products:",
        error
      );
    }
  };
  useEffect(() => {
    fetch(CategoriesApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation for categories:",
          error
        );
      });
  }, []);
  useEffect(() => {
    if (selectedCategory) {
      fetchProducts();
    }
  }, [selectedCategory]);
  // Filter products based on the selected category
  const updatedCategories = categories.filter(
    (category) =>
      category.name !== "Sports & Fitness" &&
      category.name !== "Video Games" &&
      category.name !== "Find a Gift"
  );
  return (
    <div>
      <div className="bt-box">
        <div>
          <button className="bt_sort" onClick={sortProductsByPriceAsc}>
            Sort by Price (Low to High)
          </button>
        </div>
        <button className="bt_sort" onClick={sortProductsByPriceDesc}>
          Sort by Price (High to Low)
        </button>
        <div className="price-filter-buttons">
          <button
            className="bt_filter"
            onClick={() => filterProductsByPriceRange(0, 50)}
          >
            Under $10
          </button>
          <br />
          <button
            className="bt_filter"
            onClick={() => filterProductsByPriceRange(10, 1000)}
          >
            $10 - $50
          </button>
          <br />
          <button
            className="bt_filter"
            onClick={() => filterProductsByPriceRange(100, Infinity)}
          >
            Over $100
          </button>
          <br />
          <button className="bt_filter" onClick={resetProductList}>
            Reset Products
          </button>
        </div>
      </div>
      <div className="product-list">
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
      </div>
    </div>
  );
}
function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
export default Products;
