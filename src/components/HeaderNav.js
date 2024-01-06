import React, { useState, useEffect, useRef } from "react";
import "../styles/HeaderNav.css";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedCategoryFilter } from "../redux/slices/amazonSlice";
import { useLocation } from "react-router-dom";
const ProductsApiUrl =
  "https://digitalinstitute-amazon.azurewebsites.net/api/product/categories";
function HeaderNav() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state.amazon.selectedCategory    
  );
  const windowWidth = useRef(window.innerWidth);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [toggled, setToggled] = React.useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const location = useLocation();
  useEffect(() => {
    fetch(ProductsApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
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
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const filteredProducts = products.filter((item) => {
    return selectedCategory === "All" || item.brand === selectedCategory;
  });
  const updatedCategories = categories.filter(
    (category) =>
      category.name !== "Sports & Fitness" &&
      category.name !== "Video Games" &&
      category.name !== "Find a Gift"
  );
  if (
    location.pathname.includes("Signin") ||
    location.pathname.includes("Registration")
  ) {
    return null;
  }
  const handleProductsLinkClick = (e) => {
    e.preventDefault(); // Prevent the default navigation behavior
    const to = "/Products"; // Define the target URL
    if (location.pathname !== to) {
      window.location.href = to; // Navigate to the target URL
    }
  };
  return (
    <div className="Header_NavMain">
      <Sidebar
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="always"
        backgroundColor="white"
      >
        <Menu>
          <div className="sb-menu">
            <div className="sb-signin">
              <a className="sb-link-1" href="/Registration">
                Hello, Sign in
              </a>
            </div>
            <MenuItem className="sb-menu-titles">Pages</MenuItem>
            <div className="sb-menu-link">
              <a
                className="sb-link-2"
                href="/Products"
                onClick={handleProductsLinkClick}
              >
                All
              </a>
              <br />
              <a className="sb-link-2" href="/">
                Home
              </a>
            </div>
          </div>
        </Menu>
      </Sidebar>
      <FormatAlignJustifyIcon />
      <button className="sb-button" onClick={() => setToggled(!toggled)}>
        All
      </button>
      <a href="/Products" onClick={handleProductsLinkClick}>
        <List
          sx={{
            display: "flex",
            color: "white",
            textDecoration: "none",
            whiteSpace: "nowrap !important",
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
            alignItems: "center",
            flexDirection: windowSize?.innerWidth <= 1400 ? "column" : "row",
          }}
        >
          {updatedCategories.map((category) => (
            <ListItem
              key={category.id}
              disablePadding
              onClick={() => {
                dispatch(updateSelectedCategoryFilter(category.id));
              }}
            >
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText sx={{ fontSize: "0.7rem" }}>
                  {category.name}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </a>
    </div>
  );
}
function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
export default HeaderNav;