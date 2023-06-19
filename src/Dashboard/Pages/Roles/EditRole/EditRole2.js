import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MySwal from "sweetalert2";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Input,
  Row,
} from "reactstrap";
import { axiosInstance } from "../../../../Axios";
import Btn from "Dashboard/SharedUI/Btn/Btn";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Checkbox } from "primereact/checkbox";

const EditRole = () => {
  const initialRole = {
    newRole: "",
    permissions: [],
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const methodes = ["GET", "POST", "PATCH", "DELETE", "UNBAN", "BAN"];
  const [routes, setRoutes] = useState([]);
  const fetchRoutes = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/routes");
      const { routes: route } = response.data.data;
      setRoutes(route);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRoutes();
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
    name: Yup.string().required("Role Name is required"),
    permissions: Yup.array()
      .required("At least one permission must be selected")
      .test(
        "atLeastOnePermission",
        "At least one permission must be selected",
        (value) => {
          return value.some((permission) =>
            Object.values(permission.access).some((access) => access === true)
          );
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      permissions: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const permissionsByEntity = {};
        values.permissions.forEach((permission) => {
          const [entity, access] = permission.split(":");
          if (!permissionsByEntity[entity]) {
            permissionsByEntity[entity] = {
              entity,
              access: {},
            };
          }
          permissionsByEntity[entity].access[access.toLowerCase()] = true;
        });
        const response = await axiosInstance.patch(`/api/v1/roles/${id}`, {
          name: formik.values.name,
          permissions: formik.values.permissions,
        });
        console.log("formik.values", formik.values);
        console.log(response.data);
        MySwal.fire({
          icon: "success",
          title: "Success!",
          text: "Your Changes have been saved successfully.",
        });

        navigate("/admin/roles");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handlePermissionChange = (permissionIndex, accessKey) => {
    const updatedPermissions = [...formik.values.permissions];
    if (updatedPermissions[permissionIndex]?.access) {
      updatedPermissions[permissionIndex].access[accessKey] =
        !updatedPermissions[permissionIndex].access[accessKey];
      formik.setValues({
        ...formik.values,
        permissions: updatedPermissions,
      });
    }
  };

  const isAccessSelected = (permissionIndex, accessKey) => {
    return (
      formik.values.permissions[permissionIndex]?.access?.[accessKey] || false
    );
  };

  return (
    <Container className="w-75 mt--5" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h2>Edit Role</h2>
              <hr />
            </CardHeader>
            <CardBody>
              <div className="pl-4">
                <form onSubmit={formik.handleSubmit}>
                  <label>Role Name:</label>
                  <Input
                    type="text"
                    className="form-control-alternative w-50"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-danger">{formik.errors.name}</div>
                  ) : null}
                  <div>
                    <br />
                    <label htmlFor="permissions">
                      <b>Permissions</b>
                      <span className="required">*</span>
                    </label>
                    <br />
                    <div>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col" className="text-center">
                              Route
                            </th>
                            {/*<th scope="col" className="text-center">
                            Select All
                          </th>*/}
                            <th scope="col" className="text-center">
                              View - View ALl
                            </th>
                            <th scope="col" className="text-center">
                              Create
                            </th>
                            <th scope="col" className="text-center">
                              Update
                            </th>
                            <th scope="col" className="text-center">
                              Delete
                            </th>
                            <th scope="col" className="text-center">
                              Activate
                            </th>
                            <th scope="col" className="text-center">
                              Deactivate
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {routes.map((route) => (
                            <tr id={route}>
                              <td className="text-center">{route}</td>

                              {methodes.map((method) => (
                                <td className="text-center">
                                  <Checkbox
                                    id={`${route}:${method}`}
                                    value={`${route}:${method}`}
                                    checked={formik.values.permissions.includes(
                                      `${route}:${method}`
                                    )}
                                    onChange={handlePermissionChange}
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <label htmlFor="permissions">Employees</label>
                    <div className="d-flex row">
                      <div className="col-6">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                            value="get"
                            onChange={() => handlePermissionChange(0, "get")}
                            checked={isAccessSelected(0, "get")}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck1"
                          >
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
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck2"
                          >
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
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck3"
                          >
                            Patch
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck4"
                            value="delete"
                            onChange={() => handlePermissionChange(0, "delete")}
                            checked={isAccessSelected(0, "delete")}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck4"
                          >
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
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck5"
                          >
                            Ban
                          </label>
                        </div>
                      </div>
                      <div className="mt-3">
                        <label htmlFor="permissions" className="mt-3 ml-3">
                          Products
                        </label>
                        <div className="col-12">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck7"
                              value="get"
                              onChange={() => handlePermissionChange(1, "get")}
                              checked={isAccessSelected(1, "get")}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck7"
                            >
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
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck8"
                            >
                              Post
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck9"
                              value="patch"
                              onChange={() =>
                                handlePermissionChange(1, "patch")
                              }
                              checked={isAccessSelected(1, "patch")}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck9"
                            >
                              Patch
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck10"
                              value="delete"
                              onChange={() =>
                                handlePermissionChange(1, "delete")
                              }
                              checked={isAccessSelected(1, "delete")}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck10"
                            >
                              Delete
                            </label>
                          </div>
                        </div>
                        {formik.touched.permissions &&
                          formik.errors.permissions && (
                            <span className="text-danger my-2">
                              {formik.errors.permissions}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                  <CardFooter>
                    <Btn
                      type="submit"
                      title="Save"
                      className="btn btn-primary"
                    />
                    <Btn
                      type="button"
                      title="Cancel"
                      className="btn btn-light"
                      onClick={(e) => navigate("/admin/roles")}
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
