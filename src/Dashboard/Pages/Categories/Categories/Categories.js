import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tables from "../../../SharedUI/Table/Tables";
import { axiosInstance } from "Axios.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Btn from "../../../SharedUI/Btn/Btn";
import MySwal from "sweetalert2";
import PaginationAdmin from "../../../SharedUI/PaginationAdmin/PaginationAdmin";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    currentPage: null,
    totalPages: null,
  });

  const CategoriesURL = "api/v1/categories";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = (page = 1) => {
    axiosInstance
      .get(`${CategoriesURL}?page=${page}`)
      .then((response) => {
        console.log(response.data);
        const { data, pagination } = response.data;
        setCategories(data);
        setPagination({
          currentPage: pagination.current_page,
          totalPages: pagination.total_pages,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteCategory = (id, name) => {
    MySwal.fire({
      title: "Are you sure?",
      text: `You want delete ${name} category!`,
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
      .delete(`${CategoriesURL}/${id}`)
      .then((response) => {
        setCategories(categories.filter((category) => category.id !== id));
        MySwal.fire({
          icon: "success",
          title: "success!",
          text: "category deleted successfully",
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

  const handleEditCategory = (id) => {
    navigate(`/admin/editcategory/${id}`);
  };
  const handlePageChange = (page) => {
    fetchCategories(page);
  };

  return (
    <>
      <Tables
        title="Categories"
        btn={
          <>
            <Link to="/admin/addCategory" className="d-flex">
              <Btn className="btn btn-primary ml-auto" title="Add Category" />
            </Link>
          </>
        }
        trContent={
          <>
            <th scope="col">Name</th>
            <th scope="col">الاسم</th>
            <th scope="col">Image</th>
            <th scope="col">Actions</th>
          </>
        }
        tableContent={categories.map((category) => (
          <tr key={category.id}>
            <td>{category.name_en}</td>
            <td>{category.name_ar}</td>
            <td style={{ width: "200px" }}>
              <img
                className="img-thumbnail"
                style={{ minWidth: "200px", width: "50%" }}
                src={category.image}
                alt={category.name}
              />
            </td>
            <td>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditCategory(category._id)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    handleDeleteCategory(category._id, category.name_en)
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

export default Categories;
