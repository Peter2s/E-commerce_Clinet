import {
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
  } from "reactstrap";
  import { useState  } from "react";
  import Btn from "Dashboard/SharedUI/Btn/Btn";
import axios from "../../../api/axios"
import {  Navigate } from "react-router-dom";

 const ResetPassword_URL="/login"
const ForgetPssword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handelSubmit=async (e)=>
  {
    try{
      const response = await axios.post(ResetPassword_URL,{email});
      // const token=response?.data?.token
      console.log(JSON.stringify(response?.data))
      setSuccess(true)
      Navigate.path("/reset-password")
    }
    catch(err){
      if(!err?.response){
        setErrorMsg("no server response ")
      }
      else if(err.response?.staus === 400){
        setErrorMsg("missing user name or password ")
      }else if(err.response?.staus === 401){
        setErrorMsg("unauthorized")
      }
      else {
        setErrorMsg("login failed ")
  
        }
      }
    }

    return (
    <Col lg="5" md="7" >
      <Card className="bg-secondary shadow border-0" >
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small>Forget Password</small>
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
                 onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <div className="text-center">
            <div className="text-center">
              {success ? (
                <p>Reset password email sent successfully.</p>
              ) : (
                <>
                  {errorMsg && <p>{errorMsg}</p>}
                  <Btn className="btn btn-info" title="Reset Password" type="submit" />
                </>
              )}
            </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
    );
}

export default ForgetPssword