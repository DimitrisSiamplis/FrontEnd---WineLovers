import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Modal,
  Alert,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faFilter,
  faStar,
  faSearchLocation,
} from "@fortawesome/free-solid-svg-icons";
import { BsChevronDown } from "react-icons/bs";
import { FaWineBottle } from "react-icons/fa";
import "./Wines.css";

const Wines = () => {
  let history = useHistory();

  const [initialWines, setInitialWines] = useState([]);

  const [wines, setWines] = useState([]);
  const [selectedWineId, setSelectedWineId] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [alreadyExistInCard, setAlreadyExistInCard] = useState(false);
  const [succesfullyAddedToCard, setSuccesfullyAddedToCard] = useState(false);

  const [colorWines, setColorWines] = useState([]);
  const [typeWines, setTypeWines] = useState([]);
  const [yearWines, setYearWines] = useState([]);

  // ------------FIlter Hooks -----------------------------
  const [wineSearch, setWineSearch] = useState("");
  const [wineType, setWineType] = useState("");
  const [wineColor, setWineColor] = useState("");
  const [wineYear, setWineYear] = useState("");
  const [minRate, setMinRate] = useState(0);
  const [maxRate, setMaxRate] = useState(5);
  const [maxInitialPrice, setMaxInitialPrice] = useState();
  const [minInitialPrice, setMinInitialPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [minPrice, setMinPrice] = useState();

  const [searchByMaxPrice, setByMaxPrice] = useState(false);
  const [searchByMaxRate, setByMaxRate] = useState(false);
  const [activeSpinner, setActiveSpinner] = useState(false);
  // ----------- width size -----------------------
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });

  // -------- MODAL
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(1);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // --------- Set COOKIES
  const cookies = new Cookies();
  var user = cookies.get("email");

  const { innerWidth: width, innerHeight: height } = window;

  // -------------- when a dropw down fiter click--------
  useEffect(() => {
    if (wineType !== "" || wineColor !== "" || wineYear !== "") {
      filterWines();
    }
  }, [wineType, wineColor, wineYear]);

  // ----------------- Pagination ---------------------
  const [numberOfPage, setNumberOfPage] = useState(1);
  const [pages, setPages] = useState([1]);
  const [currentPage, setCurrentPage] = useState(1);
  var numberOfWinesPerPage = 12;

  // ----------- when wines length Change --------------
  useEffect(() => {
    if (wines.length !== 0) {
      setNumberOfPage(
        Math.floor(wines[0].wines.length / numberOfWinesPerPage + 1)
      );
      console.log(Math.floor(wines[0].wines.length / numberOfWinesPerPage + 1));
    }
  }, [wines]);

  // ----------- when numberOfPage Change -------------------
  useEffect(() => {
    var testArray = [];
    for (let i = 1; i <= numberOfPage; i++) {
      testArray.push(i);
    }
    setPages(testArray);
    setCurrentPage(1);
  }, [numberOfPage]);

  // ----------- click on page-----------------------

  const clickOnPage = (page) => {
    setCurrentPage(page);

    window.scrollTo(0, 0);
  };

  // ----------- click on next page --------------
  const clickOnNextPage = () => {
    if (currentPage !== pages.length) {
      setCurrentPage(currentPage + 1);
    }
    window.scrollTo(0, 0);
  };

  // ----------- click on Prev page --------------
  const clickOnPrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
    window.scrollTo(0, 0);
  };

  //------ initial Wines --------------
  const getWines = () => {
    setActiveSpinner(true);
    fetch("https://winelovers.onrender.com/getWines")
      .then((res) => res.json())
      .then((json) => {
        setActiveSpinner(false);
        console.log(json.wines);

        setWines([json]);
        setInitialWines([json]);

        var colors = [];
        var types = [];
        var years = [];
        var prices = [];
        for (const key in json.wines) {
          colors.push(json.wines[key].wine.Color);
          types.push(json.wines[key].wine.Type);
          years.push(json.wines[key].wine.Year);
          prices.push(json.wines[key].wine.Price);
        }
        setMaxInitialPrice(Math.max.apply(Math, prices));
        setMinInitialPrice(Math.min.apply(Math, prices));
        setMinPrice(Math.min.apply(Math, prices));
        setMaxPrice(Math.max.apply(Math, prices));
        colors = [...new Set(colors)];
        types = [...new Set(types)];
        years = [...new Set(years)];
        setColorWines(colors);
        setTypeWines(types);
        setYearWines(years);
      });
  };

  useEffect(() => {
    getWines();
  }, []);

  // ----------- when wines length Change --------------
  useEffect(() => {
    if (wines.length !== 0) {
    }
  }, [wines]);

  // ------ FILTER Wines ------------
  const filterWines = () => {
    var oldWines = initialWines;

    var newWineArray = [];
    var newArray = oldWines[0].wines.filter(function (el) {
      return (
        el.wine.WineName.includes(wineSearch) &&
        el.wine.Color.includes(wineColor) &&
        el.wine.Type.includes(wineType) &&
        String(el.wine.Year).includes(wineYear) &&
        el.sum_total_rate < maxRate &&
        el.sum_total_rate >= minRate &&
        el.wine.Price <= maxPrice &&
        el.wine.Price >= minPrice
      );
    });

    if (searchByMaxPrice) {
      newArray.sort((a, b) => {
        return b.wine.Price - a.wine.Price;
      });
    }

    if (searchByMaxRate) {
      newArray.sort((a, b) => {
        return b.sum_total_rate - a.sum_total_rate;
      });
    }
    console.log(newArray);

    newWineArray.push({ wines: newArray });
    setWines(newWineArray);
    window.scrollTo(0, 0);
  };

  const onClearHandler = () => {
    setWineSearch("");
    setWineType("");
    setWineColor("");
    setWineYear("");
    setMinRate(0);
    setMaxRate(5);
    setMaxPrice(maxInitialPrice);
    setMinPrice(minInitialPrice);
    setByMaxPrice(false);
    setByMaxRate(false);
    setWines(initialWines);
    window.scrollTo(0, 0);
  };

  // --------- Add To Card ----------------

  const onAddToCardHandler = (wineArray) => {
    // ----------- save card details to cookies ---------------
    const cookies = new Cookies();
    var isCardEmty = cookies.get("card");

    if (isCardEmty === "" || isCardEmty === undefined) {
      cookies.set("card", wineArray + "," + amount, { path: "/" });
      setSuccesfullyAddedToCard(true);
    } else {
      var editedWineArray = wineArray.slice(0, -1);
      if (isCardEmty.includes(editedWineArray)) {
        setAlreadyExistInCard(true);
        setTimeout(() => {
          setAlreadyExistInCard(false);
        }, 3000);
      } else {
        setSuccesfullyAddedToCard(true);
        setTimeout(() => {
          setSuccesfullyAddedToCard(false);
        }, 3000);
        setAlreadyExistInCard(false);
        var newCardCookie = isCardEmty + "|" + wineArray + "," + amount;
        cookies.set("card", newCardCookie, { path: "/" });
      }
    }
    setAmount(1);
    handleClose();
  };

  return (
    <div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="modalTitle">
              Add <strong>{selectedWineId.split(",")[1]}</strong> to Card
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Chooce Amount</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              min="1"
              max="20"
              value={amount}
              placeholder="Chooce Amount"
            />
            {(amount === 0 || amount < 0 || amount > 20) && (
              <p className="alertMessage">Range 1-20 wines!</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              disabled={
                amount === 0 || amount === "" || amount < 0 || amount > 20
              }
              onClick={() => {
                onAddToCardHandler(selectedWineId);
              }}
            >
              Add to card
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <div className="title">
        <div className="container py-4">
          <header className="pb-3 mb-4 border-bottom">
            <a className="d-flex align-items-center text-dark text-decoration-none">
              <span className="fs-4">
                <FaWineBottle className="initial-icons" />
                &nbsp; Wines
              </span>
            </a>
          </header>{" "}
        </div>

        {succesfullyAddedToCard && (
          <Alert className="alertCardMessage" key="danger" variant="success">
            Wine added succesfully to card!
          </Alert>
        )}
        {alreadyExistInCard && (
          <Alert className="alertCardMessage" key="danger" variant="danger">
            This wine Already Exist in Card!
          </Alert>
        )}
        <div>
          <Row>
            <Col>
              <div
                className="filter-box"
                onClick={() => {
                  setShowFilter(!showFilter);
                }}
                title={showFilter ? "Hide Filters" : "Show Filters"}
              >
                <h3>
                  <FontAwesomeIcon
                    className="showFilters"
                    icon={faFilter}
                    size="2x"
                    // transform={{ rotate: showFilter ? 42 : 0 }}
                  />
                  &nbsp;&nbsp;
                  <strong className="filters-text">Filters</strong> &nbsp;
                </h3>
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              xs={
                deviceSize < 1300
                  ? deviceSize < 900
                    ? deviceSize < 800
                      ? 12
                      : 5
                    : 4
                  : 3
              }
              // md={{
              //   span: deviceSize < 1200 ? (deviceSize < 1000 ? 8 : 4) : 3,
              //   offset: deviceSize < 1200 ? (deviceSize < 1000 ? 1 : 0) : 0,
              // }}
            >
              <>
                {showFilter && (
                  <div className="bg-white rounded-3 shadow-sm p-4 margin">
                    <div className="filters">
                      <Container>
                        <Row>
                          <Form>
                            <Form.Group>
                              <Form.Label>Filter Wine</Form.Label>
                              <Form.Control
                                type="search"
                                placeholder="Filter Wine"
                                value={wineSearch}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    filterWines();
                                  }
                                }}
                                onChange={(e) => {
                                  setWineSearch(e.target.value);
                                }}
                              />
                            </Form.Group>
                            {/* <Form.Label>Wine Type</Form.Label> */}
                            <br />
                            <Form.Select
                              aria-label="Default select example"
                              onChange={(e) => {
                                console.log(e.target.value);
                                setWineType(e.target.value);
                              }}
                            >
                              <option value="">Select wine type</option>
                              {typeWines.map((type) => (
                                <option value={type}>{type}</option>
                              ))}
                            </Form.Select>
                            <br />
                            {/* <Form.Label>Wine Color</Form.Label> */}
                            <Form.Select
                              aria-label="Default select example"
                              onChange={(e) => {
                                setWineColor(e.target.value);
                              }}
                            >
                              <option value="">Select wine color</option>
                              {colorWines.map((color) => (
                                <option value={color}>{color}</option>
                              ))}
                            </Form.Select>
                            <br />
                            {/* <Form.Label>Wine Year</Form.Label> */}
                            <Form.Select
                              aria-label="Default select example"
                              onChange={(e) => {
                                setWineYear(e.target.value);
                              }}
                            >
                              <option value="">Select wine year</option>
                              {yearWines.map((year) => (
                                <option value={year}>{year}</option>
                              ))}
                            </Form.Select>
                            <br />
                            <Row>
                              <Col xs={6}>
                                <Form.Label>Min Rate </Form.Label>
                                <Form.Range
                                  min="0"
                                  max="5"
                                  value={minRate}
                                  onChange={(e) => {
                                    if (maxRate > e.target.value) {
                                      setMinRate(e.target.value);
                                    }
                                  }}
                                />
                                <strong>
                                  {minRate}
                                  <FontAwesomeIcon
                                    className="starIcon"
                                    icon={faStar}
                                    size="1x"
                                  />
                                </strong>
                              </Col>

                              <Col xs={6}>
                                {" "}
                                <Form.Label>Max Rate </Form.Label>
                                <Form.Range
                                  min="0"
                                  max="5"
                                  value={maxRate}
                                  onChange={(e) => {
                                    if (minRate < e.target.value) {
                                      setMaxRate(e.target.value);
                                    }
                                  }}
                                />
                                <strong>
                                  {maxRate}
                                  <FontAwesomeIcon
                                    className="starIcon"
                                    icon={faStar}
                                    size="1x"
                                  />
                                </strong>
                              </Col>
                            </Row>
                            <br />
                            <Row>
                              <Col xs={6}>
                                <Form.Label>Min Price</Form.Label>
                                <Form.Range
                                  min={minInitialPrice}
                                  max={maxInitialPrice}
                                  value={
                                    minPrice === minInitialPrice
                                      ? minInitialPrice
                                      : minPrice
                                  }
                                  onChange={(e) => {
                                    if (maxPrice > e.target.value) {
                                      setMinPrice(e.target.value);
                                    }
                                  }}
                                />
                                <strong>{minPrice} €</strong>
                              </Col>
                              <Col xs={6}>
                                {" "}
                                <Form.Label>Max Price</Form.Label>
                                <Form.Range
                                  min={minInitialPrice}
                                  max={maxInitialPrice}
                                  value={
                                    maxPrice === maxInitialPrice
                                      ? maxInitialPrice
                                      : maxPrice
                                  }
                                  onChange={(e) => {
                                    if (minPrice < e.target.value) {
                                      setMaxPrice(e.target.value);
                                    }
                                  }}
                                />
                                <strong>{maxPrice} €</strong>
                              </Col>
                            </Row>
                            <br />
                            <hr />
                            <div className="rateCheckBox">
                              <input
                                type="checkbox"
                                checked={searchByMaxPrice}
                                onChange={(e) => {
                                  setByMaxPrice(e.target.checked);
                                }}
                              />
                              <label className="rateLabel">
                                &nbsp;Search&nbsp;by&nbsp;max&nbsp;price.
                              </label>
                            </div>
                            <div className="rateCheckBox">
                              <input
                                type="checkbox"
                                checked={searchByMaxRate}
                                onChange={(e) => {
                                  setByMaxRate(e.target.checked);
                                }}
                              />
                              <label className="rateLabel">
                                &nbsp;Search&nbsp;by&nbsp;max&nbsp;rate.
                              </label>
                            </div>
                            <br />
                            <br />
                            <Row>
                              <Col xs={4}>
                                <Button
                                  variant="warning"
                                  onClick={onClearHandler}
                                >
                                  Clear
                                </Button>
                              </Col>
                              <Col xs={6}>
                                <Button variant="success" onClick={filterWines}>
                                  Search{" "}
                                </Button>
                              </Col>
                            </Row>
                            &nbsp;
                          </Form>
                        </Row>
                      </Container>
                    </div>
                  </div>
                )}
                {deviceSize < 1200 && showFilter && (
                  <>
                    {" "}
                    <br /> <br /> <br />
                  </>
                )}
              </>
            </Col>
            <Col
              xs={
                showFilter
                  ? deviceSize < 1300
                    ? deviceSize < 900
                      ? deviceSize < 800
                        ? 12
                        : 7
                      : 8
                    : 9
                  : 12
              }
            >
              <>
                <div className="container">
                  <Container>
                    {activeSpinner && (
                      <Spinner
                        className="spinner"
                        animation="border"
                        variant="primary"
                      />
                    )}
                    {wines.length !== 0 && (
                      <>
                        <Row>
                          <div className="pagination-center">
                            <div className="box-pagination">
                              <div className="page">
                                <p
                                  onClick={() => {
                                    clickOnPrevPage();
                                  }}
                                >
                                  &lt;
                                </p>
                              </div>
                              {pages.map((page) => (
                                <div
                                  className={
                                    page === currentPage
                                      ? "page-selected"
                                      : "page"
                                  }
                                >
                                  <p
                                    onClick={() => {
                                      clickOnPage(page);
                                    }}
                                  >
                                    {page}
                                  </p>
                                </div>
                              ))}
                              <div className="page">
                                <p
                                  onClick={() => {
                                    clickOnNextPage();
                                  }}
                                >
                                  &gt;
                                </p>
                              </div>
                            </div>
                          </div>
                        </Row>
                        <div>
                          <Row>
                            {wines[0].wines
                              .slice(
                                numberOfWinesPerPage * (currentPage - 1),
                                numberOfWinesPerPage * currentPage
                              )
                              .map((item) => (
                                <Col
                                  xs={
                                    showFilter
                                      ? deviceSize < 1400
                                        ? deviceSize < 1100
                                          ? 12
                                          : 6
                                        : 4
                                      : deviceSize < 1200
                                      ? deviceSize < 800
                                        ? 12
                                        : 6
                                      : 4
                                  }
                                >
                                  {wines.length !== 0 && (
                                    <Container className="item">
                                      <div
                                        className="card card-body wine"
                                        // onClick={() => {
                                        //   console.log(item.wine._id);
                                        //   history.push("/wine/" + item.wine._id);
                                        // }}
                                      >
                                        <div className="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
                                          <div className="mr-2 mb-3 mb-lg-0">
                                            <img
                                              className="image"
                                              src={item.wine.ImageUrl}
                                            />
                                          </div>
                                          <div className="media-body">
                                            <h6 className="media-title font-weight-semibold">
                                              <a
                                                href={`/wine/${item.wine._id}`}
                                                data-abc="true"
                                              >
                                                {" "}
                                                {item.wine.WineName}
                                              </a>
                                            </h6>
                                            <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
                                              <li className="list-inline-item">
                                                <a
                                                  href="#"
                                                  className="text-muted text-decoration-none"
                                                  data-abc="true"
                                                >
                                                  {item.wine.Type}
                                                </a>
                                              </li>
                                              <li className="list-inline-item">
                                                <a
                                                  href="#"
                                                  className="text-muted text-decoration-none"
                                                  data-abc="true"
                                                >
                                                  {item.wine.Color}
                                                </a>
                                              </li>
                                              <li className="list-inline-item">
                                                <a
                                                  href="#"
                                                  className="text-muted text-decoration-none"
                                                  data-abc="true"
                                                >
                                                  {item.wine.Year}
                                                </a>
                                              </li>
                                              <br />
                                              <li className="list-inline-item">
                                                <a
                                                  href="#"
                                                  className="text-muted text-decoration-none"
                                                  data-abc="true"
                                                >
                                                  <FaMapMarkerAlt />
                                                  &nbsp;
                                                  {item.wine.Location} ,{" "}
                                                  {item.wine.Country}
                                                </a>
                                              </li>
                                            </ul>

                                            <ul className="list-inline list-inline-dotted mb-0">
                                              <li className="list-inline-item">
                                                {" "}
                                                <strong>Grape : </strong>{" "}
                                                {item.wine.Grapes}{" "}
                                              </li>
                                              <br />
                                              <li className="list-inline-item">
                                                {" "}
                                                <strong>Winery by</strong>{" "}
                                                <a
                                                  target="_blank"
                                                  href={`https://www.google.com/search?q=${item.wine.Winery}`}
                                                  data-abc="true"
                                                >
                                                  {" "}
                                                  {item.wine.Winery}{" "}
                                                </a>
                                              </li>
                                              <br />
                                            </ul>
                                          </div>
                                          <div className="mt-3 mt-lg-0 ml-lg-3 text-center">
                                            <h3 className="mb-0 font-weight-semibold">
                                              {item.wine.Price} €
                                            </h3>
                                            <h6 className="mb-0 font-weight-semibold">
                                              {" "}
                                              {Math.round(
                                                item.sum_total_rate * 100
                                              ) / 100}{" "}
                                              <FontAwesomeIcon
                                                className="starIcon"
                                                icon={faStar}
                                                size="1x"
                                              />
                                            </h6>
                                            <div className="text-muted">
                                              {" "}
                                              <span className="fa fa-star checked"></span>{" "}
                                            </div>
                                            <div className="text-muted">
                                              {" "}
                                              {item.number_of_rate} reviews{" "}
                                            </div>
                                            <div className="text-muted"> </div>

                                            <Button
                                              variant="warning"
                                              title="Add to Card"
                                              onClick={() => {
                                                setSelectedWineId(
                                                  item.wine._id +
                                                    "," +
                                                    item.wine.WineName +
                                                    "," +
                                                    item.wine._id +
                                                    "," +
                                                    item.wine.Color +
                                                    "," +
                                                    item.wine.Type +
                                                    "," +
                                                    item.wine.Price +
                                                    "," +
                                                    item.wine.ImageUrl
                                                );
                                                handleShow(item.wine._id);
                                              }}
                                            >
                                              <FontAwesomeIcon
                                                icon={faCartPlus}
                                                size="1x"
                                              />
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </Container>
                                  )}
                                </Col>
                              ))}
                          </Row>
                        </div>
                      </>
                    )}
                  </Container>
                </div>
              </>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Wines;
