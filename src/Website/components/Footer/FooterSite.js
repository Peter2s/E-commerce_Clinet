import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faGithub,  } from '@fortawesome/free-brands-svg-icons';
import { Col, Container, Row } from 'reactstrap';
import './FooterSite.css';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const FooterSite = () =>{
    return(
        <>
    <footer id='footerWebsite'>
      <Container>
        <Row>
            <Col lg="6">
                <h3>تواصــل معنــا :</h3><br/>
                <Row>
                    <Col lg="4">
                        <FontAwesomeIcon icon={faEnvelope} className='socialMediaIcons'/>
                        البريد الالكتروني :
                    </Col>
                    <Col lg="5" className='EnglishWords'>e-commerce@gmail.com</Col>
                </Row>
                <Row>
                    <Col lg="4">
                        <FontAwesomeIcon icon={faPhone} className='socialMediaIcons'/>
                        رقم الهاتف :
                    </Col>
                    <Col dir="ltr" lg="5" className='EnglishWords'>+20100000000</Col>
                </Row>
            </Col>
            <Col lg="4">
                <h3>تابعنــا على :</h3><br/>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} size="2x" className='socialMediaIcons'/>
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} size="2x" className='socialMediaIcons' />
                </a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} size="2x" className='socialMediaIcons' />
                </a>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} size="2x" className='socialMediaIcons' />
                </a>
            </Col>
            <Col lg="2">
                <h3>المزيد عنـا :</h3><br/>  
                <Link to="/termsAndConditions">
                    <p className='more'>الشروط والأحكــام</p>
                </Link>
                <Link to="/aboutus">
                    <p className='more'>عنَــا</p>
                </Link>
            </Col>
        </Row>
        <hr className='hrFooter'/>
        <Row className='copyrightsLine'>
            <p className='copyRights'>
                &copy; E-commerce2023.
                جميع الحقوق محفوظة 
            </p>
        </Row>
      </Container>
    </footer>
        </>
    )
}

export default FooterSite;
