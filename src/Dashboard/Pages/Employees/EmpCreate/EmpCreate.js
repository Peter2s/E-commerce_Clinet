import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, Container, Row, Col, CardBody , FormGroup } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import MySwal from 'sweetalert2';
import Btn from "Dashboard/SharedUI/Btn/Btn";
import Input from "Dashboard/SharedUI/Input/Input";
const EmpCreate = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role:""
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
     
    }),
    onSubmit: (values) => {
        const empData = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
          role:values.role
        };
  
        axios
          .post("http://localhost:8000/employee", empData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            MySwal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your changes have been saved successfully.',
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
            <CardHeader>Create Employee</CardHeader>
            <CardBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                      {formik.errors.name && formik.touched.name && (
                        <span className="text-danger">{formik.errors.name}</span>
                      )}
                    </div>
                  </Col>
                  <Col>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        name="email"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                      {formik.errors.email && formik.touched.email && (
                        <span className="text-danger">{formik.errors.email}</span>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                      {formik.errors.phone && formik.touched.phone && (
                        <span className="text-danger">{formik.errors.phone}</span>
                      )}
                    </div>
                  </Col>
                  <Col>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                      {formik.errors.password && formik.touched.password && (
                        <span className="text-danger">{formik.errors.password}</span>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                    <Col>
                    <FormGroup>
                      <label htmlFor="role">Role</label>
                      <select
                        name="role"
                        id="role"
                        value={formik.values.role}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control"
                      >
                        <option value="">Select Role</option>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                      </select>
                      {formik.errors.role && formik.touched.role && (
                        <span className="text-danger">{formik.errors.role}</span>
                      )}
                    </FormGroup>
                    </Col>
                </Row>
               
                <div className="form-group">
                  <button type="submit" className="btn btn-primary mr-2">
                    Create
                  </button>
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

export default EmpCreate;
