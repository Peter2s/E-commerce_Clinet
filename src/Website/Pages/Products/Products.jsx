import { Col, Container, Row } from "reactstrap";
import { CardProductsContainer } from "../../components/Products/CardProductsContainer";
import { AllProductsHook } from "../../hook/Products/AllProductsHook";
import { SideFilter } from "../../components/Uitily/SideFilter";

const Products = () => {
  const [products, loading] = AllProductsHook();
  return (
    <>
      <div style={{ minHeight: "670px" }}>
        <Container>
          {/*<SearchCountResult*/}
          {/*  onClick={getProduct}*/}
          {/*  title={`هناك ${results} نتيجة بحث`}*/}
          {/*/>*/}
          <Row className="d-flex flex-row">
            <Col sm="2" xs="2" md="1" className="d-flex">
              <SideFilter />
            </Col>
            <Col sm="10" xs="10" md="11">
              <CardProductsContainer products={products} title="" btntitle="" />
            </Col>
          </Row>
          {/*<Pagination pageCount={pageCount} onPress={onPress} />*/}
        </Container>
      </div>
    </>
  );
};

export default Products;
