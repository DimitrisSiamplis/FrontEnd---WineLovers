import React from "react";
import "./BigCategories.css";
import { Chart } from "react-google-charts";
import { useState, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";

const BigCategories = ({ choice }) => {
  // ----------- width size -----------------------
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });
  const [results, setResults] = useState([]);

  const getBigCategoriesResults = () => {
    let choiceDetails = {
      choice: choice,
    };
    fetch("https://winelovers.herokuapp.com/bigCaregories", {
      method: "POST",
      body: JSON.stringify(choiceDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        setResults(json);
      });
  };

  useEffect(() => {
    getBigCategoriesResults();
  }, []);

  const dataType = [
    ["Type", "Type per Wine"],
    [
      "Ξηρό",
      results.length !== 0
        ? results.opinion.filter(function (e) {
            return e.Type == "Ξηρό";
          }).length
        : 0,
    ],
    [
      "Ημίξηρο",
      results.length !== 0
        ? results.opinion.filter(function (e) {
            return e.Type == "Ημίξηρο";
          }).length
        : 0,
    ],
    [
      "Ημίγλυκο",
      results.length !== 0
        ? results.opinion.filter(function (e) {
            return e.Type == "Ημίγλυκο";
          }).length
        : 0,
    ],
    [
      "Γλυκό",
      results.length !== 0
        ? results.opinion.filter(function (e) {
            return e.Type == "Γλυκό";
          }).length
        : 0,
    ],
    [
      "Σαμπανιζέ",
      results.length !== 0
        ? results.opinion.filter(function (e) {
            return e.Type == "Σαμπανιζέ";
          }).length
        : 0,
    ],
  ];

  const optionsType = {
    title: `Wine & Type`,
    colors: ["#1f77b4", "#ff7f6e", "#d62728", "#2ca02c"],
  };

  // ------------ COLOR -----------------------
  const dataColor = [
    ["Type", "Type per Wine"],
    [
      "Κόκκινο",
      results.length !== 0
        ? results.opinion.filter(function (e) {
            return e.Color == "Κόκκινο";
          }).length
        : 0,
    ],
    [
      "Λευκό",
      results.length !== 0
        ? results.opinion.filter(function (e) {
            return e.Color == "Λευκό";
          }).length
        : 0,
    ],
    [
      "Ροζέ",
      results.length !== 0
        ? results.opinion.filter(function (e) {
            return e.Color == "Ροζέ";
          }).length
        : 0,
    ],
  ];
  const optionsColor = {
    title: `Wine & Color`,
    colors: ["#1f77b4", "#ff7f6e", "#d62728", "#2ca02c"],
  };

  // ------------ Grape -----------------------
  const dataGrape = [
    ["Type", "Type per Wine"],
    [
      "Cabernet",
      results.length !== 0
        ? results.opinion.filter(function (e) {
            return e.Grape == "Cabernet";
          }).length
        : 0,
    ],
    [
      "Agiorgitiko",
      results.length !== 0
        ? results.opinion.filter(function (e) {
            return e.Grape == "Agiorgitiko";
          }).length
        : 0,
    ],
    [
      "Asurtiko",
      results.length !== 0
        ? results.opinion.filter(function (e) {
            return e.Grape == "Asurtiko";
          }).length
        : 0,
    ],
    [
      "Xinomauro",
      results.length !== 0
        ? results.opinion.filter(function (e) {
            return e.Grape == "Xinomauro";
          }).length
        : 0,
    ],
  ];
  const optionsGrape = {
    title: `Wine  & Grape`,
    colors: ["#1f77b4", "#ff7f6e", "#d62728", "#2ca02c"],
  };

  // ------------ Year -----------------------
  const dataYear = [
    ["Type", "Type per Wine"],
    [
      "1950 or oldest",
      results.length !== 0
        ? results.opinion.filter(function (e) {
            return e.Year == "1950 or oldest";
          }).length
        : 0,
    ],
    [
      "1950-1980",
      results.length !== 0
        ? results.opinion.filter(function (e) {
            return e.Year == "1950-1980";
          }).length
        : 0,
    ],
    [
      "1980-2000",
      results.length !== 0
        ? results.opinion.filter(function (e) {
            return e.Year == "1980-2000";
          }).length
        : 0,
    ],
    [
      "2000-2010",
      results.length !== 0
        ? results.opinion.filter(function (e) {
            return e.Year == "2000-2010";
          }).length
        : 0,
    ],
    [
      "2010-2020",
      results.length !== 0
        ? results.opinion.filter(function (e) {
            return e.Year == "2010-2020";
          }).length
        : 0,
    ],
    [
      "2020-present",
      results.length !== 0
        ? results.opinion.filter(function (e) {
            return e.Year == "2020-present";
          }).length
        : 0,
    ],
  ];
  const optionsYear = {
    title: `Wine  & Year`,
    colors: [...new Set(["#1f77b4", "#ff7f6e", "#d62728", "#2ca02c"])],
  };

  return (
    <div>
      <div>
        <p>
          Below are the results of pairing <strong>{choice} </strong> with the
          appropriate wine :
        </p>
      </div>
      <div>
        {results.length === 0 && (
          <Spinner
            className="spiner-food-wine"
            animation="border"
            variant="primary"
          />
        )}
        {results.length !== 0 && (
          <>
            <Row>
              <Col xs={deviceSize < 1000 ? 12 : 6}>
                <Chart
                  chartType="PieChart"
                  data={dataType}
                  options={optionsType}
                  width={"100%"}
                  height={"300px"}
                />
              </Col>
              <Col xs={deviceSize < 1000 ? 12 : 6}>
                <Chart
                  chartType="PieChart"
                  data={dataColor}
                  options={optionsColor}
                  width={"100%"}
                  height={"300px"}
                />
              </Col>
              <Col xs={deviceSize < 1000 ? 12 : 6}>
                <Chart
                  chartType="PieChart"
                  data={dataGrape}
                  options={optionsGrape}
                  width={"100%"}
                  height={"300px"}
                />
              </Col>
              <Col xs={deviceSize < 1000 ? 12 : 6}>
                <Chart
                  chartType="PieChart"
                  data={dataYear}
                  options={optionsYear}
                  width={"100%"}
                  height={"300px"}
                />
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default BigCategories;
