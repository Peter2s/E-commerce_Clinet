import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, Container, Row, Col, CardBody ,Button, FormGroup} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import MySwal from "sweetalert2";
import Btn from "Dashboard/SharedUI/Btn/Btn";
import Input from "Dashboard/SharedUI/Input/Input";
import { axiosInstance } from "../../../../Axios";

const EmpEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch the user data based on the ID and populate the form fields
    axiosInstance
      .get(`/api/v1/employees/${id}`)
      .then((res) => {
        const EmpData = res.data.data;
        formik.setValues(EmpData);
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
      // password: "",
      role: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().matches(/^[a-zA-Z\s]*$/, "Invalid name format").required("Enter the name"),
      email: Yup.string().email("Invalid email address").required("Enter the email"),
      phone: Yup.string().matches(/^[0-9]{11}$/, "Invalid phone number").required("Enter the phone number"),
      // password: Yup.string()
      //   .min(8, "Password must be at least 8 characters")
      //   .max(20, "Password must be less than 20 characters")
      //   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Invalid password format")
      //   .required("Enter the password"),
    }),
    onSubmit: (values) => {
      const empData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        // password: values.password,
        role:values.role,
      };

      axiosInstance
        .patch(`/api/v1/employees/${id}`, empData, {
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
          navigate("/admin/employees");
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
            <CardHeader>Edit Employee</CardHeader>
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
                    {/* <FormGroup>
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
                    </FormGroup> */}
                  </Col>
                </Row>
                <Row>
                <Col>
                    <FormGroup>
                      <label htmlFor="role">Role</label>
                      <input
                        type="text"
                        name="role"
                        id="role"
                        value={formik.values.role}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control form-control-alternative"
                      /> 
                      {formik.errors.role && formik.touched.role && (
                        <span className="text-danger">{formik.errors.role}</span>
                      )}
                    </FormGroup>
                    </Col>
                </Row>
                <div className="form-group">
                  <Button type="submit" className="btn-primary mr-2">
                    Save Changes
                  </Button>
                  <Link to="/admin/employees" className="btn btn-secondary">
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

export default EmpEdit;
