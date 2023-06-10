import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import MySwal from 'sweetalert2';
import { Card, CardHeader, Container, Input, Row } from 'reactstrap';
import { axiosInstance } from '../../../../Axios';

const EditRole = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [permissions, setPermissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoleData();
  }, []);

  const fetchRoleData = async () => {
    try {
      const response = await axiosInstance.get(`http://e-commerce.nader-mo.tech/api/v1/roles/${id}`);
      const { name, permissions } = response.data.data;
      setName(name);
      setPermissions(permissions || []);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.patch(`/api/v1/roles/${id}`, {
        name,
        permissions,
      });
      console.log(response.data);
      MySwal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your Changes have been saved successfully.',
      });
      
      navigate("/admin/roles");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePermissionChange = (permissionIndex, accessKey) => {
    const updatedPermissions = [...permissions];
    if (updatedPermissions[permissionIndex]?.access) {
      updatedPermissions[permissionIndex].access[accessKey] = !updatedPermissions[permissionIndex].access[accessKey];
      setPermissions(updatedPermissions);
    }
  };
  
  const isAccessSelected = (permissionIndex, accessKey) => {
    return permissions[permissionIndex]?.access?.[accessKey] || false;
  };

  return (
    <Container className='w-50' fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h2>Edit Role</h2>
              <hr/>
            </CardHeader>
            <div className="pl-4">
              <label>
                Name:
                <Input type="text" className='form-control-alternative' value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <div>
                <h4 className='mt-4'>Permissions:</h4>
                <label htmlFor="permissions">Employees</label>
              <div className='d-flex row'>
                <div className='col-6'>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                    value="get"
                    onChange={() => handlePermissionChange(0, "get")}
                    checked={isAccessSelected(0, "get")}
                  />
                  <label className="custom-control-label" htmlFor="customCheck1">
                    Get
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck2"
                    value="post"
                    onChange={() => handlePermissionChange(0, "post")}
                    checked={isAccessSelected(0, "post")}
                  />
                  <label className="custom-control-label" htmlFor="customCheck2">
                    Post
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck3"
                    value="patch"
                    onChange={() => handlePermissionChange(0, "patch")}
                    checked={isAccessSelected(0, "patch")}
                  />
                  <label className="custom-control-label" htmlFor="customCheck3">
                    Patch
                  </label>
                </div>
                </div>
                <div className='col-6'>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck4"
                    value="delete"
                    onChange={() => handlePermissionChange(0, "delete")}
                    checked={isAccessSelected(0, "delete")}
                  />
                  <label className="custom-control-label" htmlFor="customCheck4">
                    Delete
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck5"
                    value="ban"
                    onChange={() => handlePermissionChange(0, "ban")}
                    checked={isAccessSelected(0, "ban")}
                  />
                  <label className="custom-control-label" htmlFor="customCheck5">
                    Ban
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck6"
                    value="unban"
                    onChange={() => handlePermissionChange(0, "unban")}
                    checked={isAccessSelected(0, "unban")}
                  />
                  <label className="custom-control-label" htmlFor="customCheck6">
                    Unban
                  </label>
                </div>
                </div>
                <div className='mt-3'>
                <label htmlFor="permissions" className='mt-3'>Products</label>
                <div className='col-12'>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck7"
                    value="get"
                    onChange={() => handlePermissionChange(1, "get")}
                    checked={isAccessSelected(1, "get")}
                  />
                  <label className="custom-control-label" htmlFor="customCheck7">
                    Get
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck8"
                    value="post"
                    onChange={() => handlePermissionChange(1, "post")}
                    checked={isAccessSelected(1, "post")}
                  />
                  <label className="custom-control-label" htmlFor="customCheck8">
                    Post
                  </label>
                  </div>
                </div>
                <div className='col-12'>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck9"
                    value="patch"
                    onChange={() => handlePermissionChange(1, "patch")}
                    checked={isAccessSelected(1, "patch")}
                  />
                  <label className="custom-control-label" htmlFor="customCheck9">
                    Patch
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck10"
                    value="delete"
                    onChange={() => handlePermissionChange(1, "delete")}
                    checked={isAccessSelected(1, "delete")}
                  />
                  <label className="custom-control-label" htmlFor="customCheck10">
                    Delete
                  </label>
                </div>
              </div>
              </div>
              </div>
              </div>
              <button className="btn btn-primary mt-4 mb-3" onClick={handleSave}>
                Save
              </button>
            </div>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default EditRole;
