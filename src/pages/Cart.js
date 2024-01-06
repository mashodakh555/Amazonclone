import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import emptyCartImg from "./../assets/emptyCart.svg";
import {
  getReduxCartItems,
  handleRemoveOptimisticProduct,
  removeCartItem,
} from "../redux/userSlice";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isLoading, data } = useSelector(
    (state) => state.user.cartItems
  );

  const handleRemoveFromCart = (id) => {
    dispatch(handleRemoveOptimisticProduct(id));
    dispatch(removeCartItem(id));
  };

  const removeAllItems = () => {
    Object.keys(data).forEach((productId) => {
      dispatch(handleRemoveOptimisticProduct(productId));
      dispatch(removeCartItem(productId));
    });
  };

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
    <div className="w-full bg-gray-100 p-4">
      {Object.values(data).length ? (
        <div className="container mx-auto h-auto flex flex-col mdl:grid mdl:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="w-full h-full bg-white px-4 col-span-3 lg:col-span-4">
            <div
              className="font-titleFont flex flex-col items-start border-b-[1px]
                border-b-gray-400 py-3"
            >
              <h2 className="text-2xl font-medium">Shopping cart</h2>
              <p
                className="text-sm font-normal text-blue-600 cursor-pointer hover:underline"
                onClick={() => removeAllItems()}
              >
                Remove all items
              </p>
            </div>

            {/* PRODUCTS INFO */}
            <div>
              {Object.values(data).map((item) => (
                <div
                  key={item.id}
                  className="w-full border-b-[1px] border-b-gray-300 flex items-center gap-6"
                >
                  <div className="w-1/5 py-5">
                    <img
                      className="w-full h-44 object-contain"
                      src={item.images[0]}
                      alt="selectedProductImage"
                    />
                  </div>
                  <div className="w-3/5">
                    <h2 className="font-normal text-xl">
                      {item.name.substring(0, 100)}...
                    </h2>
                    <p className="font-semibold text-lg">${item.price}</p>
                    <div className="flex pt-3 items-center gap-4">
                      <div
                        className="text-sm flex justify-center items-center gap-1 w-24 bg-[#F0F2F2]
                            py-1 text-center drop-shadow-lg rounded-md"
                      >
                        <p>Qty:</p>
                        <p
                          className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-300
                              duration-300"
                        >
                          -
                        </p>
                        <p>1</p>
                        <p
                          className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-300
                              duration-300"
                        >
                          +
                        </p>
                      </div>
                      <p
                        className="text-xs text-blue-600 hover:underline border-l-[1px] border-l-gray-400 
                          pl-3 hover:cursor-pointer"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        Delete Item
                      </p>
                    </div>
                  </div>
                  <div className="w-1/5">
                    <p className="text-lg font-titleFont font-semibold flex items-center justify-end pr-4">
                      ${(item.price * 1).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex justify-end items-center py-5 px-2">
                <p className="text-lg">
                  Subtotal ({Object.keys(data).length} items):
                  <span className="text-xl font-semibold ">
                    {" "}
                    ${Object.keys(data).length > 0 ? totalprice.toFixed(2) : 0}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="w-[50%] mdl:w-full mx-auto h-[300px] xl:h-52 bg-white col-span-1 flex flex-col justify-center items-center p-4">
            <div>
              <div className="flex gap-2 items-start text-xs">
                <CheckCircleIcon className="bg-white text-green-700 rounded-full" />
                <p>
                  <span className="text-green-700">
                    Your order qualifies for FREE Shipping.{" "}
                  </span>
                  Choose this option at checkout.
                  <span className="text-blue-600 hover:underline hover:cursor-pointer">
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
            <div className="w-full flex items-center justify-start py-3">
              <p className="text-lg">
                Subtotal ({Object.keys(data).length} items):
                <span className="text-xl font-semibold ">
                  {" "}
                  ${Object.keys(data).length > 0 ? totalprice.toFixed(2) : 0}
                </span>
              </p>
            </div>
            <button
              className="center-element w-full py-1.5 rounded-md mt-3 font-titleFont font-sm text-base bg-gradient-to-tr from-yellow-400
                  to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 
                  active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200"
              onClick={() => navigate("/ecommerce-project/checkout")}
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
          className="flex justify-center items-center gap-4 py-10"
        >
          <div>
            <img
              src={emptyCartImg}
              alt="cartIsEmpty"
              className="w-[380px] rounded-lg p-4 mx-auto"
            />
          </div>
          <div className="flex flex-col items-center rounded-md shadow-lg w-96 p-4 bg-white">
            <h1 className=" text-xl font-semibold font-titleFont">
              Your Amazon Cart is empty
            </h1>
            <p>
              <a
                href="https://www.amazon.com/gp/goldbox/ref=cart_empty_deals"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm"
              >
                Shop Today's deals
              </a>
            </p>
            <button
              className="bg-yellow-400 rounded-md cursor-pointer mt-6
                hover:bg-yellow-500 active:bg-yellow-700 px-8 py-2 font-titleFont
                text-lg font-semibold"
              onClick={() => navigate("/ecommerce-project")}
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
