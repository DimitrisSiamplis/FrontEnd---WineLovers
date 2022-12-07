import React from "react";
import "./DayType.css";
import { Chart } from "react-google-charts";
import { useState, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
const DayType = ({ choice }) => {
  const [results, setResults] = useState([]);

  const getDayTypeResults = () => {
    let choiceDetails = {
      choice: choice,
    };
    fetch("https://winelovers.herokuapp.com/dayType", {
      method: "POST",
      body: JSON.stringify(choiceDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setResults(json);
      });
  };

  useEffect(() => {
    //getDayTypeResults();
  }, []);

  const dataType = [
    ["Type", "Type per Wine"],
    ["Dry", 12],
    ["Semi Dry", 6],
    ["Semi Sweet", 3],
    ["Sweet", 1],
  ];

  const optionsType = {
    title: `Wine & Type`,
    colors: ["#1f77b4", "#ff7f6e", "#d62728", "#2ca02c"],
  };
  return (
    <div>
      <div>
        {results.length !== 0 && (
          <>
            <Row>
              <Col xs={4}>
                <Chart
                  chartType="PieChart"
                  data={dataType}
                  options={optionsType}
                  width={"100%"}
                  height={"300px"}
                />
              </Col>{" "}
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default DayType;
