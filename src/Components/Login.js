import React, { useEffect } from "react";
import { Button, Row, Form, Modal, Col, Alert, Spinner } from "react-bootstrap";
import { useState } from "react";
import { BiLogIn } from "react-icons/bi";
import "./Login.css";
import Cookies from "universal-cookie";
import { AiOutlineMail } from "react-icons/ai";
import emailjs from "@emailjs/browser";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [testLogin, setTestLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [successfullyChanged, setSuccessfullyChanged] = useState(false);
  const [errorChanged, setErrorChanged] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const [activeSpinner, setActiveSpinner] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onTriger = (email) => {
    props.handleCallback(email);
  };

  const isLogin = () => {
    setActiveSpinner(true);
    let userDetails = {
      email: email,
      password: password,
    };
    fetch("https://winelovers.onrender.com/login", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        setActiveSpinner(false);
        if (json.status === true) {
          setTestLogin(true);
          const cookies = new Cookies();
          cookies.set("email", json.email, { path: "/" });
          onTriger(json.email);
        } else {
          setTestLogin(false);
        }
      });
  };

  //--------------- Email Validation ----------------------
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // ---------------------- Send Email ----------------

  const SendEmail = (newPass) => {
    emailjs
      .send(
        "service_v0wulhc",
        "template_c3rq3x4",
        {
          new_password: newPass,
          email_to: forgotPasswordEmail,
        },
        "WuMNYncc27nq1KILD"
      )
      .then(function (res) {
        setSuccessfullyChanged(true);
        setForgotPasswordEmail("");
        setLoading(false);
      });
  };

  // ----------------- Forgot password chech --------------------
  const forgotPassword = () => {
    setLoading(true);
    setSuccessfullyChanged(false);
    setErrorChanged(false);
    var newPass = Math.random().toString(36).slice(-10);
    setNewPassword(newPass);
    let userDetails = {
      email: forgotPasswordEmail,
      new_password: newPass,
    };
    
    fetch("https://winelovers.onrender.com/forgotPassword", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          SendEmail(newPass);
        } else {
          setLoading(false);
          setErrorChanged(true);
        }
      });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Forgot your password ?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="forgot-password-box">
          <div>
            <Row>
              <Col className="forgot-password-container">
                <h3>Trouble logging in?</h3>
                <br />
                <p>
                  Type your email address and we'll send you a new password.
                </p>
                <br />

                <Form.Control
                  type="search"
                  value={forgotPasswordEmail}
                  placeholder="Enter email"
                  className="email-input"
                  onChange={(e) => {
                    setErrorChanged(false);
                    setForgotPasswordEmail(e.target.value);
                  }}
                />
                {!validateEmail(forgotPasswordEmail) && (
                  <p className="forgot-password-error-message">
                    Wrong email address.{" "}
                  </p>
                )}
                {loading && (
                  <>
                    <br />
                    <Row className="d-flex justify-content-center">
                      <Spinner animation="border" variant="danger" />
                      <br />
                    </Row>
                  </>
                )}
                <br />
                {successfullyChanged && (
                  <Alert variant="success">
                    {" "}
                    <AiOutlineMail className="history-icon" /> Your Password
                    successfully changed! Please check your email address .{" "}
                  </Alert>
                )}

                {errorChanged && (
                  <Alert variant="danger">
                    {" "}
                    <AiOutlineMail className="history-icon" /> Your email
                    address is incorect! Try again!{" "}
                  </Alert>
                )}
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={!validateEmail(forgotPasswordEmail)}
            variant="primary"
            onClick={() => {
              //handleClose()
              forgotPassword();
              //SendEmail();
            }}
          >
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="loginCard">
        <div className="login-text">
          <h1>
            <BiLogIn />
          </h1>
          <p className="login-text-decoration">Login</p>
        </div>

        <hr />

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            {email.length > 0 && email.length < 5 && (
              <p className="alertMessage">
                Email must include at least 5 characters!
              </p>
            )}
            {!testLogin && (
              <p className="alertMessage">
                Email or Password are incorect!Try again!
              </p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  isLogin();
                }
              }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          {activeSpinner && (
            <Row className="d-flex justify-content-center">
              <Spinner animation="border" variant="danger" />
              <br />
              <br />
            </Row>
          )}

          <Row>
            <Button
              variant="primary"
              onClick={isLogin}
              disabled={email === "" || password === "" || email.length < 5}
            >
              Submit
            </Button>
          </Row>
          <br />
          <div className="texts-under-login">
            <p
              onClick={() => {
                handleShow();
              }}
              className="forgot-password-text"
            >
              Forgot your password?
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
