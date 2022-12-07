import React from "react";
import "./AddNew.css";
import { Col, Row, Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";

const AddNew = () => {
  const [initialImage, setInitialImage] = useState("");
  const [contentImage, setContentImage] = useState("");
  const [title, setTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSaveHandler = () => {
    let newDetails = {
      initialImage: initialImage,
      contentImage: contentImage,
      title: title,
      textContent: textContent,
    };
    fetch("https://winelovers.onrender.com/addNew", {
      method: "POST",
      body: JSON.stringify(newDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setInitialImage("");
        setContentImage("");
        setTitle("");
        setTextContent("");
        handleClose();
      });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Adding a New</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h6>New's Content</h6>
            <Row>
              <Col xs={4}>
                <img src={contentImage} className="addNew-image"></img>
              </Col>
              <Col xs={8}>
                <h5>{title}</h5>
                <p  dangerouslySetInnerHTML={{__html: textContent}} ></p>
              </Col>
            </Row>
            <br />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSaveHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="title">
        <div class="container py-4">
          <header class="pb-3 mb-4 border-bottom">
            <a class="d-flex align-items-center text-dark text-decoration-none">
              <span class="fs-4">WineLovers Website - Add a New</span>
            </a>
          </header>{" "}
          <div className="new-container">
            <Row>
              <Col xs={4}>
                <Form.Label>Initial Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="https://image.png"
                  value={initialImage}
                  onChange={(e) => {
                    setInitialImage(e.target.value);
                  }}
                />
              </Col>
              <Col xs={4}>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="The Best Wines for Summer"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Col>
              <Col xs={4}>
                <Form.Label>Content Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="https://image.png"
                  value={contentImage}
                  onChange={(e) => {
                    setContentImage(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs={9}>
                <Form.Label>Text Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={textContent}
                  onChange={(e) => {
                    setTextContent(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs={1}>
                <Button
                  variant="warning"
                  disabled={
                    initialImage.trim() === "" ||
                    contentImage.trim() === "" ||
                    title.trim() === "" ||
                    textContent.trim() === ""
                  }
                  onClick={handleShow}
                >
                  Preview
                </Button>
              </Col>

              <Col xs={1}></Col>
              <Col xs={1}>
                <Button
                  variant="danger"
                  onClick={() => {
                    setInitialImage("");
                    setContentImage("");
                    setTitle("");
                    setTextContent("");
                  }}
                >
                  Clear
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AddNew;
