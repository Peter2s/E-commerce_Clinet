import { Col, Container, Row } from "reactstrap";
import { CardProductsContainer } from "../../components/Products/CardProductsContainer";
import { AllProductsHook } from "../../hook/Products/AllProductsHook";
import { SideFilter } from "../../components/Uitily/SideFilter";
import React, { useState } from "react";

const Products = () => {
  const [products, loading] = AllProductsHook();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const updateCategory = (categoryId) => {
    setSelectedCategory(categoryId === "0" ? null : categoryId);
  };

  const updatePriceFrom = (value) => {
    setPriceFrom(value);
  };

  const updatePriceTo = (value) => {
    setPriceTo(value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category_id._id === selectedCategory;
  
    const matchesPrice =
      (!priceFrom || product.price >= parseInt(priceFrom)) &&
      (!priceTo || product.price <= parseInt(priceTo));
  
    return matchesCategory && matchesPrice;
  });
  

  return (
    <>
      <div style={{ minHeight: "670px" }}>
        <Container>
          <Row className="d-flex flex-row">
            <Col sm="2" xs="2" md="1" className="d-flex">
              <SideFilter
                updateCategory={updateCategory}
                updatePriceFrom={updatePriceFrom}
                updatePriceTo={updatePriceTo}
              />
            </Col>
            <Col sm="10" xs="10" md="11">
              <CardProductsContainer products={filteredProducts} title="" btntitle="" />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Products;
