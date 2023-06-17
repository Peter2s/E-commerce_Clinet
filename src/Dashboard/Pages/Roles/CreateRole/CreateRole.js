import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Container, Input, Row } from 'reactstrap';
import * as Yup from 'yup';
import axios from 'axios';
import MySwal from 'sweetalert2';
import Btn from 'Dashboard/SharedUI/Btn/Btn';
import { axiosInstance } from '../../../../Axios';
import { Navigate, useNavigate } from 'react-router';
import { useFormik } from 'formik';

const CreateRole = () => {
  const initialRole = {
    newRole: '',
    permissions: [],
  };
  const [routes, setRoutes] = useState([]);
  const [permissionsData, setPermissionsData] = useState([]);
  const navigate = useNavigate();

  const fetchRoutes = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/routes');
      const { routes:route } = response.data.data;
      setRoutes(route);

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchRoutes();


    // fetchPermissions();
  }, []);
  const fetchPermissions = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/roles");
      const roles = response.data.data;
      console.log(roles);
      if (roles && roles.length > 0) {
        const permissions = roles[0].permissions;
        setPermissionsData(permissions);
      }
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };
  const validationSchema = Yup.object().shape({
    newRole: Yup.string()
      .required('Role name is required')
      .test('unique', 'Role name must be unique', async (value) => {
        try {
          const response = await axiosInstance.get(`/api/v1/roles?name=${value}`);
          const roles = response.data.data;
          return roles.length === 0;
        } catch (error) {
          console.error('Error checking role uniqueness:', error);
          return false;
        }
      }),
      permissions: Yup.array()
      .min(1, 'At least one permission must be selected')
      .required('At least one permission must be selected'),
  });

  const formik = useFormik({
    initialValues: initialRole,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const permissionsByEntity = {};
        values.permissions.forEach((permission) => {
          const [entity, access] = permission.split(':');
          if (!permissionsByEntity[entity]) {
            permissionsByEntity[entity] = {
              entity,
              access: {},
            };
          }
          permissionsByEntity[entity].access[access.toLowerCase()] = true;
        });

        const roleData = {
          name: values.newRole,
          permissions: Object.values(permissionsByEntity),
        };

        const response = await axiosInstance.post("/api/v1/roles", roleData);
        console.log('Role saved:', response.data);

        MySwal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'New Role has been added successfully.',
        });

        navigate("/admin/roles");
      } catch (error) {
        console.error('Error saving role:', error);
      }
    },
  });

  const handlePermissionChange = (event) => {
    const permission = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      formik.setFieldValue('permissions', [...formik.values.permissions, permission]);
    } else {
      formik.setFieldValue('permissions', formik.values.permissions.filter((p) => p !== permission));
    }
  };

  return (
    <>
      <Container className="w-75 mt--5" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h2>Add Role</h2>
                <hr/>
              </CardHeader>
              <CardBody>
                <form className="ms-5" onSubmit={formik.handleSubmit}>
                  <label htmlFor="roleName">
                    <b>Role Name</b><span className="required">*</span>
                  </label>
                    <Input
                    className="w-50 form-control-alternative"
                    type="text"
                    id="roleName"
                    name="newRole"
                    placeholder="Role name"
                    value={formik.values.newRole}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.newRole && formik.errors.newRole ? (
                    <div className="text-danger">{formik.errors.newRole}</div>
                  ) : null}

                  <br />
                  <label htmlFor="permissions">
                    <b>Permissions</b><span className="required">*</span>
                  </label>
                  <br />
                  <label htmlFor="permissions">Employees</label>
                  <div className='row'>
                    <div className='col-6'>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                          value="employees:Get"
                          checked={formik.values.permissions.includes('employees:Get')}
                          onChange={handlePermissionChange}
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
                          value="employees:Post"
                          checked={formik.values.permissions.includes('employees:Post')}
                          onChange={handlePermissionChange}
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
                          value="employees:Patch"
                          checked={formik.values.permissions.includes('employees:Patch')}
                          onChange={handlePermissionChange}
                        />
                        <label className="custom-control-label" htmlFor="customCheck3">
                          Patch
                        </label>
                      </div>
                    </div>
                    <div className='col-6 mb-4'>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck4"
                          value="employees:Delete"
                          checked={formik.values.permissions.includes('employees:Delete')}
                          onChange={handlePermissionChange}
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
                          value="employees:Ban"
                          checked={formik.values.permissions.includes('employees:Ban')}
                          onChange={handlePermissionChange}
                        />
                        <label className="custom-control-label" htmlFor="customCheck5">
                          Ban
                        </label>
                      </div>
                    </div>
                    {/*<div className='col-6 mt-4'>
                      <label htmlFor="permissions">Products</label>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck7"
                          value="products:Get"
                          checked={formik.values.permissions.includes('products:Get')}
                          onChange={handlePermissionChange}
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
                          value="products:Post"
                          checked={formik.values.permissions.includes('products:Post')}
                          onChange={handlePermissionChange}
                        />
                        <label className="custom-control-label" htmlFor="customCheck8">
                          Post
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck9"
                          value="products:Patch"
                          checked={formik.values.permissions.includes('products:Patch')}
                          onChange={handlePermissionChange}
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
                          value="products:Delete"
                          checked={formik.values.permissions.includes('products:Delete')}
                          onChange={handlePermissionChange}
                        />
                        <label className="custom-control-label mb-4" htmlFor="customCheck10">
                          Delete
                        </label>
                      </div>
                    </div>*/}
                  </div>
                  {formik.touched.permissions && formik.errors.permissions && (
                    <div className="text-danger my-2">{formik.errors.permissions}</div>
                  )}
                  <CardFooter>
                    <Btn type="submit" title="Save" className="btn btn-primary" />
                    <Btn type="button" title="Cancel" className="btn btn-light" onClick={() => navigate('/admin/roles')} />
                  </CardFooter>
                </form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CreateRole;
