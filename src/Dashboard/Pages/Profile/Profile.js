import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Alert,
} from "reactstrap";
import { axiosInstance } from "Axios.js";
import Btn from "Dashboard/SharedUI/Btn/Btn.js";
import './Profile.css';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    addresses: [],
    bio: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [matchError, setMatchError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [originalProfileData, setOriginalProfileData] = useState(null); // New state for storing original profile data
  const [phoneError, setPhoneError] = useState(false);
  const [errorEmpty, setErrorEmpty] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const res = await axiosInstance.get("/users/1");
      setProfileData(res.data);
      setOriginalProfileData(res.data); // Store the original profile data
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setInputError(false); // Reset the input error when toggling edit mode
  };

  const cancelMode = () => {
    setEditMode(false);
    setInputError(false);
    setProfileData(originalProfileData); // Reset profileData to the original values
  };

const handleInputChange = (e) => {
  const { id, name, value } = e.target;
  if (id === "new_password") {
    setNewPassword(value);
  } else if (id === "confirm_new_password") {
    setConfirmNewPassword(value);
  } else if (name === "phone") {
    // Validate mobile number format
    if (/^\d+$/.test(value) || value === "") {
      setProfileData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setPhoneError(false);
    }else{
      setPhoneError(true);
    }
  } else {
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
};

const handleModalOk = () => {
  if (newPassword === '' || confirmNewPassword === '') {
    setMatchError(false);
    setShowModal(true);
    setErrorEmpty(true);
  }else if (newPassword !== confirmNewPassword) {
    setMatchError(true);
    setErrorEmpty(false);
  }else {
    setMatchError(false);
    setShowModal(false);
    setErrorEmpty(false);
    saveProfileData();
  }
};

  const handleAddressChange = (e, index) => {
    const updatedAddresses = [...profileData.addresses];
    updatedAddresses[index] = e.target.value;
    setProfileData({ ...profileData, addresses: updatedAddresses });
  };

  const handleAddAddress = () => {
    const updatedAddresses = [...profileData.addresses, ""];
    setProfileData({ ...profileData, addresses: updatedAddresses });
  };

  const handleRemoveAddress = (index) => {
    const updatedAddresses = [...profileData.addresses];
    updatedAddresses.splice(index, 1);
    setProfileData({ ...profileData, addresses: updatedAddresses });
  };

  const hasEmptyAddress = profileData.addresses.some( // To validate if address is empty
    (address) => address.trim() === ""
  );

  const saveProfileData = async () => {
    if (profileData.name.trim() === "" || profileData.phone.trim() === "" || hasEmptyAddress) {
      setInputError(true);
      return;
    }  
    const updatedProfileData = { ...profileData };
    if (newPassword !== "" && confirmNewPassword !== "") {
      updatedProfileData.password = newPassword;
    }
    try {
      await axiosInstance.put("/users/1", updatedProfileData);
      toggleEditMode();
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div>
      <>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Card className="bg-secondary shadow pl-4 pr-4">
            <CardHeader className="bg-white rounded shadow border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">My account</h3>
                </Col>
                <Col className="text-right" xs="4">
                  {!editMode ? (
                    <Btn
                      title="Edit Profile"
                      name="btn btn-primary"
                      onClick={toggleEditMode}
                    />
                  ) : (
                    ""
                  )}
                  <Col className="text-right" xs="12">
                    {editMode ? (
                      <>
                        <Btn
                          title="Save"
                          name="btn btn-primary"
                          onClick={saveProfileData}
                        />
                        <Btn title="Cancel" name="btn btn-secondary" onClick={cancelMode} />            
                      </>
                    ) : (
                      ""
                    )}
                  </Col>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form>
                <div>
                  <Row>
                    <Col>
                      <h6 className="heading-small text-muted mb-4">
                        My information
                      </h6>
                    </Col>
                  </Row>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="2" style={{ height: "150px" }} className="mt-5">
                        <div className="card-profile-image">
                          <a
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={profileData.image}
                            />
                          </a>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      { editMode ? (<Btn
                          title="Change Image"
                          name="btn-sm btn-outline-primary mb-4 ml-4"
                        />):("")}
                      </Col>
                    </Row>
                  </div>
                </div>
                <>
                <Row>
                  <Col>
                  {editMode && inputError && (
                            <Alert color="danger" className="alert-transparent">
                              Complete all required fields
                            </Alert>
                    )}
                  </Col>
                </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Name{editMode?(<span class="required">*</span>):("")}
                        </label>
                        <Col lg="8">
                          {editMode ? (
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              type="text"
                              name="name"
                              value={profileData.name}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <p>{profileData.name}</p>
                          )}
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-mobile-number"
                        >
                          Mobile Number{editMode?(<span class="required">*</span>):("")}
                        </label>
                        <Col lg="8">
                          {editMode ? (
                            <Input
                              className="form-control-alternative"
                              id="input-mobile-number"
                              type="tel"
                              name="phone"
                              value={profileData.phone}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <p>{profileData.phone}</p>
                          )}
                          { phoneError ? (
                            <span className="text-danger">Phone Number must be only numbers</span>
                          ) : ("")}
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Addresses{editMode?(<span class="required">*</span>):("")}
                        </label>
                        <Col lg="12">
                          {editMode ? (
                            <>
                              {profileData.addresses.map((address, index) => (
                                <>
                                  <div className="row">
                                    <Col lg="8">
                                      <Input
                                        key={index}
                                        className="form-control-alternative mb-2"
                                        id={`input-address-${index}`}
                                        type="text"
                                        name="addresses"
                                        value={address}
                                        onChange={(e) =>
                                          handleAddressChange(e, index)
                                        }
                                      />
                                    </Col>
                                    <Col lg="4">
                                      {index !==
                                        profileData.addresses.length && (
                                        <i
                                          className="fa fa-minus-circle text-primary mt-2"
                                          onClick={() =>
                                            handleRemoveAddress(index)
                                          }
                                        ></i>
                                      )}
                                    </Col>
                                  </div>
                                  {index ===
                                    profileData.addresses.length - 1 && (
                                    <button
                                      className="btn-sm btn-outline-primary"
                                      onClick={handleAddAddress}
                                    >
                                      <i className="fa fa-plus-circle"></i>{" "}
                                      Add new address
                                    </button>
                                  )}
                                </>
                              ))}
                            </>
                          ) : (
                            <>
                              {profileData.addresses.map((address, index) => (
                                <p key={index}>{address}</p>
                              ))}
                            </>
                          )}
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      {/* Description */}
                      <label
                        className="form-control-label"
                        htmlFor="input-Bio"
                      >
                        Bio
                      </label>
                      <Col lg="12">
                        {editMode ? (
                          <Input
                            className="form-control-alternative"
                            rows="4"
                            type="textarea"
                            name="bio"
                            value={profileData.bio}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <p>{profileData.bio}</p>
                        )}
                      </Col>
                    </Col>
                  </Row>
                </>

                <hr className="my-4" />
                <h6 className="heading-small text-muted mb-4">
                  Additional Info
                </h6>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-email"
                    >
                      Email address
                    </label>
                    <Col lg="8">
                      <p>{profileData.email}</p>
                    </Col>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label  className="form-control-label"  htmlFor="input-password">Password</label>
                    <Btn title="Change Password" name="btn btn-primary ml-3" onClick={openModal}
                    />
                    <Modal  isOpen={showModal}  toggle={() => setShowModal(false)}>
                      <ModalBody>
                        <span  className="close"  onClick={closeModal}>
                          &times;
                        </span>
                        <h2>Change Password</h2>
                        <Input type="password" name="password" id="new_password" className="form-control mt-5"
                          placeholder="New Password" onChange={handleInputChange}
                        />
                        <Input type="password" name="password" id="confirm_new_password" 
                          className="form-control mt-3" placeholder="Confirm new password" onChange={handleInputChange}
                        />
                        {matchError && (
                          <div className="alert alert-danger mt-3 alert-transparent" role="alert">
                            New password and confirm new password do not match.
                          </div>
                        )}
                        {errorEmpty && (
                          <div className="alert alert-danger mt-3 alert-transparent" role="alert">
                            Please fill in all the fields.
                          </div>
                        )}                      
                        </ModalBody>
                      <ModalFooter>
                        <Btn title="Save" name="btn btn-primary" onClick={handleModalOk}/>
                        <Btn title="Cancel" name="btn btn-secondary" onClick={closeModal}/>
                      </ModalFooter>
                    </Modal>
                  </FormGroup>
                </Col>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </>
    </div>
  );
};

export default Profile;
