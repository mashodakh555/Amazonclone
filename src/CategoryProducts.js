/// CategoryProducts.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products for the selected category by its ID
    fetch(
      `https://digitalinstitute-amazon.azurewebsites.net/api/product/products?CategoryId=${category}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [category]);

  return (
    <div>
      <h1>Products in {category}</h1>
      {/* Render the list of products for the selected category */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryProducts;
