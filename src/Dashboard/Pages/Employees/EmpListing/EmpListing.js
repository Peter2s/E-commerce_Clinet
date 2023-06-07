import Tables from '../../../SharedUI/Table/Tables';
import Btn from './../../../SharedUI/Btn/Btn';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { axiosInstance } from '../../../../Axios';


const Emps = () => {
  const [empData, setEmpData] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/v1/employees")
      .then((res) => {
        setEmpData(res.data.data);
      }).catch((err) => {
        console.log(err.message);
      })
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
        setEmpData((prevUser) =>prevUser.filter((employee) => employee.id !== id));
        console.log(response.data);
        Swal.fire('Deleted!', 'The role has been deleted.', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <Tables
         btn={<>
          <Link to="/admin/employees/create" className='d-flex'>
                          <Btn
                            className="btn btn-primary ml-auto"
                            title="Add Employee"
                          />
                        </Link>
          </>}
        title="Employees Table"
        trContent={
          <>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
            <th scope="col" />
          </>
        }
        tableContent={empData.map((employee, index) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>{employee.role}</td>
            
                <td>
                <Link to={`/admin/EmpEdit/${employee.id}`}>
                  <Btn className="btn-primary btn fa fa-edit" />
                </Link>
                
                <span className="ml-2">
                  <Btn
                    className="btn btn-danger fa fa-trash"
                    onClick={() => handleDelete(employee.id)}
                  />
                </span>
                <span className="ml-2">
                <Link to={`/admin/EmpDetails/${employee.id}`}>
                  <Btn className="btn-info btn fa fa-circle-info" />
                </Link>
                </span>
            </td>
          </tr>
        ))}
      />
    </>
  );
};

export default Emps;
