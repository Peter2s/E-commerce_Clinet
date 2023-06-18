import { useEffect, useState } from "react";
import { axiosInstance } from "../../../Axios";

export const AllCategoriesHook = () => {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllCategories = (page = 1, limit = 5) => {
      axiosInstance
        .get(`categories?page=${page}&limit=${limit}`)
        .then((categories) => {
          console.log(categories.data.data);
          setCategories(categories.data.data);
          setPagination(categories.data.pagination);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    };
    getAllCategories();
  }, []);
  useEffect(() => {}, [categories]);

  const getPage = (page) => {
    getPage(page);
  };
  return [categories, loading, pagination, getPage];
};
