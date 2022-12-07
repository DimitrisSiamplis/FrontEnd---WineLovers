import React from "react";
import "./SpecificFood.css";
import { Chart } from "react-google-charts";
import { useState, useEffect } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";

const SpecificFood = () => {
  // ----------- width size -----------------------
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });
  const [results, setResults] = useState([]);
  const [resultRecipe, setResultRecipe] = useState([]);
  const [choice, setChoice] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [recipeSelected, setRecipeSelected] = useState("");

  const getSpecificFoodResults = () => {
    let choiceDetails = {
      choice: choice,
    };
    fetch("https://winelovers.herokuapp.com/SpecificFood", {
      method: "POST",
      body: JSON.stringify(choiceDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);

        setResults(json.opinion);
      });
  };

  useEffect(() => {
    getSpecificFoodResults();
  }, []);

  useEffect(() => {
    let recipesArray = [];
    if (results.length !== 0) {
      for (const key in results) {
        recipesArray.push(results[key].Name);
      }
      setRecipes(recipesArray);
      //console.log(recipesArray);
    }
  }, [results]);

  useEffect(() => {
    let recipesArray = [];
    if (recipeSelected !== "") {
      setResultRecipe(
        results.filter(function (e) {
          return e.Name == recipeSelected;
        })
      );
    }
  }, [recipeSelected]);

  const dataType = [
    ["Type", "Type per Wine"],
    [
      "Ξηρό",
      resultRecipe.length !== 0
        ? resultRecipe.filter(function (e) {
            return e.Type == "Ξηρό";
          }).length
        : 0,
    ],
    [
      "Ημίξηρο",
      resultRecipe.length !== 0
        ? resultRecipe.filter(function (e) {
            return e.Type == "Ημίξηρο";
          }).length
        : 0,
    ],
    [
      "Ημίγλυκο",
      resultRecipe.length !== 0
        ? resultRecipe.filter(function (e) {
            return e.Type == "Ημίγλυκο";
          }).length
        : 0,
    ],
    [
      "Γλυκό",
      resultRecipe.length !== 0
        ? resultRecipe.filter(function (e) {
            return e.Type == "Γλυκό";
          }).length
        : 0,
    ],
    [
      "Σαμπανιζέ",
      resultRecipe.length !== 0
        ? resultRecipe.filter(function (e) {
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
      resultRecipe.length !== 0
        ? resultRecipe.filter(function (e) {
            return e.Color == "Κόκκινο";
          }).length
        : 0,
    ],
    [
      "Λευκό",
      resultRecipe.length !== 0
        ? resultRecipe.filter(function (e) {
            return e.Color == "Λευκό";
          }).length
        : 0,
    ],
    [
      "Ροζέ",
      resultRecipe.length !== 0
        ? resultRecipe.filter(function (e) {
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
      resultRecipe.length !== 0
        ? resultRecipe.filter(function (e) {
            return e.Grape == "Cabernet";
          }).length
        : 0,
    ],
    [
      "Agiorgitiko",
      resultRecipe.length !== 0
        ? resultRecipe.filter(function (e) {
            return e.Grape == "Agiorgitiko";
          }).length
        : 0,
    ],
    [
      "Asurtiko",
      resultRecipe.length !== 0
        ? resultRecipe.filter(function (e) {
            return e.Grape == "Asurtiko";
          }).length
        : 0,
    ],
    [
      "Xinomauro",
      resultRecipe.length !== 0
        ? resultRecipe.filter(function (e) {
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
      resultRecipe.length !== 0
        ? resultRecipe.filter(function (e) {
            return e.Year == "1950 or oldest";
          }).length
        : 0,
    ],
    [
      "1950-1980",
      resultRecipe.length !== 0
        ? resultRecipe.filter(function (e) {
            return e.Year == "1950-1980";
          }).length
        : 0,
    ],
    [
      "1980-2000",
      resultRecipe.length !== 0
        ? resultRecipe.filter(function (e) {
            return e.Year == "1980-2000";
          }).length
        : 0,
    ],
    [
      "2000-2010",
      resultRecipe.length !== 0
        ? resultRecipe.filter(function (e) {
            return e.Year == "2000-2010";
          }).length
        : 0,
    ],
    [
      "2010-2020",
      resultRecipe.length !== 0
        ? resultRecipe.filter(function (e) {
            return e.Year == "2010-2020";
          }).length
        : 0,
    ],
    [
      "2020-present",
      resultRecipe.length !== 0
        ? resultRecipe.filter(function (e) {
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
        <Row>
          <Col xs={6}>
            {" "}
            <Form.Label>Find food</Form.Label>
            <Form.Select
              onChange={(e) => {
                setRecipeSelected(e.target.value);
              }}
            >
              <option value="">Select recipe</option>

              {[...new Set(recipes)].map((recipe) => (
                <option key={recipe}>{recipe}</option>
              ))}
            </Form.Select>{" "}
          </Col>
          {/* <Col xs={1}>
            <BsPlusLg className="plus-icon" title="Add your Recipe" />
          </Col> */}
        </Row>

        {recipeSelected !== "" && (
          <div>
            <br />
            <p>
              Results for <strong>{recipeSelected} </strong> recipe :
            </p>
          </div>
        )}
        {resultRecipe.length !== 0 && (
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
            </Row>

            <Row>
              <Col xs={6}>
                <Chart
                  chartType="PieChart"
                  data={dataYear}
                  options={optionsYear}
                  width={"100%"}
                  height={"300px"}
                />
              </Col>
              <Col xs={3}></Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default SpecificFood;
