import SideBar from "Website/SharedUI/SideBar/SideBar";
import { Container, Row } from "reactstrap";

const Orders = () => {
    return (
        <Container fluid className="mt-4">
            <Row>
                <SideBar/>
            </Row>
        </Container>
    )
}

export default Orders;