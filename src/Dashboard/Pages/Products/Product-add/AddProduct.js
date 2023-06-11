import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "Dashboard/SharedUI/Input/Input";
import { Card, CardHeader, Container, Navbar, Row } from "reactstrap";
import Form from "react-bootstrap/Form";
import { axiosInstance } from "../../../../Axios";

const AddProduct = () => {
  const [name_en, setName_en] = useState("");
  const [name_ar, setName_ar] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [validation, setValidation] = useState(false);

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const CategoriesURL = "api/v1/categories";
  const ProductsURL = "api/v1/products";

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      name_en,
      name_ar,
      image,
      category,
      descriptionEn,
      descriptionAr,
      price,
      quantity,
    };

    axiosInstance
      .post(ProductsURL, productData, {
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
  const getCategories = async () => {
    const res = await axiosInstance.get(CategoriesURL);
    console.log(res.data);
    setCategories(res.data.data);
  };
  useEffect(async () => {
    await getCategories();
  }, []);

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
            </Card>

            <div className="row">
              <div className="offset-lg-3 col-lg-6">
                <form className="container mt-2" onSubmit={handleSubmit}>
                  <label>Name</label>
                  <Input
                    onMouseDown={(e) => setValidation(true)}
                    onChange={(e) => setName_en(e.target.value)}
                    Class={"form-control"}
                    type="text"
                    name="categoryName_en"
                    value={name_en}
                  />
                  <label>الاسم</label>
                  <Input
                    onMouseDown={(e) => setValidation(true)}
                    onChange={(e) => setName_ar(e.target.value)}
                    Class={"form-control"}
                    type="text"
                    name="categoryName_en"
                    value={name_ar}
                  />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Description </Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>الوصف</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                  <label>Image</label>
                  <Input
                    type="file"
                    Class={"form-control"}
                    value={image}
                    handleChange={(e) => setImage(e.target.value)}
                  ></Input>
                  <label>Images</label>
                  <input
                    type="file"
                    Class={"form-control"}
                    value={images}
                    onChange={(e) => setImage(e.target.value)}
                    multiple="true"
                  />
                  <label>Category</label>
                  <select className="form-control" aria-label="Category">
                    <option selected>Select product category</option>
                    {categories.map((category) => (
                      <option value={category._id}>{category.name_en}</option>
                    ))}
                  </select>
                  <label>Price</label>
                  <Input
                    type="text"
                    Class={"form-control"}
                    value={price}
                    handleChange={(e) => setPrice(e.target.value)}
                  ></Input>
                  <label>Quantity</label>
                  <Input
                    type="text"
                    Class={"form-control"}
                    value={quantity}
                    handleChange={(e) => setQuantity(e.target.value)}
                  ></Input>
                  <div className="col-lg-12 mt-3">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/admin/products" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AddProduct;
