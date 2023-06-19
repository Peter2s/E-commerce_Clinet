import { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import { axiosInstance } from "../../../Axios";
import "./AboutUs.css";

const AboutUS = () => {
  const [aboutus, setAboutus] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/about-us")
      .then((response) => {
        setAboutus(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container fluid>
      <Row>
      {/* https://assets-global.website-files.com/6152b2d34ca06b6d275dd66e/6152b2d34ca06b8ff65dddde_digi-auto-billing.png */}
      {/* src="https://assets-global.website-files.com/6152b2d34ca06b6d275dd66e/615e78b99d4c8d84eeb0edd4_digi-shopping-catalogue.png" */}

        <img
          src="https://assets-global.website-files.com/6152b2d34ca06b6d275dd66e/6152b2d34ca06b8ff65dddde_digi-auto-billing.png"
          alt="about us banner"
          className="aboutUsBanner"
        />
        <h1 className="aboutUsTitle">من نحــن؟</h1>
      </Row>
      <Row className="row aboutUsContent">
        <div dangerouslySetInnerHTML={{ __html: aboutus }} />
      </Row>
    </Container>
  );
};

export default AboutUS;
