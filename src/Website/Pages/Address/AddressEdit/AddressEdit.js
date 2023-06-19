import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SideBar from "Website/SharedUI/SideBar/SideBar";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { axiosInstance } from "../../../../Axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import addressIMG from '../../../../Website/Assests/travel.png';

const AddressEdit = () => {
  const { id } = useParams();

  const [oldValues, setOldValues] = useState({
    area: "",
    city: "",
    governorate: "",
    country: ""
  });

  useEffect(() => {
    const fetchOldValues = async () => {
      try {
        const response = await axiosInstance.get(`/profile/address/${id}`);
        const { area, city, governorate, country } = response.data.data;
        console.log(response.data.data);
        setOldValues({ area, city, governorate, country });
      } catch (error) {
        console.error("Failed to fetch old values:", error);
      }
    };
    fetchOldValues();
  }, [id]);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: oldValues,
    validationSchema: Yup.object({
      area: Yup.string().required("يجب إدخال المنطقة"),
      city: Yup.string().required("يجب إدخال المدينة"),
      governorate: Yup.string().required("يجب إدخال المحافظة"),
      country: Yup.string().required("يجب إدخال الدولة")
    }),
    onSubmit: async (values) => {
      const updatedValues = { ...oldValues, ...values };
      try {
        await axiosInstance.patch(`/profile/address/${id}`, updatedValues);
        navigate("/address");
      } catch (error) {
        console.error("Failed to update address:", error);
      }
    }
  });

  return (
    <Container fluid className="mt-4">
      <Row>
        <SideBar />
        <Col lg="8">
          <Card className="shadow pr-4">
            <CardHeader>
              <h2>
                <Link to="/address">
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
                تعديل العنوان
              </h2>
            </CardHeader>
            <CardBody>
              <Card>
                <CardBody className="row addressEditForm">
                  <form className="form col-6" onSubmit={formik.handleSubmit}>
                    <input
                      className="form-control w-75 mb-3"
                      placeholder="المنطقــة"
                      name="area"
                      value={formik.values.area} // Set value to old value
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.area && formik.errors.area && (
                      <div className="error-message">{formik.errors.area}</div>
                    )}
                    <input
                      className="form-control w-75 mb-3"
                      placeholder="المدينــة"
                      name="city"
                      value={formik.values.city} // Set value to old value
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.city && formik.errors.city && (
                      <div className="error-message">{formik.errors.city}</div>
                    )}
                    <input
                      className="form-control w-75 mb-3"
                      placeholder="المحافظــة"
                      name="governorate"
                      value={formik.values.governorate} // Set value to old value
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.governorate && formik.errors.governorate && (
                      <div className="error-message">{formik.errors.governorate}</div>
                    )}
                    <input
                      className="form-control w-75 mb-3"
                      placeholder="الدولــــة"
                      name="country"
                      value={formik.values.country} // Set value to old value
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.country && formik.errors.country && (
                      <div className="error-message">{formik.errors.country}</div>
                    )}
                    <input
                      type="submit"
                      className="btn btn-outline-warning"
                      value="حفــظ التعــديلات"
                    />
                  </form>
                  <div className="col-6">
                    <img src={addressIMG} alt="address" className="addressIMG" />
                  </div>
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddressEdit;