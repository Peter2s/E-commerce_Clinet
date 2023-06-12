import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Container, Col, Row, Navbar } from "reactstrap";
import { useParams } from "react-router-dom";

import "../OrderDetails/OrderDetails";
import Btn from "Dashboard/SharedUI/Btn/Btn";
import { axiosInstance } from '../../../../Axios';

const OrderDetail = () => {
  const { id } = useParams();
  const [orderdata, setOrderData] = useState({});
  const [productData, setProductData] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState(orderdata.payment_status);

  const handleUpdatePaymentStatus =  () => {
    try {
      // Make an API call to update the payment status
      axiosInstance.patch(`/api/v1/orders/${orderdata.id}`, { payment_status: 'Completed' });
      setPaymentStatus('Completed');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    axiosInstance
      .get(`/api/v1/orders/${id}`)
      .then((res) => {
        console.log(res.data);
        setOrderData(res.data.data);
        fetchProductData(res.data.data.products);
        const updatedOrderData = res.data.data;
        setPaymentStatus(updatedOrderData.payment_status);
        
      })
      .catch((err) => {
        console.log(err.message);
      });

  }, [id]);

  const fetchProductData = async (products) => {
    const productId = products.map((product) => product.id);
    const productResponse = await axiosInstance.get("/api/v1/products");
    console.log(productResponse.data); // Add this line to check the structure of the response
    const productDataWithImage = productResponse.data.data.map((product) => {
      if (productId.includes(product.id)) {
        const productImage = product.images[0] || "";
        return { ...product, image: productImage };
      }
      return product;
    });
    setProductData(productDataWithImage);
  };
  
  const getProductImageById = (productId) => {
    const product = productData.find((product) => product.id === productId);
    return product ? product.image : "";
  };

  const getProductNameById = (productId) => {
    const product = productData.find((product) => product.id === productId);
    return product ? product.name_en : "";
  };

  


 

  return (
    <>
      <Navbar />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            {orderdata && (
              <Card className="shadow">
                <CardHeader className="border-0 ">
                  <h1 className="mb-0">Order Details</h1>
                  <div className="d-flex justify-content-around">
                    <h3>
                      Order ID: <b>{orderdata._id}</b>
                    </h3>
                    <h3>
                      User ID: <b>{orderdata.user}</b>
                    </h3>
                  </div>
                </CardHeader>
                <div className="container">
                  <CardBody className="border-0 shadow">
                    <div>
                      <h2>Order Products</h2>
                      {orderdata.products?.map((product) => (
                        <div key={product.product_id}>
                          <Row>
                            <Col xs="3">
                              <img src={getProductImageById(product.product_id)} alt="Product" style={{ width: "100%", height: "100%" }} />
                            </Col>
                            <Col xs="9">
                              <h5>Product ID: {product.product_id}</h5>
                              <h5>Product Name: {getProductNameById(product.product_id)}</h5>
                              <h5>Quantity: {product.quantity}</h5>
                              <h5>Price: {product.price.toFixed(2)}$</h5>
                              <h5>Total: {(product.quantity * product.price).toFixed(2)}$</h5>
                            </Col>
                          </Row>
                          <hr />
                        </div>
                      ))}
                    </div>

                    <div style={{ textAlign: "left" }}>
                      {orderdata && (
                        <>
                          <Card>
                            <CardHeader>
                              <i className="fa fa-sack-dollar mr-3 text-warning"></i> Payment Details:
                            </CardHeader>
                            <CardBody>
                              <Row>
                                <Col>
                                  <h4>
                                    Total Price: <b>{orderdata.total_price}$</b>
                                  </h4>
                                  <h4>
                                    Payment Method: <b>{orderdata.payment_method}</b>
                                  </h4>
                                </Col>
                                <Col>
                                  <h4>
                                    Payment Id: <b>{orderdata.payment_id}</b>
                                  </h4>
                                  <h4>Payment Status :  {paymentStatus === 'Pending' ? (
                                    <button
                                      className="btn btn-warning"
                                      disabled={paymentStatus === 'Completed'}
                                      onClick={handleUpdatePaymentStatus}
                                    >
                                      {paymentStatus}
                                    </button>
                                  ) : (
                                    <button className="btn btn-success" disabled>
                                      {paymentStatus}
                                    </button>
                                  )}</h4>
                                 
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                          <Card className="mt-3">
                            <CardHeader>
                              <i className=" fa fa-truck  mr-3 text-danger"></i> Delivery Address:
                            </CardHeader>
                            <CardBody>
                              <Row>
                                <Col>
                                  {orderdata.address ? (
                                    <>
                                      <h4>
                                        {orderdata.address.area}
                                        {orderdata.address.city},{" "}
                                        {orderdata.address.governate} {orderdata.address.country}
                                      </h4>
                                    </>
                                  ) : (
                                    <p>No address found</p>
                                  )}
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                          <Card className="mt-3">
                            <CardHeader>
                              <i className=" fa fa-list-check  mr-3 text-danger"></i> Order Status:
                            </CardHeader>
                            <CardBody>
                              <Row>
                                <Col>
                                 
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        </>
                      )}
                    </div>
                  </CardBody>
                </div>
                
              </Card>
            )}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default OrderDetail;
