import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, Col, Container, Navbar, Row } from "reactstrap";
import { axiosInstance } from "../../../../Axios";
import { useFormik } from "formik";
import MySwal from "sweetalert2";
import { ProductsForm } from "../Products-form/ProductsForm";
import { initValues, validation } from "../Products-form/validation";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const CategoriesURL = "api/v1/categories";
  const ProductsURL = "api/v1/products";
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: validation,
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
        .post(ProductsURL, productData, {
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
    async function getCategories() {
      const res = await axiosInstance.get(CategoriesURL);
      console.log(res.data);
      setCategories(res.data.data);
    }

    getCategories();
  }, []);

  return (
    <>
      <Navbar />
      <Container className="mt-7" fluid>
        <Row>
          <Col>
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className=" btntitleproduct row col-12">
                  <h3 className="col-6 mb-0">Add products</h3>
                </div>
              </CardHeader>
            </Card>
            <ProductsForm
              formik={formik}
              categories={categories}
              handleFileChange={handleFileChange}
              handleImageFile={handleImageFile}
            />
            {/*  <form className="container mt-2" onSubmit={formik.handleSubmit}>*/}
            {/*      <FormGroup>*/}
            {/*          <FormLabel>Name</FormLabel>*/}
            {/*          <Input*/}
            {/*              type="text"*/}
            {/*              name="name_en"*/}
            {/*              placeholder="name"*/}
            {/*              value={formik.values.name_en}*/}
            {/*              onBlur={formik.handleBlur}*/}
            {/*              onChange={formik.handleChange}*/}
            {/*          />*/}
            {/*          {formik.errors.name_en && formik.touched.name_en && (*/}
            {/*              <span className="text-danger">*/}
            {/*               {formik.errors.name_en}*/}
            {/*              </span>*/}
            {/*          )}*/}
            {/*      </FormGroup>*/}
            {/*      <FormGroup>*/}
            {/*          <FormLabel>الاسم</FormLabel>*/}
            {/*          <Input*/}
            {/*              type="text"*/}
            {/*              placeholder="الاسم"*/}
            {/*              name="name_ar"*/}
            {/*              value={formik.values.name_ar}*/}
            {/*              onBlur={formik.handleBlur}*/}
            {/*              onChange={formik.handleChange}*/}
            {/*          />*/}
            {/*          {formik.errors.name_ar && formik.touched.name_ar && (*/}
            {/*              <span className="text-danger">*/}
            {/*                 {formik.errors.name_ar}*/}
            {/*              </span>*/}
            {/*          )}*/}
            {/*      </FormGroup>*/}
            {/*      <FormGroup>*/}
            {/*          <FormLabel>Description</FormLabel>*/}
            {/*          <Input*/}
            {/*              type="textarea"*/}
            {/*              rows="3"*/}
            {/*              name="descriptionEn"*/}
            {/*              value={formik.values.descriptionEn}*/}
            {/*              onBlur={formik.handleBlur}*/}
            {/*              onChange={formik.handleChange}*/}
            {/*          />*/}
            {/*          {formik.errors.descriptionEn &&*/}
            {/*              formik.touched.descriptionEn && (*/}
            {/*                  <span className="text-danger">*/}
            {/*                      {formik.errors.descriptionEn}*/}
            {/*                    </span>*/}
            {/*              )}*/}
            {/*      </FormGroup>*/}
            {/*      <FormGroup>*/}
            {/*          <FormLabel>الوصف</FormLabel>*/}
            {/*          <Input*/}
            {/*              type="textarea"*/}
            {/*              rows="3"*/}
            {/*              name="descriptionAr"*/}
            {/*              value={formik.values.descriptionAr}*/}
            {/*              onBlur={formik.handleBlur}*/}
            {/*              onChange={formik.handleChange}*/}
            {/*          />*/}
            {/*          {formik.errors.descriptionAr &&*/}
            {/*              formik.touched.descriptionAr && (*/}
            {/*                  <span className="text-danger">*/}
            {/*                      {formik.errors.descriptionAr}*/}
            {/*                   </span>*/}
            {/*              )}*/}
            {/*      </FormGroup>*/}
            {/*      <FormGroup>*/}
            {/*          <FormLabel>Category</FormLabel>*/}
            {/*          <FormSelect*/}
            {/*              className="form-control"*/}
            {/*              name="category"*/}
            {/*              onChange={formik.handleChange}*/}
            {/*              value={formik.values.category}*/}
            {/*              onBlur={formik.handleBlur}*/}
            {/*              defaultValue={formik.values.category}*/}
            {/*          >*/}
            {/*              <option>Select Category</option>*/}
            {/*              {categories &&*/}
            {/*                  categories.map((category) => (*/}
            {/*                      <option key={category._id} value={category._id}>*/}
            {/*                          {category.name_en}*/}
            {/*                      </option>*/}
            {/*                  ))}*/}
            {/*          </FormSelect>*/}
            {/*          {formik.errors.category && formik.touched.category && (*/}
            {/*              <span className="text-danger">*/}
            {/*                 {formik.errors.category}*/}
            {/*               </span>*/}
            {/*          )}*/}
            {/*      </FormGroup>*/}

            {/*      <FormGroup>*/}
            {/*          <FormLabel*/}
            {/*              htmlFor="coverImage"*/}
            {/*              className="btn btn-primary"*/}
            {/*              style={{cursor: "pointer"}}*/}
            {/*          >*/}
            {/*              Cover Image : Browse*/}
            {/*          </FormLabel>*/}
            {/*          <Input*/}
            {/*              id="coverImage"*/}
            {/*              type="file"*/}
            {/*              name="image"*/}
            {/*              className="form-control"*/}
            {/*              style={{display: "none"}}*/}
            {/*              onBlur={formik.handleBlur}*/}
            {/*              onChange={handleImageFile}*/}
            {/*          />*/}
            {/*          {formik.errors.image && formik.touched.image && (*/}
            {/*              <span className="text-danger">{formik.errors.image}</span>*/}
            {/*          )}*/}
            {/*      </FormGroup>*/}
            {/*      <FormGroup>*/}
            {/*          <FormLabel*/}
            {/*              htmlFor="images"*/}
            {/*              className="btn btn-primary"*/}
            {/*              style={{cursor: "pointer"}}*/}
            {/*          >*/}
            {/*              Images : Browse*/}
            {/*          </FormLabel>*/}
            {/*          <Input*/}
            {/*              type="file"*/}
            {/*              name="images"*/}
            {/*              id="images"*/}
            {/*              style={{display: "none"}}*/}
            {/*              onBlur={formik.handleBlur}*/}
            {/*              onChange={handleFileChange}*/}
            {/*              multiple={true}*/}
            {/*          />*/}
            {/*          {formik.errors.images && formik.touched.images && (*/}
            {/*              <span className="text-danger">*/}
            {/*          {formik.errors.images}*/}
            {/*</span>*/}
            {/*          )}*/}
            {/*      </FormGroup>*/}
            {/*      <FormGroup>*/}
            {/*          <FormLabel>Price</FormLabel>*/}
            {/*          <Input*/}
            {/*              type="text"*/}
            {/*              name="price"*/}
            {/*              placeholder="Price"*/}
            {/*              value={formik.values.price}*/}
            {/*              onBlur={formik.handleBlur}*/}
            {/*              onChange={formik.handleChange}*/}
            {/*          />*/}
            {/*          {formik.errors.price && formik.touched.price && (*/}
            {/*              <span className="text-danger">{formik.errors.price}</span>*/}
            {/*          )}*/}
            {/*      </FormGroup>*/}

            {/*      <FormGroup>*/}
            {/*          <FormLabel>Quantity</FormLabel>*/}
            {/*          <Input*/}
            {/*              type="text"*/}
            {/*              name="quantity"*/}
            {/*              placeholder="quantity"*/}
            {/*              value={formik.values.quantity}*/}
            {/*              onBlur={formik.handleBlur}*/}
            {/*              onChange={formik.handleChange}*/}
            {/*          />*/}
            {/*          {formik.errors.quantity && formik.touched.quantity && (*/}
            {/*              <span className="text-danger">*/}
            {/*                  {formik.errors.quantity}*/}
            {/*             </span>*/}
            {/*          )}*/}
            {/*      </FormGroup>*/}
            {/*      <div className="col-lg-12 mt-3">*/}
            {/*          <div className="form-group">*/}
            {/*              <button className="btn btn-success" type="submit">*/}
            {/*                  Save*/}
            {/*              </button>*/}
            {/*              <Link to="/admin/products" className="btn btn-danger">*/}
            {/*                  Back*/}
            {/*              </Link>*/}
            {/*          </div>*/}
            {/*      </div>*/}
            {/*  </form>*/}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddProduct;
