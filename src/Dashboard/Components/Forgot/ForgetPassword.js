import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import React, { useState } from "react";
import Btn from "Dashboard/SharedUI/Btn/Btn";
import { axiosInstance } from "Axios.js";
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgetPssword = () => {
  const [email, setEmail] = useState("");

  const ResetPassword_URL = "admin/reset-password-token";
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("invalid email format ")
        .required("email required"),
    }),
    onSubmit: function (values) {
      const { email } = values;
      axiosInstance
        .post(ResetPassword_URL, { email })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  });

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small>Forget Password</small>
          </div>
          <Form role="form" onSubmit={formik.handleSubmit}>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email"
                  type="email"
                  id="email"
                  autoComplete="off"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </InputGroup>
              {formik.errors.email && formik.touched.email && (
                <span className="text-danger">{formik.errors.email}</span>
              )}
            </FormGroup>
            <div className="text-center">
              <div className="text-center">
                <Btn
                  className="btn btn-info"
                  title="Reset Password"
                  type="submit"
                />
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ForgetPssword;
