import React, { useState } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, Container, Button } from "reactstrap";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

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
        toast.success(res.data.msg);
        setCodeSent(true);
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
        toast.success(res.data.msg);
      })
      .catch((err) => toast.error(err.response.data.msg));
  };

  return (
    <div className="App">
      <Container>
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Label>Phone number</Label>
            <Input
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Please enter phone number"
            />
            <Button type="submit" disabled={codeSent}>
              Submit
            </Button>
          </FormGroup>
        </Form>
        {codeSent && (
          <Form onSubmit={onSubmitCode}>
            <FormGroup>
              <Label>Access Code</Label>
              <Input
                type="text"
                onChange={(e) => setCode(e.target.value)}
                placeholder="Please enter the access code"
              />
              <Button type="submit">Submit</Button>
            </FormGroup>
          </Form>
        )}
      </Container>
      <ToastContainer />
    </div>
  );
};

export default App;
