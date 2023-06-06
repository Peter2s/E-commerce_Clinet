import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "Dashboard/SharedUI/Input/Input";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Navbar,
} from "reactstrap";
const AddProduct = () => {
  const [name_en, setName_en] = useState("");
  const [name_ar, setName_ar] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [validation, setValidation] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { name_en,name_ar, image, category, description,price,quantity };

    axios
      .post("http://localhost:8000/products", productData, {
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
  <h3 className="col-6 mb-0">Add products</h3>
  </div>
</CardHeader>

<div className="row">
         <div className="offset-lg-3 col-lg-6">
           <form className="container" onSubmit={handleSubmit}>
             <div className="card" style={{ textAlign: "left" }}>
                <label>Name</label>
            <Input 
             onMouseDown={(e) => setValidation(true)}
              onChange={(e) => setName_en(e.target.value)}
              className="form-control"
              type="text" name="categoryName_en" value={name_en} id="categoryName"/>
              <label>الاسم</label>
            <Input 
             onMouseDown={(e) => setValidation(true)}
              onChange={(e) => setName_ar(e.target.value)}
              className="form-control"
              type="text" name="categoryName_en" value={name_ar} id="categoryName"/>
     
            <label>Image</label>
              <Input type="file" className="form-control" value={image} handleChange={(e)=> setImage(e.target.value)}></Input>
              <label>Category</label>
              <Input type="text" className="form-control" value={category} handleChange={(e)=> setCategory(e.target.value)}></Input>
              <label>description</label>
              <Input type="text" className="form-control" value={description} handleChange={(e)=> setDescription(e.target.value)}></Input>
              <label>Price</label>
              <Input type="text" className="form-control" value={price} handleChange={(e)=> setPrice(e.target.value)}></Input>
              <label>Quantity</label>
              <Input type="text" className="form-control" value={quantity} handleChange={(e)=> setQuantity(e.target.value)}></Input>
      <div className="col-lg-12">
                    <div className="form-group">
                     <button className="btn btn-success" type="submit">
                     Save
                     </button>
                     <Link to="/" className="btn btn-danger">
                     Back
                      </Link>
                   </div>
    /             </div>
     </div>
     </form>
     </div>
     </div>
     </Card>
</div>
</Row>
</Container>
    </>
   
    // <div className="row">
    //     <div className="offset-lg-3 col-lg-6">
    //       <form className="container" onSubmit={handleSubmit}>
    //         <div className="card" style={{ textAlign: "left" }}>
    //         
    //  <label>Name</label>
    //   <Input type="text" name="categoryName" value={name} id="categoryName" handleChange={(e)=> setName(e.target.value)}></Input>
    // </div>
    // </form>
    // </div>
    // </div>
    // <div>
    //   <div className="row">
    //     <div className="offset-lg-3 col-lg-6">
    //       <form className="container" onSubmit={handleSubmit}>
    //         <div className="card" style={{ textAlign: "left" }}>
    //           <div className="card-title">
    //             <h2>Add Category</h2>
    //           </div>
    //           <div className="card-body">
    //             <div className="row">
    //               <div className="col-lg-12">
    //                 <div className="form-group">
    //                   <label>ID</label>
    //                   <input
    //                     value={id}
    //                     disabled="disabled"
    //                     className="form-control"
    //                   ></input>
    //                 </div>
    //               </div>
    //               <div className="col-lg-12">
    //                 <div className="form-group">
    //                   <label>Name</label>
    //                   <input
    //                     required
    //                     value={name}
    //                     onMouseDown={(e) => setValidation(true)}
    //                     onChange={(e) => setName(e.target.value)}
    //                     className="form-control"
    //                   ></input>
    //                   {name.length === 0 && validation && (
    //                     <span className="text-danger">Enter the name</span>
    //                   )}
    //                 </div>
    //               </div>
    //               <div className="col-lg-12">
    //                 <div className="form-group">
    //                   <label>Image</label>
    //                   <input
    //                     value={email}
    //                     onChange={(e) => setEmail(e.target.value)}
    //                     className="form-control"
    //                   ></input>
    //                 </div>
    //               </div>
    //               <div className="col-lg-12">
    //                 <div className="form-group">
    //                   <label>Phone</label>
    //                   <input
    //                     value={phone}
    //                     onChange={(e) => setPhone(e.target.value)}
    //                     className="form-control"
    //                   ></input>
    //                 </div>
    //               </div>
    //               <div className="col-lg-12">
    //                 <div className="form-check">
    //                   <input
    //                     checked={active}
    //                     onChange={(e) => setActive(e.target.checked)}
    //                     type="checkbox"
    //                     className="form-check-input"
    //                   ></input>
    //                   <label className="form-check-label">Is Active</label>
    //                 </div>
    //               </div>
    //               <div className="col-lg-12">
    //                 <div className="form-group">
    //                   <button className="btn btn-success" type="submit">
    //                     Save
    //                   </button>
    //                   <Link to="/" className="btn btn-danger">
    //                     Back
    //                   </Link>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AddProduct;
