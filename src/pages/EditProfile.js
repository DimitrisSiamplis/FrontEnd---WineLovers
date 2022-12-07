import React from "react";
import "./EditProfile.css";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { validateEmail } from "./Functions/functions";
// import { Container } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { GrEdit } from "react-icons/gr";

const EditProfile = () => {
  const [user, setUser] = useState([]);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newNumberAddress, setNewNumberAddress] = useState("");

  const cookies = new Cookies();
  var userEmail = cookies.get("email");

  const getUser = (email) => {
    var emailForSearch = email === undefined ? userEmail : email;
    fetch(`https://winelovers.onrender.com/getUser/${emailForSearch}`)
      .then((res) => res.json())
      .then((json) => {
        setUser([json]);
        console.log([json]);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const edit = (firstName, lastName, address, number, mobile) => {
 
    let userDetails = {
      name: firstName + " " + lastName,
      address: address,
      number: number,
      mobile: mobile,
      email: userEmail,
    };
    fetch("http://localhost:3000/editProfile", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setNewFirstName("");
        setNewLastName("");
        setNewEmail("");
        setNewMobile("");
        getUser();
        window.location.reload();
      });
  };

  const onEditHandler = () => {
    var firstName =
      newFirstName === ""
        ? user[0].user.Name.split(" ")[0]
        : newFirstName.trim();
    var lastName =
      newLastName === "" ? user[0].user.Name.split(" ")[1] : newLastName.trim();
    // var email = newEmail === "" ? user[0].user.Email : newEmail.trim();
    var mobile = newMobile === "" ? user[0].user.Mobile : newMobile.trim();
    var address = newAddress === "" ? user[0].user.Address : newAddress.trim();
    var number =
      newNumberAddress === "" ? user[0].user.Number : newNumberAddress.trim();
    //console.log(firstName, lastName, address, number, mobile);
    edit(firstName, lastName, address, number, mobile);
  };

  return (
    <div>
      <div className="title">
        <div className="container py-4">
          <header className="pb-3 mb-4 border-bottom">
            <a className="d-flex align-items-center text-dark text-decoration-none">
              <span className="fs-4">WineLovers Website</span>
            </a>
          </header>{" "}
        </div>
        {user.length !== 0 && (
          <div className="mainDiv">
            <div className="cardStyle">
              <h2 className="formTitle">
                <GrEdit /> Edit Profile
              </h2>

              <Container>
                <Row>
                  <Col xs={6}>
                    <div className="inputDiv">
                      <label className="inputLabel">First Name</label>
                      <input
                        value={newFirstName}
                        type="text"
                        id="editText"
                        placeholder={user[0].user.Name.split(" ")[0]}
                        onChange={(e) => {
                          setNewFirstName(e.target.value);
                        }}
                      />
                    </div>
                    {newFirstName !== "" && newFirstName.length < 5 && (
                      <p className="alertMessage">
                        {" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <strong>Min 5 characters.</strong>{" "}
                      </p>
                    )}
                  </Col>{" "}
                  <Col xs={6}>
                    <div className="buttonWrapper">
                      <button
                        type="submit"
                        id="submitButton"
                        disabled={
                          (newFirstName !== "" && newFirstName.length < 5) ||
                          newFirstName === ""
                        }
                        onClick={onEditHandler}
                        className="submitButton pure-button pure-button-primary"
                      >
                        <span>Edit First Name</span>
                      </button>
                    </div>
                  </Col>
                </Row>{" "}
                <hr />
                <Row>
                  <Col xs={6}>
                    {" "}
                    <div className="inputDiv">
                      <label className="inputLabel">Last Name</label>
                      <input
                        value={newLastName}
                        type="text"
                        id="editText"
                        placeholder={user[0].user.Name.split(" ")[1]}
                        onChange={(e) => {
                          setNewLastName(e.target.value);
                        }}
                      />
                    </div>
                    {newLastName !== "" && newLastName.length < 5 && (
                      <p className="alertMessage">
                        {" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <strong>Min 5 characters.</strong>{" "}
                      </p>
                    )}
                  </Col>
                  <Col xs={6}>
                    <div className="buttonWrapper">
                      <button
                        type="submit"
                        id="submitButton"
                        disabled={
                          (newLastName !== "" && newLastName.length < 5) ||
                          newLastName === ""
                        }
                        onClick={onEditHandler}
                        className="submitButton pure-button pure-button-primary"
                      >
                        <span>Edit Last Name</span>
                      </button>
                    </div>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col xs={6}>
                    <div className="inputDiv">
                      <label className="inputLabel">Address</label>
                      <input
                        value={newAddress}
                        type="text"
                        id="editText"
                        placeholder={user[0].user.Address}
                        onChange={(e) => {
                          setNewAddress(e.target.value);
                        }}
                      />

                      <label className="inputLabel">Number</label>
                      <input
                        value={newNumberAddress}
                        type="text"
                        id="editText"
                        placeholder={user[0].user.Number}
                        onChange={(e) => {
                          setNewNumberAddress(e.target.value);
                        }}
                      />
                    </div>
                    {!newNumberAddress.match(/^\d+$/) &&
                      newNumberAddress !== "" && (
                        <p className="alertMessage">
                          {" "}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <strong>Invalid Number.</strong>{" "}
                        </p>
                      )}
                    {!newAddress.match(/^[a-zA-Z]*$/) && newAddress !== "" && (
                      <p className="alertMessage">
                        {" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <strong>Invalid Address.</strong>{" "}
                      </p>
                    )}
                  </Col>
                  <Col xs={6}>
                    <div className="buttonWrapper">
                      <button
                        type="submit"
                        id="submitButton"
                        disabled={newAddress === "" && newNumberAddress === ""}
                        onClick={() => {
                          onEditHandler();
                          //console.log(newAddress, newNumberAddress);
                        }}
                        className="submitButton pure-button pure-button-primary"
                      >
                        <span>Edit Address</span>
                      </button>
                    </div>
                  </Col>
                </Row>{" "}
                <hr />
                <Row>
                  <Col xs={6}>
                    {" "}
                    <div className="inputDiv">
                      <label className="inputLabel">Mobile</label>
                      <input
                        value={newMobile}
                        type="text"
                        id="editText"
                        placeholder={user[0].user.Mobile}
                        onChange={(e) => {
                          setNewMobile(e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="buttonWrapper">
                      <button
                        type="submit"
                        id="submitButton"
                        disabled={
                          (newMobile !== "" &&
                            (newMobile.length < 10 || newMobile.length > 10)) ||
                          newMobile === "" ||
                          newMobile[0] !== "6" ||
                          newMobile[1] !== "9" ||
                          isNaN(newMobile)
                        }
                        onClick={onEditHandler}
                        className="submitButton pure-button pure-button-primary"
                      >
                        <span>Edit Mobile</span>
                      </button>
                    </div>
                  </Col>
                </Row>
                <hr />
              </Container>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
