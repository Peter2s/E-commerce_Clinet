import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { axiosInstance } from '../../../../Axios';
import Btn from 'Dashboard/SharedUI/Btn/Btn';
import Tables from './../../../SharedUI/Table/Tables';
import { Link } from 'react-router-dom';
import './ListRoles.css';
import PaginationAdmin from './../../../SharedUI/PaginationAdmin/PaginationAdmin';
import DataTable from "../../../SharedUI/DataTable/DataTable";

const Roles = () => {
    const maping = {
        "get": "View / View All",
        "post": "Create",
        "patch": "Edit",
        "delete": "Delete",
        "ban": "Ban",
        "unban": "Unban",
        "activate": "Activate",
        "deactivate": "Deactivate",
    }


  const [roles, setRoles] = useState([]);
  // For pagination
  const [rows, setRows] = useState(5); // Number of rows per page
  const [page, setPage] = useState(1); // Current page number
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: null,
    totalPages: null,
    limit: null,
    total: null,
  });
  // console.log("routes",routes.map((route) => route));
  useEffect(() => {
    setLoading(true);
    fetchRolesData();

  }, [rows, page]);



  const fetchRolesData = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/roles?page=${page}&limit=${rows}`);
      const { data, pagination } = response.data;
      setRoles(data);

      setPagination({
        currentPage: pagination.current_page,
        totalPages: pagination.total_pages,
        limit: pagination.limit,
        total: pagination.total,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };


    const handleActivate = async (userId) => {
        await axiosInstance
            .post(`/api/v1/roles/${userId}/ban`)
            .then((res) => {
                // Update the user data
                setRoles(prevData => {
                    const updatedData = [...prevData];
                    const userIndex = updatedData.findIndex(user => user.id === userId);
                    // console.log(userIndex)
                    if (userIndex !== -1) {
                        updatedData[userIndex] = {...updatedData[userIndex], is_banned: true};
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
            .post(`/api/v1/roles/${userId}/unban`)
            .then((res) => {
                // Update the user data
                setRoles(prevData => {
                    const updatedData = [...prevData];
                    const userIndex = updatedData.findIndex(user => user.id === userId);
                    // console.log(userIndex)
                    if (userIndex !== -1) {
                        updatedData[userIndex] = {...updatedData[userIndex], is_banned: false};
                    }
                    return updatedData;
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
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

  const handlePageChange = async (event) => {

    setPage(event.page + 1);
    setRows(event.rows);

  }

  return (
    <>
      <DataTable
          title="Employees"
          addBtn={
            <Link to="/admin/roles/create" className="d-flex">
              <Btn className="btn btn-primary ml-auto" title="Add Role" />
            </Link>
          }
          data={roles}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
          columns={[
            {header: 'Name', field: 'name',},
              {
                  header: 'Permissions', body: (role) => {

                      return role.permissions.map((permission) => {
                          console.log(permission)
                          return (
                              <div key={permission.entity}>
                                  <strong>{permission.entity}:</strong>{' '}
                                  {Object.entries(permission.access)
                                      .filter(([_, value]) => value)
                                      .map(([key, _]) => maping[key.toLowerCase()])
                                      .join(', ')}
                              </div>
                          )} );

                  }
              },
            {
              header: 'Actions', body: (rowData) => {
                return (
                    <div className="d-flex justify-content-around">

                      <Link to={""}>
                        {!rowData.is_active ? (
                            <Btn className="btn-danger btn fa fa-lock"
                                 onClick={() => handleDeactivate(rowData._id)}/>
                        ) : (
                            <Btn className="btn-success btn fa fa-lock-open"
                                 onClick={() => handleActivate(rowData._id)}/>
                        )}
                      </Link>
                      <Link to={`/admin/roles/edit/${rowData._id}`}>
                        <Btn className="btn-primary btn fa fa-edit"/>
                      </Link>
                      <Link to={""}>
                        <Btn
                            className="btn btn-danger fa fa-trash"
                            onClick={() => handleDelete(rowData._id)}
                        />
                      </Link>
                    </div>
                );
              }
            },
          ]}

      />

    </>
  );
};

export default Roles;