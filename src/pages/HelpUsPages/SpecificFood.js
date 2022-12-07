import React from "react";
import "./SpecificFood.css";
import { Col, Row, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";

import Cookies from "universal-cookie";
import { BsPlusLg, BsXLg } from "react-icons/bs";

const SpecificFood = ({ colorWines, typeWines, grapeWines }) => {
  const cookies = new Cookies();
  var userEmail = cookies.get("email");
  // ----------- width size -----------------------
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });

  const [writeFood, setWriteFood] = useState("");
  const [foodResults, setFoodResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState("");
  const [specificFood, setSpecificFood] = useState({
    Type: "",
    Color: "",
    Grape: "",
    Year: "",
  });

  const [completeAdd, setCompleteAdd] = useState(false);
  const [change, setChange] = useState(false);

  const wineYears = [
    "1950 or oldest",
    "1950-1980",
    "1980-2000",
    "2000-2010",
    "2010-2020",
    "2020-present",
  ];

  // ---------------- Food API Call --------------------
  const findAnyFood = (food) => {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=27e614b6300f46b38613b4bb811633d0&query=${food}`
    )
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData.results);
        var foods = [];
        actualData.results.map((food) => {
          foods.push(food.title + "*" + food.id + "*" + food.image);
        });
        setFoodResults(foods);
      });
  };

  const addSpecificFood = () => {
    let newSpecificFood = {
      Types: specificFood.Type,
      Colors: specificFood.Color,
      Grapes: specificFood.Grape,
      Years: specificFood.Year,
      Email: userEmail,
      Name: selectedFood.split("*")[0],
    };
    fetch("https://winelovers.onrender.com/opinionSpecificFood", {
      method: "POST",
      body: JSON.stringify(newSpecificFood),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setCompleteAdd(true);
      });
  };

  const clearHandler = () => {
    setCompleteAdd(false);
    setSpecificFood({
      Type: "",
      Color: "",
      Grape: "",
      Year: "",
    });
  };
  const aplyHandler = () => {
    addSpecificFood();
  };
  return (
    <div>
      <div>
        {/* <h5>&#8226; Select your favourite food</h5> */}
        <div className="helpUsTitleContent">
          <strong>
            Select the food that you want to pair your wine{" "}
            {/* <ImSpoonKnife className="reactIcon" /> */}
          </strong>

          <div className="helpUsTitleContent">
            <Row>
              <Col xs={deviceSize < 800 ? 7 : 4}>
                <Form.Label>
                  Write&nbsp;&&nbsp;Find&nbsp;your&nbsp;Recipe
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Find any Food"
                  value={writeFood}
                  onChange={(e) => {
                    setWriteFood(e.target.value);
                    if (e.target.value.length > 2) {
                      findAnyFood(e.target.value);
                    }
                  }}
                />
              </Col>
              <Col xs={deviceSize < 800 ? 7 : 4}>
                <Form.Label>Recipe</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setSelectedFood(e.target.value);
                    window.scrollTo(0, 500);
                  }}
                >
                  <option value="">Food select</option>

                  {foodResults.map((food) => (
                    <option value={food}>{food.split("*")[0]}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={1}>
                {!change && (
                  <BsPlusLg
                    className="plus-icon"
                    title="Add your Recipe"
                    onClick={() => {
                      setChange(!change);
                    }}
                  />
                )}
                {change && (
                  <BsXLg
                    className="x-icon"
                    title="Add your Recipe"
                    onClick={() => {
                      setChange(!change);
                    }}
                  />
                )}
              </Col>
            </Row>

            {change && (
              <Row>
                <Col xs={6}>
                  {" "}
                  <Form.Label>Write your own recipe</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Col>
              </Row>
            )}

            <br />
            <Row>
              <Col xs={deviceSize < 500 ? 12 : 10}>
                {selectedFood !== "" && (
                  <>
                    <img
                      className="imageFood"
                      src={selectedFood.split("*")[2]}
                    ></img>
                  </>
                )}
              </Col>
            </Row>
          </div>
        </div>

        {selectedFood !== "" && (
          <div className="helpUsTitleContent">
            <p>
              - Wine would you pair with{" "}
              <strong>{selectedFood.split("*")[0]}</strong> :{" "}
            </p>

            <div className="helpUsTitleContent">
              <Row>
                <Col xs={deviceSize < 800 ? (deviceSize < 400 ? 12 : 6) : 2}>
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    size="sm"
                    onChange={(e) => {
                      setSpecificFood({
                        Type: e.target.value,
                        Color: specificFood.Color,
                        Grape: specificFood.Grape,
                        Year: specificFood.Year,
                      });
                    }}
                  >
                    <option
                      value=""
                      selected={specificFood.Type === "" ? true : false}
                    >
                      Select Type
                    </option>
                    {typeWines.map((type) => (
                      <option
                        selected={specificFood.Type === type ? true : false}
                      >
                        {type}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xs={deviceSize < 800 ? (deviceSize < 400 ? 12 : 6) : 2}>
                  <Form.Label>Color</Form.Label>
                  <Form.Select
                    size="sm"
                    onChange={(e) => {
                      setSpecificFood({
                        Type: specificFood.Type,
                        Color: e.target.value,
                        Grape: specificFood.Grape,
                        Year: specificFood.Year,
                      });
                    }}
                  >
                    <option
                      value=""
                      selected={specificFood.Color === "" ? true : false}
                    >
                      Select color
                    </option>
                    {colorWines.map((color) => (
                      <option
                        selected={specificFood.Color === color ? true : false}
                      >
                        {color}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xs={deviceSize < 800 ? (deviceSize < 400 ? 12 : 6) : 2}>
                  <Form.Label>Grape</Form.Label>
                  <Form.Select
                    size="sm"
                    onChange={(e) => {
                      setSpecificFood({
                        Type: specificFood.Type,
                        Color: specificFood.Color,
                        Grape: e.target.value,
                        Year: specificFood.Year,
                      });
                    }}
                  >
                    <option
                      value=""
                      selected={specificFood.Grape === "" ? true : false}
                    >
                      Select grape
                    </option>
                    {grapeWines.map((grape) => (
                      <option
                        selected={specificFood.Grape === grape ? true : false}
                      >
                        {grape}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xs={deviceSize < 800 ? (deviceSize < 400 ? 12 : 6) : 2}>
                  <Form.Label>Year Range</Form.Label>
                  <Form.Select
                    size="sm"
                    onChange={(e) => {
                      setSpecificFood({
                        Type: specificFood.Type,
                        Color: specificFood.Color,
                        Grape: specificFood.Grape,
                        Year: e.target.value,
                      });
                    }}
                  >
                    <option
                      value=""
                      selected={specificFood.Year === "" ? true : false}
                    >
                      Select year
                    </option>
                    {wineYears.map((year) => (
                      <option
                        selected={specificFood.Year === year ? true : false}
                      >
                        {year}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </div>
      <br />
      <Row>
        <Col xs={1}>
          <Button variant="danger" onClick={clearHandler}>
            Clear
          </Button>{" "}
        </Col>
        <Col xs={1}></Col>
        <Col xs={1}>
          <Button
            variant="success"
            onClick={aplyHandler}
            disabled={
              specificFood.Type === "" ||
              specificFood.Color === "" ||
              specificFood.Grape === "" ||
              specificFood.Year === ""
            }
          >
            Apply
          </Button>
        </Col>
        {completeAdd && (
          <Col xs={8} className="text-center">
            <Alert variant="success">
              {" "}
              Thank you for your help. Your opinion added succesfully.
            </Alert>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default SpecificFood;
