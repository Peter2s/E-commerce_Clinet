import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../../Axios";
import { ProductsForm } from "../Products-form/ProductsForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import MySwal from "sweetalert2";

const UpdateProduct = () => {
  const [categories, setCategories] = useState(null);
  const [product, setProduct] = useState({});
  const productID = useParams().id;
  const navigate = useNavigate();

  const ProductsURL = "api/v1/products";
  const CategoriesURL = "api/v1/categories";

  const formik = useFormik({
    initialValues: {
      name_en: "",
      name_ar: "",
      descriptionEn: "",
      descriptionAr: "",
      image: [],
      images: [],
      category: "",
      price: "",
      quantity: "",
    },
    validationSchema: Yup.object({
      name_en: Yup.string()
        .min(3, "product name must be at lest 3 character")
        .matches(/^[a-zA-Z\s]*$/, "Invalid name format")
        .required("product name required"),
      name_ar: Yup.string()
        .min(3, "product name must be at lest 3 character")
        .matches(/^[\u0600-\u06ff\s]+$/, "accepts arabic character only")
        .required("product name in arabic  required"),
      descriptionEn: Yup.string()
        .min(10, "product description must be at least 10 character")
        .matches(/^[a-zA-Z\s]*$/, "Invalid name format")
        .required("product description required"),
      descriptionAr: Yup.string()
        .min(10, "product description must be at least 10 character")
        .matches(/^[\u0600-\u06ff\s]+$/, "accepts arabic character only")
        .required("product description in arabic required"),
      image: Yup.array().min(1, "Please select Cover image"),
      images: Yup.array().min(1, "Please select at least one image"),
      category: Yup.string().required("product category required"),
      price: Yup.string()
        .matches(/^[0-9,.]*$/, "numbers only allowed")
        .required("product price required"),
      quantity: Yup.string()
        .matches(/^[0-9]*$/, "numbers only allowed")
        .default(0)
        .optional(),
    }),
    onSubmit: (values) => {
      const productData = new FormData();

      productData.append("name_en", values.name_en);
      productData.append("name_ar", values.name_ar);
      productData.append("image", values.image[0]);
      values.images.forEach((image) => {
        productData.append("images", image);
      });
      productData.append("category_id", values.category);
      productData.append("desc_en", values.descriptionEn);
      productData.append("desc_ar", values.descriptionAr);
      productData.append("price", values.price);
      productData.append("quantity", values.quantity);
      console.log(productData);
      axiosInstance
        .patch(ProductsURL, productData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          MySwal.fire({
            icon: "success",
            title: "success!",
            text: "product created successfully",
          });
          navigate("/admin/products");
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
  const handleImageFile = (event) => {
    formik.values.image = Array.from(event.target.files);
    console.log(formik.values.image);
  };
  const handleFileChange = (event) => {
    formik.values.images = Array.from(event.target.files);
    console.log(formik.values.images);
  };

  useEffect(() => {
    // Fetch the product data based on the categoryId
    const fetchProduct = async () => {
      axiosInstance
        .get(`${ProductsURL}/${productID}`)
        .then((response) => {
          console.log(response.data.data);
          setProduct(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const fetchCategories = async () => {
      axiosInstance
        .get(CategoriesURL)
        .then((response) => {
          setCategories(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    // Fetch the category data only if categoryId is provided
    if (productID) {
      fetchProduct();
      fetchCategories();
    }
  }, []);

  useEffect(() => {
    formik.setFieldValue("name_en", product.name_en);
    formik.setFieldValue("name_ar", product.name_ar);
    formik.setFieldValue("descriptionEn", product.desc_en);
    formik.setFieldValue("descriptionAr", product.desc_ar);
    formik.setFieldValue("category", product.category_id?._id);
    formik.setFieldValue("price", product.price?.$numberDecimal);
    formik.setFieldValue("quantity", product.quantity);
    formik.setFieldValue("image", product.image);
    formik.setFieldValue("images", product.images);
  }, [product]);

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          {product && categories && (
            <ProductsForm
              formik={formik}
              handleImageFile={handleImageFile}
              handleFileChange={handleFileChange}
              categories={categories}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
