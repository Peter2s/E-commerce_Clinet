/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useRef,useState,useEffect, Fragment ,useContext} from "react";
import AuthContext from "Context/Authentication ";
import { axiosInstance } from "Axios.js";
import { Link } from "react-router-dom";
import Btn from "Dashboard/SharedUI/Btn/Btn";
import { useNavigate } from "react-router-dom";

const Login_URL="admin/auth"
const Login = () => {
  const {setAuthUser,setUserToken} = useContext(AuthContext)
  const userRef= useRef()
  const errRef= useRef()

  const [user,setuser]=useState('')
  const [password,setpassword]=useState('')
  const [errmsg,seterrmsg]=useState('')
  const [success,setsuccess]=useState(false)

const Navigate =useNavigate()

  useEffect(()=>{
    userRef.current.focus()
  },[])

  useEffect(()=>{
    seterrmsg('')
},[user,password])


const handelSubmit = async (e)=>
{
  e.preventDefault();
 
  try{
    const response = await axiosInstance.post(Login_URL,{email:user,password},
    {
      headers:{"Content-Type":"application/json"},
    })
    console.log(response?.data.data.user)
    const authUser = response?.data.data.user;
    const accessToken =  response?.data.data.token;
    localStorage.setItem("token", accessToken);
    setAuthUser(authUser);
    setUserToken(accessToken);
    setuser('');
    setpassword('');
    setsuccess(true);
    Navigate("/admin");
  }
  catch(err){
    console.error(err.response.data.message)
    const erorr = err.response.data.message
    seterrmsg(erorr)
      errRef.current.focus();
    }
}


  return (

    <>
      {success ? (
        <section >
        <p> loged in success </p>
        {Navigate("/admin")}
        </section>
      ):(


      <Col lg="5" md="7" >
        <Card className="bg-secondary shadow border-0" >
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
            <p ref={errRef} className="text-danger"
            aria-live="assertive">{errmsg}</p>
              <small>Sign in</small>
            </div>
            <Form role="form" onSubmit={handelSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input 
                    placeholder="Email"
                    type="email"
                    id="email"
                    autoComplete="off"
                    ref={userRef}
                    onChange={(e)=>{setuser(e.target.value)}}
                    value={user}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    id="email"
                    onChange={(e)=>{setpassword(e.target.value)}}
                    value={password}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Btn className="btn btn-info" type="submit" title=" Sign in "/>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
              <Link to="/auth/reset-password-token" >Forget password? </Link>
          </Col>
         </Row>
      </Col>
      )}
    </>
  )}


export default Login;
