import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { Input } from 'reactstrap';
import Tables from '../../../SharedUI/Table/Tables';
import Btn from 'Dashboard/SharedUI/Btn/Btn';

const Orders = () => {
  const [orderdata, setOrderData] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/order/")
      .then((res) => {
        setOrderData(res.data);
      }).catch((err) => {
        console.log(err.message);
      });
    axios.get("http://localhost:5000/products/") // Fetch products data
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleCancelOrder = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to cancel this order!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, keep it'
      });
  
      if (result.isConfirmed) {
        await axios.patch(`http://localhost:5000/order/${id}`, { status: 'cancelled' });
        setOrderData((prevOrders) => prevOrders.map((order) => {
          if (order.id === id) {
            return { ...order, status: 'cancelled' };
          }
          return order;
        }));
        Swal.fire('Cancelled!', 'The order has been cancelled.', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateOrderStatus = (orderId, newStatus) => {
    // Update request status in the API
    axios.patch(`http://localhost:5000/order/${orderId}`, { status: newStatus })
      .then(() => {
        // Update the requests state with the updated status
        const updatedOrders = orderdata.map((order) => {
          if (order.id === orderId) {
            return { ...order, status: newStatus };
          }
          return order;
        });
        setOrderData(updatedOrders);
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  const handleStatusChange = (orderId, event) => {
    const newStatus = event.target.value;
    updateOrderStatus(orderId, newStatus);
  };

  const getProductNames = (order) => {
    return order.products.map((product) => {
      const matchingProduct = products.find((p) => p.id === product.product_id);
      return matchingProduct ? matchingProduct.name_en : "";
    }).join(",");
  };
  return (
    <>
      <Tables title="Orders Table"
        trContent={
          <>
            <th scope="col">Order Id</th>
            <th scope="col">Date</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total Price</th>
            <th scope="col">Products</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </>
        }
        tableContent={
          orderdata.map((order, index) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.status_history.length > 0 && (
  <p>
    Last Updated: {new Date(order.status_history[order.status_history.length - 1].date).toLocaleDateString()}
  </p>
)}</td>
              <td>{order.products.reduce((acc, product) => acc + product.quantity, 0)}</td>
              <td>{order.total_price}</td>
              
                
                <td>{getProductNames(order)}</td>
            
              <td>{order.status}</td>
              <td>
              <Btn  name="btn-danger btn fa fa-ban"  onClick={() => handleCancelOrder(order.id)}/>  
                    <Link to={`/admin/OrderDetails/${order.id}`}>
                        <Btn name="btn-primary btn fa fa-circle-info" />
                    </Link>
              </td>
            </tr>
          ))
        }
      />
    </>
  );
};

export default Orders;
