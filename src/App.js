import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Footer from "./Footer";
import Navigation from "./Components/Navigation";
import Wines from "./pages/Wines";
import Home from "./pages/Home";
import Card from "./pages/Card";
import Blog from "./pages/Blog";
import History from "./pages/History";
import BlogInfo from "./pages/BlogInfo";
import ChangePassword from "./pages/ChangePassword";
import EditProfile from "./pages/EditProfile";
import AddWine from "./pages/AddWine";
import FoodAndWine from "./pages/FoodAndWine";
import Guide from "./pages/Guide";
import HelpUs from "./pages/HelpUs";
import WrongLink from "./pages/WrongLink";
import New from "./pages/FooterConteiners/New";
import ContactUs from "./pages/FooterConteiners/ContactUs";
import AboutUs from "./pages/FooterConteiners/AboutUs";
import { Container, Row, Col, Alert, Form } from "react-bootstrap";
import Profile from "./pages/Profile";
import WineProfile from "./pages/WineProfile";
import AddNew from "./pages/AddNew";
import NewDetails from "./pages/FooterConteiners/NewDetails";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

import { AiOutlineUserAdd } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";

function App() {
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });
  const [isLogin, setIsLogin] = useState(false);
  const [Email, setEmail] = useState(false);
  const [loginMessage, setLoginMessage] = useState(false);
  const [loginOrRegister, setLoginOrRegister] = useState("login");
  const [nightOrLight, setNightOrLight] = useState("light");
  const cookies = new Cookies();

  var userEmail = cookies.get("email");

  const darkOrLightCallback = (childData) => {
    setNightOrLight(childData);
  };

  console.log(nightOrLight);

  const handleCallback = (email) => {
    setEmail(email);
    setLoginMessage(true);
    setTimeout(() => {
      setLoginMessage(false);
    }, 6000);
  };

  const handleLogoutCallback = () => {
    const cookie = new Cookies();
    cookie.remove("email");
    setEmail(undefined);
  };

  // ------- Initial Check if user is Login ----------
  useEffect(() => {
    if (userEmail) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  // ---------- set that user is login --------------
  useEffect(() => {
    if (userEmail !== undefined) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [Email]);

  return (
    <div className="holesite">
      {isLogin && (
        <div>
          <Navigation
            handleCallback={handleLogoutCallback}
            darkOrLightCallback={darkOrLightCallback}
          />
          {loginMessage && (
            <Alert className="loginAlert" variant="success">
              User succesfully Login !
            </Alert>
          )}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/wines">
              <Wines className={nightOrLight} />
            </Route>
            <Route exact path="/wine/:id">
              <WineProfile />
            </Route>
            <Route exact path="/card">
              <Card />
            </Route>

            <Route exact path="/history">
              <History />
            </Route>

            <Route exact path="/blog">
              <Blog />
            </Route>

            <Route exact path="/blogInfo/:id">
              <BlogInfo />
            </Route>
            <Route exact path="/changePassword">
              <ChangePassword />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/editProfile">
              <EditProfile />
            </Route>

            <Route exact path="/addWine">
              <AddWine />
            </Route>

            <Route exact path="/foodAndWine">
              <FoodAndWine />
            </Route>

            <Route exact path="/helpUs">
              <HelpUs />
            </Route>

            <Route exact path="/wineGuide">
              <Guide />
            </Route>

            <Route exact path="/aboutUs">
              <AboutUs />
            </Route>

            <Route exact path="/contactUs">
              <ContactUs />
            </Route>

            <Route exact path="/news">
              <New />
            </Route>

            <Route exact path="/AddNew">
              <AddNew />
            </Route>

            <Route exact path="/news/:id">
              <NewDetails />
            </Route>

            <Route exact path="*">
              <WrongLink />
            </Route>
          </Switch>
        </div>
      )}
      {isLogin === false && (
        <Container className="distance-from-footer">
          <div className="title">
            <h1>WineLovers</h1>
            <hr />
          </div>
          <Row>
            {loginOrRegister === "login" && (
              <>
                <Col xs={4}></Col>
                <Col xs={deviceSize < 900 ? (deviceSize < 600 ? 12 : 6) : 4}>
                  <Login className="login" handleCallback={handleCallback} />
                </Col>
                <Col xs={4}></Col>
              </>
            )}

            {loginOrRegister === "register" && (
              <>
                <Col xs={3}></Col>
                <Col xs={deviceSize < 900 ? (deviceSize < 600 ? 12 : 6) : 6}>
                  <Register />
                </Col>
              </>
            )}
          </Row>
          <div className="checked-login-register">
            <strong
              className="login-register-text"
              onClick={() => {
                setLoginOrRegister(
                  loginOrRegister === "login" ? "register" : "login"
                );
              }}
            >
              {loginOrRegister === "login" ? "Regisert" : "Login"}
              {loginOrRegister === "login" ? (
                <AiOutlineUserAdd className="login-register-icons" />
              ) : (
                <BiLogIn className="login-register-icons" />
              )}
            </strong>
          </div>
        </Container>
      )}

      <Footer />
    </div>
  );
}

export default App;
