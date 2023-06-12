import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {axiosInstance} from "../../../../Axios";
import "./AddCategory.css"
import {Card, CardHeader, Container, FormGroup, Input, Navbar, Row,} from "reactstrap";
import {FormLabel} from "react-bootstrap";
import {useFormik} from "formik";
import * as Yup from "yup";
import MySwal from "sweetalert2";

const AddCategory = () => {

    const navigate = useNavigate();
    const CategoryURL = "api/v1/categories"
    const formik = useFormik({
        initialValues: {
            name_en: "",
            name_ar: "",
            image: [],
        },
        validationSchema: Yup.object({
            name_en: Yup.string()
                .min(3, "category name must be at lest 3 character")
                .matches(/^[a-zA-Z\s]*$/, "Invalid name format")
                .required("category name required"),
            name_ar: Yup.string()
                .min(3, "category name must be at lest 3 character")
                .matches(/^[\u0600-\u06ff\s]+$/, "accepts arabic character only")
                .required("category name in arabic  required"),
            image: Yup.array().min(1, "Please select category image"),
        }),
        onSubmit: (values) => {
            const categoryData = new FormData();
            categoryData.append('name_en', values.name_en);
            categoryData.append('name_ar', values.name_ar);
            categoryData.append('image', values.image[0]);

            console.log(categoryData);
            axiosInstance
                .post(CategoryURL, categoryData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                })
                .then((res) => {
                    MySwal.fire({
                        icon: "success",
                        title: "success!",
                        text: "category created successfully",
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
    }

    return (
        <>
            <Navbar/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <div className=" btntitleproduct row col-12">
                                    <h3 className="col-6 mb-0">Add Category</h3>
                                </div>
                            </CardHeader>
                            <form className="container" onSubmit={formik.handleSubmit}>
                                <FormGroup>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        type="text"
                                        name="name_en"
                                        placeholder="name"
                                        value={formik.values.name_en}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.name_en && formik.touched.name_en && (
                                        <span className="text-danger">
                                     {formik.errors.name_en}
                                    </span>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>الاسم</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="الاسم"
                                        name="name_ar"
                                        value={formik.values.name_ar}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.name_ar && formik.touched.name_ar && (
                                        <span className="text-danger">
                                       {formik.errors.name_ar}
                                    </span>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel
                                        htmlFor="coverImage"
                                        className="btn btn-primary"
                                        style={{cursor: "pointer"}}
                                    >
                                        Category Image : Browse
                                    </FormLabel>
                                    <Input
                                        id="coverImage"
                                        type="file"
                                        name="image"
                                        className="form-control"
                                        style={{display: "none"}}
                                        onBlur={formik.handleBlur}
                                        onChange={handleImageFile}
                                    />
                                    {formik.errors.image && formik.touched.image && (
                                        <span className="text-danger">{formik.errors.image}</span>
                                    )}
                                </FormGroup>
                                <div className="col-lg-12 mt-3">
                                    <div className="form-group">
                                        <button className="btn btn-success" type="submit">
                                            Save
                                        </button>
                                        <Link to="/admin/categories" className="btn btn-danger">
                                            Back
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default AddCategory;
