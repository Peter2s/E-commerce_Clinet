import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import SideBar from "Website/SharedUI/SideBar/SideBar";
import { Card, CardHeader, Col, Container, Row } from "reactstrap";
import { axiosInstance } from "../../../../Axios";
import { Link } from "react-router-dom";
import "./AddressList.css";
import Buttons from "Website/SharedUI/Buttons/Buttons";

const Address = () => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("profile/address")
      .then((response) => {
        if (response.data.status === "success") {
          setAddresses(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeleteAddress = (id) => {
    axiosInstance
      .delete(`profile/address/${id}`)
      .then((response) => {
        if (response.data.status === "success") {
          setAddresses(addresses.filter((address) => address._id !== id));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirmDelete = (id) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لا يمكنك التراجع عن هذا الإجراء!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذفها!",
      cancelButtonText: "لا، إلغاء الأمر",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteAddress(id);
        Swal.fire("تم الحذف", "تم حذف العنوان بنجاح.", "success");
      }
    });
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <SideBar />
        <Col lg="8">
          <Card className="shadow px-4">
            <CardHeader className="row">
              <div className="col-md-6">
                <h2>العنــواين</h2>
              </div>
              <div className="col-md-6 text-md-left">
              <Link to={`/address/add`}>
                <Buttons
                  className="btn btn-outline-warning"
                  title="إضافة عنـوان جديد"
                />
                </Link>
              </div>
            </CardHeader>
            <div className="row">
            {addresses.map((address, index) => (
              <div className="addressDetails shadow col-4 ml-auto" key={index}>
                <h4>{address.area}</h4>
                <p>
                  {address.city}, {address.governorate}, {address.country}
                </p>
                <div className="addressIcons text-md-left">
                  <Link to={`/address/${address._id}/edit`} className="edit-icon">
                    <Buttons className="btn-sm btn-outline-primary m-2"
                    title={<i className="fa fa-edit"></i>}/>
                  </Link>
                  <Buttons
                    className="btn-sm btn-outline-danger delete-icon"
                    title={<i className="fa fa-trash"></i>}
                    onClick={() => handleConfirmDelete(address._id)}
                  />
                </div>
              </div>
            ))}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Address;