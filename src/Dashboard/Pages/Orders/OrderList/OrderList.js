import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { Input } from 'reactstrap';
import Tables from '../../../SharedUI/Table/Tables';
import Btn from 'Dashboard/SharedUI/Btn/Btn';
import { axiosInstance } from '../../../../Axios';

const Orders = () => {
  const [orderdata, setOrderData] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/v1/orders")
      .then((res) => {
        setOrderData(res.data.data);
      }).catch((err) => {
        console.log(err.message);
      });
      axiosInstance.get("/api/v1/products") // Fetch products data
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleCancelOrder = async (id , status) => {
    try {
  
      if (status === 'Processing' || status === 'Completed' || status === 'Cancelled') {
        return; // Disable cancel button if order status is processing or completed
      }
  
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to cancel this order!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, keep it',
      });
  
      if (result.isConfirmed) {
        await axiosInstance.patch(`/api/v1/orders/${id}`, { status: 'Cancelled' });
        setOrderData((prevOrders) =>
          prevOrders.map((order) => {
            if (order._id === id) {
              return { ...order, status: 'Cancelled' };
            }
            return order;
          })
        );
        Swal.fire('Cancelled!', 'The order has been cancelled.', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const confirmOrder = async (id, status) => {
    try {
      if (status === 'Cancelled' || status === 'Processing' ) {
        return; // Disable the button if the order is already cancelled
      }
  
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to update the order status!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, keep it'
      });
  
      if (result.isConfirmed) {
        await axiosInstance.patch(`/api/v1/orders/${id}`, { status: 'Processing' });
        setOrderData((prevOrders) =>
          prevOrders.map((order) => {
            if (order._id === id) {
              return { ...order, status: 'Processing' };
            }
            return order;
          })
        );
        Swal.fire('Updated!', 'The order status has been updated to processing.', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateOrderStatus = (id, newStatus) => {
    // Update request status in the API
    axiosInstance.patch(`/api/v1/orders/${id}`, { status: newStatus })
      .then(() => {
        // Update the requests state with the updated status
        const updatedOrders = orderdata.map((order) => {
          if (order._id === id) {
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

  const handleStatusChange = (id, event) => {
    const newStatus = event.target.value;
    updateOrderStatus(id, newStatus);
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
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td></td>
              <td></td>
              <td></td>
              {/* <td>{order.status_history.length > 0 && (
  <p>
    Last Updated: {new Date(order.status_history[order.status_history.length - 1].date).toLocaleDateString()}
  </p>
)}</td> */}
              {/* <td>{order.products.reduce((acc, product) => acc + product.quantity, 0)}</td>
              <td>{order.total_price}</td>
              
                
                <td>{getProductNames(order)}</td> */}
            
              <td>{order.status}</td>
              <td>
              <Btn
                className="btn-danger btn fa fa-ban"
                onClick={() => handleCancelOrder(order._id ,order.status)}
                disabled={order.status === 'Processing' || order.status === 'Completed'}
              />
              <Btn 
                onClick={() => confirmOrder(order._id, order.status)}
                disabled={order.status === 'Cancelled' || order.status === 'Completed'}
                className="btn-success btn fa fa-circle-check"
              />
  
              <Link to={`/admin/OrderDetails/${order._id}`}>
                <Btn className="btn-primary btn fa fa-circle-info" />
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
