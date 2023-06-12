import React, { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { Card, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from "reactstrap";
import Btn from "Dashboard/SharedUI/Btn/Btn";

const ConfirmNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const recaptchaRef = React.createRef();



  const UpdatePassword_URL="reset-password"

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
     // Verify the reCAPTCHA response
     if (!recaptchaValue) {
      
      setErrorMsg("Please complete the reCAPTCHA verification.");
      return;
     }

    try {
      // Send a request to update the password
      const g_recaptcha_response = recaptchaValue;
      const response = await axios.post(UpdatePassword_URL, { email , token , password , confirmPassword , g_recaptcha_response  });

      //AccessToken 
      const token= response?.data?.accessToken
      const email=response?.data?.email
      // Display success message
      setSuccess(true);
    } catch (err) {
      if (!err.response) {
        setErrorMsg("No server response.");
      } else if (err.response.status === 400) {
        setErrorMsg("Invalid request.");
      } else if (err.response.status === 401) {
        setErrorMsg("Unauthorized.");
      } else {
        setErrorMsg("Failed to update password.");
      }
    }
  };
  const handleRecaptchaChange = (value) => {
  
    setRecaptchaValue(value)
    
  };
  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small>Confirm New Password</small>
          </div>
          <Form role="form" onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="New Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="off"
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Lc-uVomAAAAAInllmf4UdvfH3SEQBK95_GWzpwc"
                onChange={handleRecaptchaChange}
              />
            </FormGroup>
            <div className="text-center">
              {success ? (
                <p>Password updated successfully.</p>
              ) : (
                <>
                  {errorMsg && <p>{errorMsg}</p>}
                  <Btn className="btn btn-info" title="Confirm Password" type="submit" />
                </>
              )}
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ConfirmNewPassword;
