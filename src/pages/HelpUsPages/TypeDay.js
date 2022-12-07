import React, { useEffect, useState } from "react";
import "./TypeDay.css";
import { Col, Row, Form, Button } from "react-bootstrap";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { GiEasterEgg } from "react-icons/gi";
import { TbChristmasTree } from "react-icons/tb";
import Cookies from "universal-cookie";

const TypeDay = ({ colorWines, typeWines, grapeWines }) => {
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });

  const [isEnables, setIsEnabled] = useState(false);
  const cookies = new Cookies();
  var userEmail = cookies.get("email");
  const [christmas, setChristmas] = useState({
    Type: "",
    Color: "",
    Grape: "",
    Year: "",
  });
  const [easter, setEaster] = useState({
    Type: "",
    Color: "",
    Grape: "",
    Year: "",
  });
  const [valentine, setValentine] = useState({
    Type: "",
    Color: "",
    Grape: "",
    Year: "",
  });
  const wineYears = [
    "1950 or oldest",
    "1950-1980",
    "1980-2000",
    "2000-2010",
    "2010-2020",
    "2020-present",
  ];

  const onClearHandler = () => {
    const emptyData = {
      Type: "",
      Color: "",
      Grape: "",
      Year: "",
    };
    setChristmas(emptyData);
    setEaster(emptyData);
    setValentine(emptyData);
  };

  // ------------ MAKE APPLY BUTTON ENAbLE/DISABLED -------------------
  useEffect(() => {
    const isValidChristmas = [christmas].every(
      (item) =>
        item.Type === "" ||
        item.Color === "" ||
        item.Grape === "" ||
        item.Year === ""
    );
    const isValidEaster = [easter].every(
      (item) =>
        item.Type === "" ||
        item.Color === "" ||
        item.Grape === "" ||
        item.Year === ""
    );
    const isValidValentine = [valentine].every(
      (item) =>
        item.Type === "" ||
        item.Color === "" ||
        item.Grape === "" ||
        item.Year === ""
    );
    if (
      isValidChristmas === false &&
      isValidEaster === false &&
      isValidValentine === false
    ) {
      setIsEnabled(false);
    } else {
      setIsEnabled(true);
    }
  }, [christmas, easter, valentine]);

  // ------------- SAVE DATA TO DATABASE -----------------

  const typeDay = () => {
    let typeDayDetails = {
      Types: [christmas.Type, easter.Type, valentine.Type],
      Colors: [christmas.Color, easter.Color, valentine.Color],
      Grapes: [christmas.Grape, easter.Grape, valentine.Grape],
      Years: [christmas.Year, easter.Year, valentine.Year],
      Email: userEmail,
    };
    fetch("http://localhost:4000/opinionTypeDay", {
      method: "POST",
      body: JSON.stringify(typeDayDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        
      });
  };

  return (
    <div>
      <div>
        <div className="helpUsTitleContent">
          <p>- Wine would you pair on : </p>

          <div className="helpUsTitleContent">
            <p>
              <strong>1.</strong> Christmas Day &nbsp;{" "}
              <TbChristmasTree className="reactIcon" />{" "}
            </p>

            <Row>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setChristmas({
                      Type: e.target.value,
                      Color: christmas.Color,
                      Grape: christmas.Grape,
                      Year: christmas.Year,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={christmas.Type === "" ? true : false}
                  >
                    Select Type
                  </option>
                  {typeWines.map((type, i) => (
                    <option key={i}>{type}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setChristmas({
                      Type: christmas.Type,
                      Color: e.target.value,
                      Grape: christmas.Grape,
                      Year: christmas.Year,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={christmas.Color === "" ? true : false}
                  >
                    Select color
                  </option>
                  {colorWines.map((color, i) => (
                    <option key={i}>{color}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setChristmas({
                      Type: christmas.Type,
                      Color: christmas.Color,
                      Grape: e.target.value,
                      Year: christmas.Year,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={christmas.Grape === "" ? true : false}
                  >
                    Select grape
                  </option>
                  {grapeWines.map((grape, i) => (
                    <option key={i}>{grape}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setChristmas({
                      Type: christmas.Type,
                      Color: christmas.Color,
                      Grape: christmas.Grape,
                      Year: e.target.value,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={christmas.Year === "" ? true : false}
                  >
                    Select year
                  </option>
                  <option
                    value=""
                    selected={christmas.Year === "" ? true : false}
                  >
                    Select year
                  </option>
                  {wineYears.map((year, i) => (
                    <option
                      key={i}
                      selected={christmas.Year === year ? true : false}
                    >
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </div>

          <div className="helpUsTitleContent">
            <p>
              <strong>2.</strong> Easter Day &nbsp;{" "}
              <GiEasterEgg className="reactIcon" />{" "}
            </p>

            <Row>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setEaster({
                      Type: e.target.value,
                      Color: easter.Color,
                      Grape: easter.Grape,
                      Year: easter.Year,
                    });
                  }}
                >
                  <option value="" selected={easter.Type === "" ? true : false}>
                    Select Type
                  </option>
                  {typeWines.map((type, i) => (
                    <option key={i}>{type}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setEaster({
                      Type: easter.Type,
                      Color: e.target.value,
                      Grape: easter.Grape,
                      Year: easter.Year,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={easter.Color === "" ? true : false}
                  >
                    Select color
                  </option>
                  {colorWines.map((color, i) => (
                    <option key={i}>{color}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setEaster({
                      Type: easter.Type,
                      Color: easter.Color,
                      Grape: e.target.value,
                      Year: easter.Year,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={easter.Grape === "" ? true : false}
                  >
                    Select grape
                  </option>
                  {grapeWines.map((grape, i) => (
                    <option key={i}>{grape}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setEaster({
                      Type: easter.Type,
                      Color: easter.Color,
                      Grape: easter.Grape,
                      Year: e.target.value,
                    });
                  }}
                >
                  <option value="" selected={easter.Year === "" ? true : false}>
                    Select year
                  </option>
                  {wineYears.map((year, i) => (
                    <option
                      key={i}
                      selected={easter.Year === year ? true : false}
                    >
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </div>

          <div className="helpUsTitleContent">
            <p>
              <strong>3.</strong> Valentine Day &nbsp;{" "}
              <BsFillSuitHeartFill className="reactIcon" />{" "}
            </p>

            <Row>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setValentine({
                      Type: e.target.value,
                      Color: valentine.Color,
                      Grape: valentine.Grape,
                      Year: valentine.Year,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={valentine.Type === "" ? true : false}
                  >
                    Select Type
                  </option>
                  {typeWines.map((type, i) => (
                    <option key={i}>{type}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setValentine({
                      Type: valentine.Type,
                      Color: e.target.value,
                      Grape: valentine.Grape,
                      Year: valentine.Year,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={valentine.Color === "" ? true : false}
                  >
                    Select color
                  </option>
                  {colorWines.map((color, i) => (
                    <option key={i}>{color}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setValentine({
                      Type: valentine.Type,
                      Color: valentine.Color,
                      Grape: e.target.value,
                      Year: valentine.Year,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={valentine.Grape === "" ? true : false}
                  >
                    Select grape
                  </option>
                  {grapeWines.map((grape, i) => (
                    <option key={i}>{grape}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={deviceSize < 600 ? 6 : 3}>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setValentine({
                      Type: valentine.Type,
                      Color: valentine.Color,
                      Grape: valentine.Grape,
                      Year: e.target.value,
                    });
                  }}
                >
                  <option
                    value=""
                    selected={valentine.Year === "" ? true : false}
                  >
                    Select year
                  </option>
                  {wineYears.map((year, i) => (
                    <option
                      key={i}
                      selected={valentine.Year === year ? true : false}
                    >
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <br />
      <Row>
        <Col xs={1}>
          <Button
            variant="danger"
            onClick={() => {
              onClearHandler();
            }}
          >
            Clear
          </Button>
        </Col>
        <Col xs={1}></Col>
        <Col xs={1}>
          <Button
            variant="success"
            disabled={isEnables}
            onClick={() => {
              // console.log(christmas);
              // console.log(easter);
              // console.log(valentine);
              typeDay()
            }}
          >
            Apply
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default TypeDay;
