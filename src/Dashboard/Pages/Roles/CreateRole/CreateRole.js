import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Container, Input, Row } from 'reactstrap';
import * as Yup from 'yup';
import axios from 'axios';
import Btn from 'Dashboard/SharedUI/Btn/Btn';

const CreateRole = () => {
  const rolesEndpoint = 'http://localhost:8000/roles';

  const initialRole = {
    newRole: '',
    permissions: [],
  };

  const [role, setRole] = useState(initialRole);
  const [permissionsData, setPermissionsData] = useState([]);

  useEffect(() => {
    // Fetch permissions from the JSON server
    const fetchPermissions = async () => {
      try {
        const response = await axios.get(rolesEndpoint);
        const roles = response.data;
        if (roles && roles.length > 0) {
          const permissions = roles[0].permissions;
          setPermissionsData(permissions);
        }
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPermissions();
  }, []);

  const handlePermissionChange = (event) => {
    const permission = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setRole((prevRole) => ({
        ...prevRole,
        permissions: [...prevRole.permissions, permission],
      }));
    } else {
      setRole((prevRole) => ({
        ...prevRole,
        permissions: prevRole.permissions.filter((p) => p !== permission),
      }));
    }
  };
  const handleSave = async () => {
    try {
      // Split the permissions by entity
      const permissionsByEntity = {};
      role.permissions.forEach(permission => {
        const [entity, access] = permission.split(':');
        if (!permissionsByEntity[entity]) {
          permissionsByEntity[entity] = {
            entity,
            access: {}
          };
        }
        permissionsByEntity[entity].access[access.toLowerCase()] = true;
      });
  
      // Create the role object in the desired format
      const roleData = {
        name: role.newRole,
        is_active: true,
        permissions: Object.values(permissionsByEntity)
      };
  
      const response = await axios.post(rolesEndpoint, roleData);
      console.log('Role saved:', response.data);
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };
  
  

  return (
    <>
      <Container className="w-50" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h4>Add Role</h4>
              </CardHeader>
              <CardBody>
                <form
                  className="m-auto ms-5"
                >
                  <label htmlFor="roleName">
                    <b>Role</b><span className="required">*</span>
                  </label>
                  <Input
                    className="w-50"
                    type="text"
                    id="roleName"
                    name="newRole"
                    placeholder="Role name"
                    value={role.newRole}
                    onChange={(e) => setRole({ ...role, newRole: e.target.value })}
                  />
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
                      value="Employees:Get"
                      checked={role.permissions.includes('Employees:Get')}
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
                      value="Employees:Post"
                      checked={role.permissions.includes('Employees:Post')}
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
                      value="Employees:Patch"
                      checked={role.permissions.includes('Employees:Patch')}
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
                      value="Employees:Delete"
                      checked={role.permissions.includes('Employees:Delete')}
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
                      value="Employees:Ban"
                      checked={role.permissions.includes('Employees:Ban')}
                      onChange={handlePermissionChange}
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
                      value="Employees:Unban"
                      checked={role.permissions.includes('Employees:Unban')}
                      onChange={handlePermissionChange}
                    />
                    <label className="custom-control-label" htmlFor="customCheck6">
                      Unban
                    </label>
                  </div>
                  </div>
                  <div className='col-6'>
                  <label htmlFor="permissions">Products</label>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck7"
                      value="Products:Get"
                      checked={role.permissions.includes('Products:Get')}
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
                      value="Products:Post"
                      checked={role.permissions.includes('Products:Post')}
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
                      value="Products:Patch"
                      checked={role.permissions.includes('Products:Patch')}
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
                      value="Products:Delete"
                      checked={role.permissions.includes('Products:Delete')}
                      onChange={handlePermissionChange}
                    />
                    <label className="custom-control-label mb-4" htmlFor="customCheck10">
                      Delete
                    </label>
                    </div>
                  </div>
                  </div>
                  <CardFooter>
                    <Btn type="button" title="Save" name="btn btn-primary" onClick={handleSave} />
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
