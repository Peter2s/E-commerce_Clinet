import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "Dashboard/SharedUI/Input/Input";
import Btn from "Dashboard/SharedUI/Btn/Btn";
import { FormGroup } from "reactstrap";

const UpdateCategory = ({ categoryId }) => {
  const [id, setId] = useState(categoryId);
  const [name_en, setName_en] = useState("");
  const [name_ar, setName_ar] = useState("");
  const [file, setFile] = useState(null);
  const [validation, setValidation] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the category data based on the categoryId
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/categories/${id}`
        );
        const categoryData = response.data;
        // Update the state with the retrieved category data
        setName_en(categoryData.name_en);
        setName_ar(categoryData.name_ar);
        setFile(categoryData.file);
      } catch (error) {
        console.log(error.message);
      }
    };

    // Fetch the category data only if categoryId is provided
    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new form data object
    const newCatData = new FormData();
    newCatData.append("id", id);
    newCatData.append("name_en", name_en);
    newCatData.append("name_ar", name_ar);
    newCatData.append("image", file);

    
    // const image=file
    // const catData = { id, name_en, name_ar, image };

    axios
      .post(`http://localhost:8000/categories/${id}`, newCatData, {
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
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Update Category</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <Input
                        required
                        value={name_en}
                        onChange={(e) => setName_en(e.target.value)}
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
                        onChange={(e) => setName_ar(e.target.value)}
                        className="form-control"
                      ></Input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                  <FormGroup>
                  <label for="image">
                     Upload image
                  </label><br/>
                <Input
                  name="image"
                 type="file"
                  />
                  </FormGroup>
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
    </div>
  );
};

export default UpdateCategory;
