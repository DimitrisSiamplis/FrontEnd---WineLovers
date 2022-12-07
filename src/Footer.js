import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import "./Footer.css";
import { useEffect, useState } from "react";

const Footer = () => {
  // ----------- width size -----------------------
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });
  return (
    <div className="footer">
      <Container>
        <Row className="footer-title">
          <h5>WineLovers Official Website - Find any wine!</h5>
          <p>© 2022 All rights reserved</p>
        </Row>
        <hr />
        <Row>
          <Col xs={deviceSize < 700 ? 2 : 1}>
            <h6 className="footer-link">
              <a href="/aboutUs">About Us</a>
            </h6>
          </Col>

          <Col xs={deviceSize < 700 ? 2 : 4}></Col>

          <Col xs={2}>
            <h6 className="footer-link">
              {" "}
              <a href="/contactUs">Contact Us</a>
            </h6>
          </Col>

          <Col xs={deviceSize < 700 ? 2 : 4}></Col>

          <Col xs={deviceSize < 700 ? 2 : 1}>
            <h6 className="footer-link">
              {" "}
              <a href="/news">News</a>
            </h6>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
