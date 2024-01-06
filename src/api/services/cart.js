import { HOST_API } from "./config-global";
import { useNavigate } from "react-router-dom";
import { setTokenExpired } from "../../redux/slices/userSlice";

export const getCartItems = async () => {
  const token = localStorage.getItem("token");
  const response = await HOST_API.get("/api/cart/getmycartproducts", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const addToCart = (product, dispatch) => {
  const token = localStorage.getItem("token");
  HOST_API.post(
    "/api/cart/addincart",
    { productId: product.id },
    {
      headers: { Authorization: "Bearer " + token },
    }
  ).catch((error) => {
    // Check for the specific error indicating token expiration
    if (error.response && error.response.status === 401) {
      // Token is expired, set the state to indicate expiration
      dispatch(setTokenExpired(true));
    }
  });
};

export const removeCartItemBase = async (productId) => {
  const token = localStorage.getItem("token");
  const response = await HOST_API.delete(`/api/cart/removefromcart`, {
    data: { productId },
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response.data ? productId : false;
};
