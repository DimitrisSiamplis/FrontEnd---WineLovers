import React from "react";
import "./ChangePassword.css";
import { Alert } from "react-bootstrap";
import { useState } from "react";
import Cookies from "universal-cookie";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserSecret } from "react-icons/fa";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [successfullyChanged, setSuccessfullyChanged] = useState(false);
  const cookies = new Cookies();
  var userEmail = cookies.get("email");

  const changePassword = () => {
    setSuccessfullyChanged(false);
    let passwordDetails = {
      newPassword: newPassword,
      newConfirmPassword: newConfirmPassword,
      userEmail: userEmail,
    };
    fetch("https://winelovers.onrender.com/changePassword", {
      method: "POST",
      body: JSON.stringify(passwordDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        setSuccessfullyChanged(true);
      });
  };

  const onChangeHandler = () => {
    console.log(newPassword, newConfirmPassword, userEmail);
    changePassword();
    setNewPassword("");
    setNewConfirmPassword("");
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
        <div className="mainDiv">
          <div className="cardStyle">
            <h2 className="formTitle">
              {" "}
              <FaUserSecret /> Change password
            </h2>

            <div className="inputDiv">
              <label className="inputLabel">New Password</label>
              <input
                value={newPassword}
                type="password"
                id="password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </div>

            <div className="inputDiv">
              <label className="inputLabel">Confirm Password</label>
              <input
                value={newConfirmPassword}
                type="password"
                id="confirmPassword"
                onChange={(e) => {
                  setNewConfirmPassword(e.target.value);
                }}
              />
              {newPassword !== "" && newPassword.length < 5 && (
                <p className="alertMessage">
                  Password must be more than <strong>5 characters!</strong>{" "}
                </p>
              )}

              {newPassword !== "" && newPassword !== newConfirmPassword && (
                <p className="alertMessage">Passwords do not matched!</p>
              )}
            </div>

            <div className="buttonWrapper">
              <button
                type="submit"
                id="submitButton"
                disabled={
                  (newPassword !== "" && newPassword !== newConfirmPassword) ||
                  newPassword.length < 5 ||
                  newPassword === ""
                }
                onClick={onChangeHandler}
                className="submitButton pure-button pure-button-primary"
              >
                <span>
                  Change password{" "}
                  <RiLockPasswordFill className="history-icon" />{" "}
                </span>
              </button>
              <br />
              {successfullyChanged && (
                <Alert variant="success">
                  {" "}
                  <AiOutlineMail className="history-icon" /> Your Password
                  successfully changed!{" "}
                </Alert>
              )}
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
