import React from "react";
import "./BigCategories.css";
import { Col, Row, Form, Button, Alert } from "react-bootstrap";
import { FaFish, FaPizzaSlice } from "react-icons/fa";
import { GiChickenOven } from "react-icons/gi";
import { TbMeat } from "react-icons/tb";
import { GiRopeCoil } from "react-icons/gi";
import { TbCheese } from "react-icons/tb";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const BigCategories = ({ colorWines, typeWines, grapeWines }) => {
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });
  const wineYears = [
    "1950 or oldest",
    "1950-1980",
    "1980-2000",
    "2000-2010",
    "2010-2020",
    "2020-present",
  ];
  const [completeAdd, setCompleteAdd] = useState(false);
  console.log(wineYears);
  const [redMeat, setReadMeat] = useState({
    Type: "",
    Color: "",
    Grape: "",
    Year: "",
  });
  const [whiteMeat, setWhiteMeat] = useState({
    Type: "",
    Color: "",
    Grape: "",
    Year: "",
  });
  const [fish, setFish] = useState({
    Type: "",
    Color: "",
    Grape: "",
    Year: "",
  });
  const [cheece, setCheece] = useState({
    Type: "",
    Color: "",
    Grape: "",
    Year: "",
  });
  const [pasta, setPasta] = useState({
    Type: "",
    Color: "",
    Grape: "",
    Year: "",
  });
  const [pizza, setPizza] = useState({
    Type: "",
    Color: "",
    Grape: "",
    Year: "",
  });
  const cookies = new Cookies();
  var userEmail = cookies.get("email");

  const bigCategories = () => {
    let bigCategoriesDetails = {
      Types: [
        redMeat.Type,
        whiteMeat.Type,
        fish.Type,
        cheece.Type,
        pasta.Type,
        pizza.Type,
      ],
      Colors: [
        redMeat.Color,
        whiteMeat.Color,
        fish.Color,
        cheece.Color,
        pasta.Color,
        pizza.Color,
      ],
      Grapes: [
        redMeat.Grape,
        whiteMeat.Grape,
        fish.Grape,
        cheece.Grape,
        pasta.Grape,
        pizza.Grape,
      ],
      Years: [
        redMeat.Year,
        whiteMeat.Year,
        fish.Year,
        cheece.Year,
        pasta.Year,
        pizza.Year,
      ],
      Email: userEmail,
    };
    fetch("https://winelovers.onrender.com/opinionBigCategories", {
      method: "POST",
      body: JSON.stringify(bigCategoriesDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setCompleteAdd(true);
      });
  };

  return (
    <div>
      <div>
        <div className="helpUsTitleContent">
          <p>- Wine would you pair with : </p>

          <div className="helpUsTitleContent">
            <p>
              <strong>1.</strong> Red Meat <TbMeat className="reactIcon" />
            </p>

            <Row>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setReadMeat({
                      Type: e.target.value,
                      Color: redMeat.Color,
                      Grape: redMeat.Grape,
                      Year: redMeat.Year,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={redMeat.Type === "" ? true : false}
                  >
                    Select Type
                  </option>
                  {typeWines.map((type) => (
                    <option selected={redMeat.Type === type ? true : false}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setReadMeat({
                      Type: redMeat.Type,
                      Color: e.target.value,
                      Grape: redMeat.Grape,
                      Year: redMeat.Year,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={redMeat.Color === "" ? true : false}
                  >
                    Select color
                  </option>
                  {colorWines.map((color) => (
                    <option selected={redMeat.Color === color ? true : false}>
                      {color}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setReadMeat({
                      Type: redMeat.Type,
                      Color: redMeat.Color,
                      Grape: e.target.value,
                      Year: redMeat.Year,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={redMeat.Grape === "" ? true : false}
                  >
                    Select grape
                  </option>
                  {grapeWines.map((grape) => (
                    <option selected={redMeat.Grape === grape ? true : false}>
                      {grape}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setReadMeat({
                      Type: redMeat.Type,
                      Color: redMeat.Color,
                      Grape: redMeat.Grape,
                      Year: e.target.value,
                    });
                  }}
                >
                  {" "}
                  <option
                    value=""
                    selected={redMeat.Year === "" ? true : false}
                  >
                    Select year
                  </option>
                  {wineYears.map((year) => (
                    <option selected={redMeat.Year === year ? true : false}>
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </div>

          <div className="helpUsTitleContent">
            <p>
              <strong>2.</strong> White Meat &nbsp;{" "}
              <GiChickenOven className="reactIcon" />{" "}
            </p>

            <Row>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setWhiteMeat({
                      Type: e.target.value,
                      Color: whiteMeat.Color,
                      Grape: whiteMeat.Grape,
                      Year: whiteMeat.Year,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={whiteMeat.Type === "" ? true : false}
                  >
                    Select Type
                  </option>
                  {typeWines.map((type) => (
                    <option selected={whiteMeat.Type === type ? true : false}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setWhiteMeat({
                      Type: whiteMeat.Type,
                      Color: e.target.value,
                      Grape: whiteMeat.Grape,
                      Year: whiteMeat.Year,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={whiteMeat.Color === "" ? true : false}
                  >
                    Select color
                  </option>
                  {colorWines.map((color) => (
                    <option selected={whiteMeat.Color === color ? true : false}>
                      {color}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setWhiteMeat({
                      Type: whiteMeat.Type,
                      Color: whiteMeat.Color,
                      Grape: e.target.value,
                      Year: whiteMeat.Year,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={whiteMeat.Grape === "" ? true : false}
                  >
                    Select grape
                  </option>
                  {grapeWines.map((grape) => (
                    <option selected={whiteMeat.Grape === grape ? true : false}>
                      {grape}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setWhiteMeat({
                      Type: whiteMeat.Type,
                      Color: whiteMeat.Color,
                      Grape: whiteMeat.Grape,
                      Year: e.target.value,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={whiteMeat.Year === "" ? true : false}
                  >
                    Select year
                  </option>
                  {wineYears.map((year) => (
                    <option selected={whiteMeat.Year === year ? true : false}>
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </div>

          <div className="helpUsTitleContent">
            <p>
              <strong>3.</strong> Fish &nbsp; <FaFish className="reactIcon" />{" "}
            </p>

            <Row>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setFish({
                      Type: e.target.value,
                      Color: fish.Color,
                      Grape: fish.Grape,
                      Year: fish.Year,
                    });
                  }}
                >
                  <option value="" selected={fish.Type === "" ? true : false}>
                    Select Type
                  </option>
                  {typeWines.map((type) => (
                    <option selected={fish.Type === type ? true : false}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setFish({
                      Type: fish.Type,
                      Color: e.target.value,
                      Grape: fish.Grape,
                      Year: fish.Year,
                    });
                  }}
                >
                  <option value="" selected={fish.Color === "" ? true : false}>
                    Select color
                  </option>
                  {colorWines.map((color) => (
                    <option selected={fish.Color === color ? true : false}>
                      {color}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setFish({
                      Type: fish.Type,
                      Color: fish.Color,
                      Grape: e.target.value,
                      Year: fish.Year,
                    });
                  }}
                >
                  <option value="" selected={fish.Grape === "" ? true : false}>
                    Select grape
                  </option>
                  {grapeWines.map((grape) => (
                    <option selected={fish.Grape === grape ? true : false}>
                      {grape}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setFish({
                      Type: fish.Type,
                      Color: fish.Color,
                      Grape: fish.Grape,
                      Year: e.target.value,
                    });
                  }}
                >
                  <option value="" selected={fish.Year === "" ? true : false}>
                    Select year
                  </option>
                  {wineYears.map((year) => (
                    <option selected={fish.Year === year ? true : false}>
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </div>

          <div className="helpUsTitleContent">
            <p>
              <strong>4.</strong> Cheece &nbsp;{" "}
              <TbCheese className="reactIcon" />{" "}
            </p>

            <Row>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setCheece({
                      Type: e.target.value,
                      Color: cheece.Color,
                      Grape: cheece.Grape,
                      Year: cheece.Year,
                    });
                  }}
                >
                  <option value="" selected={cheece.Type === "" ? true : false}>
                    Select Type
                  </option>
                  {typeWines.map((type) => (
                    <option selected={cheece.Type === type ? true : false}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setCheece({
                      Type: cheece.Type,
                      Color: e.target.value,
                      Grape: cheece.Grape,
                      Year: cheece.Year,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={cheece.Color === "" ? true : false}
                  >
                    Select color
                  </option>
                  {colorWines.map((color) => (
                    <option selected={cheece.Color === color ? true : false}>
                      {color}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setCheece({
                      Type: cheece.Type,
                      Color: cheece.Color,
                      Grape: e.target.value,
                      Year: cheece.Year,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={cheece.Grape === "" ? true : false}
                  >
                    Select grape
                  </option>
                  {grapeWines.map((grape) => (
                    <option selected={cheece.Grape === grape ? true : false}>
                      {grape}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setCheece({
                      Type: cheece.Type,
                      Color: cheece.Color,
                      Grape: cheece.Grape,
                      Year: e.target.value,
                    });
                  }}
                >
                  <option value="" selected={cheece.Year === "" ? true : false}>
                    Select year
                  </option>
                  {wineYears.map((year) => (
                    <option selected={cheece.Year === year ? true : false}>
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </div>

          <div className="helpUsTitleContent">
            <p>
              <strong>5.</strong> Pasta <GiRopeCoil className="reactIcon" />
            </p>

            <Row>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setPasta({
                      Type: e.target.value,
                      Color: pasta.Color,
                      Grape: pasta.Grape,
                      Year: pasta.Year,
                    });
                  }}
                >
                  <option value="" selected={pasta.Type === "" ? true : false}>
                    Select Type
                  </option>
                  {typeWines.map((type) => (
                    <option selected={pasta.Type === type ? true : false}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setPasta({
                      Type: pasta.Type,
                      Color: e.target.value,
                      Grape: pasta.Grape,
                      Year: pasta.Year,
                    });
                  }}
                >
                  <option value="" selected={pasta.Color === "" ? true : false}>
                    Select color
                  </option>
                  {colorWines.map((color) => (
                    <option selected={pasta.Color === color ? true : false}>
                      {color}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setPasta({
                      Type: pasta.Type,
                      Color: pasta.Color,
                      Grape: e.target.value,
                      Year: pasta.Year,
                    });
                  }}
                >
                  <option value="" selected={pasta.Grape === "" ? true : false}>
                    Select grape
                  </option>
                  {grapeWines.map((grape) => (
                    <option selected={pasta.Grape === grape ? true : false}>
                      {grape}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setPasta({
                      Type: pasta.Type,
                      Color: pasta.Color,
                      Grape: pasta.Grape,
                      Year: e.target.value,
                    });
                  }}
                >
                  <option value="" selected={pasta.Year === "" ? true : false}>
                    Select year
                  </option>
                  {wineYears.map((year) => (
                    <option selected={pasta.Year === year ? true : false}>
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </div>

          <div className="helpUsTitleContent">
            <p>
              <strong>6.</strong> Pizza &nbsp;{" "}
              <FaPizzaSlice className="reactIcon" />{" "}
            </p>

            <Row>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setPizza({
                      Type: e.target.value,
                      Color: pizza.Color,
                      Grape: pizza.Grape,
                      Year: pizza.Year,
                    });
                  }}
                >
                  <option value="" selected={pizza.Type === "" ? true : false}>
                    Select Type
                  </option>
                  {typeWines.map((type) => (
                    <option selected={pizza.Type === type ? true : false}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setPizza({
                      Type: pizza.Type,
                      Color: e.target.value,
                      Grape: pizza.Grape,
                      Year: pizza.Year,
                    });
                  }}
                >
                  <option value="" selected={pizza.Color === "" ? true : false}>
                    Select color
                  </option>
                  {colorWines.map((color) => (
                    <option selected={pizza.Color === color ? true : false}>
                      {color}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setPizza({
                      Type: pizza.Type,
                      Color: pizza.Color,
                      Grape: e.target.value,
                      Year: pizza.Year,
                    });
                  }}
                >
                  <option value="" selected={pizza.Grape === "" ? true : false}>
                    Select grape
                  </option>
                  {grapeWines.map((grape) => (
                    <option selected={pizza.Grape === grape ? true : false}>
                      {grape}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setPizza({
                      Type: pizza.Type,
                      Color: pizza.Color,
                      Grape: pizza.Grape,
                      Year: e.target.value,
                    });
                  }}
                >
                  <option value="" selected={pizza.Year === "" ? true : false}>
                    Select year
                  </option>
                  {wineYears.map((year) => (
                    <option selected={pizza.Year === year ? true : false}>
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </div>
        </div>
        <br />
        <Row>
          <Col xs={1}>
            <Button
              variant="danger"
              onClick={() => {
                setReadMeat({
                  Type: "",
                  Color: "",
                  Grape: "",
                  Year: "",
                });
                setWhiteMeat({
                  Type: "",
                  Color: "",
                  Grape: "",
                  Year: "",
                });
                setFish({
                  Type: "",
                  Color: "",
                  Grape: "",
                  Year: "",
                });
                setCheece({
                  Type: "",
                  Color: "",
                  Grape: "",
                  Year: "",
                });
                setPasta({
                  Type: "",
                  Color: "",
                  Grape: "",
                  Year: "",
                });
                setPizza({
                  Type: "",
                  Color: "",
                  Grape: "",
                  Year: "",
                });
                setCompleteAdd(false);
              }}
            >
              Clear
            </Button>
          </Col>
          <Col xs={1}></Col>
          <Col xs={1}>
            <Button
              variant="success"
              onClick={() => {
                // console.log(redMeat);
                // console.log(whiteMeat);
                // console.log(fish);
                // console.log(cheece);
                // console.log(pasta);
                // console.log(pizza);
                bigCategories();
              }}
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
        <br />

        <hr />
      </div>
    </div>
  );
};

export default BigCategories;
