import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Container, Row } from "reactstrap";
import { axiosInstance } from "../../../Axios";
import "./AboutUs.css";

const AboutUS = () => {
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/api/v1/settings")
      .then((response) => {
        setSettings(response.data.data);
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
      <p>&nbsp;
        <span className="font-weight-bold">تاريخ الشركة:</span> شرح متى ولماذا تم تأسيس الشركة، وتوفير بعض المعلومات الخلفية عن المؤسسين ورؤيتهم للعمل.</p>
        <p>&nbsp;</p>
        <p><span className="font-weight-bold">بيان الرسالة:</span>
        شارك بيان الرسالة والقيم الخاصة بشركتك، وشرح كيف أنها توجه ممارسات الأعمال الخاصة بك.</p>
        <p>&nbsp;</p>
        <p><span className="font-weight-bold">خط المنتجات:</span> قدم نظرة عامة على أنواع المنتجات التي تبيعها، وأعط بعض الأفكار حول ما يجعلها فريدة أو خاصة.</p>
        <p>&nbsp;</p>
        <p><span className="font-weight-bold">خدمة العملاء:</span> شرح كيف تقدم خدمة العملاء، وتوفر معلومات حول أي سياسات خاصة أو ضمانات تقدمها.</p>
        <p>&nbsp;</p>
        <p><span className="font-weight-bold">الاستدامة:</span> إذا كانت شركتك ملتزمة بالاستدامة أو المصادر الأخلاقية، شرح ممارساتك ومبادراتك في هذا المجال.</p>
        <p>&nbsp;</p>
        <p><span className="font-weight-bold">الشراكات: </span>تسليط الضوء على أي شراكات رئيسية أو التعاون الذي تم التوصل إليه مع شركات أخرى أو منظمات.</p>
        <p>&nbsp;</p>
        <p><span className="font-weight-bold">المشاركة في المجتمع:</span> شارك أي طرق يشارك فيها شركتك في المجتمع، مثل العطاءات الخيرية أو العمل التطوعي.</p>
        <p>&nbsp;</p>
        <p><span className="font-weight-bold">أعضاء الفريق: </span>قدم أعضاء فريقك وتوفير بعض المعلومات عن خلفياتهم وأدوارهم في الشركة.</p>
        <p>&nbsp;</p>
        <p><span className="font-weight-bold">التغطية الإعلامية: </span>إذا تم تمييز شركتك في وسائل الإعلام أو حصلت على أي جوائز، شارك تلك المعلومات ورابطها إلى أي مقالات أو بيانات صحفية ذات الصلة.</p>
        <p>&nbsp;</p><p><span className="font-weight-bold">معلومات الاتصال:</span> توفير معلومات الاتصال لشركتك، بما في ذلك البريد الإلكتروني والهاتف والعنوان الفعلي إذا كان ذلك مناسب</p>
        <p>&nbsp;</p>
      </Row>
    </Container>
  );
};

export default AboutUS;
