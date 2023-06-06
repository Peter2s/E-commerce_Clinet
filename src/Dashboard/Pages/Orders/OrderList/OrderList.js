import Tables from '../../../SharedUI/Table/Tables';
import Btn from 'Dashboard/SharedUI/Btn/Btn';
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { Input } from 'reactstrap';
import Swal from 'sweetalert2';


const Orders = () => {
  const [orderdata, orderdatachange] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:5000/order/")
    .then((res) => {
        orderdatachange(res.data);
    }).catch((err) => {
        console.log(err.message);
    })
}, [])
const handleDelete = async (id) => {
  try {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      const response = await axios.delete(`http://localhost:5000/order/${id}`);
      orderdatachange((prevOrder) =>prevOrder.filter((order) => order.id !== id));
      console.log(response.data);
      Swal.fire('Deleted!', 'The Order has been deleted.', 'success');
    }
  } catch (error) {
    console.log(error);
  }
};
const updateOrderStatus = (orderId, newStatus) => {
  // Update request status in the API
  axios
    .patch(`http://localhost:5000/order/${orderId}`, { status: newStatus })
    .then(() => {
      // Update the requests state with the updated status
      const updatedOrders = Orders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      });
      orderdatachange(updatedOrders);
    })
    .catch((error) => {
      console.error("Error updating order status:", error);
    });
};

const handleStatusChange = (orderId, event) => {
  const newStatus = event.target.value;
  updateOrderStatus(orderId, newStatus);
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
            
            const tableContent = {orderdata.map((order, index) => (
              <tr key={order.id}>
                <td >{order.id}</td>
                <td>{new Date(order.status_history[order.status_history.length - 1].date).toLocaleDateString()}</td>
                <td>{order.products.reduce((acc, product) => acc + product.quantity, 0)}</td>
                <td>{order.total_price}</td>
                <td>{order.products.map((product) => product.name).join(", ")}</td>
                {/* <td>{order.status_history[order.status_history.length - 1].status}</td> */}
                <td>
                <Input
  type="select"
  value={order.status}
  onChange={(event) => handleStatusChange(order.id, event)}
  className="status-select"
  style={{ backgroundColor: 'l', color: 'black', borderRadius: '5px', padding: '5px' }}
>
  <option value="pending">Pending</option>
  <option value="processing">Processing</option>
  <option value="completed">Completed</option>
  <option value="cancelled">Cancelled</option>
</Input>
        </td>
      
                <td>
                    <Btn  name="btn-danger btn fa fa-trash"  onClick={() => handleDelete(order.id)}/>  
                    <Link to={`/admin/OrderDetails/${order.id}`}>
                        <Btn name="btn-primary btn fa fa-circle-info" />
                    </Link>
                </td>
              </tr>
            ))}
          
             
            />
        </>
    )
}

export default Orders;