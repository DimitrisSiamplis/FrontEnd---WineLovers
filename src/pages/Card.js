import React from "react";
import "./Card.css";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Alert, Modal, Button } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineMail } from "react-icons/ai";
import { IoArrowBack } from "react-icons/io5";
import { FaWineBottle } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";

const Card = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [kindPayment, setKindPayment] = useState("delivery");
  const [address, setAddress] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [userDetails, setUseretails] = useState([]);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });

  const cookies = new Cookies();
  var userEmail = cookies.get("email");

  useEffect(() => {
    setEmail(userEmail);
  }, []);

  // console.log(cookies.get("card"));

  // ------------ Get user Details -----------------
  const getUser = () => {
    fetch(`https://winelovers.onrender.com/getUser/${userEmail}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.user);
        setAddress(json.user.Address + " " + json.user.Number);
        setPhoneNum(json.user.Mobile);
        setUseretails([json]);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  var cardDetails =
    cookies.get("card") === "" || cookies.get("card") === undefined
      ? []
      : cookies.get("card").split("|");

  const [card, setCard] = useState(cardDetails);

  // -------- Delete from Card ----------
  const onDeletefromCard = (item) => {
    var cardCookies = cookies.get("card");
    var cardArray = cardCookies.split("|");
    cardArray = cardArray.filter((word) => word !== item);

    if (cardArray === [""]) {
      cookies.remove("card");
      // cookies.set("card", undefined , { path: "/" });
      setCard([]);
    } else {
      cookies.set("card", cardArray.join("|"), { path: "/" });
      setCard(cardArray);
    }
  };

  useEffect(() => {
    if (card.length === 0) {
      setTotalPrice(0);
    } else {
      var total_price = 0;
      for (const key in card) {
        total_price =
          Number(total_price) +
          Number(card[key].split(",")[5] * card[key].split(",")[7]);
      }
      setTotalPrice(total_price);
    }
  }, [card]);

  //--------------- Email Validation ----------------------
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //----------------- Complete Order-----------------
  const onCreateOrder = () => {
    var wineList = [];
    var amounts = [];
    for (const key in card) {
      wineList.push(card[key].split(",")[0]);
      amounts.push(card[key].split(",")[7]);
    }

    let cardDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      zipCode: zipCode,
      phoneNum: phoneNum,
      kindPayment: kindPayment,
      totalPrice: totalPrice,
      wineList: wineList,
      amounts: amounts,
      kindPayment: kindPayment,
    };

    fetch("https://winelovers.onrender.com/completeOrder", {
      method: "POST",
      body: JSON.stringify(cardDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setOrderCompleted(true);
        cookies.remove("card");

        setCard([]);

        try {
          SendEmail(wineList, json.id);
        } catch (err) {
          console.log(err);
        }
        handleClose();
      });
  };

  // ---------------------- Send Email ----------------

  const SendEmail = (wineList, id) => {
    console.log(email);
    emailjs
      .send(
        "service_v0wulhc",
        "template_wz5m9wr",
        {
          email_to: email,
          name: firstName + " " + lastName,
          order_id: id,
          wines: wineList.length,
          total_price: totalPrice,
          address: address + "," + zipCode,
          kind_payment: kindPayment,
        },
        "WuMNYncc27nq1KILD"
      )

      .then(function (res) {
        console.log("Success");
        //alert("Success");
      });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>Complete Order? Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onCreateOrder}>
            Complete Order
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="title">
        <div className="container py-4">
          <header className="pb-3 mb-4 border-bottom">
            <a className="d-flex align-items-center text-dark text-decoration-none">
              <span className="fs-4">
                <BsFillCartCheckFill className="initial-icons" />
                &nbsp; Shopping card
              </span>
            </a>
          </header>{" "}
        </div>
        <Row>
          <Col xs={deviceSize < 800 ? 12 : 8}>
            <div className="product-details mr-2">
              {/* <Button
                variant="dark"
                onClick={() => {
                  window.history.go(-1);
                }}
              >
                <IoArrowBack className="continie-shopping-icon" /> Continue
                Shopping
              </Button> */}

              {card.length === 0 && (
                <Alert
                  className={
                    deviceSize < 800 ? "emptyAlert-responsive" : "emptyAlert"
                  }
                  variant="warning"
                >
                  <FaWineBottle className="history-icon" /> The Card is Empty!
                  Add some wines!
                </Alert>
              )}

              {orderCompleted === true && (
                <Alert
                  className={
                    deviceSize < 800 ? "emptyAlert-responsive" : "emptyAlert"
                  }
                  variant="success"
                >
                  <AiOutlineMail className="history-icon" /> Your Order
                  Succesfully Completed! Please check your email address!
                </Alert>
              )}

              {card.length !== 0 && (
                <div>
                  <div className="d-flex justify-content-between">
                    <span>
                      You have <strong>{card.length} items</strong> in your card
                    </span>
                    <strong>Total Price : {totalPrice} €</strong>
                  </div>

                  {card.map((item) => (
                    <div className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                      <div className="d-flex flex-row">
                        <a href={`/wine/${item.split(",")[0]}`}>
                          <img
                            className="cardImage"
                            src={item.split(",")[6]}
                            width="40"
                          />
                        </a>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="ml-2">
                          <span className="font-weight-bold d-block">
                            {item.split(",")[1]}
                          </span>
                          <span className="spec">
                            {item.split(",")[4]} , {item.split(",")[3]}
                          </span>
                          <br />
                          <span className="spec">{item.split(",")[5]} €</span>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <span>
                          {" "}
                          {/* <AiOutlineMinus /> */}
                          &nbsp;
                          <strong className="amount-box">
                            &nbsp;{item.split(",")[7]}&nbsp;
                          </strong>
                          &nbsp;
                          {/* <AiOutlinePlus /> */}
                        </span>

                        <span>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>

                        <span className="d-block ml-5 font-weight-bold">
                          <strong>
                            {item.split(",")[7] * item.split(",")[5]}&nbsp;€
                          </strong>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <FontAwesomeIcon
                            className="deleteIcon"
                            onClick={() => {
                              onDeletefromCard(item);
                            }}
                            icon={faTrash}
                            size="1x"
                            title="Delete from card"
                          />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Col>
          <Col xs={deviceSize < 800 ? 12 : 3}>
            {userDetails.length !== 0 && (
              <div className="order-card">
                <br />
                <br />
                Continue with Order
                <br />
                <div className="payment-info">
                  Personal Details
                  <div className="row">
                    <div className="col-md-6">
                      <label className="label-formater">First Name</label>
                      <input
                        type="search"
                        value={firstName}
                        className="form-control credit-inputs"
                        placeholder="Giwrgos"
                        onChange={(e) => {
                          setfirstName(e.target.value);
                        }}
                      />
                      {firstName !== "" ? (
                        ""
                      ) : (
                        <p className="error-message">
                          &#8226; Provide First Name
                        </p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="label-formater">Last Name</label>
                      <input
                        type="search"
                        value={lastName}
                        className="form-control credit-inputs"
                        placeholder="Georgiou"
                        onChange={(e) => {
                          setlastName(e.target.value);
                        }}
                      />
                      {lastName !== "" ? (
                        ""
                      ) : (
                        <p className="error-message">
                          &#8226; Provide First Name
                        </p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="label-formater">Email</label>
                      <input
                        type="search"
                        value={email}
                        className="form-control credit-inputs"
                        placeholder="yourEmail@company.com"
                        onChange={(e) => {
                          setEmail(email);
                        }}
                      />

                      {validateEmail(email) || email === "" ? (
                        ""
                      ) : (
                        <p className="error-message">&#8226; Wrong Email</p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="label-formater">
                        Shipping location
                      </label>
                      <input
                        type="search"
                        value={address}
                        className="form-control credit-inputs"
                        placeholder="Atiki,Greece 31"
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                      {address === "" && (
                        <p className="error-message">
                          &#8226; Please Provide Address.
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="label-formater">Zip Number</label>
                      <input
                        type="search"
                        className="form-control credit-inputs"
                        placeholder="15231"
                        onChange={(e) => {
                          setZipCode(e.target.value);
                        }}
                      />
                      {zipCode !== "" && zipCode.length !== 5 && (
                        <p className="error-message">
                          &#8226; Wrong Zip Code. Max length 5.
                        </p>
                      )}
                    </div>

                    <br />
                    <div className="col-md-6">
                      <label className="label-formater">Phone Number</label>
                      <input
                        type="search"
                        value={phoneNum}
                        className="form-control credit-inputs"
                        placeholder="6999999999"
                        onChange={(e) => {
                          setPhoneNum(e.target.value);
                        }}
                      />

                      {(isNaN(phoneNum) ||
                        phoneNum.length > 10 ||
                        phoneNum.length < 10) && (
                        <p className="error-message">
                          &#8226; Wrong Phone Number
                        </p>
                      )}
                    </div>
                  </div>
                  <hr />
                  Kind of Payment
                  <div>
                    <select
                      className="form-control credit-inputs"
                      onChange={(e) => {
                        setKindPayment(e.target.value);
                      }}
                    >
                      <option value="delivery">Pay on delivery</option>
                      <option value="deposit">Bank deposit</option>
                      <option value="card">Payment by card</option>
                    </select>

                    {kindPayment === "" && (
                      <p className="error-message">
                        &#8226; Provide Kind of Payment.
                      </p>
                    )}
                  </div>
                  <hr />
                  Sumary
                  <div className="d-flex justify-content-between information">
                    <span>Subtotal</span>
                    <span> {totalPrice} €</span>
                  </div>
                  <div className="d-flex justify-content-between information">
                    <span>Shipping (only for orders under 50 €)</span>
                    <span>
                      {totalPrice > 50 || totalPrice === 0 ? "0 €" : "3 €"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between information">
                    <span>Total(Incl. taxes)</span>
                    <span>
                      {totalPrice > 50 || totalPrice === 0
                        ? totalPrice
                        : totalPrice + 3}{" "}
                      €
                    </span>
                  </div>
                  {/* <input
                    type="number"
                    name="totalPrice"
                    value="{{total_price}}"
                  /> */}
                  <button
                    disabled={
                      card.length === 0 ||
                      kindPayment === "" ||
                      address === "" ||
                      phoneNum === "" ||
                      zipCode === "" ||
                      firstName === "" ||
                      lastName === "" ||
                      email === ""
                    }
                    onClick={handleShow}
                    //onClick={SendEmail}
                    className="btn btn-primary btn-block d-flex justify-content-between mt-3"
                  >
                    <span>
                      Complete Order
                      <i className="fa fa-long-arrow-right ml-1"></i>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Card;
