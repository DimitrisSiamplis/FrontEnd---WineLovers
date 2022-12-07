import React, { useEffect } from "react";
import BigCategories from "./HelpUsPages/BigCategories";
import TypeDay from "./HelpUsPages/TypeDay";
import SpecificFood from "./HelpUsPages/SpecificFood";
import { Col, Row, Tabs, Tab } from "react-bootstrap";
import { useState } from "react";
import "./HelpUs.css";
import { FaPen } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";

const HelpUs = () => {
  const [choice, setChoice] = useState("");
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });
  const [key, setKey] = useState("home");
  // ------------- drop Downs Values -----------------
  const [colorWines, setColorWines] = useState([]);
  const [typeWines, setTypeWines] = useState([]);
  const [yearWines, setYearWines] = useState([]);
  const [grapeWines, setGrapeWines] = useState([]);
  const [wineYears, setWineYears] = useState([]);
  const [activeChoice, setActiveChoice] = useState(true);

  const getWines = () => {
    fetch("https://winelovers.onrender.com/getWines")
      .then((res) => res.json())
      .then((json) => {
        var colors = [];
        var types = [];
        var years = [];
        var prices = [];
        var grapes = [];
        for (const key in json.wines) {
          colors.push(json.wines[key].wine.Color);
          types.push(json.wines[key].wine.Type);
          years.push(json.wines[key].wine.Year);
          prices.push(json.wines[key].wine.Price);
          grapes.push(json.wines[key].wine.Grapes);
        }

        colors = [...new Set(colors)];
        types = [...new Set(types)];
        years = [...new Set(years)];
        grapes = [...new Set(grapes)];

        setColorWines(colors);
        setTypeWines(types);
        setYearWines(years);
        setGrapeWines(grapes);
      });

  };

  useEffect(() => {
    getWines();
  }, []);

  return (
    <div>
      <div className="title">
        <Row>
          <Col xs={9}>
            <h2>
              Your opinion matters &nbsp;
              <FaPen />
            </h2>
          </Col>
        </Row>
        <hr />
        <h5
          className="back"
          onClick={() => {
            setActiveChoice(!activeChoice);
          }}
        >
          {" "}
          <AiOutlineArrowLeft />
          Back to Categories
        </h5>
        {activeChoice && (
          <Row>
            <Col xs={deviceSize < 1000 ? 12 : 4}>
              <div
                className="container-category"
                onClick={() => {
                  setChoice("Big Categoies");
                  setActiveChoice(false);
                }}
              >
                <img
                  className="image-category"
                  src="https://thumbs.dreamstime.com/b/vegetarian-food-plate-editable-vector-illustration-isolated-dark-grey-background-medical-healthcare-dietary-poster-134019735.jpg"
                ></img>
                <div className="text-block">
                  <h4>Big Categories</h4>
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
                  setChoice("Day Type");
                  setActiveChoice(false);
                }}
              >
                <img
                  className="image-category"
                  src="https://thumbs.dreamstime.com/b/vandaag-de-dag-motievencitaataffiche-56473325.jpg"
                ></img>
                <div className="text-block">
                  <h4>Day Type</h4>
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
                  setChoice("Specific Food");
                  setActiveChoice(false);
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
          </Row>
        )}
        {choice === "Big Categoies" && (
          <>
            <br />
            <br />
            <BigCategories
              colorWines={colorWines}
              typeWines={typeWines}
              yearWines={yearWines}
              grapeWines={grapeWines}
              wineYears={wineYears}
            />
          </>
        )}
        {choice === "Day Type" && (
          <>
            <br />
            <br />
            <TypeDay
              colorWines={colorWines}
              typeWines={typeWines}
              yearWines={yearWines}
              grapeWines={grapeWines}
              wineYears={wineYears}
            />{" "}
          </>
        )}
        {choice === "Specific Food" && (
          <>
            <br />
            <br />
            <SpecificFood
              colorWines={colorWines}
              typeWines={typeWines}
              yearWines={yearWines}
              grapeWines={grapeWines}
              wineYears={wineYears}
            />
          </>
        )}
      </div>
      
    </div>
  );
};

export default HelpUs;
