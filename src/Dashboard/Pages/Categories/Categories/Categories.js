
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tables from '../../../SharedUI/Table/Tables';
import Btn from 'Dashboard/SharedUI/Btn/Btn';
import axios from 'api/axios';
import {faPenToSquare,faTrash} from "@fortawesome/free-solid-svg-icons"


const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleTableButton = (e) => {

    navigate.path('/addCategory');
  };
  
    useEffect(() => {
      // Fetch the items from the server
      axios.get("http://localhost:8000/categories")
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          // Handle error
        });
    }, []);
  

  const handleDeleteCategory = (id) => {
        axios.delete(`http://localhost:8000/categories/${id}`)
      .then((response) => {
        // Update the component's state or perform any other necessary actions
        setCategories(categories.filter((category) => category.id !== id));
      })
      .catch((error) => {
        console.log(error.message);
      }); 
     };
    
  const handleEditCategory = (id) => {
    navigate("/editcategory");
  };

  useEffect(() => {
    // Fetch the category data from the backend API
    fetch('/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => {
        // Handle the error if any
        console.error('Error fetching category data:', error);
      });
  }, []);

  return (
    <>
   
      <Tables
        title="Categories Table"
         btnTitle="AddCategory" 
         onClick={handleTableButton} 
        trContent={`
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">الاسم</th>
          <th scope="col">Image</th>
          <th scope="col">Actions</th>
        `}
        tableContent={categories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name_en}</td>
            <td>{category.name_ar}</td>
            <td>
              <img src={category.image} alt={category.name} />
            </td>
            <td>
              <div>
                <icon
                  name="btn btn-primary btn-sm fa fa-PenToSquare mr-1"
                  onClick={() => handleEditCategory(category.id)}
                />
                <icon
                  name="btn btn-danger btn-sm fa fa-trash"
                  onClick={() => handleDeleteCategory(category.id)}
                />
              </div>
            </td>
          </tr>
        ))}
      />
      
    </>
  );
};

export default Categories;
