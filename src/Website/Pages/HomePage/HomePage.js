import Buttons from "Website/SharedUI/Buttons/Buttons";
import Cards from "Website/SharedUI/Cards/Cards";
import { Col, Row } from "reactstrap";

const Home = () => {
    return (
        <>
            <p>Home page</p>
            <Row className="mr-5">
                <Col lg="3">
            <Cards
            body={
                <img src="https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2Fj4sDV3Q%2Fwatch-5.png&w=1920&q=75" 
                alt="Model1"
                style={{width:"100%"}}
                />
            }
            footer={
                <>
                    <div className="mr-2">
                        <h3>سمارت وتش</h3>
                        <p>سمارت وتش</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Buttons title="إضافة إلى العربة" className="btn btn-outline-dark" />
                        <p>$200.00</p>
                    </div>
                </>
            }
            />
            </Col>

            {/* second card */}
            <Col lg="3">
            <Cards
            body={
                <img src="https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2Fj4sDV3Q%2Fwatch-5.png&w=1920&q=75" 
                alt="Model1"
                style={{width:"100%"}}
                />
            }
            footer={
                <>
                    <div className="mr-2">
                        <h3>سمارت وتش</h3>
                        <p>سمارت وتش</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Buttons title="إضافة إلى العربة" className="btn btn-outline-dark" />
                        <p>$200.00</p>
                    </div>
                </>
            }
            />
            </Col>
            
            </Row>
        </>
    )
}

export default Home;