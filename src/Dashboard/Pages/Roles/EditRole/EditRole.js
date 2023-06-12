import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import MySwal from 'sweetalert2';
import { Card, CardBody, CardFooter, CardHeader, Container, Input, Row } from 'reactstrap';
import { axiosInstance } from '../../../../Axios';
import Btn from 'Dashboard/SharedUI/Btn/Btn';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const EditRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoleData();
  }, []);

  const fetchRoleData = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/roles/${id}`);
      const { name, permissions } = response.data.data;
      formik.setValues({
        name: name,
        permissions: permissions || [],
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Role Name is required'),
    permissions: Yup.array()
      .required('At least one permission must be selected')
      .test('atLeastOnePermission', 'At least one permission must be selected', (value) => {
        return value.some((permission) => Object.values(permission.access).some((access) => access === true));
      }),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      permissions: [],
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      try {
        const response = await axiosInstance.patch(`/api/v1/roles/${id}`, {
          name: formik.values.name,
          permissions: formik.values.permissions,
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
    }
  });

  const handlePermissionChange = (permissionIndex, accessKey) => {
    const updatedPermissions = [...formik.values.permissions];
    if (updatedPermissions[permissionIndex]?.access) {
      updatedPermissions[permissionIndex].access[accessKey] = !updatedPermissions[permissionIndex].access[accessKey];
      formik.setValues({
        ...formik.values,
        permissions: updatedPermissions,
      });
    }
  };
  
  const isAccessSelected = (permissionIndex, accessKey) => {
    return formik.values.permissions[permissionIndex]?.access?.[accessKey] || false;
  };

  return (
    <Container className="w-75 mt--5" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h2>Edit Role</h2>
              <hr/>
            </CardHeader>
            <CardBody>
            <div className="pl-4">
              <form onSubmit={formik.handleSubmit}>
                <label>
                  Role Name:
                </label>
                <Input
                  type="text"
                  className='form-control-alternative w-50'
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className="text-danger">{formik.errors.name}</div>
                  ) : null}
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
                    </div>
                    <div className='mt-3'>
                      <label htmlFor="permissions" className='mt-3 ml-3'>Products</label>
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
                      {formik.touched.permissions && formik.errors.permissions && (
                      <span className="text-danger my-2">{formik.errors.permissions}</span>
                      )}
                    </div>
                  </div>
                </div>
                <CardFooter>
                  <Btn type="submit" title="Save" className="btn btn-primary" />
                  <Btn
                    type="button"
                    title="Cancel"
                    className="btn btn-light"
                    onClick={(e) => navigate('/admin/roles')}
                  />
                </CardFooter>
              </form>
            </div>
          </CardBody>
        </Card>
      </div>
    </Row>
  </Container>
);
};

export default EditRole;
