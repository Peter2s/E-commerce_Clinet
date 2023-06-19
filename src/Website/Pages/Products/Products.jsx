import NavBar from "../../components/NavBar/NavBar";
import FooterSite from "../../components/Footer/FooterSite";

const Products = () => {
  return (
    <>
      <NavBar />
      {/*<div style={{ minHeight: "670px" }}>*/}
      {/*  <Container>*/}
      {/*    <SearchCountResult*/}
      {/*      onClick={getProduct}*/}
      {/*      title={`هناك ${results} نتيجة بحث`}*/}
      {/*    />*/}
      {/*    <Row className="d-flex flex-row">*/}
      {/*      <Col sm="2" xs="2" md="1" className="d-flex">*/}
      {/*        <SideFilter />*/}
      {/*      </Col>*/}
      {/*      <Col sm="10" xs="10" md="11">*/}
      {/*        <CardProductsContainer products={items} title="" btntitle="" />*/}
      {/*      </Col>*/}
      {/*    </Row>*/}
      {/*    <Pagination pageCount={pageCount} onPress={onPress} />*/}
      {/*  </Container>*/}
      {/*</div>*/}
      <FooterSite />
    </>
  );
};

export default Products;
