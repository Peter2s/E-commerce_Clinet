import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../../Axios";
import { CategoriesForm } from "../CategoriesForm/CategoriesForm";
import MySwal from "sweetalert2";
import { useFormik } from "formik";
import { initValues, validation } from "../CategoriesForm/validation";

const UpdateCategory = () => {
  const categoryId = useParams().id;
  const navigate = useNavigate();
  const [category, setCategory] = useState({});
  const CategoriesURL = "api/v1/categories";
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: validation,
    onSubmit: (values) => {
      const categoryData = new FormData();
      categoryData.append("name_en", values.name_en);
      categoryData.append("name_ar", values.name_ar);
      categoryData.append("image", values.image[0]);

      console.log(formik.values);
      axiosInstance
        .patch(`${CategoriesURL}/${categoryId}`, categoryData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          MySwal.fire({
            icon: "success",
            title: "success!",
            text: "category updated successfully",
          });
          navigate("/admin/categories");
        })
        .catch((err) => {
          console.log(err.response.data.error);
          MySwal.fire({
            icon: "error",
            title: "error!",
            text: err.response.data.error,
          });
        });
    },
  });

  useEffect(() => {
    const fetchCategory = async () => {
      axiosInstance
        .get(`${CategoriesURL}/${categoryId}`)
        .then((res) => {
          console.log(res.data.data);
          setCategory(res.data.data);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          MySwal.fire({
            icon: "error",
            title: "error!",
            text: error.response.data.error,
          });
        });
    };
    // Fetch the category data only if categoryId is provided
    if (categoryId) {
      fetchCategory();
    }
  }, []);

  useEffect(() => {
    formik.setFieldValue("name_en", category.name_en);
    formik.setFieldValue("name_ar", category.name_ar);
    formik.setFieldValue("image", category.image);
  }, [category]);

  const handleImageFile = (event) => {
    formik.values.image = Array.from(event.target.files);
    console.log(formik.values.image);
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          {category && (
            <CategoriesForm formik={formik} handleImageFile={handleImageFile} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
