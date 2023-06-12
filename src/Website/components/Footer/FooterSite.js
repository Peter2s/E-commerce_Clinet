import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Col, Container, Row } from 'reactstrap';
import './FooterSite.css';

const FooterSite = () =>{
    return(
        <>
    <footer id='footerWebsite'>
      <Container>
        <Row>
            <Col>
                <h4>Get in touch</h4>
                <p>Email: emangaamal@gmail.com</p>
                <p>Mobile: +20100000000</p>
            </Col>
            <Col>
                <button className='btn btn-outline-dark'>Contact Me</button>
            </Col>
            <Col>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <p>Copyright &copy; 2023</p>
            </Col>
        </Row>
      </Container>
    </footer>
        </>
    )
}

export default FooterSite;
