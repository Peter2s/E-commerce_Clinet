import { useState } from "react";
import TermsAndConditions from "Dashboard/Components/TermsAndConditions/TermsAndConditions";
import WebsiteInfo from "Dashboard/Components/WebsiteInfo/WebsiteInfo";
import "./Setting.css";

import { Container, Row, Navbar, Card } from "reactstrap";
import Btn from "Dashboard/SharedUI/Btn/Btn";

// core components

const Setting = () => {
  const [activeLink, setActiveLink] = useState("website-info");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <Navbar />
      <Container className="mt--7" fluid>
      <Row>
  <div className="col">
    <span
      onClick={() => handleLinkClick("website-info")}
      style={{ cursor: "pointer" }}
      className={activeLink === "website-info" ? "active-link" : ""}
    >
<Btn
  title="Website Information"
  className="btn"
  style={{
    background: activeLink === "website-info" ? "linear-gradient(to bottom, lightgray, white)" : "linear-gradient(to right, white, white)",
  }}
/>
    </span>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span
      onClick={() => handleLinkClick("terms-and-conditions")}
      style={{ cursor: "pointer" }}
      className={activeLink === "terms-and-conditions" ? "active-link" : ""}
    >
      <Btn title="Terms and Conditions" className="btn" style={{    background: activeLink === "terms-and-conditions" ? "linear-gradient(to bottom, lightgray, white)" : "linear-gradient(to right, white, white)",
}} />
    </span>
    {activeLink === "website-info" && <WebsiteInfo />}
    {activeLink === "terms-and-conditions" && <TermsAndConditions />}
  </div>
</Row>

      </Container>
    </>
  );
};

export default Setting;
