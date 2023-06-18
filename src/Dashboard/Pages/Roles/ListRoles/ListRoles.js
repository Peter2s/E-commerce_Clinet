import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { axiosInstance } from '../../../../Axios';
import Btn from 'Dashboard/SharedUI/Btn/Btn';
import Tables from './../../../SharedUI/Table/Tables';
import { Link } from 'react-router-dom';
import './ListRoles.css';
import PaginationAdmin from './../../../SharedUI/PaginationAdmin/PaginationAdmin';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    currentPage: null,
    totalPages: null,
    limit: null,
  });
  // console.log("routes",routes.map((route) => route));
  useEffect(() => {
    // fetchRoutes();
    fetchRolesData();

  }, []);



  const fetchRolesData = async (page = 1) => {
    try {
      const response = await axiosInstance.get(`/api/v1/roles?page=${page}`);
      const { data, pagination } = response.data;
      setRoles(data);
        setTotal(pagination.total);
      setPagination({
        currentPage: pagination.current_page,
        totalPages: pagination.total_pages,
        limit: pagination.limit,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/roles/${id}`,
        {
          is_active: false,
        }
      );
      setRoles((prevRoles) =>
        prevRoles.map((role) => {
          if (role.id === id) {
            return {
              ...role,
              is_active: false,
            };
          }
          return role;
        })
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActivate = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/roles/${id}`,
        {
          is_active: true,
        }
      );
      setRoles((prevRoles) =>
        prevRoles.map((role) => {
          if (role.id === id) {
            return {
              ...role,
              is_active: true,
            };
          }
          return role;
        })
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = (idRole) => {
    window.location.href = `/admin/roles/edit/${idRole}`;
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this role!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        await axiosInstance.delete(`/api/v1/roles/${id}`);
        setRoles((prevRoles) => prevRoles.filter((role) => role._id !== id));
        Swal.fire('Deleted!', 'The role has been deleted.', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    fetchRolesData(page);
  };

  return (
    <>

      <Tables
        btn={
          <>
            <Link to="/admin/roles/create" className="d-flex">
              <Btn className="btn btn-primary ml-auto" title="Add Role" />
            </Link>
          </>
        }
        title={`Roles (${total})`}
        trContent={
          <>
            <th scope="col">#</th>
            {/*<th scope="col">ID</th>*/}
            <th scope="col">Name</th>
            <th scope="col">Permissions</th>
            <th scope="col">Actions</th>
          </>
        }

        tableContent={
          roles.map((role,index) => (
            <tr key={role._id}>
              {/*<td>{role._id}</td>*/}
              <td>{(index+1)+(pagination.currentPage-1)*pagination.limit}</td>
              <td>{role.name}</td>
              <td>
                {role.permissions.map((permission) => (
                  <div key={permission.entity}>
                    <strong>{permission.entity}:</strong>{' '}
                    {Object.entries(permission.access)
                      .filter(([_, value]) => value)
                      .map(([key, _]) => key)
                      .join(', ')}
                  </div>
                ))}
              </td>
              <td>
                <button
                  className="btn btn-info fa fa-edit"
                  onClick={() => handleButtonClick(role._id)}
                ></button>
                <button
                  className="btn btn-danger fa fa-trash"
                  onClick={() => handleDelete(role._id)}
                ></button>
                {role.is_active ? (
                  <button
                    className="btn btn-warning fa fa-lock"
                    onClick={() => handleDeactivate(role._id)}
                  ></button>
                ) : (
                  <button
                    className="btn btn-success fa fa-lock-open"
                    onClick={() => handleActivate(role._id)}
                  ></button>
                )}
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

export default Roles;