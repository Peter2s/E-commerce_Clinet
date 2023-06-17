import Tables from '../../../SharedUI/Table/Tables';
import Btn from './../../../SharedUI/Btn/Btn';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';
import {axiosInstance} from '../../../../Axios';
import PaginationAdmin from "../../../SharedUI/PaginationAdmin/PaginationAdmin";

const Emps = () => {
    const [empData, setEmpData] = useState([]);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({
        currentPage: null,
        totalPages: null,
        limit: null,
    });

    const fetchEmployees = (page = 1) => {
        axiosInstance
            .get(`/api/v1/employees?page=${page}`)
            .then((response) => {
                console.log(response.data);
                const {data, pagination} = response.data;
                setEmpData(data);
                setTotal(pagination.total);
                setPagination({
                    currentPage: pagination.current_page,
                    totalPages: pagination.total_pages,
                    limit: pagination.limit,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }


    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this employee!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                const response = await axiosInstance.delete(`/api/v1/employees/${id}`);
                setEmpData((prevUser) => prevUser.filter((employee) => employee.id !== id));
                console.log(response.data);
                Swal.fire('Deleted!', 'The role has been deleted.', 'success');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleActivate = async (userId) => {
        await axiosInstance
            .post(`/api/v1/employees/${userId}/ban`)
            .then((res) => {
                // Update the user data
                setEmpData(prevData => {
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
            .post(`/api/v1/employees/${userId}/unban`)
            .then((res) => {
                // Update the user data
                setEmpData(prevData => {
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
    const handlePageChange = (page) => {
        fetchEmployees(page);
    };

    return (
        <>
            <Tables
                title={`Employees (${total})`}

                btn={<>
                    <Link to="/admin/employees/create" className='d-flex'>
                        <Btn
                            className="btn btn-primary ml-auto"
                            title="Add Employee"
                        />
                    </Link>
                </>}

                trContent={
                    <>
                        {/*<th scope="col">ID</th>*/}
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                        <th scope="col"/>
                    </>
                }
                tableContent={empData.map((employee, index) => (
                    <tr key={employee.id}>
                        {/*<td>{employee.id}</td>*/}

                        <td>{(index + 1) + (pagination.currentPage - 1) * pagination.limit}</td>
                        <td>{employee.name?.length > 25 ? employee.name.substring(0, 25) + '...' : employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.role}</td>

                        <td>
                    <span className="mr-2">
                <Link to={`/admin/EmpDetails/${employee.id}`}>
                  <Btn className="btn-info btn fa fa-circle-info"/>
                </Link>
                </span>
                            {employee.is_banned ? (
                                <Btn className="btn-danger btn fa fa-lock"
                                     onClick={() => handleDeactivate(employee.id)}/>
                            ) : (
                                <Btn className="btn-success btn fa fa-lock-open"
                                     onClick={() => handleActivate(employee.id)}/>
                            )}
                            <Link to={`/admin/EmpEdit/${employee.id}`}>
                                <Btn className="btn-primary btn fa fa-edit"/>
                            </Link>

                            <span className="ml-2">
                  <Btn
                      className="btn btn-danger fa fa-trash"
                      onClick={() => handleDelete(employee.id)}
                  />
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

export default Emps;
