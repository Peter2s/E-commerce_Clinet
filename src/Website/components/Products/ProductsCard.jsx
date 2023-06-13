import { Card, CardBody, CardImg, CardText, CardTitle, Col } from "reactstrap";
import { Link } from "react-router-dom";

export const ProductsCard = ({ item }) => {
  return (
    <>
      <Col xs="6" sm="6" md="4" lg="3" className="d-flex">
        <Card
          className="my-2"
          style={{
            width: "100%",
            height: "345px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
          }}
        >
          <Link to={`/products/${item._id}`} style={{ textDecoration: "none" }}>
            <CardImg
              style={{ height: "228px", width: "100%" }}
              src={item.image}
            />
          </Link>
          <div className="d-flex justify-content-end mx-2"></div>
          <CardBody>
            <CardTitle>
              <div className="card-title">{item.name_ar}</div>
            </CardTitle>
            <CardText>
              <div className="d-flex justify-content-between ">
                <div className="d-flex">
                  <div className="card-price">{item.price}</div>
                  <div className="card-currency mx-1">جنيه</div>
                </div>
              </div>
            </CardText>
          </CardBody>
        </Card>
        {/*<ToastContainer />*/}
      </Col>
    </>
  );
};
