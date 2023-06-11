import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tables from "../../../SharedUI/Table/Tables";
import { axiosInstance } from "Axios.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Btn from "../../../SharedUI/Btn/Btn";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const CategoriesURL = "api/v1/categories";

  const handleTableButton = (e) => {
    navigate("/addCategory");
  };

  useEffect(() => {
    // Fetch the items from the server
    axiosInstance
      .get(CategoriesURL)
      .then((response) => {
        console.log(response.data);
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteCategory = (id) => {
    axiosInstance
      .delete(`${CategoriesURL}/${id}`)
      .then((response) => {
        // Update the component's state or perform any other necessary actions
        setCategories(categories.filter((category) => category.id !== id));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleEditCategory = (id) => {
    navigate("/admin/editcategory");
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
                  onClick={() => handleDeleteCategory(category._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      />
    </>
  );
};

export default Categories;
