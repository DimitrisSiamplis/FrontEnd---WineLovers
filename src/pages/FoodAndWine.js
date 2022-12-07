import React from "react";

import "./FoodAndWine.css";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { ImSpoonKnife } from "react-icons/im";
import { useState, useEffect } from "react";
import BigCategories from "./FoodAndWine/BigCategories";
import DayType from "./FoodAndWine/DayType";
import SpecificFood from "./FoodAndWine/SpecificFood";
import { useHistory } from "react-router-dom";
const FoodAndWine = () => {
  // ----------- width size -----------------------
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });
  let history = useHistory();
  const [choice, setChoice] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className="title">
        <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>{choice}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {choice === "Specific Food" ? (
              <SpecificFood choice={choice} />
            ) : choice === "Easter" ||
              choice === "Christmas" ||
              choice === "Valentine" ? (
              <DayType choice={choice} />
            ) : (
              <BigCategories choice={choice} />
            )}
            {/* <Wines /> */}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="container py-4">
          <header className="pb-3 mb-4 border-bottom">
            <a className="d-flex align-items-center text-dark text-decoration-none">
              <span className="fs-4">
                <ImSpoonKnife className="initial-icons" />
                &nbsp; Food & Wine
              </span>
            </a>
          </header>{" "}
          <div>
            <div>
              <p className="p-foodWine">
                Choose the food you want and match the right wine
              </p>
            </div>

            <Row>
              <Col xs={deviceSize < 1000 ? 12 : 4}>
                <div
                  className="container-category"
                  onClick={() => {
                    setChoice("Red Meat");
                    handleShow();
                  }}
                >
                  <img
                    className="image-category"
                    src="https://media.istockphoto.com/photos/grilled-striploin-steak-picture-id535786572?k=20&m=535786572&s=612x612&w=0&h=WAOuIsIUQB7zVW23C6MX9y5QCyl6KLPL2eYcOcc_Qdk="
                  ></img>
                  <div className="text-block">
                    <h4>Red Meat</h4>
                  </div>
                </div>
                {deviceSize < 1000 && (
                  <>
                    <br />
                    <br />
                    <br />
                  </>
                )}
              </Col>
              <Col xs={deviceSize < 1000 ? 12 : 4}>
                <div
                  className="container-category"
                  onClick={() => {
                    setChoice("White Meat");
                    handleShow();
                  }}
                >
                  <img
                    className="image-category"
                    src="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2020/09/CC_HE_1191933521Pork.jpg"
                  ></img>
                  <div className="text-block">
                    <h4>White Meat</h4>
                  </div>
                </div>
                {deviceSize < 1000 && (
                  <>
                    <br />
                    <br />
                    <br />
                  </>
                )}
              </Col>
              <Col xs={deviceSize < 1000 ? 12 : 4}>
                <div
                  className="container-category"
                  onClick={() => {
                    setChoice("Fish");
                    handleShow();
                  }}
                >
                  <img
                    className="image-category"
                    src="https://www.recipetineats.com/wp-content/uploads/2021/04/Whole-Baked-Fish.00_02_06_16.Still015.jpg"
                  ></img>
                  <div className="text-block">
                    <h4>Fish</h4>
                  </div>
                </div>
              </Col>
            </Row>
            <br />
            <br />
            <br />
            <Row>
              <Col xs={deviceSize < 1000 ? 12 : 4}>
                <div
                  className="container-category"
                  onClick={() => {
                    setChoice("Cheece");
                    handleShow();
                  }}
                >
                  <img
                    className="image-category"
                    src="https://images.everydayhealth.com/images/all-about-cheese-alt-1440x810.jpg"
                  ></img>
                  <div className="text-block">
                    <h4>Cheece</h4>
                  </div>
                </div>
                {deviceSize < 1000 && (
                  <>
                    <br />
                    <br />
                    <br />
                  </>
                )}
              </Col>
              <Col xs={deviceSize < 1000 ? 12 : 4}>
                <div
                  className="container-category"
                  onClick={() => {
                    setChoice("Pizza");
                    handleShow();
                  }}
                >
                  <img
                    className="image-category"
                    src="https://media-cdn.tripadvisor.com/media/photo-s/08/b3/38/cf/pizza-milano.jpg"
                  ></img>
                  <div className="text-block">
                    <h4>Pizza</h4>
                  </div>
                </div>
                {deviceSize < 1000 && (
                  <>
                    <br />
                    <br />
                    <br />
                  </>
                )}
              </Col>
              <Col xs={deviceSize < 1000 ? 12 : 4}>
                <div
                  className="container-category"
                  onClick={() => {
                    setChoice("Pasta");
                    handleShow();
                  }}
                >
                  <img
                    className="image-category"
                    src="https://www.tastingtable.com/img/gallery/30-types-of-pasta-and-when-you-should-be-using-them/l-intro-1659010210.jpg"
                  ></img>
                  <div className="text-block">
                    <h4>Pasta</h4>
                  </div>
                </div>
              </Col>
            </Row>

            <br />
            <br />
            <br />
            <Row>
              <Col xs={deviceSize < 1000 ? 12 : 4}>
                <div
                  className="container-category"
                  onClick={() => {
                    setChoice("Easter");
                    handleShow();
                  }}
                >
                  <img
                    className="image-category"
                    src="https://media.gettyimages.com/vectors/easter-card-with-rabbit-and-eggs-vector-vector-id1210089743?s=612x612"
                  ></img>
                  <div className="text-block">
                    <h4>Easter</h4>
                  </div>
                </div>
                {deviceSize < 1000 && (
                  <>
                    <br />
                    <br />
                    <br />
                  </>
                )}
              </Col>
              <Col xs={deviceSize < 1000 ? 12 : 4}>
                <div
                  className="container-category"
                  onClick={() => {
                    setChoice("Christmas");
                    handleShow();
                  }}
                >
                  <img
                    className="image-category"
                    src="https://www.thesun.co.uk/wp-content/uploads/2022/08/Tesco-Finest-British-Free-Range-Heritage-Narragansett-Whole-Turkey.jpg"
                  ></img>
                  <div className="text-block">
                    <h4>Christmas</h4>
                  </div>
                </div>
                {deviceSize < 1000 && (
                  <>
                    <br />
                    <br />
                    <br />
                  </>
                )}
              </Col>
              <Col xs={deviceSize < 1000 ? 12 : 4}>
                <div
                  className="container-category"
                  onClick={() => {
                    setChoice("Valentine");
                    handleShow();
                  }}
                >
                  <img
                    className="image-category"
                    src="https://iso.mit.edu/wp-content/uploads/2020/01/am_valentines-1024x492.jpg"
                  ></img>
                  <div className="text-block">
                    <h4>Valentine</h4>
                  </div>
                </div>
              </Col>
            </Row>
            <br />
            <br />
            <br />
            <Row>
              <Col xs={deviceSize < 1000 ? 12 : 4}>
                <div
                  className="container-category"
                  onClick={() => {
                    setChoice("Specific Food");
                    handleShow();
                  }}
                >
                  <img
                    className="image-category"
                    src="https://4momsgr.s3.eu-central-1.amazonaws.com/wp-content/media/Eating-More-Ultraprocessed-%E2%80%98Junk-Food-Linked-to-Higher-CVD-Risk.jpeg"
                  ></img>
                  <div className="text-block">
                    <h4>Specific Food</h4>
                  </div>
                </div>
              </Col>
              {deviceSize < 1000 && (
                <>
                  <br />
                  <br />
                  <br />
                </>
              )}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodAndWine;
