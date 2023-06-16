import Tables from '../../../SharedUI/Table/Tables';
import Btn from 'Dashboard/SharedUI/Btn/Btn';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { axiosInstance } from '../../../../Axios';
import PaginationAdmin from "../../../SharedUI/PaginationAdmin/PaginationAdmin";


const Users = () => {
  const [userData, setUserData] = useState([]);
  const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({
        currentPage: null,
        totalPages: null,
        limit: null,
    });

  useEffect(() => {
    fetchUsers();
    
  },[]);

  const fetchUsers = async (page=1) => {
    await axiosInstance
      .get("/api/v1/users?page="+page)
      .then((res) => {
        setUserData(res.data.data);
        setTotal(res.data.pagination.total);
          setPagination({
              currentPage: res.data.pagination.current_page,
              totalPages: res.data.pagination.total_pages,
              limit: res.data.pagination.limit,
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
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
        const response = await axiosInstance.delete(`/api/v1/users/${id}`);
        setUserData((prevUser) =>prevUser.filter((user) => user.id !== id));
        console.log(response.data);
        Swal.fire('Deleted!', 'The role has been deleted.', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleActivate = async (userId) => {
    await axiosInstance
    .post(`/api/v1/users/${userId}/activate`)
      .then((res) => {
        // Update the user data
        setUserData(prevData => {
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

  const handleDeactivate = async (userId) => {
    await axiosInstance
    .post(`/api/v1/users/${userId}/deactivate`)
      .then((res) => {
        // Update the user data
        setUserData(prevData => {
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

    const handlePageChange =  (page) => {
        fetchUsers(page);
    }
  return (
    <>
      <Tables
         btn={<>
          <Link to="/admin/users/create" className='d-flex'>
                          <Btn
                            className="btn btn-primary ml-auto"
                            title="Add User"
                          />
                        </Link>
          </>}
        title={`Users (${total})`}
        trContent={
          <>
            {/*<th scope="col">ID</th>*/}
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Bio</th>
            <th className="text-center" scope="col">Actions</th>
            <th scope="col" />
          </>
        }
        tableContent={userData.map((user, index) => (
          <tr key={user.id}>
            {/*<td>{user.id}</td>*/}
              <td>{(index+1)+(pagination.currentPage-1)*pagination.limit}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.bio}</td>
            <td>
                {user.is_active ? (
                    <Btn className="btn-danger btn fa fa-lock" onClick={() => handleDeactivate(user.id)}/>
                  ) : (
                    <Btn className="btn-success btn fa fa-lock-open" onClick={() => handleActivate(user.id)}/>
                  )}
                <span className="ml-2"> 
                <Link to={`/admin/UserEdit/${user.id}`}>
                  <Btn className="btn-primary btn fa fa-edit" />
                </Link>
                </span>
                <span className="ml-2">
                  <Btn
                    className="btn btn-danger fa fa-trash"
                    onClick={() => handleDelete(user.id)}
                  />
                </span>
                <span className="ml-2">
                <Link to={`/admin/UserDetail/${user.id}`}>
                  <Btn className="btn-info btn fa fa-circle-info" />
                </Link>
                </span>
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

export default Users;
