import React from "react";
import "./NewDetail.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

const NewDetails = () => {
  const { id } = useParams();
  const [newDetails, setNewDetails] = useState([]);

  const getNewDetail = () => {
    fetch("https://winelovers.herokuapp.com/getNew/" + id)
      .then((res) => res.json())
      .then((json) => {
        setNewDetails([json]);
      });
  };
  
  useEffect(() => {
    getNewDetail();
  }, []);

  return (
    <div>
      <div className="title">
        <div class="container py-4">
          <header class="pb-3 mb-4 border-bottom">
            <a class="d-flex align-items-center text-dark text-decoration-none">
              <span class="fs-4">WineLovers Website </span>
            </a>
          </header>{" "}
          {newDetails.length !== 0 && (
            <>
              <Row>
                <p className="title-new">{newDetails[0].newDetails.Title}</p>
              </Row>
              <br />
              <Row>
                <Col xs={6}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: newDetails[0].newDetails.ContentText,
                    }}
                  ></p>
                </Col>
                <Col xs={6}>
                  <img
                    className="initial-image"
                    src={newDetails[0].newDetails.InitialImage}
                  ></img>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col xs={12}>
                <img
                    className="initial-image"
                    src={newDetails[0].newDetails.ContentImage}
                  ></img>
                </Col>
                
              </Row>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewDetails;
