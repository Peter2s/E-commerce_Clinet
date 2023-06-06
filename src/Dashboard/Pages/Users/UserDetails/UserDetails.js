import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  Button,
  Col,
  Row,
  Navbar,
} from "reactstrap";
// core components

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../../../Assets/css/project.css";
import { axiosInstance } from "../../../../Axios";

const UserDetail = () => {
  const { id } = useParams();
  const [userdata, setUserData] = useState({});
  useEffect(() => {
    fetchContactUsData();
  }, [id]);

  const fetchContactUsData = async () => {
    await axiosInstance
      .get(`/api/v1/users/${id}`)
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row>
                    <Col>
                      <div className="card-profile-image">
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("../../../Assets/img/theme/team-4-800x800.jpg")}
                        />
                      </div>
                    </Col>
                    <Col>
                      <h3 className="mb-0">Customer Details</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Link
                        className="btn btn-primary"
                        to="/admin/users"
                        color="primary"
                        href="#pablo"
                        size="sm"
                      >
                        Back
                      </Link>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="mt-5">
                  <div>
                    <h6 className="heading-small text-muted mb-4">
                      Customer information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <div>
                            <label>Name</label>
                            <div className="custom-input">{userdata.name}</div>
                          </div>
                        </Col>
                        <Col lg="6">
                          <div>
                            <label>Email</label>
                            <div className="custom-input">{userdata.email}</div>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <div>
                            <label>Phone</label>
                            <div className="custom-input">{userdata.phone}</div>
                          </div>
                        </Col>
                        <Col lg="6"></Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">Addresses</h6>
                    <div className="pl-lg-4">
                      {userdata.address &&
                        userdata.address.map((address, address_index) => (
                          <Row key={address_index}>
                            <Col md="12">
                              <div className="form-group">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Address {address_index + 1}
                                </label>
                                <div className="custom-input">
                                  {address.area}, {address.city},{" "}
                                  {address.governorate}, {address.country}
                                </div>
                              </div>
                            </Col>
                          </Row>
                        ))}
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">Cart</h6>
                    <div className="pl-lg-4">
                      {userdata.cart &&
                        userdata.cart.map((cart, cart_index) => (
                          <Row key={cart_index}>
                            <Col md="12">
                              <div className="form-group">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Product {cart_index + 1}
                                </label>
                                <div className="custom-input">
                                  Product Id : {cart.product_id}
                                </div>
                                <div className="custom-input">
                                  Quantity : {cart.quantity}
                                </div>
                              </div>
                            </Col>
                          </Row>
                        ))}
                    </div>

                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">
                      About Customer
                    </h6>
                    <div className="pl-lg-4">
                      <div>
                        <label>Bio</label>
                        <div className="custom-input">{userdata.bio}</div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default UserDetail;
