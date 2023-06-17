import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tables from "../../../SharedUI/Table/Tables";
import { axiosInstance } from "Axios.js";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Btn from "../../../SharedUI/Btn/Btn";
import Swal from "sweetalert2";
import MySwal from "sweetalert2";
import PaginationAdmin from "../../../SharedUI/PaginationAdmin/PaginationAdmin";

const Products = () => {
  const Product_URL = "api/v1/products";
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    currentPage: null,
    totalPages: null,
      limit:null
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = (page = 1) => {
    axiosInstance
      .get(`${Product_URL}?page=${page}`)
      .then((response) => {
        console.log(response.data);
        const { data, pagination } = response.data;
        setProduct(data);
        setTotal(pagination.total);
        setPagination({
          currentPage: pagination.current_page,
          totalPages: pagination.total_pages,
            limit:pagination.limit
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteProduct = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want delete ${name} Product!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        callApiToDelete(id);
      }
    });
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
  };
    const handleActivate = async (userId) => {
        await axiosInstance
            .post(`${Product_URL}/${userId}/ban`)
            .then((res) => {
                // Update the user data
                setProduct(prevData => {
                    const updatedData = [...prevData];
                    const userIndex = updatedData.findIndex(user => user._id === userId);
                    if (userIndex !== -1) {
                        updatedData[userIndex] = { ...updatedData[userIndex], is_active: false };
                    }
                    return updatedData;
                });
            })

            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleDeactivate = async (userId) => {
        await axiosInstance
            .post(`${Product_URL}/${userId}/unban`)
            .then((res) => {
                // Update the user data
                setProduct(prevData => {
                    const updatedData = [...prevData];
                    const userIndex = updatedData.findIndex(user => user._id === userId);
                    if (userIndex !== -1) {
                        updatedData[userIndex] = { ...updatedData[userIndex], is_active: true };
                    }
                    return updatedData;
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
  const handleEditProduct = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };
  const handlePageChange = (page) => {
    fetchProducts(page);
  };

  return (
    <>
      <Tables
        btn={
          <>
            <Link to="/admin/addProducts" className="d-flex">
              <Btn className="btn btn-primary ml-auto" title="Add Product" />
            </Link>
          </>
        }
        title={`Products (${total})`}
        trContent={
          <>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">الاسم</th>
            <th scope="col">Image</th>
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col">Price ($)</th>
            <th scope="col">Quantity</th>
            <th scope="col">Actions</th>
            <th scope="col"></th>
          </>
        }
        tableContent={product.map((product,index) => (
          <tr key={product._id}>
            <td>{(index+1)+(pagination.currentPage-1)*pagination.limit}</td>
            <td>{product.name_en}</td>
            <td>{product.name_ar}</td>
              <td style={{ maxWidth: "200px" }}>
                  <img
                      className="img-thumbnail"
                      /*style={{ maxWidth: "200px", width: "50%", maxHeight: "100px", height: "50%", objectFit: "cover" }}*/
                      style={{ maxWidth: "100px",maxHeight: "50px", objectFit: "cover" }}
                      src={product.image}
                      alt={product.name}
                  />
              </td>
            <td>{product.category_id.name_en}</td>
            <td>{product.desc_en}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>
              <div>
                  {!product.is_active ? (
                      <Btn className="btn-danger btn fa fa-lock" onClick={() => handleDeactivate(product.id)}/>
                  ) : (
                      <Btn className="btn-success btn fa fa-lock-open" onClick={() => handleActivate(product.id)}/>
                  )}
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditProduct(product._id)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    handleDeleteProduct(product._id, product.name_en)
                  }
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </td>
          </tr>
        ))}
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

export default Products;
