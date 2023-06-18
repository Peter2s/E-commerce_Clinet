import Btn from './../../../SharedUI/Btn/Btn';
import DataTable from './../../../SharedUI/DataTable/DataTable';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';
import {axiosInstance} from '../../../../Axios';

const Emps = () => {
    const [empData, setEmpData] = useState([]);

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


    // check that there is no page as argument and the url is clearly using pagination
    const fetchEmployees = () => {
        setLoading(true)
        axiosInstance
            .get(`/api/v1/employees?page=${page}&limit=${rows}`)
            .then((response) => {
                console.log(response.data);
                const {data, pagination} = response.data;
                setEmpData(data);
                setPagination({
                    currentPage: pagination.current_page,
                    totalPages: pagination.total_pages,
                    limit: pagination.limit,
                    total: pagination.total,
                });


            })
            .catch((error) => {
                console.error(error);
            });
        setLoading(false);
    }


    useEffect(() => {
        setLoading(true);
        fetchEmployees();
    }, [rows, page]);

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
    const handlePageChange = async (event) => {

        setPage(event.page + 1);
        setRows(event.rows);

    }

    return (
        <>
            <DataTable
                title="Employees"
                addBtn={
                <Link to="/admin/employees/create" className='d-flex'>
                    <Btn
                        className="btn btn-primary ml-auto"
                        title="Add Employee"
                    />
                </Link>
            }
                data={empData}
                loading={loading}
                pagination={pagination}
                onPageChange={handlePageChange}
                columns={[
                    {header: 'Name', field: 'name',},
                    {header: 'Email', field: 'email',},
                    {header: 'Phone', field: 'phone',},
                    {header: 'Role', field: 'role',},
                    {
                        header: 'Actions', body: (rowData) => {
                            return (
                                <div className="d-flex  justify-content-around">
                                    <Link to={`/admin/EmpDetails/${rowData.id}`}>
                                        <Btn className="btn-info btn fa fa-circle-info"/>
                                    </Link>
                                    <Link to={""}>
                                        {rowData.is_banned ? (
                                            <Btn className="btn-danger btn fa fa-lock"
                                                 onClick={() => handleDeactivate(rowData.id)}/>
                                        ) : (
                                            <Btn className="btn-success btn fa fa-lock-open"
                                                 onClick={() => handleActivate(rowData.id)}/>
                                        )}
                                    </Link>
                                    <Link to={`/admin/EmpEdit/${rowData.id}`}>
                                        <Btn className="btn-primary btn fa fa-edit"/>
                                    </Link>
                                    <Link to={""}>
                                        <Btn
                                            className="btn btn-danger fa fa-trash"
                                            onClick={() => handleDelete(rowData.id)}
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


export default Emps;
