import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Tables from "../../../SharedUI/Table/Tables";
import {axiosInstance} from "Axios.js";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Btn from "../../../SharedUI/Btn/Btn";
import Swal from "sweetalert2";
import MySwal from "sweetalert2";

const Products = () => {
    const Product_URL = "api/v1/products";
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the items from the server
        axiosInstance
            .get(Product_URL)
            .then((response) => {
                console.log(response.data);
                setProduct(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDeleteProduct = (id, name) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want delete ${name} Product!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                callApiToDelete(id)
            }
        })
    };

    const callApiToDelete = (id) => {
        axiosInstance
            .delete(`${Product_URL}/${id}`)
            .then((response) => {
                // Update the component's state or perform any other necessary actions
                setProduct(product.filter((product) => product.id !== id));
                MySwal.fire({
                    icon: "success",
                    title: "success!",
                    text: "Product deleted successfully",
                });
            })
            .catch((error) => {
                console.log(error.message);
                MySwal.fire({
                    icon: "error",
                    title: "error!",
                    text: error.response.data.error,
                });
            });
    }

    const handleEditProduct = (id) => {
        navigate("/admin/edit-product");
    };

    return (
        <>
            <Tables
                btn={
                    <>
                        <Link to="/admin/addProducts" className="d-flex">
                            <Btn className="btn btn-primary ml-auto" title="Add Product"/>
                        </Link>
                    </>
                }
                title="Products"
                trContent={
                    <>
                        <th scope="col">Name</th>
                        <th scope="col">الاسم</th>
                        <th scope="col">Image</th>
                        <th scope="col">Category</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Actions</th>
                        <th scope="col"></th>
                    </>
                }
                tableContent={product.map((product) => (
                    <tr key={product._id}>
                        <td>{product.name_en}</td>
                        <td>{product.name_ar}</td>
                        <td style={{width: "200px"}}>
                            <img
                                className="img-thumbnail"
                                style={{minWidth: "200px", width: "50%"}}
                                src={product.image}
                                alt={product.name}
                            />
                        </td>
                        <td>{product.category_id.name_en}</td>
                        <td>{product.desc_en}</td>
                        <td>{product.price.$numberDecimal}</td>
                        <td>{product.quantity}</td>
                        <td>
                            <div>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleEditProduct(product._id)}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare}/>
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteProduct(product._id, product.name_en)}
                                >
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            />
        </>
    );
};

export default Products;
