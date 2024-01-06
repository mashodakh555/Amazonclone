import { HOST_API } from "./config-global";

export const getProducts = async () => {
  const response = await HOST_API.get("/api/product/products");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await HOST_API.get(`/api/product/products/${id}`);
  return response.data;
};

export const getLatestProducts = async () => {
  const response = await HOST_API.get("/api/product/latestproducts");
  return response.data;
};
