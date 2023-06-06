import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Container,
    Col,
    Row,
    Navbar,
  } from "reactstrap";
  // core components
import Tables from '../../../SharedUI/Table/Tables';
import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";


const OrderDetail = () => {
    const {id} = useParams();

    const [orderdata, setOrderData] = useState({});

    useEffect(() => {
        axios
          .get(`http://localhost:5000/order/${id}`)
          .then((res) => {
            setOrderData(res.data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, [id]);

    return (
      <>
        <Navbar />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h1 className="mb-0">Order Details</h1> 
                  <div>
                        <h3>Order ID: <b>{orderdata.id}</b></h3>
                        <h3>User ID: <b>{orderdata.user_id}</b></h3>
                        {/* <h3>Placed On:<b>{new Date(orderdata.status_history[0].date).toLocaleDateString()}</b></h3> */}

                  </div>
                </CardHeader>
                
               

               {orderdata &&
                
                       <Tables className="m-5" title="Order Products" 
            
            trContent={
              <>
                <th scope="col">Product Id</th>
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
                <th scope="col"> Price</th>
                <th scope="col"> Total</th>
              </>
            }
            
            const tableContent = {orderdata.products?.map(product => (
                <>
                <tr key={product.product_id}>
                  <td>{product.product_id}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price.toFixed(2)}$</td>
                  <td>{(product.quantity * product.price).toFixed(2)}$</td>
              </tr>
               
               </>
            ))}
             
            />
                  
               }
          
           <CardBody className="border-0">
                <div>
           
           <div className="container">
               
           <div className="card row" style={{ "textAlign": "left" }}>
               

               {orderdata &&
                   <Card>
                   <CardHeader>Order Details</CardHeader>
                   <CardBody>
                     <Row>
                       <Col>
                         <h2>Total Price: <b>{orderdata.total_price}$</b></h2>
                         <h2>Payment Method: <b>{orderdata.payment_method}</b></h2>
                       </Col>
                       <Col>
                         <h2>Payment Id: <b>{orderdata.payment_id}</b></h2>
                         <h2>Payment Status: <b>{orderdata.payment_status}</b></h2>
                       </Col>
                     </Row>
                     <Row>
      <Col>
        <h2>Delivery Address:</h2>
        {orderdata.address ? (
          <>
            <p>{orderdata.address.area}و
            {orderdata.address.city}, {orderdata.address.governate} {orderdata.address.country}</p>
          </>
        ) : (
          <p>No address found</p>
        )}
      </Col>
    </Row>
                   </CardBody>
                 </Card>
               }
           </div>
           </div>
           </div>
                </CardBody>
              
           
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  };
  
export default OrderDetail;