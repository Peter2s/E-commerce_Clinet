import Tables from '../../../SharedUI/Table/Tables';
import Btn from 'Dashboard/SharedUI/Btn/Btn';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';


const Users = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/user/")
      .then((res) => {
        setUserData(res.data);
      }).catch((err) => {
        console.log(err.message);
      })
  }, []);
  
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
        const response = await axios.delete(`http://localhost:8000/user/${id}`);
        setUserData((prevUser) =>prevUser.filter((user) => user.id !== id));
        console.log(response.data);
        Swal.fire('Deleted!', 'The role has been deleted.', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleActivate = (userId) => {
    axios.patch(`http://localhost:8000/user/${userId}`, { is_active: true })
      .then((res) => {
        // Update the user data
        setUserData(prevData => {
          const updatedData = [...prevData];
          const userIndex = updatedData.findIndex(user => user.id === userId);
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

  const handleDeactivate = (userId) => {
    axios.patch(`http://localhost:8000/user/${userId}`, { is_active: false })
      .then((res) => {
        // Update the user data
        setUserData(prevData => {
          const updatedData = [...prevData];
          const userIndex = updatedData.findIndex(user => user.id === userId);
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
  return (
    <>
      <Tables
         btn={<>
          <Link to="/admin/users/create" className='d-flex'>
                          <Btn
                            name="btn btn-primary ml-auto"
                            title="Add User"
                          />
                        </Link>
          </>}
        title="Users Table"
        trContent={
          <>
            <th scope="col">ID</th>
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
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.bio}</td>
            <td>
                {user.is_active ? (
                    <Btn name="btn-danger btn fa fa-lock" onClick={() => handleDeactivate(user.id)}/>
                  ) : (
                    <Btn name="btn-success btn fa fa-lock-open" onClick={() => handleActivate(user.id)}/>
                  )}
                <span className="ml-2"> 
                <Link to={`/admin/UserEdit/${user.id}`}>
                  <Btn name="btn-primary btn fa fa-edit" />
                </Link>
                </span>
                <span className="ml-2">
                  <Btn
                    name="btn btn-danger fa fa-trash"
                    onClick={() => handleDelete(user.id)}
                  />
                </span>
                <span className="ml-2">
                <Link to={`/admin/UserDetail/${user.id}`}>
                  <Btn name="btn-info btn fa fa-circle-info" />
                </Link>
                </span>
            </td>
          </tr>
        ))}
      />
    </>
  );
};

export default Users;
