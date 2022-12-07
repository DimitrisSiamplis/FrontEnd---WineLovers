import React from "react";
import "./New.css";
import { Col, NavItem, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { BsPlus } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";

const New = () => {
  const [news, setNews] = useState([]);
  // ----------- width size -----------------------
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });
  const cookies = new Cookies();
  var userEmail = cookies.get("email");
  let history = useHistory();

  //-------------------- Get news ----------------------------
  const getNews = () => {
    fetch("https://winelovers.herokuapp.com/getNews")
      .then((res) => res.json())
      .then((json) => {
        console.log(json.news);
        setNews([json]);
      });
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div>
      <div className="title">
        <div class="container py-4">
          <header class="pb-3 mb-4 border-bottom">
            <a class="d-flex align-items-center text-dark text-decoration-none">
              <span class="fs-4">WineLovers Website</span>
            </a>
          </header>{" "}
        </div>

        <div className="news-container">
          {userEmail === "jimarass@hotmail.gr" && (
            <h2>
              <BsPlus
                onClick={() => {
                  history.push("/AddNew");
                }}
              />
            </h2>
          )}

          <Row>
            {news.length !== 0 && (
              <>
              
                {news[0].news.map((item) => (
                  <Col xs={deviceSize < 1300 ? (deviceSize < 700 ? 12 : 6) : 4}>
                    <div>
                      <img
                        className="image-new"
                        src={item.InitialImage}
                        onClick={() => {
                          history.push(`/news/${item._id}`);
                        }}
                      ></img>
                      <p>
                        {" "}
                        <BiTimeFive />{" "}
                        {item.newDate.slice(0, 10) +
                          " " +
                          item.newDate.slice(11, 16)}
                        <h5
                          onClick={() => {
                            history.push(`/news/${item._id}`);
                          }}
                          className="news-title"
                        >
                          {item.Title}
                        </h5>
                      </p>
                      <br/>
                    </div>
                  </Col>
                ))}
              </>
            )}
          </Row>
        </div>
      </div>
      
    </div>
  );
};

export default New;
