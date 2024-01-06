import React, { useEffect } from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom"; // Import Link from React Router
import SearchIcon from "@mui/icons-material/Search";
import RoomIcon from "@mui/icons-material/Room";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { getReduxCartItems } from "../redux/slices/userSlice";
import { useLocation } from "react-router-dom";
function Header() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.user.cartItems.data);
  const cartItemsCount = Object.keys(cartItems).length;
  const location = useLocation();

  useEffect(() => {
    dispatch(getReduxCartItems());
  }, []);

  if (
    location.pathname.includes("Signin") ||
    location.pathname.includes("Registration")
  ) {
    return null;
  }

  return (
    <div className="Header">
      <Link to="/">
        {" "}
        {/* Use Link to navigate to the home page */}
        <a className="Header_logo_link">
          <img
            className="Header_logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon Logo"
          />
        </a>
      </Link>
      <div className="Header_Nav">
        <span className="Header_NavIcon">
          <RoomIcon />
        </span>
        <div className="Header_OptionNav">
          <span className="Header_option_line-1">Deliver to</span>
          <span className="Header_option_line-2">Country</span>
        </div>
      </div>

      <div className="Header_Search">
        <span className="Header_SearchOptionsCategorty">All</span>
        <input
          className="Header_SearchInput"
          type="text"
          placeholder="Search Amazon"
        />
        <SearchIcon className="Header_SearchIcon" />
      </div>
      <div>
        <span className="Header_Option">EN</span>
      </div>
      <div className="Header_Nav">
        <div className="Header_Option">
          <Link
            className="Header_cart"
            to={cartItemsCount > 0 ? "/Cart" : "/Signin"}
          >
            <span className="Header_option_line-1">Hello. sign in</span>
          </Link>
          <Link
            className="Header_cart"
            to={cartItemsCount > 0 ? "/Account" : "/Signin"}
          >
            <span className="Header_option_line-2">Account & list</span>
          </Link>
        </div>
      </div>
      <div className="Header_Nav">
        <div className="Header_Option">
          <span className="Header_option_line-1">Returns</span>
          <span className="Header_option_line-2">& Orders</span>
        </div>
        <Link
          className="Header_cart"
          to={cartItemsCount > 0 ? "/Cart" : "/Signin"}
        >
          <span className="Header_CartNumber">{cartItemsCount}</span>
          <AddShoppingCartIcon className="Header_CartIcon" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
