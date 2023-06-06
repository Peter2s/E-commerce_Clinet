import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "Dashboard/SharedUI/Input/Input";
import Btn from "Dashboard/SharedUI/Btn/Btn";
import "./AddCategory.css"
import {
  Card,
  CardHeader,
  Container,
  Row,
  Navbar,
} from "reactstrap";

const AddCategory = () => {
  const [image, setImage] = useState("");
  const [name_en, setName_en] = useState("");
  const [name_ar, setName_ar] = useState("");
  const [validation, setValidation] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const catData = { name_en,name_ar,image};

    axios
      .post("http://localhost:8000/categories", catData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    
    <>
    <Navbar />
   
   <Container className="mt--7" fluid>
     {/* Table */}
     <Row>
       <div className="col">
   <Card className="shadow">
   <CardHeader className="border-0">
   <div className=" btntitleproduct row col-12">
     <h3 className="col-6 mb-0">addCategory</h3>
     </div>
   </CardHeader>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                  
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <Input
                        required
                        value={name_en}
                        handleChange={(e) => setName_en(e.target.value)}
                        className="form-control"
                      ></Input>
                      {name_en.length === 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>الاسم</label>
                      <Input
                        value={name_ar}
                        handleChange={(e) => setName_ar(e.target.value)}
                        className="form-control"
                      ></Input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>image</label>
                      <Input
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="form-control"
                      ></Input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <Btn  type="submit" title="Save" className="btn btn-success"/> 
                      <Link to="/" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Card>
    </div>
    </Row>
    </Container>
    </>
  );
};

export default AddCategory;
