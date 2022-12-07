import React from "react";
import "./History.css";
import "./Card.css";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { BiDetail } from "react-icons/bi";
import {
  AiOutlineCalendar,
  AiOutlineHome,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { FaWineBottle, FaHistory } from "react-icons/fa";
import { ImSortNumbericDesc } from "react-icons/im";

import {
  BsFillPersonFill,
  BsCreditCard,
  BsQuestionOctagon,
  BsInfoCircle,
} from "react-icons/bs";

// import { dateFormater, addDays } from "./Functions/functions";
import {
  Table,
  Row,
  Col,
  Modal,
  Button,
  Badge,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

const History = () => {
  const [history, setHistory] = useState([]);
  const [orderSelected, setOrderSelected] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [activeSpinner, setActiveSpinner] = useState(false);
  // ----------- width size -----------------------
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });

  const cookies = new Cookies();
  var userEmail = cookies.get("email");

  let historyUrl = useHistory();

  const getHistory = () => {
    setActiveSpinner(true);
    fetch(`https://winelovers.onrender.com/getHistory/${userEmail}`)
      .then((res) => res.json())
      .then((json) => {
        setActiveSpinner(false);
        setHistory(json);
      });
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body>
          {orderSelected.length !== 0 && (
            <>
              <Row>
                <Col>
                  <h4>Order Details</h4>
                  <br />
                </Col>
              </Row>
              <Row>
                <Col xs={deviceSize < 600 ? 12 : 6}>
                  <BsInfoCircle className="history-icon" /> Order Id :{" "}
                  <strong>{orderSelected[0]._id}</strong>
                </Col>
                <Col xs={deviceSize < 600 ? 12 : 6}>
                  <AiOutlineCalendar className="history-icon" /> Order Date :{" "}
                  <strong>{orderSelected[0].OrderDate.slice(0, 10)}</strong>
                </Col>
              </Row>
              <Row>
                {deviceSize < 600 ? (
                  <>
                    <Col xs={12}>
                      <hr />
                    </Col>
                  </>
                ) : (
                  <>
                    <Col xs={6}>
                      <hr />
                    </Col>
                    <Col xs={6}>
                      <hr />
                    </Col>
                  </>
                )}
              </Row>
              <Row>
                <Col xs={deviceSize < 600 ? 12 : 6}>
                  <RiMoneyEuroCircleLine className="history-icon" />
                  Total Price : <strong>{orderSelected[0].Price} €</strong>
                </Col>
                <Col xs={deviceSize < 600 ? 12 : 6}>
                  <AiOutlineCalendar className="history-icon" /> Shipping Date :{" "}
                  <strong>{orderSelected[0].OrderDate.slice(0, 10)}</strong>
                </Col>
              </Row>
              <Row>
                {deviceSize < 600 ? (
                  <>
                    <Col xs={12}>
                      <hr />
                    </Col>
                  </>
                ) : (
                  <>
                    <Col xs={6}>
                      <hr />
                    </Col>
                    <Col xs={6}>
                      <hr />
                    </Col>
                  </>
                )}
              </Row>
              <Row>
                <Col xs={deviceSize < 600 ? 12 : 6}>
                  <BsQuestionOctagon className="history-icon" /> Order Send
                  status &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  <Badge
                    pill
                    bg={orderSelected[0].HasBeenSend ? "success" : "danger"}
                  >
                    {orderSelected[0].HasBeenSend ? "Pending..." : "On Storage"}
                  </Badge>
                </Col>
                <Col xs={deviceSize < 600 ? 12 : 6}>
                  <MdOutlineDeliveryDining className="history-icon" /> Order
                  Delivered status{" "}
                  <Badge
                    pill
                    bg={
                      orderSelected[0].HasBeenDelivered ? "success" : "danger"
                    }
                  >
                    {orderSelected[0].HasBeenDelivered
                      ? "Delivered"
                      : "No Delivered"}
                    &nbsp;
                  </Badge>
                </Col>
              </Row>
              <Row>
                {deviceSize < 600 ? (
                  <>
                    <Col xs={12}>
                      <hr />
                    </Col>
                  </>
                ) : (
                  <>
                    <Col xs={6}>
                      <hr />
                    </Col>
                    <Col xs={6}>
                      <hr />
                    </Col>
                  </>
                )}
              </Row>
              <Row>
                <Col xs={deviceSize < 600 ? 12 : 6}>
                  <BsCreditCard className="history-icon" /> Payment Kind :{" "}
                  <strong>{orderSelected[0].KindPayment}</strong>
                </Col>
                <Col xs={deviceSize < 600 ? 12 : 6}>
                  <AiOutlineHome className="history-icon" /> Address :{" "}
                  <strong>{orderSelected[0].Address}</strong>
                </Col>
              </Row>
              <Row>
                {deviceSize < 600 ? (
                  <>
                    <Col xs={12}>
                      <hr />
                    </Col>
                  </>
                ) : (
                  <>
                    <Col xs={6}>
                      <hr />
                    </Col>
                    <Col xs={6}>
                      <hr />
                    </Col>
                  </>
                )}
              </Row>
              <Row>
                <Col xs={deviceSize < 600 ? 12 : 6}>
                  <ImSortNumbericDesc className="history-icon" /> Zip :{" "}
                  <strong>{orderSelected[0].Zip}</strong>
                </Col>
                <Col xs={deviceSize < 600 ? 12 : 6}>
                  <AiOutlineMail className="history-icon" /> Email :{" "}
                  <strong>{orderSelected[0].Email}</strong>
                </Col>
              </Row>
              <Row>
                {deviceSize < 600 ? (
                  <>
                    <Col xs={12}>
                      <hr />
                    </Col>
                  </>
                ) : (
                  <>
                    <Col xs={6}>
                      <hr />
                    </Col>
                    <Col xs={6}>
                      <hr />
                    </Col>
                  </>
                )}
              </Row>
              <Row>
                <Col xs={deviceSize < 600 ? 12 : 6}>
                  <AiOutlinePhone className="history-icon" /> Phone :{" "}
                  <strong>{orderSelected[0].Phone}</strong>
                </Col>
                <Col xs={deviceSize < 600 ? 12 : 6}>
                  <BsFillPersonFill className="history-icon" /> Name :{" "}
                  <strong>
                    {orderSelected[0].FirstName} {orderSelected[0].LastName}
                  </strong>
                </Col>
              </Row>

              <hr />
              <Row>
                <Col>
                  <h4>Wines</h4>
                  <br />
                </Col>
              </Row>
              <Row>
                {orderSelected[0].Wines.map((wine) => (
                  <>
                    <Col xs={1}>
                      <img src={wine.wine.ImageUrl}></img>
                    </Col>
                    <Col xs={deviceSize < 500 ? 11 : 5}>
                      <strong
                        className="click-wine-history"
                        onClick={() => {
                          historyUrl.push("/wine/" + wine.wine._id);
                        }}
                      >
                        {wine.wine.WineName}
                      </strong>

                      <p>
                        {wine.wine.Type} ,{wine.wine.Color} , {wine.wine.Year}{" "}
                      </p>
                      <p>
                        Amount : <strong> {wine.amount} </strong>
                      </p>
                    </Col>
                  </>
                ))}
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Create Order Again
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="title">
        <div className="container py-4">
          <header className="pb-3 mb-4 border-bottom">
            <a className="d-flex align-items-center text-dark text-decoration-none">
              <span className="fs-4">
                <FaHistory className="initial-icons" />
                &nbsp; Order History
              </span>
            </a>
          </header>{" "}
        </div>
        {history.length === 0 && !activeSpinner && (
          <Alert variant="warning">No order yet! Buy a Wine!</Alert>
        )}
        {activeSpinner && (
          <Spinner className="spinner" animation="border" variant="primary" />
        )}
        {history.length !== 0 && (
          <>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <Table
                  striped
                  bordered
                  hover
                  size="sm"
                  className="personal-details-table"
                >
                  <thead>
                    <tr>
                      <th>Order Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((historyy) => (
                      <tr key={historyy._id}>
                        <td>
                          <Row>
                            <Col xs={6}>
                              Order Id: <strong>{historyy._id}</strong>
                              <br />
                              Date:{" "}
                              <strong>{historyy.OrderDate.slice(0, 10)}</strong>
                            </Col>
                            <Col md={{ span: 1, offset: 4 }}>
                              <h4>
                                <BiDetail
                                  title="Order Details"
                                  className="order-details-icon"
                                  onClick={() => {
                                    handleShow();
                                    for (const key in history) {
                                      if (history[key]._id === historyy._id) {
                                        setOrderSelected([history[key]]);
                                      }
                                    }
                                  }}
                                />
                              </h4>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col xs={8}>
                              {historyy.Wines.map((wine) => (
                                <p key={wine.wine._id}>
                                  &#8226; {wine.wine.WineName}
                                </p>
                              ))}
                            </Col>
                          </Row>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        )}
      </div>
    
    </div>
  );
};

export default History;
