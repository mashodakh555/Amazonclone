import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import ProductDetails from "./pages/ProductDetails";
import Signin from "./pages/SignIn";
import Registration from "./pages/Registration";
import Products from "./pages/Products";
import Cart from "./pages/CartTest";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import { ProtectedRoute } from "./api/services/ProtextedRoute";
import Header from "./components/Header";
import HeaderNav from "./components/HeaderNav";

const latestProductsApiUrl =
  "https://digitalinstitute-amazon.azurewebsites.net/api/product/latestproducts";
const mostDemandedProductsApiUrl =
  "https://digitalinstitute-amazon.azurewebsites.net/api/product/mostdemandproducts";
const offersProductsApiUrl =
  "https://digitalinstitute-amazon.azurewebsites.net/api/product/offers";

function App() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [mostDemandedProducts, setMostDemandedProducts] = useState([]);
  const [offersProducts, setOffersProducts] = useState([]);

  useEffect(() => {
    fetch(latestProductsApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLatestProducts(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation for latest products:",
          error
        );
      });

    fetch(mostDemandedProductsApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMostDemandedProducts(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation for most demanded products:",
          error
        );
      });

    fetch(offersProductsApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setOffersProducts(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation for offers products:",
          error
        );
      });
  }, []);

  const routes = [
    {
      path: "/",
      element: (
        <HomePage
          latestProducts={latestProducts}
          mostDemandedProducts={mostDemandedProducts}
          offersProducts={offersProducts}
        />
      ),
    },
    {
      path: "/product/:id",
      element: <ProductDetails />,
    },
    {
      path: "/Signin",
      element: <Signin />,
    },
    {
      path: "/Registration",
      element: <Registration />,
    },
    {
      path: "/Products",
      element: <Products />,
    },
  ];

  return (
    <BrowserRouter>
      <Header />
      <HeaderNav />
      <Routes>
        {routes.map((route) => {
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          );
        })}

        <Route element={<ProtectedRoute />}>
          <Route element={<Account />} path="/Account" />
          <Route element={<Cart />} path="/Cart" />
          <Route element={<Checkout />} path="/Checkout" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
