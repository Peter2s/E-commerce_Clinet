



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tables from '../../../SharedUI/Table/Tables';
import axios from 'api/axios';
import {faPenToSquare,faTrash} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Products = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const handleTableButton = (e) => {

    navigate.path('/addproduct');
  };
  
    useEffect(() => {
      // Fetch the items from the server
      axios.get("http://localhost:8000/categories")
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.log(error)
        });
    }, []);
  

  const handleDeleteProduct = (id) => {
        axios.delete(`http://localhost:8000/products/${id}`)
      .then((response) => {
        // Update the component's state or perform any other necessary actions
        setProduct(product.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.log(error.message);
      }); 
     };
    
  const handleEditProduct = (id) => {
    navigate("/edit-product");
  };

  useEffect(() => {
    // Fetch the category data from the backend API
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => {
        // Handle the error if any
        console.error('Error fetching products data:', error);
      });
  }, []);

  return (
    <>
   
      <Tables
         btnTitle="Add Product" 
         onClick={handleTableButton} 
         title="Products" 
            trContent='
            <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">الاسم</th>
                <th scope="col">Image</th>
                <th scope="col">Category</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Actions</th>
                <th scope="col" />'
        tableContent={Products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name_en}</td>
            <td>{product.name_er}</td>
            <td>
              <img src={product.image} alt={product.name} />
            </td>
            <td>{product.category}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>
              <div>
                <button onClick={() => handleEditProduct(product.id)}>
                <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                <button  onClick={() => handleDeleteProduct(product.id)}>
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

export default Products;
