import React from "react";
import "./Register.css";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Alert,
  Modal,
  Spinner,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { BiRegistered } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import emailjs from "@emailjs/browser";

const Register = () => {
  let history = useHistory();
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [sex, setSex] = useState("Male");
  const [isOkForRegister, setIsOkForRegister] = useState(true);

  const [userAlreadyExist, setUserAlreadyExist] = useState(false);
  const [succesfullyRegister, setSuccesfullyRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [noConfirmPassword, setNoConfirmPassword] = useState("");
  const [passwordIsConfirm, setPasswordIsConfirm] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      age !== "" &&
      email !== "" &&
      email.length > 4 &&
      password !== "" &&
      password.length > 4 &&
      passwordConfirm !== "" &&
      password === passwordConfirm &&
      address !== "" &&
      number !== "" &&
      phone !== "" &&
      birthday !== ""
    ) {
      setIsOkForRegister(false);
    } else {
      setIsOkForRegister(true);
    }
  }, [
    firstName,
    lastName,
    age,
    email,
    password,
    passwordConfirm,
    address,
    number,
    phone,
  ]);

  const onRegisterHandler = () => {
    setLoading(true);
    setSuccesfullyRegister(false);
    sendEmail();
  };

  const registerUser = () => {
    var useDetails = {
      name: firstName + " " + lastName,
      age: age,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      address: address,
      number: number,
      phone: phone,
      birthday: birthday,
      sex: sex,
    };
    fetch("https://winelovers.onrender.com/register", {
      method: "POST",
      body: JSON.stringify({ useDetails }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.alreadyExist) {
          setSuccesfullyRegister(false);
          setUserAlreadyExist(true);
        } else {
          setSuccesfullyRegister(true);
          onClearHandler();
          history.push("/");
        }
        setLoading(false);
      });
  };

  const onClearHandler = () => {
    setUserAlreadyExist(false);
    setFirstName("");
    setLastName("");
    setAge("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setAddress("");
    setNumber("");
    setPhone("");
    setBirthday("");
    setSex("");
  };

  const sendEmail = () => {
    var randomPass = Math.floor(1000 + Math.random() * 9000);
    setConfirmPassword(randomPass);
    emailjs
      .send(
        "service_fhwf3t6",
        "template_vtomkos",
        {
          reply_to: email,
          name: firstName + " " + lastName,
          password: randomPass,
        },
        "IPOVb7KGIQxotCGCQ"
      )
      .then(function (res) {
        console.log(res.status);
        if (res.status === 200) {
          handleShow();
          setLoading(false);
        } else {
          alert("Something Went Wrong!");
          setLoading(false);
        }
      });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="_ _ _ _"
                autoFocus
                value={noConfirmPassword}
                onChange={(e) => {
                  if (e.target.value.length < 5) {
                    setNoConfirmPassword(e.target.value);
                  }
                }}
              />
            </Form.Group>
          </Form>
          {!passwordIsConfirm && (
            <Alert variant="danger">Confirmation Failed! Wrong password!</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (noConfirmPassword == confirmPassword) {
                setLoading(true);
                setPasswordIsConfirm(true);
                handleClose();
                registerUser();
              } else {
                setPasswordIsConfirm(false);
              }
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="loginCard">
        <div className="login-text">
          <h1>
            <BiRegistered />
          </h1>
          <p className="login-text-decoration">&nbsp;Register</p>
        </div>

        <hr />

        <Form>
          <Container>
            <Row>
              <Col xs={deviceSize < 900 ? 12 : 6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={deviceSize < 700 ? 12 : 6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    placeholder="Last Name"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={deviceSize < 700 ? 12 : 6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={deviceSize < 700 ? 12 : 6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={phone}
                    placeholder="Phone"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={deviceSize < 700 ? 12 : 6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    placeholder="Email"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={deviceSize < 700 ? 12 : 6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Comfirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={passwordConfirm}
                    placeholder="Phone"
                    onChange={(e) => {
                      setPasswordConfirm(e.target.value);
                    }}
                  />
                </Form.Group>
                {password !== "" &&
                  passwordConfirm !== "" &&
                  password !== passwordConfirm && (
                    <p className="alertMessage">Passwords do not match!</p>
                  )}
              </Col>
            </Row>

            <Row>
              <Col xs={deviceSize < 700 ? 12 : 6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={address}
                    placeholder="Address"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={deviceSize < 700 ? 12 : 6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={number}
                    placeholder="Number"
                    onChange={(e) => {
                      setNumber(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={deviceSize < 700 ? 12 : 6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    placeholder="Birthday"
                    onChange={(e) => {
                      setBirthday(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={deviceSize < 700 ? 12 : 6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Sex</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => {
                      setSex(e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={deviceSize < 700 ? 12 : 6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    value={age}
                    placeholder="Age"
                    min="18"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {succesfullyRegister && (
                <Alert variant="success">User Succefully Register!</Alert>
              )}
              {userAlreadyExist && (
                <Alert variant="danger">User Already Exist!</Alert>
              )}
            </Row>
          </Container>
          {loading && (
            <Row>
              <div className="spinner-conteiner">
                <Spinner
                  animation="border"
                  variant="danger"
                  className="center"
                />
              </div>
            </Row>
          )}
          <Button
            variant="primary"
            disabled={isOkForRegister}
            onClick={onRegisterHandler}
          >
            Create account
          </Button>{" "}
          &nbsp;&nbsp;&nbsp;
          <Button variant="warning" onClick={onClearHandler}>
            Clear
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
