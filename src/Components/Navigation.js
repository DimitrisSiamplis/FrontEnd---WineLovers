import React from "react";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBook,
  faUser,
  faClock,
  faBlog,
  faWineBottle,
  faUtensils,
  faCommentDots,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { RiSettings3Fill } from "react-icons/ri";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";

const Navigation = (props) => {
  const [userDetails, setUseretails] = useState([]);

  const [numberOfItmes, setNumberOfItems] = useState(0);

  const cookies = new Cookies();
  var userEmail = cookies.get("email");

  const onTriger = () => {
    props.handleCallback();
  };

  const getUser = () => {
    fetch(`https://winelovers.onrender.com/getUser/${userEmail}`)
      .then((res) => res.json())
      .then((json) => {
        console.log([json]);
        setUseretails([json]);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  var intervalId = window.setInterval(function () {
    var cardDetails =
      cookies.get("card") === "" || cookies.get("card") === undefined
        ? []
        : cookies.get("card").split("|");

    setNumberOfItems(cardDetails.length);
  }, 1000);

  return (
    <div>
      <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">WineLovers</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          &nbsp;&nbsp;
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="nav-items" href="/wines">
                Wines &nbsp;
                <FontAwesomeIcon
                  className="faIcons"
                  icon={faWineBottle}
                  size="lg"
                />{" "}
              </Nav.Link>
              <Nav.Link className="nav-items" href="/wineGuide">
                Wine&nbsp;Guide &nbsp;
                <FontAwesomeIcon
                  className="faIcons"
                  icon={faBook}
                  size="lg"
                />{" "}
              </Nav.Link>
              <Nav.Link href="/foodAndWine">
                Food & Wine &nbsp;
                <FontAwesomeIcon
                  className="faIcons"
                  icon={faUtensils}
                  size="lg"
                />{" "}
              </Nav.Link>
              <Nav.Link href="/helpUs">
                FeedBack &nbsp;
                <FontAwesomeIcon
                  className="faIcons"
                  icon={faClock}
                  size="lg"
                />{" "}
              </Nav.Link>
              <Nav.Link href="/blog">
                BLog &nbsp;
                <FontAwesomeIcon
                  className="faIcons"
                  icon={faCommentDots}
                  size="lg"
                />{" "}
              </Nav.Link>
              {numberOfItmes !== 0 && (
                <Nav.Link href="/card">
                  Cart&nbsp;
                  <strong>({numberOfItmes})</strong>
                  &nbsp;
                  <FontAwesomeIcon
                    className="faIcons"
                    icon={faCartPlus}
                    size="lg"
                  />{" "}
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              <RiSettings3Fill className="settings-icon" />
              <NavDropdown title="Settings" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/history">
                  Order History
                </NavDropdown.Item>
                <NavDropdown.Item href="/changePassword">
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Item href="/editProfile">
                  Edit Profile
                </NavDropdown.Item>
                {userEmail === "jimarass@hotmail.gr" && (
                  <NavDropdown.Item href="/addWine">Add Wine</NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    onTriger();
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              &nbsp;
            </Nav>
            <Nav>
              <Nav.Link className="loginUs">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Nav.Link>
            </Nav>
            <Nav>
              {userDetails.length !== 0 && (
                <Nav.Link href="/profile" className="loginUs">
                  {userDetails[0].user.Name}
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
