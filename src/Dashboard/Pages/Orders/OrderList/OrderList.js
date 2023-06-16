import React, {useEffect, useState} from "react";
import Swal from 'sweetalert2';
import {Link} from "react-router-dom";
import Tables from '../../../SharedUI/Table/Tables';
import Btn from 'Dashboard/SharedUI/Btn/Btn';
import {axiosInstance} from '../../../../Axios';
import PaginationAdmin from "../../../SharedUI/PaginationAdmin/PaginationAdmin";

const Orders = () => {
    const [orderdata, setOrderData] = useState([]);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({
        currentPage: null,
        totalPages: null,
        limit: null,
    });

    const fetchOrders = async (page = 1) => {
        axiosInstance.get("/api/v1/orders?page=" + page) // Fetch orders data
            .then((res) => {
                setOrderData(res.data.data);
                setTotal(res.data.pagination.total);
                setPagination({
                    currentPage: res.data.pagination.current_page,
                    totalPages: res.data.pagination.total_pages,
                    limit: res.data.pagination.limit,
                });
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
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCancelOrder = async (id, status) => {
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
                const res = await axiosInstance.patch(`/api/v1/orders/${id}/cancel`);
                setOrderData((prevOrders) =>
                    prevOrders.map((order) => {
                        if (order._id === id) {
                            return {...order, status: res.data.data.status, payment_status: res.data.data.payment_status};
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
            if (status === 'Cancelled' || status === 'Processing') {
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
                const res = await axiosInstance.patch(`/api/v1/orders/${id}/confirm`);
                setOrderData((prevOrders) =>
                    prevOrders.map((order) => {
                        if (order._id === id) {
                            return {...order, status: res.data.data.status, payment_status: res.data.data.payment_status};
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
        axiosInstance.patch(`/api/v1/orders/${id}`, {status: newStatus})
            .then(() => {
                // Update the requests state with the updated status
                const updatedOrders = orderdata.map((order) => {
                    if (order._id === id) {
                        return {...order, status: newStatus};
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

    const handlePageChange = (page) => {
        fetchOrders(page);
    }


    return (
        <>
            <Tables title={`Orders (${total})`}
                    trContent={
                        <>
                            <th scope="col">#</th>
                            <th scope="col">Order Id</th>
                            <th scope="col">Date</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total Price ($)</th>
                            {/*<th scope="col">Products</th>*/}
                            <th scope="col">Status</th>
                            <th scope="col">Payment Status</th>
                            <th scope="col">Actions</th>
                        </>
                    }
                    tableContent={
                        orderdata.map((order, index) => (
                            <tr key={order._id}>
                                <td>{(index + 1) + (pagination.currentPage - 1) * pagination.limit}</td>
                                <td>{order._id}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>{order.products?.length}</td>
                                <td>{order.total_price}</td>
                                {/*<td></td>*/}
                                {/* <td>{order.status_history.length > 0 && (
  <p>
    Last Updated: {new Date(order.status_history[order.status_history.length - 1].date).toLocaleDateString()}
  </p>
)}</td> */}
                                {/* <td>{order.products.reduce((acc, product) => acc + product.quantity, 0)}</td>
              <td>{order.total_price}</td>
              
                
                <td>{getProductNames(order)}</td> */}

                                <td>{order.status}</td>
                                <td>{order.payment_status}</td>
                                <td  >
                                    <Link to={`/admin/OrderDetails/${order._id}`}>
                                        <button title={"view order"} className="btn-primary btn fa fa-circle-info mr-2"/>
                                    </Link>
                                    <button
                                        title={"Confirm order"}
                                        onClick={() => confirmOrder(order._id, order.status)}
                                        style={{opacity: order.status !=="Pending" ? .5 : 1}}
                                        disabled={order.status !=="Pending"}
                                        className="btn-success btn fa fa-circle-check"
                                    />
                                    <button
                                        title={"Cancel order"}
                                        className={"btn-danger btn fa fa-ban"}
                                        style={{opacity: order.status !=="Pending" ? .5 : 1}}
                                        onClick={() => handleCancelOrder(order._id, order.status)}
                                        disabled={order.status !=="Pending"}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                    pagination={
                        <PaginationAdmin
                            currentPage={pagination.currentPage}
                            totalPages={pagination.totalPages}
                            onPageChange={handlePageChange}
                        />
                    }
            />
        </>
    );
};

export default Orders;
