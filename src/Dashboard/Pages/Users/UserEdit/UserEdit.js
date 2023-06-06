import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, Container, Row, Col, CardBody ,Button, FormGroup} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import MySwal from "sweetalert2";
import Btn from "Dashboard/SharedUI/Btn/Btn";
import Input from "Dashboard/SharedUI/Input/Input";

const UserEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch the user data based on the ID and populate the form fields
    axios
      .get(`http://localhost:8000/user/${id}`)
      .then((res) => {
        const userData = res.data;
        formik.setValues(userData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      image: "",
      bio: "",
      country: "",
      city: "",
      governate: "",
      area: "",
      active: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().matches(/^[a-zA-Z\s]*$/, "Invalid name format").required("Enter the name"),
      email: Yup.string().email("Invalid email address").required("Enter the email"),
      phone: Yup.string().matches(/^[0-9]{10}$/, "Invalid phone number").required("Enter the phone number"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be less than 20 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Invalid password format")
        .required("Enter the password"),
      image: Yup.mixed()
        .test("fileFormat", "Unsupported file format", (value) => {
          if (value) {
            const supportedFormats = ["image/png", "image/jpg", "image/jpeg"];
            return supportedFormats.includes(value.type);
          }
          return true; // Allow empty field
        }),
      bio: Yup.string().required("Enter the bio"),
      country: Yup.string().required("Enter the country"),
      city: Yup.string().required("Enter the city"),
      governate: Yup.string().required("Enter the governate"),
      area: Yup.string().required("Enter the area"),
    }),
    onSubmit: (values) => {
      const userData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        image: values.image,
        bio: values.bio,
        country: values.country,
        city: values.city,
        governate: values.governate,
        area: values.area,
        active: values.active,
      };

      axios
        .put(`http://localhost:8000/user/${id}`, userData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          MySwal.fire({
            icon: "success",
            title: "Success!",
            text: "Your changes have been saved successfully.",
          });
          navigate("/admin/users");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  });

  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col>
          <Card>
            <CardHeader>Edit User</CardHeader>
            <CardBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col>
                  
                        <FormGroup>
                      <label>Name</label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        className="form-control form-control-alternative"
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.errors.name && formik.touched.name}
                      />
                      {formik.errors.name && formik.touched.name && (
                        <span className="text-danger">{formik.errors.name}</span>
                      )}
                      </FormGroup>
                   
                  </Col>
                  <Col>
                    <FormGroup>
                      <label>Email</label>
                      <input
                      className="form-control form-control-alternative"
                        type="text"
                        name="email"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.errors.email && formik.touched.email}
                      />
                      {formik.errors.email && formik.touched.email && (
                        <span className="text-danger">{formik.errors.email}</span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Phone</label>
                      <input
                        className="form-control form-control-alternative"
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.errors.phone && formik.touched.phone}
                      />
                      {formik.errors.phone && formik.touched.phone && (
                        <span className="text-danger">{formik.errors.phone}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <label>Password</label>
                      <input
                       className="form-control form-control-alternative"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.errors.password && formik.touched.password}
                      />
                      {formik.errors.password && formik.touched.password && (
                        <span className="text-danger">{formik.errors.password}</span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Image</label>
                      <input
                        type="file"
                        name="image"
                        onChange={(event) => {
                          formik.setFieldValue("image", event.currentTarget.files[0]);
                        }}
                        className="form-control form-control-alternative"
                      />
                      {formik.errors.image && formik.touched.image && (
                        <span className="text-danger">{formik.errors.image}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <label>Bio</label>
                      <textarea
                        name="bio"
                        value={formik.values.bio}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control form-control-alternative"
                      ></textarea>
                      {formik.errors.bio && formik.touched.bio && (
                        <span className="text-danger">{formik.errors.bio}</span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Country</label>
                      <input
                        className="form-control form-control-alternative"
                        type="text"
                        name="country"
                        value={formik.values.country}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.errors.country && formik.touched.country}
                      />
                      {formik.errors.country && formik.touched.country && (
                        <span className="text-danger">{formik.errors.country}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <label>City</label>
                      <input
                        className="form-control form-control-alternative"
                        type="text"
                        name="city"
                        value={formik.values.city}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.errors.city && formik.touched.city}
                      />
                      {formik.errors.city && formik.touched.city && (
                        <span className="text-danger">{formik.errors.city}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <label>Governate</label>
                      <input
                        className="form-control form-control-alternative"
                        type="text"
                        name="governate"
                        value={formik.values.governate}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.errors.governate && formik.touched.governate}
                      />
                      {formik.errors.governate && formik.touched.governate && (
                        <span className="text-danger">{formik.errors.governate}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <label>Area</label>
                      <input
                        className="form-control form-control-alternative"
                        type="text"
                        name="area"
                        value={formik.values.area}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.errors.area && formik.touched.area}
                      />
                      {formik.errors.area && formik.touched.area && (
                        <span className="text-danger">{formik.errors.area}</span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <label>Active</label>
                  <input
                    type="checkbox"
                    name="active"
                    checked={formik.values.active}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="form-control"
                  />
                </FormGroup>
                <div className="form-group">
                  <Button type="submit" className="btn-primary mr-2">
                    Save Changes
                  </Button>
                  <Link to="/admin/users" className="btn btn-secondary">
                    Cancel
                  </Link>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserEdit;
