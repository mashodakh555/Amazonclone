// config-global.js
import axios from "axios";

export const HOST_API = axios.create({
  baseURL: "https://digitalinstitute-amazon.azurewebsites.net",
});
