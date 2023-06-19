import { useEffect, useState } from "react";
import { axiosInstance } from "../../../Axios";

export const AllProductsHook = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = (page = 1) => {
    axiosInstance
      .get(`products?page=${page}`)
      .then((products) => {
        console.log("products", products.data.data);
        setProducts(products.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  return [products, loading];
};
