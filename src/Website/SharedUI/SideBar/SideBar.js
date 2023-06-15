import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";

const SideBar = () => {
    return (
    <Col lg="3">
        <Card className="shadow ">
            <CardBody>
                <ul className="sideBar">
                    <Link to="/profile"><li>حســـابي</li></Link>
                    <Link to="/address"><li>عناويني</li></Link>
                    <Link to="/orders"><li>طلبــاتي</li></Link>
                    <hr/>
                    <li className="text-danger text-center">تسجيل الخروج</li>
                </ul>
            </CardBody>
        </Card>
    </Col>
    )
}

export default SideBar;