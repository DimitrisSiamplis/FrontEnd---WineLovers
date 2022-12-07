import React from "react";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { Chart } from "react-google-charts";
import "./Profile.css";
import {
  Container,
  Row,
  Col,
  Form,
  Modal,
  Alert,
  PageItem,
} from "react-bootstrap";
import { BsFillPersonFill, BsGenderAmbiguous } from "react-icons/bs";
import { AiFillPhone, AiFillHome } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

const Profile = () => {
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });
  const [userDetails, setUserDetails] = useState();
  const [userCommentStatistic, setUserCommentStatistic] = useState([]);

  const cookies = new Cookies();
  var userEmail = cookies.get("email");

  // ------------ Get user Details -----------------
  const getUser = () => {
    fetch(`https://winelovers.onrender.com/getUser/${userEmail}`)
      .then((res) => res.json())
      .then((json) => {
        setUserDetails(json);
      });
  };
  const getUserComments = () => {
    fetch(`https://winelovers.onrender.com/getUserComments/${userEmail}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setUserCommentStatistic([json]);
      });
  };
  useEffect(() => {
    getUser();
    getUserComments();
  }, []);

  const data = [
    ["Task", "Hours per Day"],
    [
      "Total Comments",
      userCommentStatistic.length !== 0
        ? userCommentStatistic[0].numberOfComments
        : 0,
    ],
    [
      "User Comments",
      userCommentStatistic.length !== 0
        ? userCommentStatistic[0].numberOfUserComment
        : 0,
    ],
  ];
  const options = {
    title: "My Comments Activities",
  };

  const dataRate = [
    ["Task", "Rate"],
    [
      "Rate with 1",
      userCommentStatistic.length !== 0
        ? Number(userCommentStatistic[0].ratesPerRate[0])
        : 0,
    ],
    [
      "Rate with 2",
      userCommentStatistic.length !== 0
        ? Number(userCommentStatistic[0].ratesPerRate[1])
        : 0,
    ],
    [
      "Rate with 3",
      userCommentStatistic.length !== 0
        ? Number(userCommentStatistic[0].ratesPerRate[2])
        : 0,
    ],
    [
      "Rate with 4",
      userCommentStatistic.length !== 0
        ? Number(userCommentStatistic[0].ratesPerRate[3])
        : 0,
    ],
    [
      "Rate with 5",
      userCommentStatistic.length !== 0
        ? Number(userCommentStatistic[0].ratesPerRate[4])
        : 0,
    ],
  ];

  console.log(dataRate);
  console.log(data);
  const optionsRate = {
    title: "Rate Percent",
  };

  return (
    <div>
      <div className="title">
        <div className="container py-4">
          <header className="pb-3 mb-4 border-bottom">
            <a className="d-flex align-items-center text-dark text-decoration-none">
              <span className="fs-4">WineLovers Website</span>
            </a>
          </header>{" "}
        </div>
        {userDetails !== undefined && (
          <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
              <div className="col-md-3 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <img
                    className="profile-image"
                    width="150px"
                    src={
                      userDetails.user.Gender === "Female"
                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNBSq3Ijqf7bxwcZxjzcgKm_RYhCWWhK7QTQ&usqp=CAU"
                        : "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                    }
                  />
                  <span className="font-weight-bold"></span>
                  <span className="text-black-50"></span>
                  <span> </span>
                </div>
              </div>
              <div className="col-md-5 border-right">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Personal Details</h4>
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-8">
                      <label className="labels">
                        <BsFillPersonFill className="profile-icon" />
                        Name :{" "}
                        <strong>
                          {userDetails.user.Name.split(" ")[0]} &nbsp;
                          {userDetails.user.Name.split(" ")[1]}
                        </strong>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-8">
                      <label className="labels">
                        <MdEmail className="profile-icon" />
                        Email : <strong>{userDetails.user.Email}</strong>
                      </label>
                    </div>
                  </div>

                  <hr />
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">
                        <AiFillPhone className="profile-icon" />
                        Mobile Number :{" "}
                        <strong>{userDetails.user.Mobile}</strong>
                      </label>
                    </div>
                    <div className="col-md-12">
                      <label className="labels">
                        <AiFillHome className="profile-icon" /> Address :{" "}
                        <strong>{userDetails.user.Address} {userDetails.user.Number} </strong>{" "}
                      </label>
                    </div>
                    <p></p>
                    <hr />
                    <div className="col-md-12">
                      <label className="labels">
                        Birthday : <strong>{userDetails.user.Birthday.slice(0,10)}</strong>
                      </label>
                    </div>
                    <div className="col-md-12">
                      <label className="labels">
                        {/* <BsGenderAmbiguous className="profile-icon" /> */}
                        Gender : <strong>{userDetails.user.Gender}</strong>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <h5>Profile Statistic</h5>
            <Row>
              <Col xs={deviceSize < 800 ? 12 : 6}>
                <Chart
                  className="pieChartComments"
                  chartType="PieChart"
                  data={data}
                  options={options}
                  width={"100%"}
                  height={"200px"}
                />
              </Col>

              <Col xs={deviceSize < 800 ? 12 : 6}>
                <Chart
                  className="pieChartComments"
                  chartType="PieChart"
                  data={dataRate}
                  options={optionsRate}
                  width={"100%"}
                  height={"200px"}
                />
              </Col>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
