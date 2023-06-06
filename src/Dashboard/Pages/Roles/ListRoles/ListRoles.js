import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { axiosInstance } from '../../../../Axios';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage, setRolesPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRolesData(currentPage);
  }, [currentPage]);

  const fetchRolesData = async (page) => {
    try {
      const response = await axiosInstance.get(`/api/v1/roles?page=${page}`);
      setRoles(response.data.data); // Assuming the roles data is returned as an array
      setTotalPages(response.data.paginationResult.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDeactivate = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:8000/roles/${id}`, {
        is_active: false
      });
      setRoles((prevRoles) =>
        prevRoles.map((role) => {
          if (role.id === id) {
            return {
              ...role,
              is_active: false
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
      const response = await axios.patch(`http://localhost:8000/roles/${id}`, {
        is_active: true
      });
      setRoles((prevRoles) =>
        prevRoles.map((role) => {
          if (role.id === id) {
            return {
              ...role,
              is_active: true
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

   // Change the current page
   const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  console.log(roles);
  const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole);

  
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
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        const response = await axiosInstance.delete(`/api/v1/roles/${id}`);
        setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
        console.log(response.data.data);
        Swal.fire('Deleted!', 'The role has been deleted.', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>Roles</CardHeader>
        <CardBody>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Permissions</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRoles.map((role) => (
                <tr key={role._id}>
                  <td>{role._id}</td>
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
              ))}
            </tbody>
               {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <li key={index + 1} className="page-item">
            <button
              className={`page-link ${
                currentPage === index + 1 ? 'active' : ''
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
          </table>
        </CardBody>
      </Card>

   
    </>
  );
};

export default Roles;
