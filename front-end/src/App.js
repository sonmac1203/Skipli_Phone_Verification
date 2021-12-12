import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  FormGroup,
  Input,
  Container,
  Button,
  Row,
  Col,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ phoneNumber: phone });

    axios
      .post(
        "https://us-central1-skipli-1a233.cloudfunctions.net/api/create",
        body,
        config
      )
      .then((res) => {
        setCodeSent(true);
        toast.success(res.data.msg);
      })
      .catch((err) => toast.error(err.response.data.msg));
  };

  const onSubmitCode = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ phoneNumber: phone, accessCode: code });

    axios
      .post(
        "https://us-central1-skipli-1a233.cloudfunctions.net/api/validate",
        body,
        config
      )
      .then((res) => {
        setCodeVerified(true);
        toast.success(res.data.msg);
      })
      .catch((err) => toast.error(err.response.data.msg));
  };

  return (
    <div className="App text-center">
      <Container className="mt-5">
        <h1>{!codeVerified ? "Welcome" : "Verification completed!"}</h1>
        <Row className="mt-4">
          <Col lg={{ offset: 4, size: 4 }}>
            <Form onSubmit={onSubmit}>
              <FormGroup className="d-flex align-items-center">
                <Input
                  type="tel"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="me-1"
                />
                <Button type="submit" disabled={codeSent} color="warning">
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>

        {codeSent && (
          <Row>
            <Col lg={{ offset: 4, size: 4 }}>
              <Form onSubmit={onSubmitCode}>
                <FormGroup className="d-flex align-items-center">
                  <Input
                    type="text"
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Access code"
                    className="me-1"
                  />
                  <Button type="submit" color="warning" disabled={codeVerified}>
                    Submit
                  </Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        )}
      </Container>
      <ToastContainer />
    </div>
  );
};

export default App;
