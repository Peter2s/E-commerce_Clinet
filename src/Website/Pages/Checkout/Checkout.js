import React, { useState, useEffect } from "react";
import { axiosInstance } from "Axios.js";
import Swal from "sweetalert2";
import { Container, Row, Card, CardBody, Col } from "reactstrap";


const Checkout = () => {
  
        const [cartData, setCartData] = useState([]);
        const [userData, setUserData] = useState({});
        const [addressData, setAddressData] = useState({});
        const [totalPrice, setTotalPrice] = useState(0);
        // Other necessary state variables
        // ...

       
        useEffect(() => {
            const fetchCartData = async () => {
              try {
                const response = await axiosInstance.get("/profile/cart");
                setCartData(response.data.data);
                calculateTotalPrice(response.data.data);
              } catch (error) {
                console.log(error.message);
                // Handle error
              }
            };
          
            const fetchUserData = async () => {
              try {
                const response = await axiosInstance.get("/profile");
                setUserData(response.data.data);
                setAddressData(response.data.data.address[0]);
              } catch (error) {
                console.log(error.message);
                // Handle error
              }
            };
          
            fetchCartData();
            fetchUserData();
            
          }, []);
          const calculateTotalPrice = (cartData) => {
            let total = 0;
            cartData.forEach((item) => {
              total += item.quantity * item.product_id.price;
            });
            setTotalPrice(total);
          };
          const handlePlaceOrder = async () => {
            try {
              
                const orderData = {
                    address_id:addressData._id,
                    
                  };
              await axiosInstance.post("/orders", orderData);
              console.log(orderData);
              Swal.fire("Order Placed!", "Your order has been placed successfully.", "success");
              // Redirect to the orders page
              
            } catch (error) {
              console.log(error.message);
              Swal.fire("Error", "An error occurred. Please try again.", "error");
            }
          };
        
    return (
        <Container fluid className="mt-4">
        <Row>
          <Card className="container shadow text-right p-2">
            <h1 className="mr-3 mb-3">اتمام الشراء</h1>
            <div>
    {/* Render the cart items */}
    {cartData.map((item, index) => (
      <div key={index}>
        <h4>{item.product_id.name_ar}</h4>
        <p>الكمية: {item.quantity}</p>
        <p>السعر: {item.product_id.price}</p>
        
      </div>
    ))}
    {/* Render the user's address */}
    <h4>عنوان التوصيل</h4>
    <p>المنطقة: {addressData.area}</p>
    <p>المدينة: {addressData.city}</p>
    <p>المحافظة: {addressData.governorate}</p>
    <p>الدولة: {addressData.country}</p>
    {/* Render the total price */}
    <h4>الاجمالى: {totalPrice}</h4>
    {/* Render the place order button */}
    <button onClick={handlePlaceOrder}>اتمام الشراء</button>
  </div>

            </Card>
            </Row>
            </Container>
       
    )
}

export default Checkout;