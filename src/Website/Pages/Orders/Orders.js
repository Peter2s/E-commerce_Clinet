import React, { useEffect, useState } from "react";
import { Container, Row, Card, CardBody, Col } from "reactstrap";
import { axiosInstance } from "Axios.js";
import "../Orders/Orders.css";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orderdata, setOrderData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/api/v1/orders")
      .then((res) => {
        setOrderData(res.data.data);
        fetchProductData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const fetchProductData = async (orders) => {
    const productIds = orders.flatMap((order) => order.products.map((product) => product.product_id));
    const productResponse = await axiosInstance.get("/api/v1/products");
    const productDataWithImage = productResponse.data.data.map((product) => {
      if (productIds.includes(product._id)) {
        const productImage = product.images[0] || "";
        return { ...product, image: productImage };
      }
      return product;
    });
    setProductData(productDataWithImage);
  };

  const getProductImageById = (productId) => {
    const product = productData.find((product) => product._id === productId);
    return product ? product.image : "";
  };
  const getProductNameById = (productId) => {
    const product = productData.find((product) => product.id === productId);
    return product ? product.name_ar : "" ;
  };
  const getProductDescById = (productId) => {
    const product = productData.find((product) => product.id === productId);
    return product ? product.desc_ar : "" ;
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-success";
      case "Cancelled":
        return "text-danger";
      case "Pending":
        return "text-primary";
      case "Processing":
        return "text-warning";
      default:
        return "";
    }
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Card className="container shadow text-right p-2">
          <h1 className="mr-3 mb-3">طلباتى</h1>
          {orderdata.map((order) => (
            <Card key={order._id} className="m-2 shadow">
              <CardBody className="hover-border-primary"> {/* Added className for CSS */}
              {order.products.map((product) => (
                <Row key={product.product_id}>
                    <Col>
                        <h3>{order._id}</h3>
                        <p>
                        <i className="fa fa-hourglass-end ml-2"></i>تم الطلب يوم{" "}
                        {new Date(order.createdAt).toLocaleDateString("ar", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                        </p>
                        <h3 className={getStatusColor(order.status)}>{order.status}</h3>
                    </Col>
                    <Col xs="3" className="separator" />
                       
                    <Col xs="3" >
                        <img
                        src={getProductImageById(product.product_id)}
                        alt="Product"
                        style={{ width: "70%", height: "80%" }}
                        />
                    </Col>
                    <Col>
                        <p>{getProductNameById(product.product_id)}</p>
                        <p>{getProductDescById(product.product_id)}</p>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                    <Link to={`/orders/OrderDetail/${order._id}`}>
                        <i className="fa fa-chevron-left mr-5"></i>
                    </Link>
                    </Col>
                    
                </Row>
                ))}
              </CardBody>
            </Card>
          ))}
        </Card>
      </Row>
    </Container>
  );
};

export default Orders;
