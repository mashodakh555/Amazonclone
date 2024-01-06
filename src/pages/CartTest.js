import React, { useEffect } from "react";
import "../styles/Cart.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Skeleton } from "@mui/material";
import emptyCartImg from "../assets/emptyCart.svg";
import { useNavigate } from "react-router-dom";
// import { productsData } from "../data/productsData";
import {
  getReduxCartItems,
  handleRemoveOptimisticProduct,
  removeCartItem,
} from "../redux/slices/userSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isLoading, data } = useSelector(
    (state) => state.user.cartItems
  );

  // const [products, setProducts] = useState(productsData);

  // const handleRemoveFromCart = (id) => {
  //   const updatedProducts = products.filter((product) => product.id !== id);
  //   setProducts(updatedProducts);
  // };

  // const removeAllItems = () => {
  //   setProducts([]);
  // };

  const handleRemoveFromCart = (id) => {
    dispatch(handleRemoveOptimisticProduct(id));
    dispatch(removeCartItem(id));
  };

  const removeAllItems = () => {
    Object.keys(data)?.forEach((productId) => {
      dispatch(handleRemoveOptimisticProduct(productId));
      dispatch(removeCartItem(productId));
    });
  };

  // const totalprice = Object.values(products).reduce((accumulator, product) => {
  //   return accumulator + product.price;
  // }, 0);

  useEffect(() => {
    dispatch(getReduxCartItems());
    window.scrollTo({
      top: 0,
    });
  }, []);

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-evenly w-full h-screen p-3">
        <Skeleton
          variant="rounded"
          animation="wave"
          style={{ width: "75%", height: "80%" }}
        />
        <Skeleton
          variant="rounded"
          animation="wave"
          style={{ width: "20%", height: "40%" }}
        />
      </div>
    );
  }

  const totalprice = Object.values(data).reduce((accumulator, product) => {
    return accumulator + product.price;
  }, 0);

  return (
    <div className="cart-items-container">
      <div className="cartContainer">
        {Object.values(data).length > 0 ? (
          <div className="cartInnerContainer">
            <div className="shoppingCartContainer">
              <div className="shoppingCartWrapper">
                <h2 className="shoppingCartHeading">Shopping cart</h2>
                <p className="removeAllItems" onClick={() => removeAllItems()}>
                  Remove all items
                </p>
              </div>
              <div>
                {Object.values(data).map((item) => (
                  <div key={item.id} className="cartProducts">
                    <div className="cartProductsImgContainer">
                      <img
                        className="cartProductImg"
                        src={item.images[0]}
                        alt="selectedProductImage"
                      />
                    </div>
                    <div className="cartProductContainer">
                      <h2 className="cartProductName">
                        {item.name.substring(0, 100)}...
                      </h2>
                      <p className="cartProductPrice">${item.price}</p>
                      <div className="cartProductActionsWrapper">
                        <div className="quantityContainer">
                          <p>Qty:</p>
                          <p className="cartProductRemove">-</p>
                          <p>1</p>
                          <p className="cartProductAdd">+</p>
                        </div>
                        <p
                          className="cartProductDeleteItem"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          Delete Item
                        </p>
                      </div>
                    </div>
                    <div className="width-20">
                      <p className="cartProductItemPrice">
                        ${(item.price * 1).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="cartProductSubtotalContainer">
                  <p className="text-lg">
                    Subtotal ({Object.keys(data).length} items):
                    <span className="cartProductItemCurrency">
                      $
                      {Object.keys(data).length > 0 ? totalprice.toFixed(2) : 0}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="cartProductCheckoutDetailsContainer">
              <div>
                <div className="cartProductCheckoutDetails">
                  <CheckCircleIcon className="cartProductCheckoutDetailsCircleIcon" />
                  <p>
                    <span className="text-green-700">
                      Your order qualifies for FREE Shipping.{" "}
                    </span>
                    Choose this option at checkout.
                    <span className="cartProductCheckoutDetailsWrapper">
                      {" "}
                      <a
                        href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GZXW7X6AKTHNUP6H&pop-up=1"
                        target="_blank"
                        rel="noreferrer"
                      >
                        See details
                      </a>
                    </span>
                  </p>
                </div>
              </div>
              <div className="cartProductItemsInnerContainer">
                <p className="text-lg">
                  Subtotal ({Object.keys(data).length} items):
                  <span className="cartProductItemsSubtotalVal">
                    ${Object.keys(data).length > 0 ? totalprice.toFixed(2) : 0}
                  </span>
                </p>
              </div>
              <button
                className="cartCheckoutBtn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="cartEmptyWrapper"
          >
            <div>
              <img
                src={emptyCartImg}
                alt="cartIsEmpty"
                className="cartEmptyImage"
              />
            </div>
            <div className="emptyCart">
              <h1 className="emptyCartHeading">Your Amazon Cart is empty</h1>
              <p>
                <a
                  href="https://www.amazon.com/gp/goldbox/ref=cart_empty_deals"
                  target="_blank"
                  rel="noreferrer"
                  className="shopTodaysDealsLink"
                >
                  Shop Today's deals
                </a>
              </p>
              <button className="cartCheckoutBtn" onClick={() => navigate("/")}>
                Continue Shopping
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;
